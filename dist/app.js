"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const books_1 = require("./routes/books");
const borrow_1 = require("./routes/borrow");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Routes
app.use('/api/books', books_1.BookRouter);
app.use('/api/borrow', borrow_1.BorrowRouter);
app.get('/', (req, res) => {
    res.send("Welcome to Library Managment Node App");
});
exports.default = app;
