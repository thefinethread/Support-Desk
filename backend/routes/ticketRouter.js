import { Router } from 'express';
import { createTicket } from '../controllers/ticketController.js';

const route = Router();

route.post('/', createTicket);

export default route;
