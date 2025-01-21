const validator = require('validator')
const mongoose = require('mongoose');



const produtoSchema = new mongoose.Schema({
    _id: { type: Number },
    nome: { type: String, required: true },
    categoria: { type: String, required: false, default: '' },
    quantidade: { type: String, required: false, default: '' },
    valor: { type: Number, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ProdutoModel = mongoose.model('Produto', produtoSchema);

class Produto{
    constructor(body){
        this.body=body
        this.errors=[]
    }

    async criarProduto(req, res) {
        if(this.errors.length > 0) return
        //await this.productExists()
    
       
            const { nome, categoria, valor, quantidade } = req.body;
    
            // Gerar um ID sequencial para o novo produto
            const idProduto = await gerarIdUnico('produto');
    
            // Criar o produto com o ID gerado
            const novoProduto = new ProdutoModel({
                _id: idProduto,
                nome,
                valor,
                categoria,
                quantidade
            });
        }
    
            //await novoProduto.save();
            
        
    

    //async productExists(){


    //}



    cleanUp(){
        this.body()={
            nome: this.body.nome,
            valor: this.body.valor,
            quantidade: this.body.quantidade,

        }
    }

    valida(){
        this.cleanUp()
        if(!validator.isDecimal(this.body.valor)) this.errors.push('Valor precisa ser um número decimal válido!')
        if(this.valor<0) this.errors.push('Valor precisa ser maior que zero')
        if (!validator.isAlphanumeric(this.nome)) this.errors.push('Nome inválido!')
        if(!validator.isInt(this.quantidade)) this.errors.push('Quantidade precisa ser inteira!')
        if(this.quantidade<0) this.errors.push('Quantidade precisa ser maior que 0')
    }



}
module.exports = Produto;



  













