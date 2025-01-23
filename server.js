require('dotenv').config();
const express = require('express') //requisição do express
const app = express(); // utilizando express
const routes = require('./routes') // mostrando o caminho das rotas
const path = require('path') // requisição de caminhos
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));

app.use(express.urlencoded({extended:true}))


app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views')); // setando caminho das minhas views
app.set('view engine', 'ejs'); //mostrando a ferramenta que vai renderizar minhas views

const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
app.use(sessionOptions);
app.use(flash());
app.use(middlewareGlobal);
app.use(routes) // usando as rotas

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
