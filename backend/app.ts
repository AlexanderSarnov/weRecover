import express from 'express';
import stepRoutes from './routes/stepRoutes';
import userRoutes from './routes/userRoutes';
import topicRoutes from './routes/topicRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();

app.use(express.json());
app.use('/api', stepRoutes);
app.use('/api', userRoutes);
app.use('/api', topicRoutes);
app.use('/api', commentRoutes);

export default app;
