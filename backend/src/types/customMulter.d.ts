declare namespace Express {
    export interface MulterFile {
        originalname: string;
        buffer: Buffer;
        cloudStorageObject?: string;
        cloudStoragePublicUrl?: string;
    }

    export interface Request {
        file?: MulterFile;
    }
}
