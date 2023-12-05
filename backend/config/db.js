import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `MongoDB connected at host: ${conn.connection.host}`.magenta.underline
    );
  } catch (error) {
    console.log('Error occurred in DB connection', error);
    process.exit(1);
  }
};

export default dbConnect;
