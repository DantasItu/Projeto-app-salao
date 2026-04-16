import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/theme";

// 1. Dados de exemplo (Mock) - Simulando o que viria de um banco de dados
const SERVICOS = [
  {
    id: "1",
    nome: "Corte de Cabelo Masculino",
    preco: "R$ 45,00",
    duracao: "30 min",
  },
  { id: "2", nome: "Barba Completa", preco: "R$ 30,00", duracao: "20 min" },
  { id: "3", nome: "Corte + Barba", preco: "R$ 70,00", duracao: "50 min" },
  { id: "4", nome: "Sobrancelha", preco: "R$ 20,00", duracao: "15 min" },
  { id: "5", nome: "Coloração", preco: "R$ 120,00", duracao: "60 min" },
];

export default function HomeScreen() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  // Função para sair (vamos deixar no menu depois)
  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await SecureStore.deleteItemAsync("userToken");
          router.replace("/login");
        },
      },
    ]);
  };

  // 2. Lógica para filtrar a lista conforme o que o usuário digita
  const servicosFiltrados = SERVICOS.filter((servico) =>
    servico.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* CABEÇALHO (Header) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => Alert.alert("Menu", "Em breve: Meus Agendamentos")}
        >
          <Ionicons name="menu" size={32} color={Colors.stroke} />
        </TouchableOpacity>

        <Text style={styles.title}>Salão Pro</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color={Colors.tertiary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>Olá! O que vamos fazer hoje?</Text>

      {/* BARRA DE BUSCA */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.background}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar serviço..."
          placeholderTextColor={Colors.background}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* LISTA DE SERVIÇOS */}
      <FlatList
        data={servicosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              Alert.alert("Agendamento", `Você selecionou: ${item.nome}`)
            }
          >
            <View>
              <Text style={styles.cardText}>{item.nome}</Text>
              <Text style={styles.cardDuration}>{item.duracao}</Text>
            </View>
            <Text style={styles.cardPrice}>{item.preco}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum serviço encontrado.</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.headline,
  },
  welcome: {
    fontSize: 18,
    color: Colors.paragraph,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.main,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    color: Colors.paragraph,
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.main,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.tertiary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Sombra para iOS
    shadowColor: Colors.stroke,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.headline,
  },
  cardDuration: {
    fontSize: 14,
    color: Colors.tertiary,
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    color: Colors.tertiary,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: Colors.paragraph,
    fontSize: 16,
  },
});
