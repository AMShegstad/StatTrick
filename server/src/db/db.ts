import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Sequelize with database connection settings
export const sequelize = new Sequelize(
    process.env.PG_DATABASE as string,
    process.env.PG_USER as string,
    process.env.PG_PASSWORD as string,
    {
        host: process.env.PG_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected successfully');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });