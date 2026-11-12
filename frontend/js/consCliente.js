let consultar = document.getElementById('consultar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
consultar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const id = document.getElementById('id').value
    fetch(`http://localhost:3000/cliente/${id}`,{
        method : 'GET',
        headers : {'Authorization' : token}
    })
    .then(resp=> resp.json())
    .then(dados=>{
        res.innerHTML +=`STATUS DA CONSULTA : ${dados.message}<br>`
        res.innerHTML += `NOME: ${dados.nome}     <br>`
        res.innerHTML += `CPF: ${dados.cpf}    <br>`
    })
    .catch((err)=>{
        console.log(err)
        res.innerHTML += `erro ao consultar`
    })
})
