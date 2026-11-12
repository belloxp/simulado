const CHAVE_SECRETA = 'segredo'
const Equipamento = require('../models/Equipamento')
const cryptoJS = require('crypto-js')
const cadastrar= async(req,res)=>{
    const valores = req.body
    console.log(valores)
    if(!valores.modelo ||!valores.fabricante || !valores.numeroSerie || !valores.idCliente ){
        return res.status(401).json({message : "preencha todos os campos para cadastrar"})
    }
    try{
        const numSerieCrypt = cryptoJS.AES.encrypt(valores.numeroSerie, CHAVE_SECRETA).toString()

        await Equipamento.create({
            modelo : valores.modelo,
            fabricante: valores.fabricante,
            numeroSerie: numSerieCrypt,
            idCliente : valores.idCliente
        })
        return res.status(201).json({message : "Equipamento cadastrado com suceso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao cadastrar Equipamento"})
    }
}

const listar = async(req,res)=>{
    try{
        const equipamentos = await Equipamento.findAll()
        if(!equipamentos){
            return res.status(404).json({message : "Equipamento nao encontrados"})
        }

        const resultados = equipamentos.map((el)=>{
            const numeroSerieDeCrypto = cryptoJS.AES.decrypt(el.numeroSerie, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
            console.log("NUMERO SERIE: ", numeroSerieDeCrypto)
            return { 
                modelo : el.modelo,
                fabricante: el.fabricante,
                numeroSerie: numeroSerieDeCrypto,
                idCliente : el.idCliente
            }
        })
        return res.status(200).json(resultados)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao lista equipamentos"})

    }
}




module.exports = {cadastrar, listar}