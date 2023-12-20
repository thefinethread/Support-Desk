import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
} from '../controllers/ticketController.js';

const router = Router();

router
  .route('/')
  .post(protectRoute, createTicket)
  .get(protectRoute, getAllTickets);
router
  .route('/:id')
  .get(protectRoute, getTicket)
  .put(protectRoute, updateTicket);

export default router;
