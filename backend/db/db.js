const {Sequelize} = require('sequelize')

const db = new Sequelize('db_solartech', 'root', 'senai',{
    dialect: 'mysql',
    host : 'localhost',
    port: 3306
})
module.exports = db