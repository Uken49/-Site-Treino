// Sessões
document.getElementsByTagName("body")[0].addEventListener('load', validarSessao())

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cargo = sessionStorage.CARGO_USUARIO;

    var nomeEmpresa = sessionStorage.NOME_EMPRESA;
    var cnpj = sessionStorage.CNPJ_EMPRESA;
    // var logo = sessionStorage.LOGO_EMPRESA;

    var user_name = document.getElementById("user_name");

    if (email != null && nome != null) {
        user_name.innerHTML = nome
        inp_nome.value = nome
        inp_email.value = email
        inp_position.value = cargo
        inp_nome_corp.value = nomeEmpresa
        inp_cnpj.value = cnpj

    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
