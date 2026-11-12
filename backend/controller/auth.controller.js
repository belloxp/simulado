const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')

const login = async(req,res)=>{
    const valores = req.body
    if(!valores.email || !valores.senha){
        return res.status(401).json({message : "Preencha os campos email e senha para realizar o login"})
    }
    try{
        const funcionario = await Funcionario.findOne({where : {email : valores.email}})
        if(!funcionario){
            return res.status(401).json({message : "login invalido"})
        }

        const bytes = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDB = bytes.toString(cryptoJS.enc.Utf8)
        if(valores.senha !==senhaDB){
            return res.status(401).json({message : "senha incorreta"})

        }

        const tresHrs20minMs = 3.20*60*60*1000
        const tempoExpira =Date.now()+tresHrs20minMs

        const payload ={
            codFuncionario : funcionario.codFuncionario,
            nome : funcionario.nome,
            expiraEm : tempoExpira
        }
        const token = cryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()
        console.log(token)

        return res.status(200).json({
            codFuncionario : funcionario.codFuncionario,
            nome : funcionario.nome,
            token: token
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao fazer login"})

    }
}
module.exports = {login}