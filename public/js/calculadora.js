//Pegando o ano atual e colocando no rodapé
const actDate = new Date();
const actYear = actDate.getFullYear();

document.getElementById("spn_year").innerHTML = actYear

function calcular() {
    var corpName = document.getElementById("inp_name").value // Nome da empresa
    var farm = document.getElementById("inp_farm").value // Tamanho da lavoura
    var sack = document.getElementById("inp_sack").value // Quantidade de saca por hectare
    var modal = document.getElementById("calc_modal");
    var span = document.getElementsByClassName("close")[0];

    // Lucro do cliente
    var harvest = sack * 87.87
    var gain = harvest * farm

    // Lucro com o sistema
    var sys_gain = gain * 1.16

    // Formatando os números para a localização referente ao browser
    var gain = (gain).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    var sys_gain = (sys_gain).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    
    // Imprimindo a mensagem
    var phrase = `Olá ${corpName}, sua lavoura lucra R$${gain}, 
    com o nosso sistema você poderá lucrar até <b>R$${sys_gain}!!</b>`

    document.getElementById("calc_res").innerHTML = phrase

    // Tornando o modal visivel
    modal.style.display = "block";

    // Quando o usuário clicar <span> (x), fechar o modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Quando o usuário clicar fora do modal, fechar o modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}