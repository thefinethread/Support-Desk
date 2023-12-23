import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticketRef: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Text field is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model('Note', noteSchema);
