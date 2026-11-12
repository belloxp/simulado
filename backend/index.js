const express = require('express')
const cors = require('cors')
const app = express()

const hostname = 'localhost'
const PORT = 3000
const db = require('./db/db')

//CONTROLLERS
const authController=  require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const equipamentoController = require('./controller/equipamento.controller')
const inspecaoController = require('./controller/inspecao.controller')
const clienteController = require('./controller/cliente.controller')
const authMiddleware = require('./middleware/auth.middleware')

//MIDDLEWARE
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

//ROTAS PUBLICAS
app.post('/login', authController.login)  
app.post('/funcionario', funcionarioController.cadastrar)

app.get('/', (req,res)=>{
    return res.status(200).json({message : "aplicacao de pé"})
})

app.use(authMiddleware)
//ROTAS PRIVADAS
// --- FUNCIONARIOS
app.get('/funcionarios', funcionarioController.listar)
app.get('/funcionario/:id', funcionarioController.consultar)
app.delete('/funcionario/:id', funcionarioController.deletar)

// --- CLIENTE
app.post('/cliente', clienteController.cadastrar)
app.get('/clientes', clienteController.listar)
app.get('/cliente/:id', clienteController.consultar)
app.delete('/cliente/:id', clienteController.deletar)

// --- INSPECOES
app.post('/inspecao', inspecaoController.cadastrar)
app.get('/inspecoes', inspecaoController.listar)

// --- EQUIPAMENTO
app.post('/equipamento', equipamentoController.cadastrar)
app.get('/equipamentos', equipamentoController.listar)



//SERVIDOR
db.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})