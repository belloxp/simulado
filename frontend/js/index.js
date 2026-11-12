const token = localStorage.getItem('token')
const nome = localStorage.getItem('nome')
//no login.js vai ser a mesma coisa so que setItem
const verificar_log = document.getElementById('verificar_log')
if(token){
    verificar_log.innerHTML = `<a href="#" id="btn_logout">LOGOUT</a>`
    verificar_log.innerHTML += `<span id="tituloMenu">Olá, ${nome}!</span>`

    const btn_logout = document.getElementById('btn_logout')
    btn_logout.addEventListener('click', (e)=>{
        e.preventDefault()
        localStorage.clear()
        localStorage.reload()
    })

}else{
    location.href = '../index.html'
}