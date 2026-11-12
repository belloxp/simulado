const Funcionario = require('../models/Funcionario')
const Equipamento = require('../models/Equipamento')
const Inspecoes = require('../models/Inspecoes')
const Cliente = require('../models/Cliente')

Equipamento.belongsTo(Cliente,{
    as: 'clienteEquipamento',
    foreignKey: 'codCliente',
    allowNull : false
})
Cliente.hasMany(Equipamento,{
    as: 'equipamentoCliente',
    foreignKey: 'codCliente',
    onDelete : 'CASCADE'
})
Equipamento.hasMany(Inspecoes,{
    as: 'inspecaoEquipamento',
    foreignKey : 'codEquipamento',
    onDelete: 'CASCADE'
})
Inspecoes.belongsTo(Equipamento,{
    as : 'equipamentoInspecao',
    foreignKey : 'codEquipamento',
    allowNull : false
})
module.exports ={Inspecoes, Equipamento, Cliente, Funcionario}