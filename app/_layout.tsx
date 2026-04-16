import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  const segments = useSegments(); // Pega em qual tela o usuario se encontra.
  const Router = useRouter(); // Ferramenta de navegação entre as paginas.

  // 1.Função pra Checar se tem token.
  useEffect(() => {
    (checkToken(), []);
  });

  async function checkToken() {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
    } catch (err) {
      console.error("Erro ao localizar o token", err);
    } finally {
      setIsLoading(false); // avisa que terminou de procurar
    }
  }

  // 2. Logica de redirecionamento
  useEffect(() => {
    if (isLoading) return; // não faz nada se estiver carregando

    const inAuthGroup = segments[0] === "login"; //verifica se o usuario está na tela de login

    if (!userToken && !inAuthGroup) {
      // Se Não tem token nem está na pagina de login, retornar para o login
      Router.replace("/login");
    } else if (userToken && inAuthGroup) {
      // Se tiver token e tentar ir para pagina de login, retorna par a Home
      Router.replace("/");
    }
  }, [userToken, segments, isLoading]);

  // 3. Enquanto checa o token, mostra o incone de carregamento
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Início" }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
