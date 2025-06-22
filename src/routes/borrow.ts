import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow';
import { Book } from '../models/book';
import { errorHandler } from '../middleware/errorHandler';


export const BorrowRouter = express.Router();

// Borrow a Book
BorrowRouter.post('/', async (req: Request, res: Response) => {
  try {
    const borrow = new Borrow(req.body);
    await borrow.save();
    
    // Update book availability using static method
    const book = await Book.updateAvailability(req.body.book, req.body.quantity);
    
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
      errorHandler(error,req,res,express);
  }
});

// Borrowed Books Summary
BorrowRouter.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving summary',
      error,
    });
  }
});