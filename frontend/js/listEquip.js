let listar = document.getElementById('listar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
listar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    fetch('http://localhost:3000/equipamentos',{
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
            <th>MODELO</th>
            <th>FABRICANTE</th>
            <th>NUMERO SERIE</th>
            <th>ID CLIENTE</th>
        </tr>
    </thead>
    `
}

function criarTbody(dados){
    let tbody = `<tbody>`
    dados.forEach(el => {
        tbody += `
        <tr>
            <td>${el.modelo}</td>
            <td>${el.fabricante}</td>
            <td>${el.nueroSerie}</td>
            <td>${el.idCliente}</td>
        </tr>
        `
    });
    tbody +=`</tbody>`
    return tbody
}