// importando a entidade Todos
import Todos from './api/todos'

// criamos a função aqui no main para criar uma instancia de Todos e executar o método index que nos retorna os todos:
async function index(){
    const todos = new Todos()

    const data = await todos.index();
    // vamos desestruturar data do response
    
    console.log(data)
}

index()