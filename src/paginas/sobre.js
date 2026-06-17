//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: sobre.js
//=========================================================

import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

export default function Sobre() {

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                🐶 Clínica PetVida
            </Text>

            <Text style={styles.texto}>
                Sistema para gerenciamento de Clínica Veterinária.
            </Text>

            <Text style={styles.texto}>
                Desenvolvido por Gabriella Cotrim.
            </Text>

            <Text style={styles.texto}>
                Sistemas de Informação - UEG
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F4F8F6",
        padding:20
    },

    titulo:{
        fontSize:28,
        fontWeight:"bold",
        color:"#2E6F40",
        marginBottom:20
    },

    texto:{
        fontSize:17,
        color:"#555",
        textAlign:"center",
        marginBottom:10
    }

});