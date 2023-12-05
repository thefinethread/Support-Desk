import asyncHandler from 'express-async-handler';
import { responseMessage } from '../utils/responseMessage.js';

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all the fields');
  }

  res.status(201).json(responseMessage('user created', []));
});

export { register };
