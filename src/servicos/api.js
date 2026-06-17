//=========================================================
// Clínica PetVida
// Disciplina: Desenvolvimento Mobile
// Desenvolvedora: Gabriella Cotrim
// Arquivo: api.js
// Descrição: Responsável pela comunicação entre o aplicativo
//             React Native e o backend Spring Boot.
//=========================================================

//=========================================================
// IMPORTAÇÕES
//=========================================================

// Biblioteca utilizada para realizar requisições HTTP
import axios from "axios";

//=========================================================
// CONFIGURAÇÃO DA API
//=========================================================

// Cria uma instância do Axios apontando para o backend
const api = axios.create({

    baseURL: "http://192.168.0.4:8085"

});

//=========================================================
// EXPORTAÇÃO
//=========================================================

// Disponibiliza a configuração para todo o aplicativo
export default api;