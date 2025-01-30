const Produto = require('../models/produtoModel')

exports.index = async (req, res)=>{
    const produto = await Produto.buscaProdutos()
    return res.render('produtosView', {produto})
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
        res.redirect('/produto/index')
              
    }catch(e){
        console.log(e)
    }    
}

exports.editIndex = async function(req, res) {
    Produto.Edit(req.params.id, req.body)
    res.redirect('/produto/index')
};

exports.edit = async function (req, res){
    const produto = await Produto.buscaProdutosPorId(req.params.id)
    
    res.render('edit', {produto}) 
    
}

exports.delete = async function(req, res) {
    console.log(req.params.id)
  
    await Produto.delete(req.params.id);
    
  
    req.flash('success', 'produto apagado com sucesso.');
    res.redirect('/produto/index')
  };







