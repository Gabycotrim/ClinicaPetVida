//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: novoTutor.js
// Descrição:
// Tela responsável pelo cadastro de novos tutores.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

import React, { useState } from "react";
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

export default function NovoTutor({ navigation, route }) {
    //=====================================================
    // ESTADOS
    //=====================================================

    const tutor = route.params?.tutor;

    const [nome, setNome] = useState(tutor?.nome || "");
    const [cpf, setCpf] = useState(tutor?.cpf || "");
    const [idade, setIdade] = useState(tutor?.idade?.toString() || "");
    const [cep, setCep] = useState("");
    
    // Endereço retornado pelo ViaCEP
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [numero, setNumero] = useState("");

    // Indica se o imóvel possui ou não numeração
    const [semNumero, setSemNumero] = useState(false);

    const [quadra, setQuadra] = useState("");
    const [lote, setLote] = useState("");
    const [complemento, setComplemento] = useState("");

    const [possuiConvenio, setPossuiConvenio] = useState(tutor?.possuiConvenio || false);

    

    //=====================================================
    // BUSCAR CEP
    //=====================================================

async function buscarCep() {

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const endereco = await resposta.json();

        if (endereco.erro) {

            Alert.alert(
                "CEP não encontrado."
            );

            return;

        }

        setRua(endereco.logradouro);

        setBairro(endereco.bairro);

        setCidade(endereco.localidade);

        setEstado(endereco.uf);

    }

    catch {

        Alert.alert(
            "Erro ao consultar o CEP."
        );

    }

}

   //=====================================================
// SALVAR TUTOR
//=====================================================

async function salvarTutor() {

    try {

        const tutorObjeto = {
            nome,
            cpf,
            idade: Number(idade),
            possuiConvenio,
            dataCadastro: new Date()
        };

        if (tutor) {

            await api.put(
                "/ctutor/" + tutor.codigo,
                tutorObjeto
            );

        } else {

            await api.post(
                "/ctutor",
                tutorObjeto
            );

        }

        Alert.alert(
            "Sucesso",
            tutor
                ? "Tutor atualizado com sucesso!"
                : "Tutor cadastrado com sucesso!"
        );

        navigation.goBack();

    } catch (erro) {

        console.log(erro);

        Alert.alert(
            "Erro",
            "Não foi possível salvar."
        );

    }

}
    //=====================================================
    // INTERFACE
    //=====================================================

    return(

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.titulo}>
                👤 Novo Tutor
            </Text>

            <Text style={styles.subtitulo}>
                Cadastre o responsável pelo pet.
            </Text>

            <Text style={styles.secao}>
                📄 Dados do Tutor
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
            />

            <TextInput
                style={styles.input}
                placeholder="Idade"
                keyboardType="numeric"
                value={idade}
                onChangeText={setIdade}
            />

            <Text style={styles.secao}>
                📍 Localização
            </Text>

            <TextInput
                style={styles.input}
                placeholder="CEP"
                keyboardType="numeric"
                maxLength={8}
                value={cep}
                onChangeText={setCep}
            />

            <TouchableOpacity

                style={styles.botaoBuscar}
                onPress={buscarCep}
                >

                <Text style={styles.textoBotao}>
                    🔍 Localizar Endereço
                </Text>

            {
                rua !== "" && (

                    <View style={styles.cardEndereco}>
                    <Text style={styles.tituloEndereco}>✅ Endereço localizado</Text>
                    <Text>🏠 {rua}</Text>
                    <Text>🏘 {bairro}</Text>
                    <Text>🏙 {cidade}</Text>
                    <Text>🌎 {estado}</Text>
                </View>

                )
            }

            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
                editable={!semNumero}
            />

            <View style={styles.linhaSwitch}>
            <Text style={styles.textoSwitch}>🏠 Imóvel sem numeração</Text>
            
            <Switch
                value={semNumero}
                onValueChange={(valor) => {
                    setSemNumero(valor);

                    if (valor) {
                        setNumero("S/N");

                    } else {
                        setNumero("");
                    }
                    }}
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Quadra"
                value={quadra}
                onChangeText={setQuadra}
            />

            <TextInput
                style={styles.input}
                placeholder="Lote"
                value={lote}
                onChangeText={setLote}
            />

            <TextInput
                style={styles.input}
                placeholder="Complemento"
                value={complemento}
                onChangeText={setComplemento}
            />

            <View style={styles.linha}>

                <Text style={styles.switchTexto}>
                    💚 Possui Convênio
                </Text>

                <Switch
                    value={possuiConvenio}
                    onValueChange={setPossuiConvenio}
                />

            </View>

            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarTutor}
            >

                <Text style={styles.textoBotao}>
                    {tutor ? "✏️ Atualizar Tutor" : "💾 Salvar Tutor"}
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );
}
//=========================================================
// ESTILOS
//=========================================================

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
        marginBottom:10,
        marginTop:10
    },

    input:{
        backgroundColor:"#FFF",
        borderRadius:10,
        padding:15,
        marginBottom:12,
        borderWidth:1,
        borderColor:"#DDD"
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

    botaoBuscar:{
        backgroundColor:"#1976D2",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginBottom:20
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
    },

    cardEndereco:{

    backgroundColor:"#E8F5E9",

    padding:15,

    borderRadius:10,

    marginBottom:20,

    borderWidth:1,

    borderColor:"#81C784"

},

tituloEndereco:{

    fontWeight:"bold",

    fontSize:16,

    marginBottom:10,

    color:"#2E7D32"

},

linhaSwitch: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 15

},

textoSwitch: {

    fontSize: 16,

    color: "#444"

}

});
