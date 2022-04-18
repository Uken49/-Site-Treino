// Função para exibir/esconder a senha
function seePass() {
    let eye = document.getElementById('i_eye_pass')
    let pass = document.getElementById('inp_pass')

    if (pass.type == 'password') {
        eye.className = 'fa-solid fa-eye-slash'
        pass.type = 'text'
    } else {
        pass.type = 'password'
        eye.className = 'fa-solid fa-eye'
    }
}

// Função para validar senha

// Checando se a senha é válida
function passCheck() {
    let pass = document.getElementById('inp_pass').value

    if (pass.length >= 6) {
        warning_pass.innerHTML = ''
        label_pass.className = 'label-float valid'
    } else {
        label_pass.className = 'label-float missing'
        warning_pass.innerHTML = 'A senha deverá ter 6 ou mais digitos'
    }
}

// Checando se as duas senhas são iguais
function valPass() {
    let pass = document.getElementById('inp_pass').value
    let passConf = document.getElementById('inp_pass_conf').value

    if (passConf.length >= 6) {
        if (pass == passConf) {
            label_pass_conf.className = 'label-float valid'
            warning_pass_conf.innerHTML = ''
        } else {
            label_pass_conf.className = 'label-float invalid'
            warning_pass_conf.innerHTML = 'As senhas não conferem'
        }
    } else {
        label_pass_conf.className = 'label-float missing'
        warning_pass_conf.innerHTML = 'Senha com menos de 6 digitos'
    }
}