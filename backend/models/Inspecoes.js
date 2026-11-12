const {DataTypes} = require('sequelize')
const db = require('../db/db')

const Inspecoes = db.define('inspecoes',{
    codInspecoes  : {
        autoIncrement : true,
        primaryKey : true,
        type : DataTypes.INTEGER
    },
   
    tipo: {
        type : DataTypes.ENUM('PENDENTE', 'REALIZADA'),
        allowNull : false
    },
    data : {
        type : DataTypes.DATE,
        allowNull : false
    },
    idEquipamento : {
        references : {
            key: 'codEquipamento',
            model: 'equipamentos'
        },
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName : 'inspecoes',
    timestamps : false
})
module.exports = Inspecoes