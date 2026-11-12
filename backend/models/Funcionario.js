const {DataTypes} = require('sequelize')
const db = require('../db/db')

const Funcionario = db.define('funcionario',{
    codFuncionario  : {
        autoIncrement : true,
        primaryKey : true,
        type : DataTypes.INTEGER
    },
    nome : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    cpf : {
        type : DataTypes.STRING,
        allowNull : false
    },
},{
    tableName : 'funcionarios',
    timestamps : false
})
module.exports = Funcionario