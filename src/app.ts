import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { BookRouter } from './routes/books';
import { BorrowRouter } from './routes/borrow';

const app = express();

app.use(express.json());

// Error handling middleware
app.use(errorHandler);

// Routes
app.use('/api/books', BookRouter);
app.use('/api/borrow', BorrowRouter);

export default app;