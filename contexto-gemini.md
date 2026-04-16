Status Atual
O projeto foi inicializado com React Native (Expo) e TypeScript, utilizando o Expo Router para navegação. Já temos o fluxo básico de autenticação funcionando.

🛠️ O que foi implementado:

1.  Configuração do Ambiente: Projeto limpo, removendo os templates de exemplo do Expo.
2.  Fluxo de Autenticação (Segurança):
    - Uso da biblioteca expo-secure-store para salvar tokens de acesso de forma criptografada no dispositivo.
    - O app verifica automaticamente se o usuário está "logado" ao abrir.
3.  Telas Criadas:
    - app/login.tsx: Tela de login com validação simples (admin@salao.com / 123456) e persistência de token.
    - app/index.tsx (Home): Tela principal protegida, com saudação e um botão de Logout funcional que limpa os dados seguros.
4.  Lógica de Roteamento (app/\_layout.tsx):
    - Implementação de um "porteiro" que redireciona usuários não autenticados para a tela de login e impede que usuários logados voltem para o login sem deslogar.

📁 Estrutura de Arquivos Relevante:

- /app/\_layout.tsx: Gerencia as rotas e a proteção de acesso.
- /app/login.tsx: Lógica de entrada e armazenamento de token.
- /app/index.tsx: Ponto de entrada do app após o login.

💡 Decisões de Arquitetura:

- Banco de Dados: Optamos por usar dados locais (JS mocks) temporariamente para focar na interface (UI/UX).
- Futuro Backend: Planejado um servidor próprio em Node.js com MongoDB rodando em um notebook antigo para gerenciar permissões e administração.

📅 Próximo Passo:

- Iniciar a construção do módulo de Agenda (visualização de horários e formulário de marcação).
