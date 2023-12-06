import { Router } from 'express';
import { register, login, getMe } from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectRoute, getMe);

export default router;
