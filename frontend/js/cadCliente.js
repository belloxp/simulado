let cadastrar = document.getElementById('cadastrar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value

    const valores = {
        nome: nome,
        cpf: cpf,
       
    }
    fetch('http://localhost:3000/cliente',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
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