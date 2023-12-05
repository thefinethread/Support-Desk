import { Router } from 'express';
import { register } from '../controllers/userController.js';

const router = Router();

router.get('/register', register);

export default router;
