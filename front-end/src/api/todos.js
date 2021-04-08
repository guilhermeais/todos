// importamos o axios lá da instancia personalizada que criamos
import axios from '../utils/axios';

// e aqui vamos exportar por padrão uma class Todo com os métodos de Listagem (GET), Criar (POST), Editar(PUT) e Deleter(DELETE) (CRUD)
export default class Todo{
    // os nomes das funções não importam, mas é bom serem nomes que dizem o q cada método faz

    // index = retorna todos todos
    async index(){
        // fazemos uma requisição get para obter as todos da nossa API (Lembre-se que a url da api ja está configurada no axios)
        const {data} = await axios.get('/todos')
        return data // retornamos a resposta
    }

    // armazena os todos
    async store({text, done}){
        // req post que envia os dados {text, done} para nosso bd de todos
        const {data} = await axios.post('/todos', text, done)
        return data 
    }
    
    //atualiza todos
    async update({id, text, done}){
        // req put, atualiza um todo de acordo com o ID
        // essas rotas foram criadas automaticamente pelo json-server
        const {data} = await axios.put(`/todos/${id}`, text, done)
        return data 
    }

    //deleta todos
    async destroy({id}){
        // req delete, deleta um todo de acordo com o ID
        // essas rotas foram criadas automaticamente pelo json-server
        const response = await axios.delete(`/todos/${id}`)
        return response 
    }
}