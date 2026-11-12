let login = document.getElementById('login')
let res= document.getElementById('res')

login.addEventListener('click', (e)=>{
    e.preventDefault()
    res.innerHTML = ``

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const valores ={
        email : email,
        senha : senha
    }
    fetch('http://localhost:3000/login',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(resp=> resp.json())
    .then(dados=>{
        res.innerHTML += `<p>${dados.message}</p>`
        if(token){
            localStorage.setItem('token', token)
            localStorage.setItem('nome',nome)
            res.innerHTML += `redirecionando . . .`
            location.href = '../index.html'
    
        }
    })
    .catch((err)=>{
        console.log(err)
        res.innerHTML += `erro ao logar`
    })
})