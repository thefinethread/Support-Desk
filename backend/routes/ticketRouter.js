import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  createTicket,
  getAllTickets,
  getTicket,
} from '../controllers/ticketController.js';

const route = Router();

route
  .route('/')
  .post(protectRoute, createTicket)
  .get(protectRoute, getAllTickets);
route.get('/:id', protectRoute, getTicket);

export default route;
