let cadastrar = document.getElementById('cadastrar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const modelo = document.getElementById('modelo').value
    const fabricante = document.getElementById('fabricante').value
    const numeroSerie = document.getElementById('numeroSerie').value
    const idCliente = document.getElementById('idCliente').value
    const valores = {
        modelo: modelo,
        fabricante: fabricante,
        numeroSerie: numeroSerie,
        idCliente: idCliente
    }
    fetch('http://localhost:3000/equipamento',{
        method : 'POST',
        headers : {'Authorization' : token},
        body: JSON.stringify(valores)
    })
    .then(resp=> resp.json())
    .then(dados=>{
        res.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        console.log(err)
        res.innerHTML += `erro ao cadastrar`
    })
})