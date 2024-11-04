import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import testRoutes from './routes/testRoutes';
import stepRoutes from './routes/stepRoutes';

const port = process.env.PORT || 3000;

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/test', testRoutes);
server.use('/api/steps', stepRoutes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
