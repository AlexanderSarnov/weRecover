import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { authenticateToken } from './middleware/authMiddleware';
import stepRoutes from './routes/stepRoutes';
import userRoutes from './routes/userRoutes';
import questionRoutes from './routes/questionRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

// Routes with middleware
app.use('/api/steps', authenticateToken, stepRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/questions', authenticateToken, questionRoutes); // Register question routes with middleware

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
