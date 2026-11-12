let deletar = document.getElementById('deletar')
let res= document.getElementById('res')
const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}
deletar.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``
    const id = document.getElementById('id').value
    fetch(`http://localhost:3000/funcionario/${id}`,{
        method : 'DELETE',
        headers : {'Authorization' : token}
    })
    .then(resp=> resp.json())
    .then(dados=>{
        res.innerHTML += `${dados.message}`
    })
    .catch((err)=>{
        console.log(err)
        res.innerHTML += `erro ao deletar`
    })
})

