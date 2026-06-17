import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Menu({ navigation }) {
  return (
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
    >

      <Image
        source={require("../../assets/logo/logo.png")}
        style={styles.logo}
      />

      <Image
        source={require("../../assets/imagens/banner.png")}
        style={styles.banner}
      />

      <Text style={styles.titulo}>
        🐾 Clínica PetVida
      </Text>

      <Text style={styles.subtitulo}>
        Cuidando da saúde e do bem-estar do seu melhor amigo.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListaPets")}
      >
        <Text style={styles.textoBotao}>Pets</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListaTutores")}
      >
        <Text style={styles.textoBotao}>Tutores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListaConsultas")}
      >
        <Text style={styles.textoBotao}>Consultas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("BuscarCep")}
      >
        <Text style={styles.textoBotao}>🔍 Informar CEP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Localizacao")}
      >
      <Text style={styles.textoBotao}>📍 Nossa Localização</Text>

      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.botao}
        onPress={() => navigation.navigate("Sobre")}
      >
      <Text style={styles.textoBotao}> ℹ️ Sobre</Text>

      </TouchableOpacity>

      <Text style={styles.versao}>
        Desenvolvido por Gabriella Cotrim •
        Versão 1.0
      </Text>

  </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flexGrow:1,
    alignItems:"center",
    backgroundColor:"#F4F8F6",
    paddingTop:4,
    paddingBottom:20
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#2E6F40"
  },
  subtitulo: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 35
  },

  botao: {
    backgroundColor:"#2E6F40",
    paddingVertical:13,
    paddingHorizontal:16,
    marginVertical:5,
    width:"75%",
    borderRadius:16,
    alignItems:"center",

    // Sombra (iOS)
    shadowColor:"#000",
    shadowOpacity:0.12,
    shadowRadius:4,
    shadowOffset:{
        width:0,
        height:2
    },

    // Sombra (Android)
    elevation:4
  },

  textoBotao: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },
  versao: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 10,
    color: "#999",
    fontStyle: "italic",
},

logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: -35,
},

banner: {
    width: 320,
    height: 180,
    resizeMode: "cover",
    borderRadius: 15,
    marginBottom: 5,
}

});