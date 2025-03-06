import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,  // Disable logging for cleaner output
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Required for Render's managed Postgres
            },
          }
        : {},
    })
    : new Sequelize(
        String(process.env.PG_DATABASE || ''),
        String(process.env.PG_USER || ''),
        String(process.env.PG_PASSWORD || ''), // Force string conversion
        {
          host: String(process.env.PG_HOST || 'localhost'),
          port: Number(process.env.PG_PORT) || 5432,
          dialect: 'postgres',
          logging: false,
        }
      );

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });