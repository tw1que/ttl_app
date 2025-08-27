const { pool } = require('../db')

module.exports = async function pullLotNumbersByOrderId (order_id) {
    const related_lot_ids = await pool.query(
        'SELECT lot_id FROM order_lot WHERE order_id = $1',
        [order_id]
    )
    if (related_lot_ids.rows.length===0) {
        return {
            "related_lot_numbers_exist": false
        }
    } else {
        return {
            "related_lot_numbers_exist": true, 
            "lot_numbers": related_lot_ids.rows
        }
    }
}