// Sessões
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var user_name = document.getElementById("user_name");

    if (email != null && nome != null) {
        if (user_name != undefined) {
            user_name.innerHTML = nome;
        }

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
