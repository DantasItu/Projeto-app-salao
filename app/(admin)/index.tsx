import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PROFISSIONAIS } from "../../constants/mockData";
import { Colors } from "../../constants/theme";

export default function AdminHome() {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel Admin</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color={Colors.tertiary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Gerenciar Profissionais</Text>

      <FlatList
        data={PROFISSIONAIS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.nome.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.spec}>{item.especialidade}</Text>
            </View>
          </View>
        )}
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
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.tertiary
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: Colors.tertiary, 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 15 
  },
  avatarText: { color: Colors.buttonText, fontWeight: "bold", fontSize: 20 },
  name: { fontSize: 16, fontWeight: "bold", color: Colors.headline },
  spec: { fontSize: 14, color: Colors.paragraph },
});
