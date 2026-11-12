const CHAVE_SECRETA = 'segredo'
const Cliente = require('../models/Cliente')
const cryptoJS = require('crypto-js')
const cadastrar= async(req,res)=>{
    const valores = req.body
    console.log(valores)
    if(!valores.nome ||!valores.cpf ){
        return res.status(401).json({message : "preencha todos os campos para cadastrar"})
    }
    try{
        const cpfCrypto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Cliente.create({
            nome : valores.nome,
            cpf: cpfCrypto,
        })
        return res.status(201).json({message : "Cliente cadastrado com suceso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao cadastrar Cliente"})
    }
}

const listar = async(req,res)=>{
    try{
        const clientes = await Cliente.findAll()
        if(!clientes){
            return res.status(404).json({message : "clientes nao encontrados"})

        }
        const resultados = clientes.map((el)=>{
            const cpfDecrypto = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            console.log("CPF DESCRIP: ", cpfDecrypto)
            return { 
                codCliente : el.codCliente,
                nome : el.nome,
                cpf : cpfDecrypto
            }
        })
        return res.status(200).json(resultados)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao cadastrar Cliente"})

    }
}

const deletar = async(req,res)=>{
    const id = req.params.id
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message : "cliente nao encontrado"})
        }
        await Cliente.destroy({where : {codCliente : id}})
        return res.status(201).json({message : "Cliente deletado!"})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao deletar Cliente"})

    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message : "Cliente nao encontrado"})

        }
        const cpfDecrypto = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        const valores = {
            nome: cliente.nome,
            cpf: cpfDecrypto
        }   
        return res.status(200).json(valores)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao consultar Cliente"})

    }

}


module.exports = {cadastrar, listar, deletar,  consultar}