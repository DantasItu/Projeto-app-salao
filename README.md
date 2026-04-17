============================================================
           DOCUMENTAÇÃO DO PROJETO: SALÃO PRO
============================================================

Este documento resume o progresso do desenvolvimento, a estrutura
do aplicativo e as decisões técnicas tomadas até agora.

1. ESTRUTURA DE PASTAS (EXPO ROUTER)
------------------------------------
O projeto utiliza o sistema de rotas baseado em arquivos:

app/
  ├── _layout.tsx         -> O "Porteiro" (Verifica login e protege rotas)
  ├── login.tsx           -> Tela de entrada
  └── (drawer)/           -> Grupo de telas que possuem o menu lateral
       ├── _layout.tsx    -> Configuração visual do Menu Lateral (Drawer)
       ├── index.tsx      -> Tela Principal (Home do Cliente)
       └── agendamentos.tsx -> Tela de histórico de agendamentos

constants/
  └── theme.ts            -> Centralização de cores e estilos

2. O QUE FOI FEITO (PASSO A PASSO)
----------------------------------
A. SETUP E SEGURANÇA:
- Inicialização com Expo e TypeScript.
- Instalação do 'expo-secure-store' para salvar o token de login.
- Configuração do Root Layout (_layout.tsx) para redirecionar o usuário:
  - Sem Token -> Vai para /login
  - Com Token -> Vai para / (Home)

B. INTERFACE E DESIGN:
- Criação de uma paleta de cores personalizada (constants/theme.ts).
- Home do Cliente customizada com:
  - Cabeçalho (Header) feito do zero.
  - Barra de busca com filtro em tempo real usando .filter().
  - Lista de serviços usando FlatList (mais eficiente para memória).
  - Cards com sombras e design profissional.

C. NAVEGAÇÃO PROFISSIONAL (DRAWER):
- Instalação das bibliotecas nativas:
  - @react-navigation/drawer
  - react-native-gesture-handler
  - react-native-reanimated
- Criação do arquivo babel.config.js para ativar as animações.
- Configuração do Drawer Layout para esconder o cabeçalho padrão e usar o nosso.

3. CONFIGURAÇÕES IMPORTANTES
----------------------------
- ARQUIVO babel.config.js: Essencial para o menu lateral funcionar.
- LIMPEZA DE CACHE: Sempre que o app der erro de "Syntax" após mexer em arquivos de configuração, use:
  > npx expo start -c

4. PALETA DE CORES (THEME)
--------------------------
- Fundo: #fef6e4
- Títulos: #001858
- Textos: #172c66
- Botões: #f582ae
- Detalhes (Cards/Busca): #f3d2c1 e #8bd3dd

5. PRÓXIMOS OBJETIVOS (ONDE PARAMOS)
------------------------------------
- Finalizar a tela de 'Meus Agendamentos'.
- Mover a função de 'Sair' para dentro do menu lateral.
- Criar o formulário de marcação de horário.

------------------------------------------------------------
Documento gerado em 16/04/2026 para fins de estudo e continuidade.
============================================================
