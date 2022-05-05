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

// Vetor
var farmListId = document.getElementById("farm_list")

farmListId.addEventListener('load', listFarm())
function listFarm() {
    // Número identificador (id) da fazenda 
    let farm = [2, 1, 3]
    // Classes (css) de status da fazenda
    let farmStatus = ['critical', 'moderate', 'controlled']
    // Pegando um número aleatório entre os id's

    // Criando 
    let farmPosition = farm.length - 1
    for (let i = 0; i <= farmPosition; i++) {
        // let status = parseInt(Math.random() * 3);
        let status = i%3;
        let farmList = document.getElementById("farm_list")
        farmList.insertAdjacentHTML("beforeEnd", `
            <article id='${farm[i]}' class="farm ${farmStatus[status]}">
                <div class="farm-position">
                    <h1>Fazenda ${farm[i]}</h1>
                    <img src="../assets/svg/down-arrow.svg">
                </div>
            </article>
        `)
    }
    setTimeout(() => {
        document.getElementById(farm[0]).click(chartGen)
    }, 0);
}

farmListId.addEventListener('click', chartGen)
function chartGen(farmId) {
    let farmContentId = document.getElementById("farm_content")
    farmContentId.innerHTML = `
    <section id="dashboard${farmId.target.id}">
        <h2>Fazenda ${farmId.target.id}</h2>
        <section class="container">
            <article class="fill">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_1" width="1200" height="281"></canvas>
                </div>
            </article>
        </section>

        <section class="container">
            <article class="box">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_2" width="100%" height="40"></canvas>
                </div>
            </article>

            <article class="box">
                <div style="position: relative; height:93.5%; width:100%">
                    <canvas id="chart_3" width="100%" height="40"></canvas>
                </div>
            </article>
        </section>
    </section>
    `
    chart1()
    chart2()
    chart3()
}
// Gráficos



// Primeiro gráfico - Linha : Decidir o que terá
function chart1() {
    const chart_1 = document.getElementById('chart_1').getContext('2d');
    const chart = new Chart(chart_1, {
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
}

// Segundo gráfico - Barra : Decidir o que terá
function chart2() {
    const chart_2 = document.getElementById('chart_2').getContext('2d');
    const chart = new Chart(chart_2, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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
}


// Terceiro gráfico - Misto? : Decidir o que terá
function chart3() {
    const chart_3 = document.getElementById('chart_3').getContext('2d');
    const chart = new Chart(chart_3, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Bar Dataset',
                data: [10, 20, 30, 40],
                // this dataset is drawn below
                order: 2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Line Dataset',
                data: [10, 50, 1, 30],
                type: 'line',
                // this dataset is drawn on top
                order: 1,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    '#74025c'
                ],
                borderWidth: 2
            }],
            labels: ['January', 'February', 'March', 'April']
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
