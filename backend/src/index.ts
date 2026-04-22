import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import agendaRoutes from './routes/agendaRoutes';
import salonRoutes from './routes/salonRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/salon', salonRoutes);

app.get('/', (req, res) => {
  res.send('API do Salão de Beleza está rodando...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
