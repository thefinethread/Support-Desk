import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model('Ticket', ticketSchema);
