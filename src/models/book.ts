import { Schema, Document, model, Model } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Book model static methods
interface IBookModel extends Model<IBook> {
  updateAvailability(bookId: string, quantity: number): Promise<IBook>;
}

const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] as const;

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    genre: { type: String, enum: genres, required: [true, 'Genre is required'] },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    description: { type: String },
    copies: { type: Number, required: [true, 'Copies is required'], min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true , versionKey: false}
);

// Static method to update availability
bookSchema.statics.updateAvailability = async function (bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) throw new Error('Book not found');
  
  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();
  return book;
};

// Middleware to validate copies before save
bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
  }
  next();
});

export const Book = model<IBook,IBookModel>('Book', bookSchema);
