import express, { Request, Response } from 'express';
import { errorHandler } from './middleware/errorHandler';
import { BookRouter } from './routes/books';
import { BorrowRouter } from './routes/borrow';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['https://library-management-frontend-sigma.vercel.app','http://localhost:*']
}))

// Error handling middleware
app.use(errorHandler);

// Routes
app.use('/api/books', BookRouter);
app.use('/api/borrow', BorrowRouter);

app.get('/', (req: Request,res: Response) => {
    res.send("Welcome to Library Managment Node App")
});

export default app;