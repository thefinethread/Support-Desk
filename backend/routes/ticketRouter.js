import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { createTicket } from '../controllers/ticketController.js';

const route = Router();

route.post('/', protectRoute, createTicket);

export default route;
