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

// Primeiro gráfico - Linha : Decidir o que terá
const chart_1 = document.getElementById('chart_1').getContext('2d');
const chart1 = new Chart(chart_1, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});