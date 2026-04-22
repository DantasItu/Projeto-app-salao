# Salão Pro - Sistema de Agendamento Profissional

Este é um ecossistema completo para gestão de salões de beleza, composto por um aplicativo mobile moderno e um backend robusto com banco de dados em nuvem.

## 🚀 Estrutura do Projeto

O projeto foi organizado em um modelo de monorepo para facilitar o desenvolvimento:

-   **/app**: Aplicativo mobile desenvolvido com **React Native (Expo)** e **Expo Router**.
-   **/backend**: Servidor de API desenvolvido com **Node.js**, **TypeScript** e **MongoDB**.

---

## 🛠 Tecnologias Utilizadas

### Frontend (Mobile)
-   **React Native / Expo**: Framework principal.
-   **Expo Router**: Navegação baseada em arquivos e proteção de rotas por Roles.
-   **Expo SecureStore**: Armazenamento seguro de Tokens JWT.
-   **React Native Calendars**: Customizado para exibir disponibilidade e feriados.

### Backend (Servidor)
-   **Node.js & Express**: Motor do servidor.
-   **TypeScript**: Tipagem estática para maior segurança e robustez.
-   **MongoDB Atlas**: Banco de Dados NoSQL em nuvem.
-   **Mongoose**: Modelagem de dados e integração com o banco.
-   **JWT (JSON Web Token)**: Autenticação segura e assinada.
-   **BcryptJS**: Criptografia de senhas (hashing).

---

## 🔐 Segurança e Regras de Negócio

### Autenticação & Autorização
-   **Token "Cego"**: O Token JWT carrega apenas o `_id` do usuário. Informações sensíveis como Nome, Email e Role são recuperadas pelo servidor através da rota `/api/auth/profile` a cada validação, garantindo a integridade dos dados.
-   **Middleware de Proteção**: Rotas sensíveis são protegidas por um interceptador que valida a assinatura do Token antes de processar qualquer requisição.
-   **Níveis de Acesso (Roles)**:
    -   **Cliente**: Vê apenas seus agendamentos detalhados; outros slots aparecem apenas como "Ocupado".
    -   **Profissional**: Visualiza apenas sua própria agenda de atendimentos.
    -   **Admin**: Visão total de todos os agendamentos e profissionais.

### Inteligência da Agenda
-   **Ocupação Dinâmica**: O calendário calcula automaticamente as cores dos dias (Verde, Laranja, Vermelho) com base no volume de agendamentos vs. capacidade total dos profissionais.
-   **Gestão de Duração**: O sistema respeita a duração de cada serviço (ex: Progressiva de 4 horas ocupa múltiplos slots de 30min automaticamente).
-   **Feriados Automáticos**: Integração com a **Brasil API** para exibir feriados nacionais em vermelho no calendário em tempo real.

---

## 🏃 Como Rodar o Projeto

### 1. Configurar o Backend
```bash
cd backend
npm install
# Certifique-se de que o arquivo .env contém a string de conexão do MongoDB
npm run dev
```

### 2. Configurar o App (Frontend)
```bash
cd app
npm install
npx expo start
```
*Nota: O app está configurado para conectar ao IP local da máquina (`192.168.1.22`) para permitir testes em dispositivos físicos no mesmo Wi-Fi.*

---

## 📌 Histórico de Evolução
1.  Estruturação da interface de login e navegação (Drawer).
2.  Implementação do calendário inteligente com lógica de slots.
3.  Migração do MockData para o MongoDB Atlas.
4.  Criação do Backend com TypeScript e segurança JWT.
5.  Otimização visual do calendário (Feriados, Círculos de agendamento e Status).
