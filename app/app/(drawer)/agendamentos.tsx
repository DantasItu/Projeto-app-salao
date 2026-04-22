import React, { useState, useMemo, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../../constants/theme";

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

const API_URL = "http://192.168.1.22:3000";

const timeToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export default function AgendamentosScreen() {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [mesVisualizado, setMesVisualizado] = useState(
    new Date().toISOString().substring(0, 7),
  );
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [feriados, setFeriados] = useState<{ [key: string]: string }>({});
  const [resumoMes, setResumoMes] = useState<{ [key: string]: string }>({});
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [servicosCatalogo, setServicosCatalogo] = useState<any[]>([]);

  // Estados para o novo fluxo de agendamento
  const [modalVisible, setModalModalVisible] = useState(false);
  const [loadingAcoes, setLoadingAcoes] = useState(false);
  const [profsDisponiveis, setProfsDisponiveis] = useState<any[]>([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [etapa, setEtapa] = useState<"prof" | "serv">("prof");
  const [profEscolhido, setProfEscolhido] = useState<any>(null);

  const hoje = new Date().toISOString().split("T")[0];

  const carregarDados = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const savedData = await SecureStore.getItemAsync("userData");
      if (savedData) setCurrentUser(JSON.parse(savedData));

      const ano = mesVisualizado.substring(0, 4);
      const resF = await fetch(
        `https://brasilapi.com.br/api/feriados/v1/${ano}`,
      );
      const dataF = await resF.json();
      if (Array.isArray(dataF)) {
        const mapF: any = {};
        dataF.forEach((f: any) => {
          mapF[f.date] = f.name;
        });
        setFeriados(mapF);
      }

      const resR = await fetch(
        `${API_URL}/api/agenda/resumo?mes=${mesVisualizado}`,
      );
      setResumoMes(await resR.json());

      const resA = await fetch(
        `${API_URL}/api/agenda/agendamentos?mes=${mesVisualizado}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAgendamentos(await resA.json());

      const resS = await fetch(`${API_URL}/api/agenda/servicos`);
      setServicosCatalogo(await resS.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [mesVisualizado]);

  // Função para abrir o fluxo de agendamento
  const abrirFluxoAgendamento = async (horario: string) => {
    if (currentUser?.role !== "cliente") return;

    setLoadingAcoes(true);
    setHorarioSelecionado(horario);
    setEtapa("prof");

    try {
      const token = await SecureStore.getItemAsync("userToken");
      const res = await fetch(
        `${API_URL}/api/agenda/disponibilidade?data=${dataSelecionada}&horario=${horario}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      setProfsDisponiveis(data);
      setModalModalVisible(true);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar profissionais.");
    } finally {
      setLoadingAcoes(false);
    }
  };

  const confirmarAgendamento = async (servico: any) => {
    setLoadingAcoes(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const res = await fetch(`${API_URL}/api/agenda/agendar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: dataSelecionada,
          horario: horarioSelecionado,
          servicoId: servico._id,
          profissionalId: profEscolhido._id,
        }),
      });

      if (res.ok) {
        Alert.alert(
          "Sucesso!",
          "Seu agendamento foi enviado e aguarda confirmação do profissional.",
        );
        setModalModalVisible(false);
        carregarDados(); // Recarrega para mostrar o novo agendamento
      }
    } catch (err) {
      Alert.alert("Erro", "Falha ao salvar agendamento.");
    } finally {
      setLoadingAcoes(false);
    }
  };

  const marcacoes = useMemo(() => {
    const marked: any = {};
    const [ano, mes] = mesVisualizado.split("-").map(Number);
    const ultimoDiaMes = new Date(ano, mes, 0).getDate();
    for (let d = 1; d <= ultimoDiaMes; d++) {
      const dataStr = `${ano}-${mes.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
      if (dataStr < hoje) continue;
      const feriadoNome = feriados[dataStr];
      const statusOcupacao = resumoMes[dataStr];
      const isSelected = dataStr === dataSelecionada;
      const temAgendamentoMeu = agendamentos.some((a) => a.data === dataStr);
      let corStatus = "#2ecc71";
      if (statusOcupacao === "vermelho") corStatus = "#e74c3c";
      else if (statusOcupacao === "laranja") corStatus = "#f39c12";
      marked[dataStr] = {
        customStyles: {
          container: {
            backgroundColor: isSelected ? Colors.tertiary : "transparent",
            borderWidth: temAgendamentoMeu ? 2 : 0,
            borderColor: Colors.tertiary,
            borderRadius: 20,
            borderBottomWidth: isSelected ? 0 : 4,
            borderBottomColor: isSelected ? Colors.tertiary : corStatus,
          },
          text: {
            color: feriadoNome
              ? "#e74c3c"
              : isSelected
                ? "#FFF"
                : temAgendamentoMeu
                  ? Colors.tertiary
                  : Colors.headline,
            fontWeight:
              feriadoNome || temAgendamentoMeu || isSelected
                ? "bold"
                : "normal",
          },
        },
      };
    }
    return marked;
  }, [dataSelecionada, feriados, mesVisualizado, resumoMes, agendamentos]);

  const horariosDetalhados = useMemo(() => {
    const slots = [];
    let currentHour = 9;
    let currentMin = 0;
    while (currentHour < 18 || (currentHour === 18 && currentMin === 0)) {
      const timeStr = `${currentHour.toString().padStart(2, "0")}:${currentMin.toString().padStart(2, "0")}`;
      const slotInMinutes = timeToMinutes(timeStr);
      const agendamentoAqui = agendamentos.find((a) => {
        if (a.data !== dataSelecionada) return false;
        const start = timeToMinutes(a.horario);
        const end = start + (a.servicoDuracao || 30);
        return slotInMinutes >= start && slotInMinutes < end;
      });
      slots.push({
        id: timeStr,
        horario: timeStr,
        ocupado: !!agendamentoAqui,
        detalhes: agendamentoAqui,
        isStart: agendamentoAqui?.horario === timeStr,
      });
      currentMin += 30;
      if (currentMin === 60) {
        currentMin = 0;
        currentHour++;
      }
    }
    return slots;
  }, [dataSelecionada, agendamentos]);

  if (isLoading)
    return (
      <View style={[style.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Colors.tertiary} />
      </View>
    );

  return (
    <View style={style.container}>
      <ScrollView>
        <Text style={style.titler}>Agenda: {currentUser?.nome}</Text>
        <Calendar
          style={style.calendar}
          minDate={hoje}
          onDayPress={(day) => setDataSelecionada(day.dateString)}
          onMonthChange={(month) => {
            setMesVisualizado(month.dateString.substring(0, 7));
            setDataSelecionada("");
          }}
          markedDates={marcacoes}
          markingType={"custom"}
          showSixWeeks={true}
          theme={{
            calendarBackground: Colors.background,
            textSectionTitleColor: Colors.headline,
            todayTextColor: Colors.tertiary,
            dayTextColor: Colors.paragraph,
            textDisabledColor: "#d9e1e8",
            arrowColor: Colors.tertiary,
            monthTextColor: Colors.headline,
          }}
        />

        <View style={style.legend}>
          <View style={style.legendItem}>
            <View style={[style.statusLine, { backgroundColor: "#2ecc71" }]} />
            <Text style={style.legendText}>Livre</Text>
          </View>
          <View style={style.legendItem}>
            <View style={[style.statusLine, { backgroundColor: "#f39c12" }]} />
            <Text style={style.legendText}>Lotando</Text>
          </View>
          <View style={style.legendItem}>
            <View style={[style.statusLine, { backgroundColor: "#e74c3c" }]} />
            <Text style={style.legendText}>Cheio</Text>
          </View>
        </View>

        <View style={style.content}>
          {dataSelecionada ? (
            <>
              <View style={style.headerRow}>
                <View>
                  <Text style={style.subtitle}>
                    Horários para {dataSelecionada}
                  </Text>
                  {feriados[dataSelecionada] && (
                    <Text style={style.feriadoLabel}>
                      🚩 {feriados[dataSelecionada]}
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => setDataSelecionada("")}>
                  <Text style={{ color: Colors.tertiary, fontWeight: "bold" }}>
                    Ver Resumo
                  </Text>
                </TouchableOpacity>
              </View>
              {horariosDetalhados.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[style.slotCard, item.ocupado && style.slotCardBusy]}
                  onPress={() =>
                    !item.ocupado && abrirFluxoAgendamento(item.horario)
                  }
                >
                  <Text
                    style={[style.slotTime, item.ocupado && style.whiteText]}
                  >
                    {item.horario}
                  </Text>
                  <View style={style.slotStatus}>
                    {!item.ocupado ? (
                      <Text style={style.statusLivre}>
                        Livre (Clique para Agendar)
                      </Text>
                    ) : (
                      <View>
                        <Text style={[style.statusOcupado, style.whiteText]}>
                          {item.isStart ? "Ocupado" : "Em andamento..."}
                        </Text>
                        {item.isStart && (
                          <Text style={style.slotDetail}>
                            {item.detalhes.servicoNome} -{" "}
                            {item.detalhes.profissionalNome}{" "}
                            {currentUser?.role !== "cliente" &&
                              ` - ${item.detalhes.clienteNome}`}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <Text style={style.subtitle}>
                Seus Agendamentos: {mesVisualizado}
              </Text>
              {agendamentos.length > 0 ? (
                agendamentos.map((a) => (
                  <TouchableOpacity
                    key={a._id}
                    style={[style.slotCard, style.slotCardBusy]}
                    onPress={() => setDataSelecionada(a.data)}
                  >
                    <View style={{ marginRight: 15, alignItems: "center" }}>
                      <Text
                        style={[
                          style.slotTime,
                          style.whiteText,
                          { fontSize: 14, width: "auto" },
                        ]}
                      >
                        {a.data.split("-")[2]}/{a.data.split("-")[1]}
                      </Text>
                      <Text style={[style.whiteText, { fontSize: 12 }]}>
                        {a.horario}
                      </Text>
                    </View>
                    <View style={style.slotStatus}>
                      <Text style={[style.whiteText, { fontWeight: "bold" }]}>
                        {a.servicoNome}
                      </Text>
                      <Text style={style.slotDetail}>
                        {a.profissionalNome} ({a.status})
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={style.infoText}>
                  Nenhum agendamento encontrado.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* MODAL DE AGENDAMENTO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>
              {etapa === "prof"
                ? "Escolha o Profissional"
                : "Escolha o Serviço"}
            </Text>
            <Text style={style.modalSubtitle}>
              {dataSelecionada} às {horarioSelecionado}
            </Text>

            {loadingAcoes ? (
              <ActivityIndicator size="large" color={Colors.tertiary} />
            ) : (
              <FlatList
                data={
                  etapa === "prof"
                    ? profsDisponiveis
                    : servicosCatalogo.filter((s) =>
                        profEscolhido.servicosIds.includes(s._id),
                      )
                }
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={style.modalItem}
                    onPress={() => {
                      if (etapa === "prof") {
                        setProfEscolhido(item);
                        setEtapa("serv");
                      } else {
                        confirmarAgendamento(item);
                      }
                    }}
                  >
                    <Text style={style.modalItemText}>{item.nome}</Text>
                    {etapa === "serv" && (
                      <Text style={style.modalItemSub}>
                        {item.duracao} min - R$ {item.preco.toFixed(2)}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity
              style={style.closeButton}
              onPress={() => setModalModalVisible(false)}
            >
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  titler: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.headline,
    padding: 20,
    marginTop: 30,
    textAlign: "center",
  },
  subtitle: { fontSize: 18, fontWeight: "bold", color: Colors.headline },
  feriadoLabel: {
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.main,
    marginBottom: 10,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 4,
  },
  statusLine: { width: 12, height: 4, marginRight: 5, borderRadius: 2 },
  legendText: { fontSize: 12, color: Colors.paragraph },
  content: { padding: 20 },
  infoText: {
    color: Colors.paragraph,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  slotCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.main,
  },
  slotCardBusy: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.tertiary,
  },
  slotTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.headline,
    marginRight: 20,
    width: 60,
  },
  whiteText: { color: "#FFF" },
  slotStatus: { flex: 1 },
  statusLivre: { color: "#2ecc71", fontWeight: "bold" },
  statusOcupado: { color: "#FFF", fontWeight: "bold" },
  slotDetail: { fontSize: 12, color: "#FFF", marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.headline,
    marginBottom: 5,
  },
  modalSubtitle: { fontSize: 14, color: Colors.paragraph, marginBottom: 20 },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  modalItemText: { fontSize: 16, fontWeight: "bold", color: Colors.headline },
  modalItemSub: { fontSize: 12, color: Colors.paragraph },
  closeButton: {
    backgroundColor: Colors.paragraph,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
