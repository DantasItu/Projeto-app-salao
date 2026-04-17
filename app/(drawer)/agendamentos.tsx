import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Colors } from "../../constants/theme";

// Configurar o calendario para Pt-Br
LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function AgendamentosScreen() {
  const [dataSelecionada, setDataSelecionada] = useState("");

  return (
    <ScrollView style={style.container}>
      <Text style={style.titler}>Meus Agendamentos</Text>

      {/* O Calendario */}
      <Calendar
        style={style.calendar}
        // Quando o cliente Clicar no dia
        onDayPress={(day) => {
          setDataSelecionada(day.dateString);
        }}
        // Marca o dia Selecionado
        markedDates={{
          [dataSelecionada]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.tertiary,
          },
        }}
        theme={{
          backgroundColor: Colors.background,
          calendarBackground: Colors.background,
          textSectionTitleColor: Colors.headline,
          selectedDayBackgroundColor: Colors.tertiary,
          selectedDayTextColor: Colors.buttonText,
          todayTextColor: Colors.tertiary,
          dayTextColor: Colors.paragraph,
          arrowColor: Colors.tertiary,
          monthTextColor: Colors.headline,
        }}
      />

      <View style={style.content}>
        {dataSelecionada ? (
          <Text style={style.infoText}>
            {" "}
            Você selecionou o dia: {dataSelecionada}
          </Text>
        ) : (
          <Text style={style.infoText}> Selecione uma data para agendar</Text>
        )}
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titler: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.headline,
    padding: 20,
    marginTop: 30,
    textAlign: "center",
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.main,
    marginBottom: 10,
  },
  content: {
    padding: 20,
  },
  infoText: {
    color: Colors.paragraph,
    fontSize: 16,
    textAlign: "center",
  },
});
