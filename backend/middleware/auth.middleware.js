const CHAVE_SECRETA = 'segredo'
const cryptoJS = require('crypto-js')

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({message : "acesso negado"})
    }
    try{
        const bytes= cryptoJS.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados= bytes.toString(cryptoJS.enc.Utf8)
        if(!dadosDescriptografados){
            return res.status(401).json({message : "token invalido"})
        }
        const payload = JSON.parse(payload)
        if(Date.now()> payload.expiraEm){
            return res.status(401).json({message : "tempo expirado! logue novamente"})
 
        }
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "erro ao autenticar"})

    }
}
module.exports = authMiddleware