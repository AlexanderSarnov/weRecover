import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import { format } from 'util';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME as string);

const multerConfig = multer({
    storage: multer.memoryStorage(), // Store files in memory temporarily
});

const uploadToGCS = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const blob = bucket.file(Date.now() + '-' + req.file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', (err) => {
        next(err);
    });

    blobStream.on('finish', async () => {
        // Cast req.file to MulterFile when accessing custom properties
        const multerFile = req.file as {
            originalname: string;
            buffer: Buffer;
            cloudStorageObject?: string;
            cloudStoragePublicUrl?: string;
        };

        multerFile.cloudStorageObject = blob.name;
        multerFile.cloudStoragePublicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        try {
            await blob.makePublic();
        } catch (err) {
            next(err);
        }
        next();
    });

    blobStream.end(req.file.buffer);
};

export { multerConfig, uploadToGCS };
