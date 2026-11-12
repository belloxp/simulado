const {DataTypes} = require('sequelize')
const db = require('../db/db')

const Cliente = db.define('clientes',{
    codCliente  : {
        autoIncrement : true,
        primaryKey : true,
        type : DataTypes.INTEGER
    },
   
    nome: {
        type : DataTypes.STRING,
        allowNull : false
    },
    cpf : {
        type : DataTypes.STRING,
        allowNull : false
    }
    
},{
    tableName : 'clientes',
    timestamps : false
})
module.exports = Cliente