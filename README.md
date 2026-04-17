============================================================
           DOCUMENTAÇÃO DO PROJETO: SALÃO PRO
============================================================

Este documento resume o progresso do desenvolvimento, a estrutura
do aplicativo e as decisões técnicas tomadas até agora.

1. ESTRUTURA DE PASTAS (ROTEAMENTO AVANÇADO)
------------------------------------
O projeto utiliza Grupos do Expo Router para separar as áreas por permissão:

app/
  ├── _layout.tsx         -> O "Gatekeeper" (Porteiro): Monitora autenticação e redireciona por Role.
  ├── login.tsx           -> Autenticação consultando dados do MockData.
  ├── (drawer)/           -> ÁREA DO CLIENTE (Menu lateral, Agendamentos, Home).
  ├── (admin)/            -> ÁREA DO ADMIN (Gestão de profissionais).
  └── (profissional)/     -> ÁREA DO PROFISSIONAL (Agenda e histórico de serviços prestados).

constants/
  ├── theme.ts            -> Centralização de cores e identidade visual.
  └── mockData.ts         -> "Banco de Dados" temporário com IDs únicos e relacionamentos.

2. O QUE FOI FEITO (EVOLUÇÃO DO PROJETO)
----------------------------------
A. SISTEMA DE USUÁRIOS E SEGURANÇA (RBAC):
- Implementação de Role-Based Access Control (Controle de acesso por papel).
- Criação de usuários com tipos: 'cliente', 'profissional' e 'admin'.
- Solução de segurança: O celular salva apenas o ID (Token). O app consulta o Role na "API" (MockData) a cada troca de rota.
- Bloqueio de rotas: Se um cliente tenta entrar na área de admin, o app detecta e bloqueia automaticamente.

B. BANCO DE DADOS MOCK (MOCKDATA.TS):
- Uso de IDs únicos para Serviços (s1, s2...), Profissionais (p1, p2...) e Usuários.
- Preços e durações salvos como NUMBER. Conversão para texto (R$ 0,00 e min) feita apenas na exibição.
- Vínculo entre Profissionais e Serviços (Relacionamento muitos-para-muitos).

C. CALENDÁRIO INTERATIVO:
- Instalação e configuração da 'react-native-calendars'.
- Tradução completa para Português (LocaleConfig).
- Seleção de datas com feedback visual usando as cores do tema.

D. ÁREAS ESPECÍFICAS:
- Home Admin: Listagem dinâmica de profissionais.
- Home Profissional: Filtro inteligente que mostra apenas os serviços prestados pelo profissional logado.

3. SOLUÇÕES DE ERROS (KNOWLEDGE BASE)
----------------------------
- SINCRONIA DE LOGIN/LOGOUT: Resolvido usando `segments` como dependência no useEffect do Root Layout. Isso força a re-verificação da autenticação sempre que o usuário tenta mudar de tela.
- ERROS DE TYPESCRIPT (SEGMENTS): Uso de Casting `(segments as string[])` para evitar erros de leitura no VS Code quando o array de rotas está vazio.
- CONFLITO DE NAVEGAÇÃO: Adição de um pequeno `setTimeout` no redirecionamento do Root Layout para garantir que o Router esteja pronto antes de disparar o `replace`.

4. PALETA DE CORES (THEME)
--------------------------
- Background: #fef6e4 (Creme Limpo)
- Headline: #001858 (Azul Profundo)
- Paragraph: #172c66
- Button: #f582ae (Rosa Destaque)
- Main/Highlight: #f3d2c1 (Pêssego)
- Secondary: #8bd3dd (Azul Tiffany)

5. PRÓXIMOS OBJETIVOS
------------------------------------
- Implementar o fluxo de criação de agendamento (Escolher data -> Escolher Profissional -> Escolher Serviço).
- Estilizar o histórico de agendamentos do cliente.
- Criar a visualização de faturamento para o administrador.

------------------------------------------------------------
Documento atualizado em 17/04/2026.
============================================================
