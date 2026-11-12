const Inspecoes = require('../models/Inspecoes')
const cadastrar= async(req,res)=>{
    const valores = req.body
    console.log(valores)
    if(!valores.idEquipamento ||!valores.tipo || !valores.data ){
        return res.status(401).json({message : "preencha todos os campos para cadastrar"})
    }
    try{

        await Inspecoes.create({
            idEquipamento : valores.idEquipamento,
            tipo: valores.tipo,
            data : valores.data
        })
        return res.status(201).json({message : "Inspecoes cadastrado com suceso"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao cadastrar Inspecoes"})
    }
}

const listar = async(req,res)=>{
    try{
        const inspecoes = await Inspecoes.findAll()
        if(!inspecoes){
            return res.status(404).json({message : "Inspecoes nao encontrados"})

        }
        const resultados = inspecoes.map((el)=>{
            return { 
                codInspecao : el.codInspecoes,
                idEquipamento : el.idEquipamento,
                tipo: el.tipo,
                data : el.data
            }
        })
        return res.status(200).json(resultados)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao consultar inspecao"})

    }
}




module.exports = {cadastrar, listar}