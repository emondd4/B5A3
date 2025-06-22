"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_1 = require("../models/book");
const errorHandler_1 = require("../middleware/errorHandler");
exports.BookRouter = express_1.default.Router();
// Create Book
exports.BookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_1.Book(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res, express_1.default);
    }
}));
// Get All Books
exports.BookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = yield book_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error,
        });
    }
}));
// Get Book by ID
exports.BookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        }
        else {
            res.json({
                success: true,
                message: 'Book retrieved successfully',
                data: book,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving book',
            error,
        });
    }
}));
// Update Book
exports.BookRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        }
        else {
            res.json({
                success: true,
                message: 'Book updated successfully',
                data: book,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error,
        });
    }
}));
// Delete Book
exports.BookRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
        }
        else {
            res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error,
        });
    }
}));
