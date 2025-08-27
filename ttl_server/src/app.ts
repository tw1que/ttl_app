import express from 'express';

import { errorHandler } from './lib/errors.js';
import { notFound } from './lib/notFound.js';
import { requestIdLogger } from './lib/requestIdLogger.js';
import docsRoutes from './routes/docsRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';

const app = express();
app.use(requestIdLogger);
app.use(express.json());
app.use(healthRoutes);
app.use(itemsRoutes);
app.use(docsRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
