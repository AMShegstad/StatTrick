import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Sequelize with database connection settings
export const sequelize = new Sequelize(
    'stattrick_db',  // PG_DATABASE
    'postgres',  // PG_USER
    'password',  // PG_PASSWORD
    {
    host: process.env.PG_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
});
console.log('Logging database .env variables in connection.ts - credentials are currently hardcoded. Please update this before deploying to production as they are showing as undefined.');
console.log(process.env.PG_DATABASE);
console.log(process.env.PG_USER);
console.log(process.env.PG_PASSWORD);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected successfully');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });