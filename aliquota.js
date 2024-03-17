document.addEventListener('DOMContentLoaded', function() {
    const btnCalcular = document.querySelector('button[type="button"]');

    btnCalcular.addEventListener('click', function() {
        const receitaBruta = parseFloat(document.getElementById('num1').value);
        const anexoSelecionado = document.getElementById('anexos').value;

        const resultado = calcularImpostos(receitaBruta, anexoSelecionado);
        exibirResultado(resultado, anexoSelecionado);
    });
});

function calcularImpostos(receitaBruta, anexoSelecionado) {
    // Definição das alíquotas conforme o anexo selecionado
    let faixas;
    switch (anexoSelecionado) {
        case 'Anexo1':
            faixas = [
                { ate: 180000, aliquota: 4.00 },
                { ate: 360000, aliquota: 7.30 },
                { ate: 720000, aliquota: 9.50 },
                { ate: 1800000, aliquota: 10.70 },
                { ate: 3600000, aliquota: 14.30 },
                { ate: 4800000, aliquota: 19.00 }
            ];
            break;
        case 'Anexo2':
            faixas = [
                { ate: 180000, aliquota: 4.50 },
                { ate: 360000, aliquota: 7.80 },
                { ate: 720000, aliquota: 10.00 },
                { ate: 1800000, aliquota: 11.20 },
                { ate: 3600000, aliquota: 14.70 },
                { ate: 4800000, aliquota: 30.00 }
            ];
            break;
        case 'Anexo3':
            faixas = [
                { ate: 180000, aliquota: 6.00 },
                { ate: 360000, aliquota: 11.20 },
                { ate: 720000, aliquota: 13.50 },
                { ate: 1800000, aliquota: 16.00 },
                { ate: 3600000, aliquota: 21.00 },
                { ate: 4800000, aliquota: 33.00 }
            ];
            break;
        case 'Anexo4':
            faixas = [
                { ate: 180000, aliquota: 4.50 },
                { ate: 360000, aliquota: 9.00 },
                { ate: 720000, aliquota: 10.20 },
                { ate: 1800000, aliquota: 14.00 },
                { ate: 3600000, aliquota: 22.00 },
                { ate: 4800000, aliquota: 33.00 }
            ];
            break;
        case 'Anexo5':
            faixas = [
                { ate: 180000, aliquota: 15.50 },
                { ate: 360000, aliquota: 18.00 },
                { ate: 720000, aliquota: 19.50 },
                { ate: 1800000, aliquota: 20.50 },
                { ate: 3600000, aliquota: 23.00 },
                { ate: 4800000, aliquota: 30.50 }
            ];
            break;
        default:
            return null;
    }

    // Encontrar a faixa de receita
    const faixa = faixas.find(f => receitaBruta <= f.ate);

    // Cálculo dos impostos
    let irpj = 0.22; // Exemplo fictício
    let csll = 0.14; // Exemplo fictício
    let cofins = 0.51; // Exemplo fictício
    let pis = 0.11; // Exemplo fictício
    let cpp = 1.66; // Exemplo fictício
    let icms = 1.36; // Exemplo fictício
    let iss = 0; // Exemplo fictício
    let ipi = 0; // Exemplo fictício

    if (faixa) {
        const aliquota = faixa.aliquota / 100;
        irpj = receitaBruta * irpj * aliquota;
        csll = receitaBruta * csll * aliquota;
        cofins = receitaBruta * cofins * aliquota;
        pis = receitaBruta * pis * aliquota;
        cpp = receitaBruta * cpp * aliquota;
        icms = receitaBruta * icms * aliquota;
        // Considerando que ISS e IPI não têm desconto do valor recolhido
        return {
            receitaBruta: receitaBruta,
            aliquota: faixa.aliquota,
            irpj: irpj,
            csll: csll,
            cofins: cofins,
            pis: pis,
            cpp: cpp,
            icms: icms,
            iss: iss,
            ipi: ipi
        };
    } else {
        return null;
    }
}

