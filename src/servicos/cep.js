//=========================================================
// Clínica PetVida
// Serviço responsável pela comunicação com a API ViaCEP
//=========================================================

import axios from "axios";

//=========================================================
// Função responsável por consultar um CEP
//=========================================================

export async function buscarCep(cep) {

    try {

        const resposta = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        return resposta.data;

    } catch (erro) {

        console.log("Erro ao consultar CEP:", erro);

        return null;

    }

}