import { Router } from 'express';
import { getRefByRefType } from '../controllers/referenceDataController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', protectRoute, getRefByRefType);

export default router;
