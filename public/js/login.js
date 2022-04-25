// Função para exibir/esconder a senha
function seePass() {
    let eye = document.getElementById('i_eye')
    let pass = document.getElementById('inp_pass')
    
    if (pass.type == 'password') {
        eye.className = 'fa-solid fa-eye'
        pass.type = 'text'
    }else{
        pass.type = 'password'
        eye.className = 'fa-solid fa-eye-slash'
    }
}