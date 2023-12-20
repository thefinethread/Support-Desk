import asyncHandler from 'express-async-handler';
import readJsonData from '../utils/readJsonData.js';
import { Ticket } from '../models/Ticket.js';
import { responseMessage } from '../utils/responseMessage.js';

/*
    Desc: create new ticket
    api: /api/tickets
    private
*/
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  const products = await readJsonData('products');

  // validate if the product is a valid product type
  if (!products.map((item) => item.name).includes(product)) {
    res.status(400);
    throw new Error('Please select a valid product');
  }

  if (!description?.trim()) {
    res.status(400);
    throw new Error('Description field is required');
  }

  const ticket = await Ticket.create({
    userRef: req.user._id,
    product,
    description,
  });

  if (!ticket) {
    throw new Error('Something went wrong on our end.');
  } else {
    res.status(201).json(responseMessage('Your ticket is created.', ticket));
  }
});

/*
    Desc: get all tickets of the user
    api: /api/tickets
    private
*/
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ userRef: req.user._id }).sort({
    updatedAt: -1,
  });

  res.status(200).json(responseMessage(null, tickets));
});

/*
    Desc: get a single ticket
    api: /api/tickets/:id
    private
*/
const getTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    res.status(400);
    throw new Error('Missing ticket Id parameter');
  }

  const ticket = await Ticket.findById(ticketId);

  if (ticket) {
    res.status(200).json(responseMessage(null, ticket));
  } else {
    res.status(400);
    throw new Error('Ticket not found for id: ' + ticketId);
  }
});

export { createTicket, getAllTickets, getTicket };
