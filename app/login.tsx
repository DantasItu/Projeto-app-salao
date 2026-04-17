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
} from "react-native";
import { USUARIOS } from "../constants/mockData";
import { Colors } from "../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();

  const handleLogin = async () => {
    // Encontra o usuario pelo email digitado
    const usuarioEncontrado = USUARIOS.find(
      (u) => u.email === email.toLowerCase(),
    );

    // Verifica a senha, por enquanto vai ser 1234
    if (usuarioEncontrado && password === "1234") {
      //Gerar o token
      await SecureStore.setItemAsync("userToken", usuarioEncontrado.id);
      Router.replace("/");
    } else {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
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
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Colors.main}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: Colors.headline,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.main,
    color: Colors.paragraph,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.button,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: Colors.buttonText, fontWeight: "bold", fontSize: 16 },
});
