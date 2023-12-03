import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import app from './app.js';
import 'colors';

dotenv.config();

const port = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(
      `${process.env.NODE_ENV} server is running on port:${port}`.blue.underline
    );
  });
});
