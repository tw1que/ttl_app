const request = require('supertest');
const app = require('../index');
const jwtGenerator = require('../utils/jwtGenerator');
const orderService = require('../services/orderService');

// Get the actual OrderError class before mocking the module
const { OrderError } = jest.requireActual('../services/orderService');

// Mock the orderService
jest.mock('../services/orderService');

describe('Orders Endpoints', () => {
    let token;

    beforeAll(() => {
        token = jwtGenerator('test-user-id');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /orders/:order_id', () => {
        it('should return order details if order exists', async () => {
            const orderId = '12345';
            const mockOrder = [{ order_id: orderId }];
            orderService.getOrderById.mockResolvedValue(mockOrder);

            const res = await request(app).get(`/orders/${orderId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockOrder);
            expect(orderService.getOrderById).toHaveBeenCalledWith(orderId);
        });

        it('should return 404 if order does not exist', async () => {
            const orderId = 'nonexistent';
            const error = new OrderError('Not Found', 404);
            orderService.getOrderById.mockRejectedValue(error);

            const res = await request(app).get(`/orders/${orderId}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Not Found' });
        });
    });

    describe('POST /orders', () => {
        it('should process the order and return a result', async () => {
            const order_id = '1234567_001_01-01-2024_CUST_PROD$';
            const mockResult = { is_order_in_db: true };
            orderService.processOrder.mockResolvedValue(mockResult);

            const res = await request(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ order_id });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockResult);
            expect(orderService.processOrder).toHaveBeenCalledWith(order_id);
        });

        it('should handle errors during order processing', async () => {
            const order_id = 'invalid_order_id';
            const error = new OrderError('Provided data is incorrect', 406);
            orderService.processOrder.mockRejectedValue(error);
             const res = await request(app)
                .post('/orders')
                .set('Authorization', `Bearer ${token}`)
                .send({ order_id });

            expect(res.statusCode).toEqual(406);
            expect(res.body).toEqual({ message: 'Provided data is incorrect' });
        });
    });

    // Minimal tests for other endpoints can be added here if needed
});
