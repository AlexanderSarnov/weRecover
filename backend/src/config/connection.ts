import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PGDATABASE!, process.env.PGUSER!, process.env.PGPASSWORD!, {
    host: process.env.PGHOST!,
    port: Number(process.env.PGPORT),
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

export { sequelize };
