import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const Router = useRouter();

  //   Função pra sair do login
  const handleLogount = async () => {
    await SecureStore.deleteItemAsync("userToken"); // isso limpa o token dos arquivos
    Router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salão Pro</Text>
      <Text>Gerenciamento de Agenda e Estoque</Text>
      <Button title="sair" onPress={handleLogount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
