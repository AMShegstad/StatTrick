import { Sequelize } from 'sequelize';

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