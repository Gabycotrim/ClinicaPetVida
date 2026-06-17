//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: listaConsultas.js
// Descrição:
// Tela responsável por listar todas as consultas
// cadastradas consumindo a API Spring Boot.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

// Biblioteca React
import React, { useEffect, useState } from "react";

// Componentes do React Native
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    TouchableOpacity
} from "react-native";

// Serviço responsável pela comunicação com a API
import api from "../servicos/api";

//=========================================================
// COMPONENTE PRINCIPAL
//=========================================================

export default function ListaConsultas({ navigation }) {

    //=====================================================
    // ESTADOS
    //=====================================================

    // Armazena a lista de consultas
    const [listaConsultas, setListaConsultas] = useState([]);

    //=====================================================
    // FUNÇÕES
    //=====================================================

    // Busca todas as consultas cadastradas
    async function carregarConsultas() {

        try {

            const resposta = await api.get("/cconsulta");

            setListaConsultas(resposta.data);

        } catch (erro) {

            console.log("Erro ao buscar consultas:", erro);

        }

    }
    
//=====================================================
// EXCLUIR CONSULTA
//=====================================================

async function excluirConsulta(codigo) {

    Alert.alert(
        "Confirmar exclusão",
        "Tem certeza que deseja excluir esta consulta?",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {

                    try {

                        await api.delete("/cconsulta/" + codigo);

                        Alert.alert("Sucesso", "Consulta excluída com sucesso!");

                        carregarConsultas();

                    } catch (erro) {

                        console.log("STATUS:", erro.response?.status);
                        console.log("DADOS:", erro.response?.data);
                        console.log("ERRO:", erro.message);

                        Alert.alert("Erro", "Não foi possível excluir a consulta.");

                    }

                }
            }
        ]
    );

}

    //=====================================================
    // EFFECT
    //=====================================================

    useEffect(() => {

        carregarConsultas();

    }, []);

    //=====================================================
    // INTERFACE
    //=====================================================

    return (

        <View style={styles.container}>

        <TouchableOpacity
            style={styles.botaoNovo}
            onPress={() => navigation.navigate("NovaConsulta")}
        >

        <Text style={styles.textoBotaoNovo}>➕ Nova Consulta</Text>

</TouchableOpacity>
            <FlatList

                data={listaConsultas}

                keyExtractor={(item) => item.codigo.toString()}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Text style={styles.nomePet}>
                            🐶 {item.pet?.nome}
                        </Text>

                        <Text style={styles.nomeTutor}>
                            👤 Tutor: {item.pet?.tutor?.nome}
                        </Text>

                        <Text style={styles.titulo}>
                            🩺 Consulta
                        </Text>

                        <Text style={styles.informacao}>
                            📅 Data: {new Date(item.dataConsulta).toLocaleDateString("pt-BR")}
                        </Text>

                        <Text style={styles.informacao}>
                            💲 Valor: R$ {Number(item.valorConsulta).toFixed(2)}
                        </Text>

                        <Text style={styles.informacao}>
                            💊 Tratamento: {item.quantidadeDiasTratamento} dias
                        </Text>

                        <Text style={styles.informacao}>
                            🔄 Retorno: {item.retorno ? "Sim" : "Não"}
                        </Text>

                        <Text style={styles.prontuarioTitulo}>
                            📄 Prontuário
                        </Text>

                        <Text style={styles.prontuario}>
                            {item.prontuario}
                        </Text>

                        <View style={styles.linhaBotoes}>

                        <TouchableOpacity
                            style={styles.botaoAlterar}
                            onPress={() =>navigation.navigate("NovaConsulta", { consulta: item })
                            }
                        >

                        <Text style={styles.textoBotao}>✏️ Alterar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoExcluir}
                            onPress={() => excluirConsulta(item.codigo)}
                        >

                        <Text style={styles.textoBotao}> 🗑 Excluir</Text>

                        </TouchableOpacity>

                        </View>

                    </View>

                )}

            />

        </View>

    );

}

//=========================================================
// ESTILOS
//=========================================================

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#F4F8F6",

        padding: 15

    },

    card: {

        backgroundColor: "#FFFFFF",

        padding: 18,

        marginBottom: 18,

        borderRadius: 14,

        elevation: 5,

        shadowColor: "#000",

        shadowOpacity: 0.15,

        shadowRadius: 6,

        shadowOffset: {

            width: 0,

            height: 3

        }

    },

    titulo: {

        fontSize: 22,

        fontWeight: "bold",

        color: "#EF6C00",

        marginBottom: 10

    },

    nomePet: {

    fontSize: 20,

    fontWeight: "bold",

    color: "#2E6F40",

    marginBottom: 4

    },

    nomeTutor: {

    fontSize: 16,

    color: "#1565C0",

    marginBottom: 12

    },

    informacao: {

        fontSize: 16,

        color: "#444",

        marginBottom: 5

    },

    prontuarioTitulo: {

        marginTop: 10,

        fontWeight: "bold",

        fontSize: 16,

        color: "#444"

    },

    prontuario: {

        marginTop: 5,

        fontSize: 15,

        color: "#666"

    },

    botaoNovo: {
        backgroundColor:"#2E6F40",
        padding:15,
        borderRadius:12,
        marginBottom:18,
        alignItems:"center",
        elevation:4
    },

    textoBotaoNovo: {
        color:"#FFFFFF",
        fontSize:18,
        fontWeight:"bold"
    },

    botaoAlterar: {
        backgroundColor:"#1976D2",
        padding:12,
        borderRadius:10,
        alignItems:"center",
        flex:1,
        marginRight:8
    },

    textoBotao: {
        color:"#FFFFFF",
        fontSize:16,
        fontWeight:"bold"
    },

    linhaBotoes: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:15
    },

    botaoExcluir: {
        backgroundColor:"#D32F2F",
        padding:12,
        borderRadius:10,
        alignItems:"center",
        flex:1,
        marginLeft:8
    }


});