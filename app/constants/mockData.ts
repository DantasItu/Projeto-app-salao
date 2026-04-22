// 1. Usuários do Sistema (Roles: 'cliente', 'profissional', 'admin')
export const USUARIOS = [
  { id: "u1", nome: "Dantas Cliente", email: "cliente@teste.com", role: "cliente" },
  { id: "u2", nome: "Ricardo Oliveira", email: "ricardo@salao.com", role: "profissional", profissionalId: "p1" },
  { id: "u3", nome: "Ana Silva", email: "ana@salao.com", role: "profissional", profissionalId: "p2" },
  { id: "u4", nome: "Admin Geral", email: "admin@salao.com", role: "admin" },
  { id: "u5", nome: "Maria Souza", email: "maria@teste.com", role: "cliente" },
];

// 2. Catálogo de Serviços
export const SERVICOS = [
  { id: "s1", nome: "Corte de Cabelo Masculino", preco: 45.0, duracao: 30 },
  { id: "s2", nome: "Barba Completa", preco: 30.0, duracao: 30 },
  { id: "s3", nome: "Corte + Barba", preco: 70.0, duracao: 60 },
  { id: "s4", nome: "Sobrancelha", preco: 20.0, duracao: 30 },
  { id: "s5", nome: "Coloração", preco: 120.0, duracao: 90 },
  { id: "s6", nome: "Corte Feminino", preco: 80.0, duracao: 60 },
  { id: "s7", nome: "Escova", preco: 50.0, duracao: 30 },
  { id: "s8", nome: "Progressiva", preco: 250.0, duracao: 240 }, // 4 HORAS AQUI
];

// 2. Profissionais
export const PROFISSIONAIS = [
  { id: "p1", nome: "Ricardo Oliveira", especialidade: "Barbeiro Master", servicosIds: ["s1", "s2", "s3", "s4"] },
  { id: "p2", nome: "Ana Silva", especialidade: "Hair Stylist & Colorista", servicosIds: ["s4", "s5", "s6", "s7", "s8"] },
  { id: "p3", nome: "Julia Costa", especialidade: "Especialista em Cortes", servicosIds: ["s1", "s4", "s6", "s7", "s8"] },
];

// 3. Histórico de Agendamentos para Testes de Lotação
export const AGENDAMENTOS_EXISTENTES = [
  // --- ABRIL 2026 (Livre - Verde) ---
  { id: "a1", data: "2026-04-25", horario: "09:00", servicoId: "s1", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "a2", data: "2026-04-28", horario: "14:00", servicoId: "s8", profissionalId: "p2", clienteId: "u5", status: "confirmado" },

  // --- MAIO 2026 (ESGOTADO - Vermelho em 2026-05-15) ---
  // Profissional 1 (Ricardo) - Lotado o dia todo
  { id: "m1", data: "2026-05-15", horario: "09:00", servicoId: "s3", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "m2", data: "2026-05-15", horario: "10:00", servicoId: "s3", profissionalId: "p1", clienteId: "u5", status: "confirmado" },
  { id: "m3", data: "2026-05-15", horario: "11:00", servicoId: "s3", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "m4", data: "2026-05-15", horario: "13:00", servicoId: "s3", profissionalId: "p1", clienteId: "u5", status: "confirmado" },
  { id: "m5", data: "2026-05-15", horario: "14:00", servicoId: "s3", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "m6", data: "2026-05-15", horario: "15:00", servicoId: "s3", profissionalId: "p1", clienteId: "u5", status: "confirmado" },
  { id: "m7", data: "2026-05-15", horario: "16:00", servicoId: "s3", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "m8", data: "2026-05-15", horario: "17:00", servicoId: "s3", profissionalId: "p1", clienteId: "u5", status: "confirmado" },
  // Preenchendo o almoço do Ricardo para chegar a 100%
  { id: "m8a", data: "2026-05-15", horario: "12:00", servicoId: "s3", profissionalId: "p1", clienteId: "u5", status: "confirmado" },
  // Profissional 2 e 3 (Ana e Julia) - Ocupadas com Progressivas (4h cada)
  { id: "m9", data: "2026-05-15", horario: "09:00", servicoId: "s8", profissionalId: "p2", clienteId: "u5", status: "confirmado" },
  { id: "m10", data: "2026-05-15", horario: "14:00", servicoId: "s8", profissionalId: "p2", clienteId: "u1", status: "confirmado" },
  { id: "m11", data: "2026-05-15", horario: "09:00", servicoId: "s8", profissionalId: "p3", clienteId: "u5", status: "confirmado" },
  { id: "m12", data: "2026-05-15", horario: "14:00", servicoId: "s8", profissionalId: "p3", clienteId: "u1", status: "confirmado" },

  // --- JUNHO 2026 (LOTANDO - Laranja em 2026-06-10) ---
  { id: "j1", data: "2026-06-10", horario: "09:00", servicoId: "s8", profissionalId: "p2", clienteId: "u5", status: "confirmado" },
  { id: "j2", data: "2026-06-10", horario: "09:00", servicoId: "s8", profissionalId: "p3", clienteId: "u1", status: "confirmado" },
  { id: "j3", data: "2026-06-10", horario: "14:00", servicoId: "s6", profissionalId: "p2", clienteId: "u5", status: "confirmado" },
  { id: "j4", data: "2026-06-10", horario: "15:00", servicoId: "s6", profissionalId: "p3", clienteId: "u1", status: "confirmado" },

  // --- RESTO DO ANO (Livre - Verde) ---
  { id: "z1", data: "2026-08-20", horario: "10:00", servicoId: "s1", profissionalId: "p1", clienteId: "u1", status: "confirmado" },
  { id: "z2", data: "2026-10-10", horario: "16:00", servicoId: "s5", profissionalId: "p2", clienteId: "u5", status: "confirmado" },
  { id: "z3", data: "2026-12-20", horario: "09:30", servicoId: "s7", profissionalId: "p2", clienteId: "u1", status: "confirmado" },
];
