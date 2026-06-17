//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: novoConsulta.js
// Descrição:
// Tela responsável pelo cadastro e alteração de consultas.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import api from "../servicos/api";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
    Alert
} from "react-native";

//=========================================================
// COMPONENTE PRINCIPAL
//=========================================================

export default function NovoConsulta({ navigation, route }) {

//=====================================================
// ESTADOS
//=====================================================

const consulta = route.params?.consulta;

//-----------------------------------------------------
// PET
//-----------------------------------------------------

const [listaPets, setListaPets] = useState([]);

const [petSelecionado, setPetSelecionado] = useState(
    consulta?.pet ?? null
);

//-----------------------------------------------------
// CONSULTA
//-----------------------------------------------------

const [dataConsulta, setDataConsulta] = useState(

    consulta?.dataConsulta
        ? new Date(consulta.dataConsulta).toLocaleDateString("pt-BR")
        : ""

);

const [valorConsulta, setValorConsulta] = useState(

    consulta?.valorConsulta?.toString() || ""

);

const [quantidadeDiasTratamento, setQuantidadeDiasTratamento] = useState(

    consulta?.quantidadeDiasTratamento?.toString() || ""

);

const [retorno, setRetorno] = useState(

    consulta?.retorno || false

);

//-----------------------------------------------------
// EVOLUÇÃO CLÍNICA
//-----------------------------------------------------

// No banco continua sendo "prontuario".
// Para o usuário representa as anotações da consulta.

const [prontuario, setProntuario] = useState(

    consulta?.prontuario || ""

);

//=====================================================
// CARREGAR PETS
//=====================================================

async function carregarPets() {

    try {

        const resposta = await api.get("/cpet");

        console.log("PETS:");
        console.log(resposta.data);

        setListaPets(resposta.data);

    } catch (erro) {

        console.log("ERRO AO CARREGAR PETS");
        console.log(erro.response?.data);
        console.log(erro.message);

        Alert.alert(
            "Erro",
            "Não foi possível carregar os pets."
        );

    }

}

//=====================================================
// FORMATAR DATA
//=====================================================

function formatarData(texto) {

    let valor = texto.replace(/\D/g, "");

    if (valor.length > 8) {

        valor = valor.substring(0, 8);

    }

    if (valor.length > 4) {

        valor =
            valor.substring(0, 2) + "/" +
            valor.substring(2, 4) + "/" +
            valor.substring(4);

    } else if (valor.length > 2) {

        valor =
            valor.substring(0, 2) + "/" +
            valor.substring(2);

    }

    setDataConsulta(valor);

}

//=====================================================
// SALVAR CONSULTA
//=====================================================

async function salvarConsulta() {


    //-------------------------------------------------
    // VALIDAÇÕES
    //-------------------------------------------------

    if (!petSelecionado) {

        Alert.alert(
            "Atenção",
            "Selecione um pet."
        );

        return;

    }

    if (!dataConsulta) {

        Alert.alert(
            "Atenção",
            "Informe a data da consulta."
        );

        return;

    }

    if (!valorConsulta) {

        Alert.alert(
            "Atenção",
            "Informe o valor da consulta."
        );

        return;

    }

    if (!quantidadeDiasTratamento) {

        Alert.alert(
            "Atenção",
            "Informe a quantidade de dias de tratamento."
        );

        return;

    }

    if (!prontuario.trim()) {

        Alert.alert(
            "Atenção",
            "Descreva a evolução clínica."
        );

        return;

    }

    //-------------------------------------------------
    // MONTA O OBJETO
    //-------------------------------------------------

    const dataBanco =
        dataConsulta.split("/").reverse().join("-");

    const consultaObjeto = {

        prontuario,

        quantidadeDiasTratamento:
            Number(quantidadeDiasTratamento),

        retorno,

        dataConsulta: dataBanco,

        valorConsulta:
            Number(valorConsulta),

        pet: {

            codigo: petSelecionado.codigo

        }

    };

    console.log(
        JSON.stringify(
            consultaObjeto,
            null,
            2
        )
    );

    //-------------------------------------------------
    // SALVAR
    //-------------------------------------------------

    try {

        if (consulta) {

            await api.put(

                "/cconsulta/" + consulta.codigo,

                consultaObjeto

            );

        } else {

            await api.post(

                "/cconsulta",

                consultaObjeto

            );

        }

        Alert.alert(

            "Sucesso",

            consulta
                ? "Consulta atualizada com sucesso!"
                : "Consulta cadastrada com sucesso!"

        );

        navigation.goBack();

    } catch (erro) {

    console.log("STATUS:", erro.response?.status);

    console.log("DADOS:", erro.response?.data);

    console.log("ERRO:", erro.message);

    Alert.alert(
        "Erro",
        JSON.stringify(erro.response?.data)
    );

}

}

//=====================================================
// EFFECT
//=====================================================

useEffect(() => {

    console.log(
        "ABRIU A TELA NOVA CONSULTA"
    );

    carregarPets();

}, []);

return (

    <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
    >

        {/*=====================================================
            CABEÇALHO
        =====================================================*/}

        <Text style={styles.titulo}>
            {consulta ? "✏️ Alterar Consulta" : "🩺 Nova Consulta"}
        </Text>

        <Text style={styles.subtitulo}>
            Registre o atendimento realizado ao paciente.
        </Text>

        {/*=====================================================
            PACIENTE
        =====================================================*/}

        <Text style={styles.secao}>🐶 Paciente</Text>

        <View style={styles.picker}>

            <Picker
                selectedValue={petSelecionado?.codigo ?? null}
                onValueChange={(codigo) => {

                    const pet = listaPets.find(
                        (item) => item.codigo === codigo
                    );

                    setPetSelecionado(pet);

                }}
            >

                <Picker.Item
                    label="Selecione um paciente"
                    value={null}
                />

                {listaPets.map((pet) => (

                    <Picker.Item
                        key={pet.codigo}
                        label={`${pet.nome} - ${pet.tutor?.nome}`}
                        value={pet.codigo}
                    />

                ))}

            </Picker>

        </View>

        {/*=====================================================
            FICHA DO PACIENTE
        =====================================================*/}

        {petSelecionado && (

            <View style={styles.cardPet}>

                <Text style={styles.tituloCard}>
                    🐶 FICHA DO PACIENTE
                </Text>

                <Text style={styles.infoPet}>
                    📄 Prontuário: {petSelecionado.prontuario}
                </Text>

                <Text style={styles.infoPet}>
                    🐶 Nome: {petSelecionado.nome}
                </Text>

                <Text style={styles.infoPet}>
                    👤 Tutor: {petSelecionado.tutor?.nome}
                </Text>

                <Text style={styles.infoPet}>
                    🐾 Espécie: {petSelecionado.especie}
                </Text>

                <Text style={styles.infoPet}>
                    🎂 Idade: {petSelecionado.idade} anos
                </Text>

            </View>

        )}

        {/*=====================================================
            DADOS DA CONSULTA
        =====================================================*/}

        <Text style={styles.secao}>
            📅 Dados da Consulta
        </Text>

        <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={dataConsulta}
            onChangeText={formatarData}
        />

        <TextInput
            style={styles.input}
            placeholder="Valor da consulta"
            keyboardType="numeric"
            value={valorConsulta}
            onChangeText={setValorConsulta}
        />

        <TextInput
            style={styles.input}
            placeholder="Quantidade de dias do tratamento"
            keyboardType="numeric"
            value={quantidadeDiasTratamento}
            onChangeText={setQuantidadeDiasTratamento}
        />

        <View style={styles.linha}>

            <Text style={styles.switchTexto}>
                🔄 Terá retorno?
            </Text>

            <Switch
                value={retorno}
                onValueChange={setRetorno}
            />

        </View>

        {/*=====================================================
            EVOLUÇÃO CLÍNICA
        =====================================================*/}

        <Text style={styles.secao}>
            📝 Evolução Clínica
        </Text>

        <TextInput
            style={[
                styles.input,
                {
                    height:120,
                    textAlignVertical:"top"
                }
            ]}
            multiline
            placeholder="Descreva a evolução clínica do paciente..."
            value={prontuario}
            onChangeText={setProntuario}
        />

        {/*=====================================================
            BOTÃO SALVAR
        =====================================================*/}

        <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvarConsulta}
        >

            <Text style={styles.textoBotao}>

                {
                    consulta
                        ? "🩺 Atualizar Consulta"
                        : "💾 Salvar Consulta"
                }

            </Text>

        </TouchableOpacity>

          </ScrollView>

);
}  

