import pool from './config/dbConfig';

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Database connected:', res.rows);
    }
    pool.end();
});
