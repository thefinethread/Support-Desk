import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  createTicket,
  getAllTickets,
} from '../controllers/ticketController.js';

const route = Router();

route
  .route('/')
  .post(protectRoute, createTicket)
  .get(protectRoute, getAllTickets);

export default route;
