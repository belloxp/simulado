const {DataTypes} = require('sequelize')
const db = require('../db/db')

const Equipamento = db.define('equipamento',{
    codEquipamento  : {
        autoIncrement : true,
        primaryKey : true,
        type : DataTypes.INTEGER
    },
    modelo : {
        type : DataTypes.STRING,
        allowNull : false
    },
    fabricante: {
        type : DataTypes.STRING,
        allowNull : false
    },
    numeroSerie : {
        type : DataTypes.STRING,
        allowNull : false
    },
    idCliente : {
        references : {
            key: 'codCliente',
            model: 'clientes'
        },
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName : 'equipamentos',
    timestamps : false
})
module.exports = Equipamento