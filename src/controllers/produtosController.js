const Produto = require('../models/produtoModel')

exports.index = (req, res)=>{
    return res.render('produtosView')
}

exports.show = (req, res)=>{
    return res.render('produtosNovo')
}

exports.register = async function (req, res){
    try{
        console.log(req.body)
        const produto = new Produto(req.body)
        await produto.criarProduto()
        req.flash('success', 'Produto cadastrado com sucesso!')
              
    }catch(e){
        console.log(e)
    }    
}







