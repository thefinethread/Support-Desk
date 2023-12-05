import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { REQ_LIMIT_SIZE } from './constants.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import userRouter from './routes/userRouter.js';

const app = express();

// cors config
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// req config
app.use(express.json({ limit: REQ_LIMIT_SIZE }));
app.use(express.urlencoded({ extended: true, limit: REQ_LIMIT_SIZE }));
app.use(express.static('public'));
app.use(cookieParser());

// routes
app.use('/api/user', userRouter);

// config custom error handler
app.use(errorHandler);

export default app;
