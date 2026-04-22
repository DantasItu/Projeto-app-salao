import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AGENDAMENTOS_EXISTENTES, SERVICOS, USUARIOS } from "../../constants/mockData";
import { Colors } from "../../constants/theme";

export default function ProfissionalHome() {
  const router = useRouter();
  const [meuHistorico, setMeuHistorico] = useState<any[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const userId = await SecureStore.getItemAsync("userToken");
    const usuario = USUARIOS.find(u => u.id === userId);
    
    if (usuario?.profissionalId) {
      // Filtra os agendamentos que pertencem a este profissional
      const historico = AGENDAMENTOS_EXISTENTES.filter(a => a.profissionalId === usuario.profissionalId);
      setMeuHistorico(historico);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/login");
  };

  const getNomeServico = (id: string) => SERVICOS.find(s => s.id === id)?.nome || "Serviço";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minha Agenda</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color={Colors.tertiary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Histórico de Serviços</Text>

      <FlatList
        data={meuHistorico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.date}>{item.data}</Text>
              <Text style={styles.service}>{getNomeServico(item.servicoId)}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.status === 'concluido' ? '#4caf50' : Colors.tertiary }]}>
              <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum serviço registrado.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: Colors.headline },
  subtitle: { fontSize: 18, color: Colors.paragraph, marginBottom: 20 },
  list: { paddingBottom: 20 },
  card: { 
    backgroundColor: Colors.main, 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.tertiary
  },
  date: { fontSize: 12, color: Colors.paragraph, marginBottom: 4 },
  service: { fontSize: 16, fontWeight: "bold", color: Colors.headline },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  empty: { textAlign: "center", color: Colors.paragraph, marginTop: 40 }
});