function exibirResultado(resultado, anexoSelecionado) {
    // Remover a tabela anterior, se existir
    const tabelaAnterior = document.getElementById('tabela-resultado');
    if (tabelaAnterior) {
        tabelaAnterior.remove();
    }

    const table = document.createElement('table');
    table.id = 'tabela-resultado';


    switch (anexoSelecionado) {
        case 'Anexo1':
            table.innerHTML = `
        <tr>
            <th>Receita Bruta em 12 meses</th>
            <th>Alíquota</th>
            <th>IRPJ</th>
            <th>CSLL</th>
            <th>COFINS</th>
            <th>PIS</th>
            <th>CPP</th>
            <th>ICMS</th>
        </tr>
        <tr>
            <td>${resultado.receitaBruta}</td>
            <td>${resultado.aliquota}%</td>
            <td>${resultado.irpj.toFixed(2)}%</td>
            <td>${resultado.csll.toFixed(2)}%</td>
            <td>${resultado.cofins.toFixed(2)}%</td>
            <td>${resultado.pis.toFixed(2)}%</td>
            <td>${resultado.cpp.toFixed(2)}%</td>
            <td>${resultado.icms.toFixed(2)}%</td>
        </tr>
    `;
            break;
        case 'Anexo2':
            table.innerHTML = `
        <tr>
            <th>Receita Bruta em 12 meses</th>
            <th>Alíquota</th>
            <th>IRPJ</th>
            <th>CSLL</th>
            <th>COFINS</th>
            <th>PIS</th>
            <th>CPP</th>
            <th>ICMS</th>
            <th>IPI</th>
        </tr>
        <tr>
            <td>${resultado.receitaBruta}</td>
            <td>${resultado.aliquota}%</td>
            <td>${resultado.irpj.toFixed(2)}%</td>
            <td>${resultado.csll.toFixed(2)}%</td>
            <td>${resultado.cofins.toFixed(2)}%</td>
            <td>${resultado.pis.toFixed(2)}%</td>
            <td>${resultado.cpp.toFixed(2)}%</td>
            <td>${resultado.icms.toFixed(2)}%</td>
            <td>${resultado.ipi.toFixed(2)}%</td>
        </tr>
    `;
            break;
        case 'Anexo3':
            table.innerHTML = `
        <tr>
            <th>Receita Bruta em 12 meses</th>
            <th>Alíquota</th>
            <th>IRPJ</th>
            <th>CSLL</th>
            <th>COFINS</th>
            <th>PIS</th>
            <th>CPP</th>
            <th>ISS</th>
        </tr>
        <tr>
            <td>${resultado.receitaBruta}</td>
            <td>${resultado.aliquota}%</td>
            <td>${resultado.irpj.toFixed(2)}%</td>
            <td>${resultado.csll.toFixed(2)}%</td>
            <td>${resultado.cofins.toFixed(2)}%</td>
            <td>${resultado.pis.toFixed(2)}%</td>
            <td>${resultado.cpp.toFixed(2)}%</td>
            <td>${resultado.iss.toFixed(2)}%</td>
        </tr>
    `;
            break;
        case 'Anexo4':
            table.innerHTML = `
        <tr>
            <th>Receita Bruta em 12 meses</th>
            <th>Alíquota</th>
            <th>IRPJ</th>
            <th>CSLL</th>
            <th>COFINS</th>
            <th>PIS</th>
            <th>ISS</th>
        </tr>
        <tr>
            <td>${resultado.receitaBruta}</td>
            <td>${resultado.aliquota}%</td>
            <td>${resultado.irpj.toFixed(2)}%</td>
            <td>${resultado.csll.toFixed(2)}%</td>
            <td>${resultado.cofins.toFixed(2)}%</td>
            <td>${resultado.pis.toFixed(2)}%</td>
            <td>${resultado.iss.toFixed(2)}%</td>
        </tr>
    `;
            break;
        case 'Anexo5':
            table.innerHTML = `
        <tr>
            <th>Receita Bruta em 12 meses</th>
            <th>Alíquota</th>
            <th>IRPJ</th>
            <th>CSLL</th>
            <th>COFINS</th>
            <th>PIS</th>
            <th>CPP</th>
            <th>ISS</th>
        </tr>
        <tr>
            <td>${resultado.receitaBruta}</td>
            <td>${resultado.aliquota}%</td>
            <td>${resultado.irpj.toFixed(2)}%</td>
            <td>${resultado.csll.toFixed(2)}%</td>
            <td>${resultado.cofins.toFixed(2)}%</td>
            <td>${resultado.pis.toFixed(2)}%</td>
            <td>${resultado.cpp.toFixed(2)}%</td>
            <td>${resultado.iss.toFixed(2)}%</td>
        </tr>
    `;
            break;
        default:
            return null;

    }

    document.body.appendChild(table);
}
