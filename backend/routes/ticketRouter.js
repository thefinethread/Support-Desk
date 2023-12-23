import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import noteRouter from './noteRouter.js';
import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
} from '../controllers/ticketController.js';

const router = Router();

// re-route to note router
router.use('/:ticketId/notes', noteRouter);

router
  .route('/')
  .post(protectRoute, createTicket)
  .get(protectRoute, getAllTickets);
router
  .route('/:id')
  .get(protectRoute, getTicket)
  .put(protectRoute, updateTicket);

export default router;
