// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './database.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Example route to test API
app.get('/', (req, res) => {
  res.send('Backend using PostgreSQL is up and running!');
});

// Example API route (CRUD) - This is where you could integrate your Sequelize models
app.get('/users', async (req, res) => {
  // Assuming you have a User model (not created in this example)
  // const users = await User.findAll();
  res.json({ message: 'Fetch users functionality goes here.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
