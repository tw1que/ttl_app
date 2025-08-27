import { Router } from 'express';
import { z } from 'zod';

import { getItem } from '../controllers/itemsController.js';
import { validate } from '../lib/validation.js';

const router = Router();
const IdParam = z.object({ id: z.string().uuid() });
router.get('/items/:id', validate(IdParam, 'params'), getItem);

export default router;
