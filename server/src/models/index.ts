import { sequelize } from '../config/connection.js';  // Import sequelize from connection.ts
import { Player } from './playerModel.js';  // Import your models

// Sync all models with the database
sequelize.sync()
    .then(() => {
        console.log('✅ Database synced successfully');
    })
    .catch((err) => {
        console.error('❌ Error syncing database:', err);
    });

// Export the models
export { Player, sequelize };  // Export both sequelize and your models