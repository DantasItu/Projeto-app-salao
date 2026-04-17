import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { USUARIOS } from "../constants/mockData";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const segments = useSegments();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const idUsuario = await SecureStore.getItemAsync("userToken");
      if (idUsuario) {
        const dados = USUARIOS.find((u) => u.id === idUsuario);
        if (dados) {
          setUserToken(idUsuario);
          setUserData(dados);
        } else {
          setUserToken(null);
          setUserData(null);
        }
      } else {
        setUserToken(null);
        setUserData(null);
      }
    } catch (err) {
      console.error("Erro na autenticação", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [segments]);

  useEffect(() => {
    if (isLoading) return;

    const allSegments = segments as string[];
    const inAuthGroup = allSegments.includes("login");
    
    // Identifica as áreas pelo nome das pastas (grupos)
    const naAreaCliente = allSegments.includes("(drawer)");
    const naAreaAdmin = allSegments.includes("(admin)");
    const naAreaProfissional = allSegments.includes("(profissional)");

    const timer = setTimeout(() => {
      // 1. Se não está logado, só pode ver a tela de Login
      if (!userToken && !inAuthGroup) {
        router.replace("/login");
        return;
      }

      // 2. Se está logado, vamos conferir as permissões
      if (userToken && userData) {
        
        // Regra para Cliente: Se tentar entrar em Admin ou Profissional -> Bloqueia
        if (userData.role === "cliente" && (naAreaAdmin || naAreaProfissional)) {
          Alert.alert("Acesso Negado", "Você não tem permissão para acessar esta área.");
          router.replace("/(drawer)"); // Manda de volta para a Home dele
        }

        // Regra para Profissional: Se tentar entrar em Admin -> Bloqueia
        if (userData.role === "profissional" && naAreaAdmin) {
          Alert.alert("Acesso Negado", "Área restrita para administradores.");
          router.replace("/(profissional)"); // Manda para a Home dele (que criaremos)
        }

        // Se ele logar e cair no login, manda para a home certa de cada um
        if (inAuthGroup) {
          if (userData.role === "admin") router.replace("/(admin)");
          else if (userData.role === "profissional") router.replace("/(profissional)");
          else router.replace("/(drawer)");
        }
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [userToken, userData, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f582ae" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(profissional)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
