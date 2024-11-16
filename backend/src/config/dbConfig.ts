import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432'),
    max: 20, // Set the maximum number of clients in the pool
    idleTimeoutMillis: 1800000, // Close idle clients after 30 minutes
    connectionTimeoutMillis: 1800000, // Return an error after 30 minutes if connection could not be established
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
