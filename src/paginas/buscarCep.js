//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: buscarCep.js
// Descrição:
// Tela responsável por consultar um CEP utilizando
// a API pública ViaCEP.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";

import { buscarCep } from "../servicos/cep";

//=========================================================
// COMPONENTE PRINCIPAL
//=========================================================

export default function BuscarCep() {

    //=====================================================
    // ESTADOS
    //=====================================================

    const [cep, setCep] = useState("");

    const [endereco, setEndereco] = useState(null);

    const [carregando, setCarregando] = useState(false);

    //=====================================================
    // FUNÇÃO RESPONSÁVEL PELA CONSULTA
    //=====================================================

    async function consultarCep() {

        if (cep.length !== 8) {

            Alert.alert(
                "CEP inválido",
                "Informe um CEP com 8 números."
            );

            return;

        }

        setCarregando(true);

        const resultado = await buscarCep(cep);

        setCarregando(false);

        if (!resultado || resultado.erro) {

            Alert.alert(
                "CEP não encontrado",
                "Verifique o CEP informado."
            );

            setEndereco(null);

            return;

        }

        setEndereco(resultado);

    }

    //=====================================================
    // INTERFACE
    //=====================================================

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                🔍 Localizar Endereço
            </Text>

            <Text style={styles.subtitulo}>
                Informe o CEP para localizar o endereço.
            </Text>

            <TextInput

                style={styles.input}

                placeholder="Ex.: 74000000"

                keyboardType="numeric"

                maxLength={8}

                value={cep}

                onChangeText={setCep}

            />

            <TouchableOpacity

                style={[
                    styles.botao,
                    cep.length < 8 && styles.botaoDesabilitado
                ]}

                disabled={cep.length < 8 || carregando}

                onPress={consultarCep}

            >

                <Text style={styles.textoBotao}>

                    {carregando ? "⏳ Buscando..." : "🔍 Localizar Endereço"}

                </Text>

            </TouchableOpacity>

            {

                endereco && (

                    <View style={styles.card}>

                        <Text style={styles.tituloCard}>
                            ✅ Endereço Encontrado
                        </Text>

                        <Text style={styles.item}>
                            🏠 Rua
                        </Text>

                        <Text style={styles.valor}>
                            {endereco.logradouro}
                        </Text>

                        <Text style={styles.item}>
                            🏘 Bairro
                        </Text>

                        <Text style={styles.valor}>
                            {endereco.bairro}
                        </Text>

                        <Text style={styles.item}>
                            🏙 Cidade
                        </Text>

                        <Text style={styles.valor}>
                            {endereco.localidade}
                        </Text>

                        <Text style={styles.item}>
                            🌎 Estado
                        </Text>

                        <Text style={styles.valor}>
                            {endereco.uf}
                        </Text>

                    </View>

                )

            }

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

        padding: 20

    },

    titulo: {

        fontSize: 24,

        fontWeight: "bold",

        color: "#00897B",

        marginBottom: 8

    },

    subtitulo: {

        fontSize: 16,

        color: "#555",

        marginBottom: 25

    },

    input: {

        backgroundColor: "#FFFFFF",

        borderRadius: 10,

        padding: 15,

        fontSize: 16,

        borderWidth: 1,

        borderColor: "#DDD",

        marginBottom: 20

    },

    botao: {

        backgroundColor: "#2E6F40",

        padding: 16,

        borderRadius: 10,

        alignItems: "center"

    },

    botaoDesabilitado: {

        backgroundColor: "#C7D2CC"

    },

    textoBotao: {

        color: "#FFFFFF",

        fontWeight: "bold",

        fontSize: 16

    },

    card: {

        backgroundColor: "#FFFFFF",

        marginTop: 25,

        borderRadius: 14,

        padding: 18,

        elevation: 5

    },

    tituloCard: {

        fontSize: 20,

        fontWeight: "bold",

        color: "#00897B",

        marginBottom: 15

    },

    item: {

        fontWeight: "bold",

        marginTop: 10,

        color: "#555"

    },

    valor: {

        fontSize: 16,

        color: "#333"

    }

});