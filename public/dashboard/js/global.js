// Sessões
// document.getElementsByTagName("body")[0].addEventListener('load', validarSessao())

function validarSessao() {
    const email = sessionStorage.EMAIL_USUARIO;
    const nome = sessionStorage.NOME_USUARIO;
    const cargo = sessionStorage.CARGO_USUARIO;

    const nomeEmpresa = sessionStorage.NOME_EMPRESA;
    const cnpj = sessionStorage.CNPJ_EMPRESA;

    const user_name = document.getElementById("user_name");

    if (email != null && nome != null) {
        user_name.innerHTML = nome
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// Função para detectar o local do menu que foi clicado
const list = document.querySelectorAll('.list')
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}
list.forEach((item) =>
    item.addEventListener('click', activeLink))