import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View, Platform } from "react-native";

const API_URL = Platform.OS === 'android' ? 'http://192.168.1.22:3000' : 'http://localhost:3000';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const segments = useSegments();
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      
      if (token) {
        // Busca os dados REAIS no servidor para garantir segurança
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUserToken(token);
          setUserData(data);
        } else {
          // Token expirado ou inválido
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("userData");
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
    const naAreaCliente = allSegments.includes("(drawer)");
    const naAreaAdmin = allSegments.includes("(admin)");
    const naAreaProfissional = allSegments.includes("(profissional)");

    const timer = setTimeout(() => {
      if (!userToken && !inAuthGroup) {
        router.replace("/login");
        return;
      }

      if (userToken && userData) {
        if (userData.role === "cliente" && (naAreaAdmin || naAreaProfissional)) {
          Alert.alert("Acesso Negado", "Sem permissão para esta área.");
          router.replace("/(drawer)");
        }
        if (userData.role === "profissional" && naAreaAdmin) {
          Alert.alert("Acesso Negado", "Área restrita para administradores.");
          router.replace("/(profissional)");
        }
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
