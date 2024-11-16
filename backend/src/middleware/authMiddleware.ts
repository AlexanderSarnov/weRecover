import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: {
        user_id: string;
    };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        (req as CustomRequest).user = { user_id: user.user_id }; // Attach user_id to request object with type casting
        next();
    });
};

