import asyncHandler from 'express-async-handler';

const createTicket = asyncHandler(async (req, res) => {
  res.send('ticket');
});

export { createTicket };
