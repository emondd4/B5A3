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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    genre: { type: String, enum: genres, required: [true, 'Genre is required'] },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    description: { type: String },
    copies: { type: Number, required: [true, 'Copies is required'], min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });
// Static method to update availability
bookSchema.statics.updateAvailability = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error('Book not found');
        book.copies -= quantity;
        book.available = book.copies > 0;
        yield book.save();
        return book;
    });
};
// Middleware to validate copies before save
bookSchema.pre('save', function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    next();
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
