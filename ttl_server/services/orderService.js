const { pool } = require('../db');
const pullLotNumbersByOrderId = require('../utils/pullLotNumbersByOrderId');

class OrderError extends Error {
    constructor(message, statusCode = 404) {
        super(message);
        this.name = 'OrderError';
        this.statusCode = statusCode;
    }
}

const getOrderById = async (orderId) => {
    const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);
    if (order.rows.length === 0) {
        throw new OrderError('Not Found');
    }
    return order.rows;
};

const processOrder = async (orderId) => {
    // This function handles the complex logic from the POST /orders endpoint
    // Regex updated for better validation and to prevent ReDoS
    const regex = /^(\d{7})_(\d{3})_(\d{2}-\d{2}-\d{4})_([^_]+)_([^_]+)\$$/;
    if (!orderId || !regex.test(orderId)) {
        throw new OrderError('Provided data is incorrect or does not match format', 406);
    }

    const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [orderId]);

    if (order.rows.length !== 0) {
        const related_lot_ids = await pullLotNumbersByOrderId(orderId);
        return { is_order_in_db: true, ...related_lot_ids };
    }

    const new_order = await pool.query('INSERT INTO orders (order_id) VALUES ($1) RETURNING *', [orderId]);
    if (new_order.rows.length !== 0) {
        return { is_order_in_db: true };
    }

    // This case should ideally not be reached
    throw new OrderError("Something has gone wrong", 500);
};

const processLot = async (lotId, orderId) => {
    const lot = await pool.query('SELECT * FROM consumables WHERE lot_id = $1', [lotId]);
    if (lot.rows.length === 0) {
        await pool.query('INSERT INTO consumables (lot_id) VALUES ($1)', [lotId]);
    }

    const order_lot = await pool.query('SELECT * FROM order_lot WHERE (order_id = $1) AND (lot_id = $2)', [orderId, lotId]);
    if (order_lot.rows.length === 0) {
        await pool.query('INSERT INTO order_lot (order_id, lot_id) VALUES ($1, $2)', [orderId, lotId]);
    }

    const lot_numbers = await pool.query('SELECT lot_id FROM order_lot WHERE order_id = $1', [orderId]);
    return lot_numbers.rows;
};

const getLotsByOrderId = async (orderId) => {
    const lot_numbers = await pool.query('SELECT lot_id FROM order_lot WHERE order_id = $1', [orderId]);
    if (lot_numbers.rows.length === 0) {
        return { "has_related_lots": false };
    }
    return { "has_related_lots": true, "data": lot_numbers.rows };
};

const deleteOrderLot = async (orderId, lotId) => {
    await pool.query('DELETE FROM order_lot WHERE order_id = $1 AND lot_id = $2', [orderId, lotId]);
    const updatedResults = await pool.query('SELECT lot_id FROM order_lot WHERE order_id = $1', [orderId]);
    return updatedResults.rows;
};

const searchOrders = async (searchTerm) => {
    const searchResults = await pool.query('SELECT order_id FROM orders WHERE order_id ILIKE $1', [`%${searchTerm}%`]);
    if (searchResults.rows.length === 0) {
        throw new OrderError("No results found", 404);
    }
    return searchResults.rows;
};


module.exports = {
    getOrderById,
    processOrder,
    processLot,
    getLotsByOrderId,
    deleteOrderLot,
    searchOrders,
    OrderError
};
