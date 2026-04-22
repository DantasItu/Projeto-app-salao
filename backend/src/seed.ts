import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Service from './models/Service';
import Professional from './models/Professional';
import Appointment from './models/Appointment';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Conectado para o seed (limpeza total)...');

    await User.deleteMany({});
    await Service.deleteMany({});
    await Professional.deleteMany({});
    await Appointment.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const senhaPadrao = await bcrypt.hash('123456', salt);

    // 1. Criar Serviços
    const s1 = await Service.create({ nome: "Corte de Cabelo Masculino", preco: 45.0, duracao: 30 });
    const s2 = await Service.create({ nome: "Barba Completa", preco: 30.0, duracao: 30 });
    const s3 = await Service.create({ nome: "Corte + Barba", preco: 70.0, duracao: 60 });
    const s4 = await Service.create({ nome: "Sobrancelha", preco: 20.0, duracao: 30 });
    const s5 = await Service.create({ nome: "Coloração", preco: 120.0, duracao: 90 });
    const s6 = await Service.create({ nome: "Corte Feminino", preco: 80.0, duracao: 60 });
    const s7 = await Service.create({ nome: "Escova", preco: 50.0, duracao: 30 });
    const s8 = await Service.create({ nome: "Progressiva", preco: 250.0, duracao: 240 });

    // 2. Criar Profissionais
    const p1 = await Professional.create({ 
      nome: "Ricardo Oliveira", 
      especialidade: "Barbeiro Master", 
      servicosIds: [s1._id.toString(), s2._id.toString(), s3._id.toString(), s4._id.toString()] 
    });
    const p2 = await Professional.create({ 
      nome: "Ana Silva", 
      especialidade: "Hair Stylist & Colorista", 
      servicosIds: [s4._id.toString(), s5._id.toString(), s6._id.toString(), s7._id.toString(), s8._id.toString()] 
    });
    const p3 = await Professional.create({ 
      nome: "Julia Costa", 
      especialidade: "Especialista em Cortes", 
      servicosIds: [s1._id.toString(), s4._id.toString(), s6._id.toString(), s7._id.toString(), s8._id.toString()] 
    });

    // 3. Criar Usuários
    const u1 = await User.create({ nome: "Dantas Cliente", email: "cliente@teste.com", senha: senhaPadrao, role: "cliente" });
    const u2 = await User.create({ nome: "Ricardo Oliveira", email: "ricardo@salao.com", senha: senhaPadrao, role: "profissional", profissionalId: p1._id.toString() });
    const u3 = await User.create({ nome: "Ana Silva", email: "ana@salao.com", senha: senhaPadrao, role: "profissional", profissionalId: p2._id.toString() });
    const u4 = await User.create({ nome: "Admin Geral", email: "admin@salao.com", senha: senhaPadrao, role: "admin" });
    const u5 = await User.create({ nome: "Maria Souza", email: "maria@teste.com", senha: senhaPadrao, role: "cliente" });

    // 4. Criar Agendamentos
    await Appointment.create({ 
      data: "2026-05-15", horario: "09:00", servicoId: s3._id.toString(), 
      profissionalId: p1._id.toString(), clienteId: u1._id as any, status: "confirmado" 
    });
    await Appointment.create({ 
      data: "2026-05-15", horario: "14:00", servicoId: s8._id.toString(), 
      profissionalId: p2._id.toString(), clienteId: u5._id as any, status: "confirmado" 
    });

    console.log('Banco de Dados populado com IDs aleatórios reais do MongoDB!');
    process.exit();
  } catch (error) {
    console.error('Erro no seed:', error);
    process.exit(1);
  }
};

seedData();
