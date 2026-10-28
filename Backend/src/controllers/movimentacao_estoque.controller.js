const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    // O nome certo é com E maiúsculo
    const item = await prisma.movimentacao_Estoque.create({
        data
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.movimentacao_Estoque.findMany({
        include: {
            disco: true,
            usuario: true
        }
    });

    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.movimentacao_Estoque.findUnique({
        where: { id_movimentacao : Number(id) }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.movimentacao_Estoque.update({
        where: { id_movimentacao : Number(id) },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.movimentacao_Estoque.delete({
        where: { id_movimentacao : Number(id) }
    });

    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}