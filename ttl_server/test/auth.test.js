const request = require('supertest');
const app = require('../index');
const authService = require('../services/authService');

// Get the actual AuthError class before mocking the module
const { AuthError } = jest.requireActual('../services/authService');

// Mock the authService
jest.mock('../services/authService');

describe('Auth Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return a token', async () => {
      const mockToken = { accessToken: 'mock-token' };
      authService.registerUser.mockResolvedValue(mockToken);

      const res = await request(app)
        .post('/auth/register')
        .send({
          user_name: 'testuser',
          user_password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockToken);
      expect(authService.registerUser).toHaveBeenCalledWith('testuser', 'password123');
    });

    it('should handle registration errors', async () => {
      const error = new AuthError('User already exists', 401);
      authService.registerUser.mockRejectedValue(error);

      const res = await request(app)
        .post('/auth/register')
        .send({
          user_name: 'testuser',
          user_password: 'password123',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toEqual({ message: 'User already exists' });
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user and return a token', async () => {
        const mockToken = { accessToken: 'mock-token' };
        authService.loginUser.mockResolvedValue(mockToken);

        const res = await request(app)
            .post('/auth/login')
            .send({
                user_name: 'testuser',
                user_password: 'password123',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockToken);
        expect(authService.loginUser).toHaveBeenCalledWith('testuser', 'password123');
    });

    it('should handle login errors', async () => {
        const error = new AuthError('Password incorrect', 401);
        authService.loginUser.mockRejectedValue(error);

        const res = await request(app)
            .post('/auth/login')
            .send({
                user_name: 'testuser',
                user_password: 'wrongpassword',
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ message: 'Password incorrect' });
    });
  });
});
