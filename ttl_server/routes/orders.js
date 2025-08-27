const router = require('express').Router();
const orderService = require('../services/orderService');
const authenticateToken = require('../middleware/authenticateToken');
const asyncWrapper = require('../utils/asyncWrapper');

router.get('/:order_id', asyncWrapper(async (req, res) => {
    const { order_id } = req.params;
    const order = await orderService.getOrderById(order_id);
    res.status(200).json(order);
}));

router.get('/', (req, res) => {
    res.status(200).json({ 'msg': 'succes!' });
});

router.post('/', authenticateToken, asyncWrapper(async (req, res) => {
    const { order_id } = req.body;
    const result = await orderService.processOrder(order_id);
    res.status(200).json(result);
}));

router.post('/lot', authenticateToken, asyncWrapper(async (req, res) => {
    const { lot_id, order_id } = req.body;
    const result = await orderService.processLot(lot_id, order_id);
    res.status(200).json(result);
}));

router.get('/lot/:order_id', asyncWrapper(async (req, res) => {
    const { order_id } = req.params;
    const result = await orderService.getLotsByOrderId(order_id);
    res.status(200).json(result);
}));

router.delete('/order_lot', authenticateToken, asyncWrapper(async (req, res) => {
    const { order_id, lot_id } = req.body;
    const result = await orderService.deleteOrderLot(order_id, lot_id);
    res.status(200).json(result);
}));

router.get('/search/:searchterm', asyncWrapper(async (req, res) => {
    const { searchterm } = req.params;
    const results = await orderService.searchOrders(searchterm);
    res.status(200).json(results);
}));

// This endpoint was not implemented, keeping it as is.
router.get('/lot', async (req, res) => {
    res.sendStatus(404);
});

module.exports = router;