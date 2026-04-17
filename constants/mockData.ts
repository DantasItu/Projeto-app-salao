// 1. Catálogo de Serviços (A "Fonte da Verdade" para preços e nomes)
export const SERVICOS = [
  { id: "s1", nome: "Corte de Cabelo Masculino", preco: 45.0, duracao: 30 },
  { id: "s2", nome: "Barba Completa", preco: 30.0, duracao: 20 },
  { id: "s3", nome: "Corte + Barba", preco: 70.0, duracao: 50 },
  { id: "s4", nome: "Sobrancelha", preco: 20.0, duracao: 15 },
  { id: "s5", nome: "Coloração", preco: 120.0, duracao: 60 },
  { id: "s6", nome: "Corte Feminino", preco: 80.0, duracao: 45 },
  { id: "s7", nome: "Escova", preco: 50.0, duracao: 30 },
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
    servicosIds: ["s4", "s5", "s6", "s7"], // Ana faz feminino e coloração
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
  { id: "a1", data: "2026-04-18", servicoId: "s1", profissionalId: "p1", status: "confirmado" },
  { id: "a2", data: "2026-04-20", servicoId: "s6", profissionalId: "p2", status: "concluido" },
  
  // Maio 2026
  { id: "a3", data: "2026-05-05", servicoId: "s3", profissionalId: "p1", status: "confirmado" },
  { id: "a4", data: "2026-05-12", servicoId: "s5", profissionalId: "p2", status: "confirmado" },
  
  // Junho 2026
  { id: "a5", data: "2026-06-10", servicoId: "s2", profissionalId: "p1", status: "pendente" },
  { id: "a6", data: "2026-06-15", servicoId: "s7", profissionalId: "p2", status: "confirmado" },
];
