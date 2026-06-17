/**
 * ============================================================================
 * Projeto    : Clínica PetVida
 * Disciplina : Desenvolvimento Mobile
 * Curso      : Sistemas de Informação - UEG
 * Autora     : Gabriella Cotrim
 * Componente : Title
 * Arquivo    : Style.js
 * Descrição  : Estilos do componente Title.
 * ============================================================================
 */

// ============================================================================
// BIBLIOTECAS
// ============================================================================

import { StyleSheet } from "react-native";

// ============================================================================
// DESIGN SYSTEM
// ============================================================================

import cores from "../../estilo/cores";
import fontes from "../../estilo/fontes";
import tema from "../../estilo/tema";

// ============================================================================
// ESTILOS
// ============================================================================

const estilos = StyleSheet.create({

    // ------------------------------------------------------------------------
    // TÍTULO
    // ------------------------------------------------------------------------

    titulo: {

        fontSize: fontes.tituloPrincipal,

        fontWeight: fontes.pesoNegrito,

        color: cores.corPrimaria,

        textAlign: "center",

        marginBottom: tema.espacamento.grande

    }

});

// ============================================================================
// EXPORTAÇÃO
// ============================================================================

export default estilos;