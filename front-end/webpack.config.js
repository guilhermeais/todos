// vou criar uma variavel para armazenar o caminho do main.js, pois o caminho pode variar de acordo com o sistema operacional
const path = require('path') // pegamos o pacote path que já vem por padrão no node

module.exports = {
    //arquivo de entrada:
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/main.js')], // babel para passar o código js moderno pro antigo dos navegadores
    // e bom, na nossa entry, configuramos o babel e depois o caminho pro main.js, usando o pacote path, basicamente __dirname pega a raiz do arquivo,nesse caso é o ./, e depois, passamos o diretorio do arquivo principal main.js
    
    // configurando a saida
    output:{
        path:path.resolve(__dirname, './public'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map'
    },
    // aqui fizemos basicamente o que já faziamos antes, o output do main.js no js antigo.

    //configurando o servidor od webpack
    devServer:{
        // aqui vamos dizer onde o nosso servidor vai apontar
        contentBase: path.resolve(__dirname, './public'),
        port:3000 // colocamos a porta que queremos que o servidor rode
    },
    devtool: 'source-map'
}