//=====================================================
// ESTILOS
//=====================================================

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#F4F8F6",
        padding:20
    },

    titulo:{
        fontSize:28,
        fontWeight:"bold",
        color:"#2E6F40",
        marginTop:10
    },

    subtitulo:{
        fontSize:15,
        color:"#666",
        marginBottom:25
    },

    secao:{
        fontSize:18,
        fontWeight:"bold",
        color:"#2E6F40",
        marginTop:15,
        marginBottom:10
    },

    input:{
        backgroundColor:"#FFF",
        borderRadius:10,
        padding:15,
        marginBottom:12,
        borderWidth:1,
        borderColor:"#DDD"
    },

    picker:{
        backgroundColor:"#FFF",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#DDD",
        marginBottom:15
    },

    cardPet:{
        backgroundColor:"#EAF7EE",
        padding:15,
        borderRadius:10,
        marginBottom:20
    },

    tituloCard:{
        fontSize:18,
        fontWeight:"bold",
        color:"#2E6F40",
        marginBottom:10,
        textAlign:"center"
    },

    infoPet:{
        fontSize:16,
        color:"#2E6F40",
        marginBottom:5
    },

    linha:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:20
    },

    switchTexto:{
        fontSize:16,
        fontWeight:"bold"
    },

    botaoSalvar:{
        backgroundColor:"#2E6F40",
        padding:18,
        borderRadius:10,
        alignItems:"center",
        marginBottom:40
    },

    textoBotao:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:17
    }

});
