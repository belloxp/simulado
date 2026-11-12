let listar = document.getElementById('listar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
listar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    fetch('http://localhost:3000/funcionarios',{
        method : 'GET',
        headers : {'Authorization' : token}
    })
    .then(resp=> resp.json())
    .then(dados=>{
        res.innerHTML += `<table>
            ${criarTH()}
            ${criarTbody(dados)}
        </table>
        `
    })
    .catch((err)=>{
        console.log(err)
        res.innerHTML += `erro ao listar`
    })
})

function criarTH(){
    return `
    <thead>
        <tr>
            <th>CODIGO</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>SENHA</th>
        </tr>
    </thead>
    `
}

function criarTbody(dados){
    let tbody = `<tbody>`
    dados.forEach(el => {
        tbody += `
        <tr>
            <td>${el.codFuncionario}</td>
            <td>${el.nome}</td>
            <td>${el.email}</td>
            <td>${el.cpf}</td>
        </tr>
        `
    });
    tbody +=`</tbody>`
    return tbody
}