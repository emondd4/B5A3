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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_1 = require("./book");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be positive'] },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
}, { timestamps: true, versionKey: false });
// Pre-save middleware to check available copies
borrowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_1.Book.findById(this.book);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < this.quantity) {
            throw new Error('Not enough copies available');
        }
        next();
    });
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
