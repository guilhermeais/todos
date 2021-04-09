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
            }
        }
    },
    async created(){
        await this.fetchTodos();
    },
    methods:{
        async fetchTodos(){
            this.todos = await apiTodos.index();        
        },
        async createTodo(){
            const data = await apiTodos.store(this.form)
            this.todos.push(data) // fazemos os novos todos serem armazenados no nossos todos

            this.form.text = ''
            this.form.done = false
        }
    }
})

app.mount('#app')