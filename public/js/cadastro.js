// Função para exibir/esconder a senha
function seePass() {
    let eye = document.getElementById('i_eye_pass')
    let pass = document.getElementById('inp_pass')
    
    if (pass.type == 'password') {
        eye.className = 'fa-solid fa-eye-slash'
        pass.type = 'text'
    }else{
        pass.type = 'password'
        eye.className = 'fa-solid fa-eye'
    }
}

// Função para exibir/esconder a confirmação da senha
function seePassConf() {
    let eye = document.getElementById('i_eye_pass_conf')
    let pass = document.getElementById('inp_pass_conf')
    
    if (pass.type == 'password') {
        eye.className = 'fa-solid fa-eye-slash'
        pass.type = 'text'
    }else{
        pass.type = 'password'
        eye.className = 'fa-solid fa-eye'
    }
}