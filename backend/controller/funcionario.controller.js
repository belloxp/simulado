const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')
const cadastrar= async(req,res)=>{
    const valores = req.body
    console.log(valores)
    if(!valores.nome || !valores.email || !valores.cpf || !valores.senha){
        return res.status(401).json({message : "preencha todos os campos para cadastrar"})
    }
    try{
        const cpfCrypto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const senhaCrypto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome : valores.nome,
            email : valores.email,
            cpf: cpfCrypto,
            senha : senhaCrypto
        })
        return res.status(201).json({message : "Funcionario cadastrado com suceso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao cadastrar Funcionario"})
    }
}

const listar = async(req,res)=>{
    try{
        const funcionario = await Funcionario.findAll()
        if(!funcionario){
            return res.status(404).json({message : "Funcionario nao encontrados"})
        }
        const resultados = funcionario.map((el)=>{
            const cpfDecrypto = cryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            console.log("CPF DESCRIP: ", cpfDecrypto)
            return { 
                codFuncionario : el.codFuncionario,
                nome : el.nome,
                email : el.email,
                cpf : cpfDecrypto
            }
        })
        return res.status(200).json(resultados)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao listar Funcionario"})

    }
}

const deletar = async(req,res)=>{
    const id = req.params.id
    try{
        const funcionario = await Funcionario.findByPk(id)
        if(!funcionario){
            return res.status(404).json({message : "Funcionario nao encontrado"})
        }
        await Funcionario.destroy({where : {codFuncionario : id}})
        return res.status(201).json({message : "Funcionario deletado!"})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao deletar Funcionario"})

    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    try{
        const funcionario = await Funcionario.findByPk(id)
        if(!funcionario){
            return res.status(404).json({message : "Funcionario nao encontrado"})

        }
        const cpfDecrypto = cryptoJS.AES.decrypt(funcionario.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        const valores = {
            nome: funcionario.nome,
            email : funcionario.email,
            cpf: cpfDecrypto
        }   
        return res.status(200).json(valores)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao consultar Funcionario"})

    }

}


module.exports = {cadastrar, listar, deletar,  consultar}