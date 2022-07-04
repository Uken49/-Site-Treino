// Função para mostrar a senha
let passLabel = document.getElementById('label-img')
passLabel.addEventListener("click", showPass)
function showPass() {
    if (inp_pass.type == "password") {
        passLabel.src = "../assets/svg/eye_open.svg"
        inp_pass.type = "text"
    } else {
        passLabel.src = "../assets/svg/eye_closed.svg"
        inp_pass.type = "password"
    }
}

// Checando se a senha é válida
document.getElementById('inp_pass').addEventListener("keyup", passCheck)
function passCheck() {
    let pass = document.getElementById('inp_pass').value
    let regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/

    // Verificando se a senha é forte com regex
    if (pass == '') {
        return false
    }
    if (regex.test(pass)) {
        return true
    } else {
        return false
    }
}

// Validando email
document.getElementById('inp_email').addEventListener("keyup", valEmail)
function valEmail() {
    let email = document.getElementById('inp_email').value
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    // Essa expressão não garante a veracidade 100% de um email, para ser 100% precisa mandar confirmação por email

    // Validando email se os caracteres do email é válido
    if (email == '') {
        return false
    }

    if (regex.test(email)) {
        return true
    }

    return false
}

// Validando nome
document.getElementById('inp_name').addEventListener("keyup", valName)
function valName() {
    let name = document.getElementById('inp_name').value
    let regex = /^[a-z].* {1,}[a-z]{1,}/gi

    // Validando a quantidade de palavra e caracteres
    if (name == '') {
        return false
    } else if (regex.test(name)) {
        return true
    } else {
        return false
    }
}

// Validando cargo
document.getElementById('inp_position').addEventListener("keyup", valName)
function valPosition() {
    const position = document.getElementById('inp_position').value

    // Validando a quantidade de palavra e caracteres
    if (position.length <= 2) {
        return false
    }

    if (position == "Dono" || position == "Chefe") {
        return false
    }

    return true
}

document.getElementsByClassName("btn-register")[0].addEventListener("click", registerCheck)
function registerCheck() {
    if (!valEmail() | !valName() | !passCheck() | !valPosition()) {
        return false
    }
    register()
}

function register() {
    const nomeVar = inp_name.value;
    const emailVar = inp_email.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const senhaVar = inp_pass.value;
    const cargo = inp_position.value;

    fetch("/usuarios/registrarusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nameServer: nomeVar,
            emailServer: emailVar,
            positionServer: cargo,
            idEmpresaServer: idEmpresa,
            passServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Usuario Registrado com Sucesso!");
            setTimeout(() => {
                window.location = 'registrar-usuario.html'
            }, 1000);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// Chamando função para listar usuário na tabela
window.onload = listarUsuario(sessionStorage.ID_EMPRESA)
function listarUsuario(idEmpresa) {
    fetch("/usuarios/listarusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresa
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            plotarTabela(resposta)
        }
    })
}

function plotarTabela(resposta) {
    const tabela = document.getElementById("tabela")
    const qtdFuncionario = document.getElementById("qtdFuncionario")

    resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        const count = Object.keys(json[0]).length;
        console.log(count);

        qtdFuncionario.innerHTML = `${count} Usuário(s) encontrado`

        for (let i = 0; i < count; i++) {

            tabela.innerHTML +=
                `
            <tr>
                <th class="txt-center">${i+1}</th>
                <td>${json[0][i].nomeUsuario}</td>
                <td>${json[0][i].email}</td>
                <td>${json[0][i].cargo}</td>
                <td class="pass">
                    <span>******</span>
                    <img src="../assets/svg/eye_closed.svg" alt="Ver senha" title="Ver senha">
                </td>
                <td class="txt-center"><img src="../assets/svg/pencil_writing.svg" alt="Editar usuário"
                        title="Editar usuário"></td>
                <td class="txt-center delete"><img src="../assets/svg/delete.svg" alt="Deletar usuário"
                        title="Deletar usuário" onclick="excluirUsuario(${json[0][i].idUsuario}) "></td> 
            </tr>
        `
        }
    });


}

function excluirUsuario(idUsuario) {
    fetch("/usuarios/excluirusuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Funcionário excluido com Sucesso!");
            setTimeout(() => {
                window.location = 'registrar-usuario.html'
            }, 1000);
        } else {
            throw ("Houve um erro ao excluir funcionários!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}