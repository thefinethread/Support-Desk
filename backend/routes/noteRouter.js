import { Router } from 'express';
import { createNote, getAllNotes } from '../controllers/noteController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = Router({ mergeParams: true });

router.route('/').post(protectRoute, createNote).get(protectRoute, getAllNotes);

export default router;
