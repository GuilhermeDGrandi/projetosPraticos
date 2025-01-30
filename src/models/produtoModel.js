const validator = require('validator')
const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: false },
    categoria: { type: String, required: false, default: '' },
    quantidade: { type: String, required: false, default: '' },
    valor: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ProdutoModel = mongoose.model('Produto', produtoSchema);

class Produto {
    constructor(body) {
        this.cleanUp()
        this.fetch(body)
    }

    async criarProduto(req, res) {
        this.valida()
        if (this.errors.length > 0) return
        await ProdutoModel.create(
            {
                nome: this.nome,
                categoria: this.categoria,
                quantidade: this.quantidade,
                valor: this.valor
            }
        );
    }

    valida() {
        if (!this.valor || !validator.isDecimal(this.valor, { locale: 'pt-BR' }))
            this.errors.push('Valor precisa ser um número decimal válido!')
        else
            if (this.valor < 0) this.errors.push('Valor precisa ser maior que zero')

        if (!validator.isWhitelisted(this.nome, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ')) this.errors.push('Nome inválido!')

        if (!this.quantidade || !validator.isInt(this.quantidade))
            this.errors.push('Quantidade precisa ser inteira!')
        else
            if (this.quantidade < 0) this.errors.push('Quantidade precisa ser maior que 0')

        if (this.errors.length > 0) {
            throw {
                message: 'erro na validação',
                errors: this.errors
            }
        }
    }

    fetch(produto) {
        this.nome = produto.nome
        this.valor = produto.valor
        this.categoria = produto.categoria
        this.quantidade = produto.quantidade

    }

    cleanUp() {
        this.nome = ''
        this.valor = 0
        this.quantidade = 0

        this.errors = []

    }


}
Produto.buscaProdutos = async function () {
    const produtos = await ProdutoModel.find()
        .sort({ criadoEm: -1 })
    return produtos

}

Produto.buscaProdutosPorId = async function (id) {
    const produto = await ProdutoModel.findById(id)
    return produto

}

Produto.Edit = async function (id, body) {
    //if(typeof id !== 'string') return
    console.log(body)
    const produto = new Produto(body)
    produto.valida()
    await ProdutoModel.findByIdAndUpdate(id, produto, { new: true })
}
Produto.delete = async function (id) {
    await ProdutoModel.findByIdAndDelete(id)
}

module.exports = Produto;

















