import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'; // Import user routes
import testRoutes from './routes/testRoutes'; // Import test routes

const port = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/users', userRoutes); // Set user routes
server.use('/api', testRoutes); // Set test route

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
