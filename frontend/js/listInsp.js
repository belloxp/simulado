let listar = document.getElementById('listar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
listar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    fetch('http://localhost:3000/inspecoes',{
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
            <th>CODIGO INSPECAO</th>
            <th>CODIGO EQUIPAMENTO</th>
            <th>TIPO</th>
            <th>DATA</th>
        </tr>
    </thead>
    `
}

function criarTbody(dados){
    let tbody = `<tbody>`
    dados.forEach(el => {
        tbody += `
        <tr>
            <td>${el.codInspecao}</td>
            <td>${el.idEquipamento}</td>
            <td>${el.tipo}</td>
            <td>${el.data}</td>
        </tr>
        `
    });
    tbody +=`</tbody>`
    return tbody
}