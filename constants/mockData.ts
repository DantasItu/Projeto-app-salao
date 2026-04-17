// 1. Usuários do Sistema (Roles: 'cliente', 'profissional', 'admin')
export const USUARIOS = [
  {
    id: "u1",
    nome: "Dantas Cliente",
    email: "cliente@teste.com",
    role: "cliente",
  },
  {
    id: "u2",
    nome: "Ricardo Oliveira",
    email: "ricardo@salao.com",
    role: "profissional",
    profissionalId: "p1", // Vinculo com a tabela de profissionais
  },
  {
    id: "u3",
    nome: "Ana Silva",
    email: "ana@salao.com",
    role: "profissional",
    profissionalId: "p2",
  },
  {
    id: "u4",
    nome: "Admin Geral",
    email: "admin@salao.com",
    role: "admin",
  },
];

// 2. Catálogo de Serviços...
export const SERVICOS = [
  { id: "s1", nome: "Corte de Cabelo Masculino", preco: 45.0, duracao: 30 },
  { id: "s2", nome: "Barba Completa", preco: 30.0, duracao: 20 },
  { id: "s3", nome: "Corte + Barba", preco: 70.0, duracao: 50 },
  { id: "s4", nome: "Sobrancelha", preco: 20.0, duracao: 15 },
  { id: "s5", nome: "Coloração", preco: 120.0, duracao: 60 },
  { id: "s6", nome: "Corte Feminino", preco: 80.0, duracao: 45 },
  { id: "s7", nome: "Escova", preco: 50.0, duracao: 30 },
  { id: "s8", nome: "Progressiva Cabelo Curto", preco: 150.0, duracao: 120 },
];

// 2. Profissionais e os Serviços que cada um está habilitado a fazer
export const PROFISSIONAIS = [
  {
    id: "p1",
    nome: "Ricardo Oliveira",
    especialidade: "Barbeiro Master",
    servicosIds: ["s1", "s2", "s3", "s4"], // Ricardo faz barba e corte masculino
  },
  {
    id: "p2",
    nome: "Ana Silva",
    especialidade: "Hair Stylist & Colorista",
    servicosIds: ["s4", "s5", "s6", "s7", "s8"], // Ana faz feminino e coloração
  },
  {
    id: "p3",
    nome: "Julia Costa",
    especialidade: "Especialista em Cortes",
    servicosIds: ["s1", "s4", "s6"], // Julia também faz corte masculino e sobrancelha
  },
];

// 3. Histórico de Agendamentos (Usando apenas IDs para referenciar dados)
export const AGENDAMENTOS_EXISTENTES = [
  // Abril 2026
  {
    id: "a1",
    data: "2026-04-18",
    servicoId: "s1",
    profissionalId: "p1",
    status: "confirmado",
  },
  {
    id: "a2",
    data: "2026-04-20",
    servicoId: "s6",
    profissionalId: "p2",
    status: "concluido",
  },

  // Maio 2026
  {
    id: "a3",
    data: "2026-05-05",
    servicoId: "s3",
    profissionalId: "p1",
    status: "confirmado",
  },
  {
    id: "a4",
    data: "2026-05-12",
    servicoId: "s5",
    profissionalId: "p2",
    status: "confirmado",
  },

  // Junho 2026
  {
    id: "a5",
    data: "2026-06-10",
    servicoId: "s2",
    profissionalId: "p1",
    status: "pendente",
  },
  {
    id: "a6",
    data: "2026-06-15",
    servicoId: "s7",
    profissionalId: "p2",
    status: "confirmado",
  },
];
