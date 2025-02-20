const express = require('express') // requisição do express
const app = express()
const route = express.Router(); //utilizando router do express

const homeController= require('./src/controllers/homeController')
const produtosController= require('./src/controllers/produtosController')

//rotas da home
route.get('/', homeController.paginaInicial)

//rota produtos
route.get('/produto/index', produtosController.index)
route.get('/produto/criar', produtosController.show)
route.post('/produto/criar', produtosController.register)

route.get('/produto/edit/:id', produtosController.edit)
route.post('/produto/edit/:id', produtosController.editIndex)

route.get('/produto/delete/:id', produtosController.delete)
module.exports = route




