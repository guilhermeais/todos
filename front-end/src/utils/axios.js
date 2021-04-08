// importamos o axios do node_modules
import axios from 'axios'
// e vamos exportar uma configuração, vamos criar uma nova instancia do axios
export default axios.create({
    // endereco que vai patir as nossas requisições, baiscamente colocamos o endereço da api
    baseURL:'http://localhost:5000'
})