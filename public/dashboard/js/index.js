const farmTableId = document.getElementById("farm-table")
const farmStatus = ['critico', 'moderado', 'controlado']
const area = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

farmTableId.addEventListener('load', tablesInit())
function tablesInit(){

    // Redefinindo tabelas
    farmTableId.innerHTML = ` 
        <!-- Tabela das áreas mais instáveis -->
        <article class="box">
            <h2 class="critico">
                Locais menos estáveis
            </h2>
            <table>
                <tbody id="table1">
                    <tr class="critico">
                        <th>Área</th>
                        <th>Temperatura</th>
                        <th>Umidade</th>
                        <th>Status</th>
                    </tr>
                </tbody>
            </table>
        </article>
        
        <!-- Tabela das áreas mais estáveis -->
        <article class="box">
            <h2 class="controlado">
                Locais mais estáveis
            </h2>
            <table>
                <tbody id="table2">
                    <tr class="controlado">
                        <th>Área</th>
                        <th>Temperatura</th>
                        <th>Umidade</th>
                        <th>Status</th>
                    </tr>
                </tbody>
            </table>
        </article>
    </section> 
    `

    tables()
}

function tables() {
    // Criando a tabela dos locais mais estáveis
    const farmTable1 = document.getElementById("table1")
    const farmTable2 = document.getElementById("table2")
    for (let i = 0; i < area.length; i++) {
        let status = parseInt(Math.random() * 3); // Gerando o status aleatóriamente
        // let status = i % 3;
        farmTable1.insertAdjacentHTML("beforeEnd", `
                <tr class="${farmStatus[status]}">
                    <td>Área ${area[i]}</td>
                    <td>13</td>
                    <td>13</td>
                    <td style="text-transform: capitalize;" >${farmStatus[status]}</td>
                </tr>
        `)
    }

    for (let i = 0; i < area.length; i++) {
        let status = parseInt(Math.random() * 3); // Gerando o status aleatóriamente
        // let status = i % 3;
        farmTable2.insertAdjacentHTML("beforeEnd", `
                <tr class="${farmStatus[status]}">
                    <td>Área ${area[i]}</td>
                    <td>13</td>
                    <td>13</td>
                    <td style="text-transform: capitalize;" >${farmStatus[status]}</td>
                </tr>
        `)
    }
    
    chart1()
}

// Primeiro gráfico - Linha : Decidir o que terá
function chart1() {
    const chart = document.getElementById('chart-1').getContext('2d')

    // Dados para testes
    let umidade = []
    let label = []
    const limit = parseInt(Math.random() * 4) + 3

    for (let i = 1; i <= limit; i++) {
        umidade.push(parseInt(Math.random() * 99) + 1)
        label.push('Área ' + i)
    }

    const chartConfig = new Chart(chart, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Umidade',
                data: umidade,
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
            },
        }
    });
}