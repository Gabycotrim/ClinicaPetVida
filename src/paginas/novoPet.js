//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: novoPet.js
// Descrição:
// Tela responsável pelo cadastro de novos pets.
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

export default function NovoPet({ navigation, route }) {
    //=====================================================
    // ESTADOS
    //=====================================================

    const pet = route.params?.pet;

    
    const [nome, setNome] = useState(pet?.nome || "");
    const [especie, setEspecie] = useState(pet?.especie || "");
    const [dataNascimento, setDataNascimento] = useState(pet?.dataNascimento ? pet.dataNascimento.split("-").reverse().join("/") : "");
    const [idade, setIdade] = useState(pet?.idade?.toString() || "");
    const [vacinado, setVacinado] = useState(pet?.vacinado || false);
    const [listaTutores, setListaTutores] = useState([]);
    const [tutorSelecionado, setTutorSelecionado] = useState(pet?.tutor?.codigo ?? null);
    
    //=====================================================
    // CARREGAR TUTORES
    //=====================================================

async function carregarTutores() {

    try {

        const resposta = await api.get("/ctutor");

        console.log("TUTORES:");
        console.log(resposta.data);

        setListaTutores(resposta.data);

    } catch (erro) {

        console.log("ERRO AO CARREGAR TUTORES");
        console.log(erro.response?.data);
        console.log(erro.message);

        Alert.alert(
            "Erro",
            "Não foi possível carregar os tutores."
        );

    }

}

    //=====================================================
    // SALVAR PET
    //=====================================================

    function formatarData(texto) {

    let valor = texto.replace(/\D/g, "");

    if (valor.length > 8) {
        valor = valor.substring(0, 8);
    }

    if (valor.length > 4) {

        valor =
            valor.substring(0,2) + "/" +
            valor.substring(2,4) + "/" +
            valor.substring(4);

    }

    else if (valor.length > 2) {

        valor =
            valor.substring(0,2) + "/" +
            valor.substring(2);

    }

    setDataNascimento(valor);
    calcularIdade(valor);

}

function calcularIdade(data) {

    console.log("Calculando idade para:", data);

    if (data.length !== 10) {
        setIdade("");
        return;
    }

    const partes = data.split("/");

    const nascimento = new Date(

        partes[2],
        partes[1] - 1,
        partes[0]

    );

    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (

        mes < 0 ||

        (mes === 0 &&
         hoje.getDate() < nascimento.getDate())

    ) {

        anos--;

    }

    setIdade(anos.toString());

}


async function salvarPet() {

    try {

        if (!tutorSelecionado) {

            Alert.alert(
                "Atenção",
                "Selecione um tutor."
            );

            return;
        }

        const dataBanco = dataNascimento.split("/").reverse().join("-");

        const petObjeto = {
            nome,
            especie,
            idade: Number(idade),
            vacinado,
            dataNascimento: dataBanco,

            tutor: {codigo: tutorSelecionado}

        };

        console.log("Tutor selecionado:", tutorSelecionado);

        console.log(JSON.stringify(petObjeto, null, 2)
        );

        if (!nome.trim()) {

        Alert.alert(
        "Atenção",
        "Informe o nome do pet."
        );

        return;

        }

        if (!especie.trim()) {

        Alert.alert(
        "Atenção",
        "Informe a espécie."
            );

        return;

        }

        if (!dataNascimento) {

        Alert.alert(
        "Atenção",
        "Informe a data de nascimento."
        );

         return;

        }

        if (!idade) {

        Alert.alert(
        "Atenção",
        "Informe a idade."
        );

        return;

        }

        if (!tutorSelecionado) {

        Alert.alert(
        "Atenção",
        "Selecione um tutor."
        );

        return;

        }

        if (pet) {

            await api.put(
                "/cpet/" + pet.codigo,
                petObjeto
            );

        } else {

            await api.post(
                "/cpet",
                petObjeto
            );

        }

        Alert.alert(
            "Sucesso",
            pet
                ? "Pet atualizado com sucesso!"
                : "Pet cadastrado com sucesso!"
        );

        navigation.goBack();

    } catch (erro) {

    console.log("ERRO:", erro.response?.data);
    console.log("STATUS:", erro.response?.status);

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

    console.log("ABRIU A TELA NOVO PET");

    carregarTutores();

    }, []);

    //=====================================================
    // INTERFACE
    //=====================================================

    return(

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.titulo}>
                🐶 Novo Pet
            </Text>

            <Text style={styles.subtitulo}>
                Cadastre o novo pet.
            </Text>

            <Text style={styles.secao}>
                📄 Dados do Pet
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do pet"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Espécie"
                value={especie}
                onChangeText={setEspecie}
            />

            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                maxLength={10}
                value={dataNascimento}
                onChangeText={formatarData}
            />

            <TextInput
                style={styles.input}
                placeholder="Idade"
                value={idade}
                editable={false}
            />
           
            <Text style={styles.secao}>👤 Tutor</Text>

            <View style={styles.picker}>

            <Picker
                selectedValue={tutorSelecionado}
                onValueChange={(valor) => setTutorSelecionado(valor)}
                
                >

            <Picker.Item
                label="Selecione um tutor"
                value={null}
/>

            {listaTutores.map((tutor) => (

            <Picker.Item
                key={tutor.codigo}
                label={tutor.nome}
                value={tutor.codigo}
            />

            ))}

        </Picker>

    </View>

            <View style={styles.linha}>

                <Text style={styles.switchTexto}>
                    💉 Vacinado
                </Text>

                <Switch
                    value={vacinado}
                    onValueChange={setVacinado}
                />

            </View>

            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarPet}
            >

                <Text style={styles.textoBotao}>
                    {pet ? "✏️ Atualizar Pet" : "💾 Salvar Pet"}
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

    picker: {

    backgroundColor:"#FFF",

    borderRadius:10,

    borderWidth:1,

    borderColor:"#DDD",

    marginBottom:12

}

});
