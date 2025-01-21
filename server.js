const express = require('express') //requisição do express
const app = express(); // utilizando express
const routes = require('./routes') // mostrando o caminho das rotas
const path = require('path') // requisição de caminhos

app.use(express.urlencoded({extended:true}))


app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views')); // setando caminho das minhas views
app.set('view engine', 'ejs'); //mostrando a ferramenta que vai renderizar minhas views

app.use(routes) // usando as rotas

app.listen(3000, () => { //servidor aberto
      console.log('Acessar http://localhost:3000');
      console.log('Servidor executando na porta 3000');
    });
