import { createDocument } from 'zod-openapi';

import {
  ErrorResponse,
  HealthResponse,
  IdParam,
  Item,
} from '../schemas.js';

export const openApiDocument = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'TTL API',
    version: '1.0.0',
  },
  paths: {
    '/health': {
      get: {
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': { schema: HealthResponse },
            },
          },
        },
      },
    },
    '/items/{id}': {
      get: {
        requestParams: { path: IdParam },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': { schema: Item },
            },
          },
          '404': {
            description: 'Not Found',
            content: {
              'application/json': { schema: ErrorResponse },
            },
          },
        },
      },
    },
  },
});
