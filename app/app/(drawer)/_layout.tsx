import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Colors } from "../../constants/theme";

export default function DraweLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // Esconde o Header padrão
        drawerActiveTintColor: Colors.tertiary,
        drawerInactiveTintColor: Colors.headline,
        drawerStyle: {
          backgroundColor: Colors.background,
          width: 250,
        },
      }}
    >
      {/* Aqui definimos as telas que aparecem no menu */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Início",
          title: "Salão Pro",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Menu Agendamentos */}
      <Drawer.Screen
        name="agendamentos"
        options={{
          drawerLabel: "Meus Agendamentos",
          title: "Agendamentos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
