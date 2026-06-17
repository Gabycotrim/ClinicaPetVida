/**
 * ============================================================================
 * Projeto    : Clinica PetVida Mobile
 * Disciplina : Desenvolvimento Mobile
 * Curso      : Sistemas de Informação - UEG
 * Autora     : Gabriella Cotrim
 * Arquivo    : App.js
 * Descrição  : Responsável pela navegação principal do aplicativo.
 * ============================================================================
 */

// ============================================================================
// BIBLIOTECAS
// ============================================================================

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ============================================================================
// PÁGINAS DO APLICATIVO
// ============================================================================

import Menu from "./src/paginas/menu";
import ListaPets from "./src/paginas/listaPets";
import ListaTutores from "./src/paginas/listaTutores";
import ListaConsultas from "./src/paginas/listaConsultas";
import BuscarCep from "./src/paginas/buscarCep";
import NovoTutor from "./src/paginas/novoTutor";
import NovoPet from "./src/paginas/novoPet";
import NovaConsulta from "./src/paginas/novaConsulta";
import Localizacao from "./src/paginas/localizacao";
import Sobre from "./src/paginas/sobre";

// ============================================================================
// NAVEGAÇÃO
// ============================================================================

// Cria a pilha de navegação do aplicativo.
const Stack = createNativeStackNavigator();

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      >

        {/* Tela inicial do aplicativo */}
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{headerShown: false}}
        />

        {/* Tela de listagem de Pets */}
        <Stack.Screen
          name="ListaPets"
          component={ListaPets}
          options={{ title: "Pets" }}
        />

        {/* Tela de listagem de Tutores */}
        <Stack.Screen
          name="ListaTutores"
          component={ListaTutores}
          options={{ title: "Tutores" }}
        />

        {/* Tela de listagem de Consultas */}
        <Stack.Screen
          name="ListaConsultas"
          component={ListaConsultas}
          options={{ title: "Consultas" }}
        />

        {/* Tela de busca de CEP */}
        <Stack.Screen
          name="BuscarCep"
          component={BuscarCep}
          options={{ title: "Localizar Endereço" }}
        />

        {/* Tela de cadastro de Novo Tutor */}
        <Stack.Screen
          name="NovoTutor"
          component={NovoTutor}
          options={{ title: "👤 Novo Tutor" }}
        />

        {/* Tela de cadastro de Novo Pet */}
        <Stack.Screen
          name="NovoPet"
          component={NovoPet}
          options={{ title: "🐶 Novo Pet" }}
        />

        {/* Tela de cadastro de Nova Consulta */}
        <Stack.Screen
          name="NovaConsulta"
          component={NovaConsulta}
          options={{ title: "🩺 Nova Consulta" }}
        />

        {/* Tela de localização */}
        <Stack.Screen
          name="Localizacao"
          component={Localizacao}
          options={{ title: "📍 Localização" }}
        />

        {/* Tela sobre o aplicativo */}
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{ title: "ℹ️ Sobre" }}
        />

      </Stack.Navigator>

    </NavigationContainer>
); 

}
