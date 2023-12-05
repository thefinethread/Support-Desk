import asyncHandler from 'express-async-handler';
import { responseMessage } from '../utils/responseMessage.js';
import { User } from '../models/User.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  // basic input validations
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all the fields');
  }

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User with same email already exists.');
  }

  const user = await User.create({ name, email, password, isAdmin });

  if (!user) {
    res.status(500);
    throw new Error('Error occurred while creating user');
  }

  res.status(201).json(
    responseMessage('user created', {
      _id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
  );
});

export { register };
