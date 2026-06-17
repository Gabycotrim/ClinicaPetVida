//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: listaPets.js
// Descrição:
// Tela responsável por listar os pets cadastrados
// consumindo a API Spring Boot.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

// Biblioteca React
import React, { useState, useCallback } from "react";
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

export default function ListaPets({ navigation }) {

    //=====================================================
    // ESTADOS
    //=====================================================

    // Armazena a lista de pets retornada pela API
    const [listaPets, setListaPets] = useState([]);

    //=====================================================
    // FUNÇÕES
    //=====================================================

    // Busca todos os pets cadastrados
    async function carregarPets() {

    try {

        const resposta = await api.get("/cpet");

        console.log("LISTA PETS:");
        console.log(JSON.stringify(resposta.data, null, 2));

        setListaPets(resposta.data);

    } catch (erro) {

        console.log("ERRO AO BUSCAR PETS");
        console.log(erro.response?.data);

    }

}

    //=====================================================
    // EFFECT
    //=====================================================

    // Executa a busca ao abrir a tela
    useFocusEffect(useCallback(() => {carregarPets();}, []));

    //=====================================================
    // EXCLUIR PET
    //=====================================================

    async function excluirPet(codigo) {

    Alert.alert(

        "Excluir",

        "Deseja realmente excluir este pet?",

        [

            {
                text: "Cancelar",
                style: "cancel"
            },

            {

                text: "Excluir",

                onPress: async () => {

                    try {

                        await api.delete("/cpet/" + codigo);

                        carregarPets();

                    } catch {

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
    // INTERFACE
    //=====================================================

    return (

        <View style={styles.container}>

        <TouchableOpacity style={styles.botaoNovo}
        onPress={() => navigation.navigate("NovoPet")}
        >

        <Text style={styles.textoBotaoNovo}>➕ Novo Pet</Text>
        
        </TouchableOpacity>

            <FlatList

                data={listaPets}

                keyExtractor={(item) => item.codigo.toString()}

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <Text style={styles.nome}>
                            🐶 {item.nome}
                        </Text>

                        <Text style={styles.informacao}>
                            📄 Prontuário: {item.prontuario}
                        </Text>

                        <Text style={styles.informacao}>
                            🐾 Espécie: {item.especie}
                        </Text>

                        <Text style={styles.informacao}>
                            🎂 Idade: {item.idade} anos
                        </Text>

                        <Text style={styles.informacao}>
                            💉 Vacinado: {item.vacinado ? "Sim" : "Não"}
                        </Text>

                        <Text style={styles.informacao}>
                            👤 Tutor: {item.tutor ? item.tutor.nome : "Sem tutor"}
                        </Text>

                        <View style={styles.linhaBotoes}>

                      <TouchableOpacity style={styles.botaoEditar}
                          onPress={() => navigation.navigate("NovoPet", {pet: item})}
                        >
                        <Text style={styles.textoBotao}>✏️ Alterar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.botaoExcluir}
                        onPress={() => excluirPet(item.codigo)}
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

    // Container principal
    container: {

        flex: 1,

        backgroundColor: "#F4F8F6",

        padding: 15

    },

    // Card de cada pet
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

    // Nome do pet
    nome: {

        fontSize: 22,

        fontWeight: "bold",

        color: "#2E6F40",

        marginBottom: 10

    },

    // Informações do pet
    informacao: {

        fontSize: 16,

        color: "#444",

        marginBottom: 5

    },

//=====================================================
// BOTÃO NOVO PET
//=====================================================

botaoNovo: {

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
// BOTÕES ALTERAR / EXCLUIR
//=====================================================

linhaBotoes: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 15

},

botaoEditar: {

    flex: 1,

    backgroundColor: "#1976D2",

    padding: 12,

    borderRadius: 10,

    marginRight: 8,

    alignItems: "center"

},

botaoExcluir: {

    flex: 1,

    backgroundColor: "#D32F2F",

    padding: 12,

    borderRadius: 10,

    marginLeft: 8,

    alignItems: "center"

},

textoBotao: {

    color: "#FFFFFF",

    fontWeight: "bold"

}

});