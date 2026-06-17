//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: localizacao.js
// Descrição:
// Tela responsável por exibir a localização da
// Clínica PetVida através de um mapa.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

// Biblioteca React

import React from "react";

// Componentes do React Native
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from "react-native";

// Biblioteca responsável pelo mapa
import MapView, { Marker } from "react-native-maps";

//=========================================================
// COMPONENTE PRINCIPAL
//=========================================================

export default function Localizacao() {

    
//=====================================================
// ABRIR GOOGLE MAPS
//=====================================================

function abrirMapa() {

    Linking.openURL(

        "https://www.google.com/maps/search/?api=1&query=Passeio+das+Águas+Shopping,+Goiânia,+GO"

    );

}

    //=====================================================
    // INTERFACE
    //=====================================================

    return (

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >

            {/*=====================================================
                LOGO
            =====================================================*/}

            <Image
                source={require("../../assets/logo/logo.png")}
                style={styles.logo}
            />

            {/*=====================================================
                BANNER
            =====================================================*/}

            <Image
                source={require("../../assets/imagens/banner.png")}
                style={styles.banner}
            />

            {/* Título da tela */}
            <Text style={styles.titulo}>
                📍 Venha conhecer nossa clínica
            </Text>

            {/* Mapa da clínica */}
            <MapView
                style={styles.mapa}
                initialRegion={{
                latitude: -16.630971,
                longitude: -49.278283,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
                }}
            >

            <Marker

                coordinate={{
                    latitude: -16.630971,
                    longitude: -49.278283,
                }}

                title="🐾 Clínica PetVida"
                description="Passeio das Águas Shopping"
            />

        </MapView>

                

            {/* Cartão com informações da clínica */}

            <View style={styles.card}>

                <Text style={styles.nome}>
                    🐾 Clínica PetVida
                </Text>

                <View style={styles.linha}/>

               <Text style={styles.tituloSessao}>
                    📍 Endereço
                </Text>    

                <Text style={styles.infoNegrito}>
                    Passeio das Águas Shopping
                </Text>

                <Text style={styles.info}>
                    Av. Perimetral Norte, 8303
                </Text>

                <Text style={styles.info}>
                    Fazenda Caveiras
                </Text>

                <Text style={styles.info}>
                    Goiânia - GO
                </Text>

                <Text style={styles.tituloSessao}>
                        🕒 Horário de Funcionamento
                </Text>

                <Text style={styles.info}>
                        Segunda a Domingo
                </Text>

                <Text style={styles.info}>
                        10h às 22h
                </Text>

            </View>

    {/*=====================================================
        BOTÃO COMO CHEGAR
    =====================================================*/}

        <TouchableOpacity
            style={styles.botao}
            onPress={abrirMapa}
        >

        <Text style={styles.textoBotao}>
            🧭 Como chegar
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
    flexGrow:1,
    alignItems:"center",
    backgroundColor:"#F4F8F6",
    paddingBottom:20
},

    logo:{
        width:150,
        height:150,
        resizeMode:"contain",
        marginTop:-35,
        marginBottom:-30
    },

    banner:{
        width:"92%",
        height:150,
        resizeMode:"cover",
        borderRadius:18,
        marginBottom:10
    },

    titulo:{
        fontSize:14,
        fontWeight:"bold",
        color:"#2E6F40",
        textAlign:"center",
        marginVertical:10,
        width:"100%"
    },

    mapa:{
    width:"89%",
    height:200,
    borderRadius:18,
    overflow:"hidden"
    },

    card:{
        width:"90%",
        backgroundColor:"#FFFFFF",
        borderRadius:14,
        padding:16,
        marginVertical:15,
        marginTop:8,
        marginBottom:10,

        elevation:5,
        shadowColor:"#000",
        shadowOpacity:0.12,
        shadowRadius:6,
        shadowOffset:{
            width:0,
            height:3
            }
    },

    nome:{
        fontSize:22,
        fontWeight:"bold",
        color:"#2E6F40",
        marginBottom:10,
        textAlign:"center"
    },

    info:{
        fontSize:15,
        color:"#555",
        marginBottom:3,
        lineHeight:22
    },

    botao:{
        width:"90%",
        backgroundColor:"#2E6F40",
        padding:15,
        borderRadius:15,
        alignItems:"center",
        marginBottom:-5,
        elevation:5,
        shadowColor:"#000",
        shadowOpacity:0.12,
        shadowRadius:4,
        shadowOffset:{
            width:0,
            height:2
        }
    },

    textoBotao:{
        color:"#FFFFFF",
        fontSize:18,
        fontWeight:"bold"
    },

    linha:{
        height:1,
        width:"100%",
        backgroundColor:"#E5E5E5",
        marginBottom:10
    },

    tituloSessao:{
        fontSize:16,
        fontWeight:"bold",
        color:"#2E6F40",
        marginBottom:8,
        marginTop:14
    },

    infoNegrito:{
        fontSize:16,
        fontWeight:"bold",
        color:"#444",
        marginBottom:6
    }

});