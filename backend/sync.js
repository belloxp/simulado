const {Inspecoes, Equipamento, Cliente, Funcionario} = require('./db/db')
const db = require('./db/db')
async function sync() {
    try{
        await db.sync({force : true})
        console.log("sincronizando as tabelas . . .")
    }catch(err){
        console.log(`erro ao sincronizar: `, err)
    }finally{
        await db.close()
        console.log("fechando sync . . .")
    }
}
sync()