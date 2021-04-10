// importando o createApp do vue
import {createApp} from 'vue'
// importando a entidade Todos
import Todos from './api/todos'
import './assets/css/main.css'

const apiTodos = new Todos();
// criando um app do vue
const app = createApp({
    data(){ // dados da aplicação que precisam ser renderizados em tela
        return{
            todos:[],
            form:{
                text:'',
                done: false,
            },
            loading: false,
            result:{}
        }
    },
    async created(){
        await this.fetchTodos();
    },
    methods:{
        async fetchTodos(){
            try {
                this.loading = true
                const data = await apiTodos.index(); 
                this.todos = data
                this.result = {status: true, msg:['Sucesso'], data:data}
            } catch (error) {
                this.result = {status: false, msg:['Erro'], data:error}
            }finally{
                this.loading = false
            }
                   
        },
        async createTodo(){
            try {
                this.loading = true
                const data = await apiTodos.store(this.form)
                this.todos.push(data) // fazemos os novos todos serem armazenados no nossos todos

                this.form.text = ''
                this.form.done = false
                this.result = {status: true, msg:['Sucesso'], data:data}
            } catch (error) {
                this.result = {status: false, msg:['Erro'], data:error}
            }finally{
                this.loading = false
            }
            
        },
        async toggleTodoStatus(todo){ // a gente recebe um todo no parametro
            try {
                
                const data = await apiTodos.update({ // chama o método update da api
                    ...todo, // pega todo o resto do todo que recebemos no parametros e inserimos no bd falso, só resumimos o {todo: todo}
                    done: !todo.done  // e no done especificamente, fazemos o sistema receber o todo.done ao inverso, para que inveremos o status do todo toda vez que clicarmos no chkBox
                })
                // e agora temos que puxar o todo atualizado aqui na nossa aplicação, mas para isso, precisamos saber qual todo é, e o meio que temos para identificar a todo, é usando o id dela. vamos usar o findIndex para isso
                const index = this.todos.findIndex((todo)=> todo.id == data.id) // e verificamos se o todo que acabou de ser atualizado tem o id igual o todo que já temos aqui. E se tiver, puxamos o id dele.  
                this.todos[index] = data // e ai puxamos esse novo todo pro nosso todo.
                console.log(this.todos) 
                this.result = {status: true, msg:['Sucesso'], data:data}
            } catch (error) {
                this.result = {status: false, msg:[`Erro: ${error}`], data:error}
            }finally{
                
            }
            
        },
        async destroyTodo(id){
            try {
                await apiTodos.destroy({id}) // o método pede apenas o id da todo, e como sempre, em vez de fazermos id: id, fazemos logo só o id que o js já entende
                // agora, precisamos excluir da nossa lista também, e vamos buscar o id igual fizemos para atualizar
                const index = this.todos.findIndex((todo)=> todo.id == id /*id do parametro*/)
                this.todos.splice(index, 1)
                this.result = {status: true, msg:['Sucesso']}
            } catch (error) {
                this.result = {status: false, msg:[`Erro: ${error}`], data:error}
            }
            console.log(this.result)
        }
    }
})

app.mount('#app')