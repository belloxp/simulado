let cadastrar = document.getElementById('cadastrar')
let res= document.getElementById('res')

cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const valores = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
    }
    fetch('http://localhost:3000/funcionario',{
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