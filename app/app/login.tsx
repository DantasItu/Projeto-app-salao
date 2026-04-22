import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import { Colors } from "../constants/theme";

// Endereço do backend usando o IP local da sua máquina
const API_URL = 'http://192.168.1.22:3000';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Aviso", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o objeto do usuário completo para o layout usar
        await SecureStore.setItemAsync("userToken", data.token);
        await SecureStore.setItemAsync("userData", JSON.stringify(data));
        
        Router.replace("/");
      } else {
        Alert.alert("Erro", data.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salão Pro</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={Colors.main}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Colors.main}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: Colors.background },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 40, textAlign: "center", color: Colors.headline },
  input: { borderWidth: 1, borderColor: Colors.main, color: Colors.paragraph, padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: Colors.button, padding: 15, borderRadius: 10, alignItems: "center", height: 55, justifyContent: 'center' },
  buttonText: { color: Colors.buttonText, fontWeight: "bold", fontSize: 16 },
});
