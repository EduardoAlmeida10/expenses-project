import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './database/db.js';
import expenseRoutes from './routes/expenses.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

const url = 'https://expenses-project-kappa.vercel.app'
//const url = 'http://localhost:3000';

app.use(
  cors({
    origin: url,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());

connectDatabase();

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});