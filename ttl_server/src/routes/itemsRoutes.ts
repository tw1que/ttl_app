import { Router } from 'express';

import { getItem } from '../controllers/itemsController.js';
import { validate } from '../lib/validation.js';
import { IdParam } from '../schemas.js';

const router = Router();
router.get('/items/:id', validate(IdParam, 'params'), getItem);

export default router;
