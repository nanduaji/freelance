// database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

try {
  await sequelize.authenticate();
  console.log('PostgreSQL connection established successfully.');
} catch (error) {
  console.error('Unable to connect to PostgreSQL:', error);
}

export default sequelize;
