import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Service from '../models/Service';
import Professional from '../models/Professional';
import User from '../models/User';

// Função auxiliar para calcular fim do serviço
const getEndTime = (start: string, duration: number) => {
  const [h, m] = start.split(':').map(Number);
  const totalMinutes = h * 60 + m + duration;
  const endH = Math.floor(totalMinutes / 60);
  const endM = totalMinutes % 60;
  return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
};

const timeToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// @desc    Obter resumo de ocupação do mês (Cores)
export const getResumoMes = async (req: Request, res: Response) => {
  const { mes } = req.query;
  try {
    const startOfMonth = `${mes}-01`;
    const endOfMonth = `${mes}-31`;
    const appointments = await Appointment.find({ data: { $gte: startOfMonth, $lte: endOfMonth }, status: { $ne: 'cancelado' } });
    const services = await Service.find();
    const professionals = await Professional.find();
    const totalSlotsPerDay = 19 * professionals.length;

    const ocupacaoPorData: { [key: string]: number } = {};
    appointments.forEach(app => {
      const service = services.find(s => s._id.toString() === app.servicoId.toString());
      const slots = Math.ceil((service?.duracao || 30) / 30);
      ocupacaoPorData[app.data] = (ocupacaoPorData[app.data] || 0) + slots;
    });

    const resumo: { [key: string]: string } = {};
    Object.keys(ocupacaoPorData).forEach(data => {
      const slotsOcupados = ocupacaoPorData[data];
      if (slotsOcupados >= totalSlotsPerDay * 0.9) resumo[data] = 'vermelho';
      else if (slotsOcupados >= totalSlotsPerDay / 2) resumo[data] = 'laranja';
      else resumo[data] = 'verde';
    });
    res.json(resumo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar resumo' });
  }
};

// @desc    Obter profissionais disponíveis para um horário específico
// @route   GET /api/agenda/disponibilidade?data=YYYY-MM-DD&horario=HH:mm
export const getDisponibilidadeProfissionais = async (req: Request, res: Response) => {
  const { data, horario } = req.query as any;

  try {
    const professionals = await Professional.find().lean();
    const appointments = await Appointment.find({ data, status: { $ne: 'cancelado' } });
    const services = await Service.find();

    const result = professionals.map(prof => {
      // Verifica se o profissional tem algum agendamento que cubra esse horário
      const ocupado = appointments.some(app => {
        if (app.profissionalId !== prof._id.toString()) return false;
        
        const start = timeToMinutes(app.horario);
        const service = services.find(s => s._id.toString() === app.servicoId.toString());
        const duration = service?.duracao || 30;
        const end = start + duration;
        const target = timeToMinutes(horario);

        // Um profissional está ocupado se o horário clicado estiver entre o início e o fim de um agendamento
        return target >= start && target < end;
      });

      return {
        ...prof,
        disponivel: !ocupado
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar disponibilidade' });
  }
};

// @desc    Criar novo agendamento
// @route   POST /api/agenda/agendar
export const createAppointment = async (req: any, res: Response) => {
  const { data, horario, servicoId, profissionalId } = req.body;
  const clienteId = req.user._id;

  try {
    const newApp = await Appointment.create({
      data,
      horario,
      servicoId,
      profissionalId,
      clienteId,
      status: 'pendente'
    });
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar agendamento' });
  }
};

export const getAgendamentos = async (req: any, res: Response) => {
  const { data, mes } = req.query;
  const { _id, role, profissionalId } = req.user;

  try {
    let query: any = { status: { $ne: 'cancelado' } };
    if (data) query.data = data;
    else if (mes) query.data = { $regex: `^${mes}` };

    if (role === 'cliente') query.clienteId = _id;
    else if (role === 'profissional') query.profissionalId = profissionalId;

    const appointments = await Appointment.find(query).lean();
    const services = await Service.find();
    const professionals = await Professional.find();
    const users = await User.find().select('nome');

    const formatados = appointments.map(app => ({
      ...app,
      servicoNome: services.find(s => s._id.toString() === app.servicoId)?.nome || 'Serviço',
      servicoDuracao: services.find(s => s._id.toString() === app.servicoId)?.duracao || 30,
      profissionalNome: professionals.find(p => p._id.toString() === app.profissionalId)?.nome || 'Profissional',
      clienteNome: users.find(u => u._id.toString() === app.clienteId.toString())?.nome || 'Cliente'
    }));

    res.json(formatados);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos' });
  }
};
