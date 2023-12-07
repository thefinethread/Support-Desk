import asyncHandler from 'express-async-handler';
import { responseMessage } from '../utils/responseMessage.js';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

/*  
    @Desc - register new user
    @api - api/users/register
    @Public
*/
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

  // generate token and set in cookie
  generateToken(res, user);

  res.status(201).json(
    responseMessage('user created', {
      _id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
  );
});

/*  
    @Desc - Login
    @api - api/users/login
    @Public
*/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  const user = await User.findOne({ email }).select('-createdAt -updatedAt');

  if (user && (await user.validatePassword(password))) {
    generateToken(res, user);

    res.status(200).json(
      responseMessage('Logged in successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    );
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/*  
    @Desc - get current logged in user details
    @api - api/users/getMe
    @Private
*/
const getMe = (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
};

/*  
    @Desc - logout the user
    @api - api/users/logout
    @Private
*/
const logOut = (req, res) => {
  res.clearCookie('RememberMe');
  res.status(200).json(responseMessage('logged out successfully'));
};

export { register, login, getMe, logOut };
