// Função para realizar a adição
function adicao(num1, num2) {
    return num1 + num2;
}

// Função para realizar a subtração
function subtracao(num1, num2) {
    return num1 - num2;
}

// Função para realizar a multiplicação
function multiplicacao(num1, num2) {
    return num1 * num2;
}

// Função para realizar a divisão
function divisao(num1, num2) {
    if (num2 !== 0) {
        return num1 / num2;
    } else {
        return "Não é possível dividir por zero";
    }
}

// Função para realizar a potenciação
function potenciacao(num1, num2) {
    return Math.pow(num1, num2);
}

// Função principal chamada ao clicar no botão
function calcular() {
    // Obtenha os valores dos campos de entrada
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);

    // Obtenha a opção selecionada no menu suspenso
    var operacao = document.getElementById("operacao").value;

    // Realize a operação selecionada
    var resultado;

    switch (operacao) {
        case "adicao":
            resultado = adicao(num1, num2);
            break;
        case "subtracao":
            resultado = subtracao(num1, num2);
            break;
        case "multiplicacao":
            resultado = multiplicacao(num1, num2);
            break;
        case "divisao":
            resultado = divisao(num1, num2);
            break;
        case "potenciacao":
            resultado = potenciacao(num1, num2);
            break;
        default:
            resultado = "Selecione uma operação válida";
    }

    document.getElementById("resultado").value = resultado
}
