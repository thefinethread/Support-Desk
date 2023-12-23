import asyncHandler from 'express-async-handler';
import { Ticket } from '../models/Ticket.js';
import { Note } from '../models/Note.js';
import { responseMessage } from '../utils/responseMessage.js';

/**
 * desc- create a note
 * api - /api/tickets/:ticketId/notes
 * private
 */
const createNote = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { text, isAdmin } = req.body;

  if (!ticketId) {
    res.status(400);
    throw new Error('Missing ticketId parameter');
  }

  if (!text) {
    res.status(400);
    throw new Error('Text is required');
  }

  const ticket = await Ticket.findOne({
    _id: ticketId,
    userRef: req.user._id,
  });

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found for id: ' + ticketId);
  }

  const newNote = await Note.create({
    userRef: req.user._id,
    ticketRef: ticket._id,
    text,
    isAdmin: isAdmin || false,
  });

  if (!newNote) {
    res.status(500);
    throw new Error('Something went wrong');
  } else {
    res.status(201).json(responseMessage(null, newNote));
  }
});

/**
 * desc - get all notes
 * api - /api/tickets/:ticketId/notes
 * private
 */
const getAllNotes = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    res.status(400);
    throw new Error('Missing ticketId parameter');
  }

  const ticket = await Ticket.findOne({ _id: ticketId, userRef: req.user._id });

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found for id: ' + ticketId);
  }

  const notes = await Note.find({ ticketRef: ticketId });

  res.status(200).json(responseMessage(null, notes));
});

export { createNote, getAllNotes };
