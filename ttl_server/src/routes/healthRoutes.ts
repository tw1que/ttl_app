import { Router } from 'express';
import { z } from 'zod';

import { getHealth } from '../controllers/healthController.js';
import { validate } from '../lib/validation.js';

const router = Router();
const Empty = z.object({});
router.get('/health', validate(Empty, 'query'), getHealth);

export default router;
