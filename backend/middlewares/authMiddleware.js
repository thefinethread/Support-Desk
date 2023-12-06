import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User.js';

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.RememberMe;

  if (token) {
    let decoded;

    jwt.verify(token, process.env.JWT_SECRET, (err, tokenRes) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401);
          throw new Error('Unauthorized- Token has expired');
        } else {
          res.status(401);
          throw new Error('Unauthorized- ' + err.message);
        }
      } else {
        decoded = tokenRes;
      }
    });

    // setting user to req so that we can access user details from any of the controllers
    req.user = await User.findById(decoded._id).select('-password');
  } else {
    res.status(401);
    throw new Error('Unauthorized - No token');
  }
  next();
});

export { protectRoute };
