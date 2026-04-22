import express from 'express';
import { getResumoMes, getAgendamentos, getDisponibilidadeProfissionais, createAppointment } from '../controllers/agendaController';
import { getServices } from '../controllers/salonController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/resumo', getResumoMes);
router.get('/agendamentos', protect, getAgendamentos);
router.get('/disponibilidade', protect, getDisponibilidadeProfissionais);
router.get('/servicos', getServices); // Busca o catálogo de serviços
router.post('/agendar', protect, createAppointment);

export default router;
