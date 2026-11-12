let cadastrar = document.getElementById('cadastrar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const idEquipamento = document.getElementById('idEquipamento').value
    const tipo = document.getElementById('tipo').value
    const data = document.getElementById('data').value

    const valores = {
        idEquipamento: idEquipamento,
        tipo: tipo,
        data : data
       
    }
    fetch('http://localhost:3000/inspecao',{
        method : 'POST',
        headers : {'Authorization' :token},
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