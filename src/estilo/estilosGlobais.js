/**
 * ============================================================================
 * Projeto    : PetVida
 * Disciplina : Desenvolvimento Mobile
 * Curso      : Sistemas de Informação - UEG
 * Autora     : Gabriella Cotrim
 * Arquivo    : estilosGlobais.js
 * Descrição  : Centraliza os estilos reutilizáveis do aplicativo.
 * ============================================================================
 */

import { StyleSheet } from "react-native";

import cores from "./cores";
import fontes from "./fontes";
import tema from "./tema";

// ============================================================================
// ESTILOS GLOBAIS
// ============================================================================

const estilosGlobais = StyleSheet.create({

    // ------------------------------------------------------------------------
    // TELA
    // ------------------------------------------------------------------------

    tela: {

        flex: 1,
        backgroundColor: cores.corFundo,
        alignItems: "center"

    },

    // ------------------------------------------------------------------------
    // CONTAINER
    // ------------------------------------------------------------------------

    container: {

        width: tema.container.largura,
        marginTop: tema.espacamento.grande

    },

    // ------------------------------------------------------------------------
    // TÍTULOS
    // ------------------------------------------------------------------------

    tituloPrincipal: {

        fontSize: fontes.tituloPrincipal,
        fontWeight: fontes.pesoNegrito,
        color: cores.corPrimaria,
        textAlign: "center"

    },

    titulo: {

        fontSize: fontes.titulo,
        fontWeight: fontes.pesoNegrito,
        color: cores.corTextoPrincipal

    },

    subtitulo: {

        fontSize: fontes.subtitulo,
        fontWeight: fontes.pesoMedio,
        color: cores.corTextoPrincipal

    },

    // ------------------------------------------------------------------------
    // TEXTOS
    // ------------------------------------------------------------------------

    texto: {

        fontSize: fontes.texto,
        color: cores.corTextoPrincipal

    },

    textoPequeno: {

        fontSize: fontes.textoPequeno,
        color: cores.corTextoSecundario

    },

    // ------------------------------------------------------------------------
    // CARD
    // ------------------------------------------------------------------------

    card: {

        backgroundColor: cores.corCard,
        borderRadius: tema.card.raio,
        padding: tema.espacamento.medio,

        ...tema.sombra

    },

    // ------------------------------------------------------------------------
    // BOTÃO
    // ------------------------------------------------------------------------

    botao: {

        backgroundColor: cores.corPrimaria,

        height: tema.botao.altura,

        borderRadius: tema.borda.media,

        justifyContent: "center",

        alignItems: "center"

    },

    textoBotao: {

        color: cores.corTextoClaro,

        fontSize: fontes.textoBotao,

        fontWeight: fontes.pesoNegrito

    },

    // ------------------------------------------------------------------------
    // CAMPO DE TEXTO
    // ------------------------------------------------------------------------

    campoTexto: {

        height: tema.campoTexto.altura,

        borderWidth: 1,

        borderColor: cores.corBorda,

        borderRadius: tema.borda.media,

        paddingHorizontal: tema.espacamento.medio,

        backgroundColor: cores.corCard,

        fontSize: fontes.texto

    },

    // ------------------------------------------------------------------------
    // LOGO
    // ------------------------------------------------------------------------

    imagemLogo: {

        width: 180,

        height: 180,

        resizeMode: "contain",

        alignSelf: "center"

    },

    // ------------------------------------------------------------------------
    // IMAGEM PRINCIPAL
    // ------------------------------------------------------------------------

    imagemPrincipal: {

        width: "100%",

        height: 220,

        resizeMode: "contain",

        alignSelf: "center"

    }

});

// ============================================================================
// EXPORTAÇÃO
// ============================================================================

export default estilosGlobais;