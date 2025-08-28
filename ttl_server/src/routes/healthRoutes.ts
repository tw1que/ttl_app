import { Router } from 'express';

import { getHealth } from '../controllers/healthController.js';
import { validate } from '../lib/validation.js';
import { Empty } from '../schemas.js';

const router = Router();
router.get('/health', validate(Empty, 'query'), getHealth);

export default router;
