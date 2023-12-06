import { Router } from 'express';
import {
  register,
  login,
  getMe,
  logOut,
} from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getMe', protectRoute, getMe);
router.get('/logout', protectRoute, logOut);

export default router;
