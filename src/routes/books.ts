import express, { Request, Response, Router } from 'express';
import { Book } from '../models/book';
import { errorHandler } from '../middleware/errorHandler';


export const BookRouter = express.Router();

// Create Book
BookRouter.post("/", async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    } catch (error) {
        errorHandler(error,req,res,express);
    }
});

// Get All Books
BookRouter.get("/", async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query: any = {};
        if (filter) query.genre = filter;

        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));

        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error,
        });
    }
});

// Get Book by ID
BookRouter.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        } else {
            res.json({
                success: true,
                message: 'Book retrieved successfully',
                data: book,
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book',
            error,
        });
    }
});

// Update Book
BookRouter.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        } else {
            res.json({
                success: true,
                message: 'Book updated successfully',
                data: book,
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error,
        });
    }
});

// Delete Book
BookRouter.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        } else {
            res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error,
        });
    }
});
