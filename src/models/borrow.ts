import { Schema, Document, Types, model } from 'mongoose';
import { Book } from './book';

interface IBorrow extends Document {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be positive'] },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
  },
  { timestamps: true, versionKey: false }
);

// Pre-save middleware to check available copies
borrowSchema.pre('save', async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error('Book not found');
  if (book.copies < this.quantity) {
    throw new Error('Not enough copies available');
  }
  next();
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);