import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { REQ_LIMIT_SIZE } from './constants.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import userRouter from './routes/userRouter.js';
import ticketRouter from './routes/ticketRouter.js';
import referenceDataRouter from './routes/referenceDataRouter.js';
import noteRouter from './routes/noteRouter.js';

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
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/ref', referenceDataRouter);
app.use('/api/notes', noteRouter);

// in es module type, have to use like this
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // serve build folder as static
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, 'frontend', 'build', 'index.html')
  );
}

// config custom error handler
app.use(errorHandler);

export default app;
