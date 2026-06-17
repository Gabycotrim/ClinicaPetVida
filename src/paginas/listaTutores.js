//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: listaTutores.js
// Descrição:
// Tela responsável por listar todos os tutores
// cadastrados consumindo a API Spring Boot.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

// Biblioteca React
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

// Componentes do React Native
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";

// Serviço responsável pela comunicação com a API
import api from "../servicos/api";

//=========================================================
// COMPONENTE PRINCIPAL
//=========================================================

export default function ListaTutores({ navigation }) {

    //=====================================================
    // ESTADOS
    //=====================================================

    // Armazena a lista de tutores retornada pela API
    const [listaTutores, setListaTutores] = useState([]);

    //=====================================================
    // FUNÇÕES
    //=====================================================

    // Busca todos os tutores cadastrados
    async function carregarTutores() {

        try {

            const resposta = await api.get("/ctutor");

            setListaTutores(resposta.data);

        } catch (erro) {

            console.log("Erro ao buscar os tutores:", erro);

        }

    }

    //=====================================================
    // EXCLUIR TUTOR
    //=====================================================

    function excluirTutor(codigo) {

      Alert.alert(

        "Excluir Tutor",

        "Deseja realmente excluir este tutor?",

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

                        await api.delete("/ctutor/" + codigo);

                        carregarTutores();

                        Alert.alert(
                            "Sucesso",
                            "Tutor excluído com sucesso."
                        );

                    } catch (erro) {

                        Alert.alert(
                            "Erro",
                            "Não foi possível excluir."
                        );

                    }

                }

            }

        ]

    );

}

    //=====================================================
    // EFFECT
    //=====================================================

   useFocusEffect(
    React.useCallback(() => {

        carregarTutores();

      }, [])
  );

    //=====================================================
    // INTERFACE
    //=====================================================

    return (

        <View style={styles.container}>

          {/*=====================================================
            BOTÃO NOVO TUTOR
          ======================================================*/}

          <TouchableOpacity
            style={styles.botaoNovo}
            onPress={() => navigation.navigate("NovoTutor")}
          >

          <Text style={styles.textoBotaoNovo}>➕ Novo Tutor</Text>

          </TouchableOpacity>

            <FlatList

                data={listaTutores}

                keyExtractor={(item) => item.codigo.toString()}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Text style={styles.nome}>
                            👤 {item.nome}
                        </Text>

                        <Text style={styles.informacao}>
                            🪪 CPF: {item.cpf}
                        </Text>

                        <Text style={styles.informacao}>
                            🎂 Idade: {item.idade} anos
                        </Text>

                        <Text style={styles.informacao}>
                            ⭐ Convênio: {item.possuiConvenio ? "Sim" : "Não"}
                        </Text>

                        <Text style={styles.informacao}>
                            📅 Cadastro: {new Date(item.dataCadastro).toLocaleDateString("pt-BR")}
                        </Text>

                        <View style={styles.linhaBotoes}>
                        <TouchableOpacity style={styles.botaoAlterar}
                        onPress={() =>navigation.navigate("NovoTutor", {
                          tutor: item
                        })
                      }

>
                        <Text style={styles.textoBotaoAcao}>✏ Alterar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoExcluir}
                          onPress={() => excluirTutor(item.codigo)}
                          >
                        <Text style={styles.textoBotaoAcao}>🗑 Excluir</Text>
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

    nome: {

        fontSize: 22,

        fontWeight: "bold",

        color: "#1565C0",

        marginBottom: 10

    },

    informacao: {

        fontSize: 16,

        color: "#444",

        marginBottom: 5

    },

    //=====================================================
    // BOTÃO NOVO TUTOR
    //=====================================================

botaoNovo:{

    backgroundColor: "#2E6F40",

    padding: 15,

    borderRadius: 12,

    marginBottom: 18,

    alignItems: "center",

    elevation: 4

},

textoBotaoNovo: {

    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "bold"

},

//=====================================================
// BOTÕES DE AÇÃO
//=====================================================

linhaBotoes:{

    flexDirection:"row",

    justifyContent:"space-between",

    marginTop:15

},

botaoAlterar:{

    backgroundColor:"#F9A825",

    flex:1,

    padding:10,

    marginRight:5,

    borderRadius:8,

    alignItems:"center"

},

botaoExcluir:{

    backgroundColor:"#C62828",

    flex:1,

    padding:10,

    marginLeft:5,

    borderRadius:8,

    alignItems:"center"

},

textoBotaoAcao:{

    color:"#FFF",

    fontWeight:"bold"

}

});