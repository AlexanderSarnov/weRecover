import express from 'express';

const router = express.Router();

router.post('/test', (req, res) => {
    console.log('Test route hit');
    res.status(200).json({ message: 'Simple route is working' });
});

export default router;
