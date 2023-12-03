import dotenv from 'dotenv';
import dbConnect from './config/db.js';

dotenv.config();

dbConnect();
