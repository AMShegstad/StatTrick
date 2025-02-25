import { Sequelize } from 'sequelize';
// Initialize Sequelize with database connection settings
export const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
});
// Test the connection
sequelize.authenticate()
    .then(() => {
    console.log('✅ Database connected successfully');
})
    .catch((err) => {
    console.error('❌ Database connection failed:', err);
});
