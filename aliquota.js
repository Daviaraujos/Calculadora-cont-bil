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

    if (faixa) {
        let irpj;
        let csll;
        let cofins;
        let pis;
        let cpp;
        let icms;
        let iss;
        let ipi;

        if (anexoSelecionado === 'Anexo1') {
            // Modificações específicas para o Anexo 1
            irpj = 0.055; 
            csll = 0.035; 
            cofins = 0.1275; 
            pis = 0.0275; 
            cpp = 0.415; 
            icms = 0.34; 
            iss = 0.075; 
            ipi = 0.075; 
            if (faixa.aliquota >= 0.095) {
                cpp = 0.42;
                icms = 0.335;
            } else if (faixa.aliquota >= 0.143) {
                irpj = 0.135;
                csll = 0.10;
                cofins = 0.2827;
                pis = 0.0613;
                cpp = 0.421;
                icms = 0;
            }
        }

        if (anexoSelecionado === 'Anexo2') {
            if (faixa.aliquota >= 0.1470) {
                irpj = 0.085;
                csll = 0.075;
                cofins = 0.2096;
                pis= 0.0454;
                cpp = 0.235;
                ipi = 0.35;
                icms = 0;
        }
    }

        if (anexoSelecionado === 'Anexo3') {
            irpj = 0.04; 
            csll = 0.035; 
            cofins = 0.1282; 
            pis = 0.0278; 
            cpp = 0.434; 
            iss = 0.0335; 
            if (faixa.aliquota >= 0.06) {
                cofins = 0.1405;
                pis = 0.035;
                iss = 0.32;
            }
            if (faixa.aliquota >= 0.112) {
                cofins = 0.1364
                pis = 0.0296;
                iss = 0.325;
            }
            if (faixa.aliquota >= 0.16) {
                cofins = 0.1282;
                pis = 0.278;
                iss = 0.335;
            }
            if (faixa.aliquota >= 0.21) {
                irpj = 0.35;
                csll = 0.15;
                cofins = 0.1603;
                pis = 0.0347;
                cpp = 0.3050;
                iss = 0;
            }
        }

        if (anexoSelecionado === 'Anexo4') {
            irpj = 0.18; 
            csll = 0.152; 
            cofins = 0.1767; 
            pis = 0.0383; 
            iss = 0.445; 
            if (faixa.aliquota >= 0.045) {
                irpj = 0.198; 
                cofins = 0.2055; 
                pis = 0.0445; 
                iss = 0.4; 
            }
            if (faixa.aliquota >= 0.09) {
                irpj = 0.208; 
                cofins = 0.1973; 
                pis = 0.0427; 
            }
            if (faixa.aliquota >= 0.102) {
                irpj = 0.178; 
                csll = 0.192; 
                cofins = 0.189; 
                pis = 0.041; 
            }
            if (faixa.aliquota >= 0.14) {
                irpj = 0.188; 
                csll = 0.192; 
                cofins = 0.1808; 
                pis = 0.0392; 
            }
            if (faixa.aliquota >= 0.22) {
                irpj = 0.535; 
                csll = 0.215; 
                cofins = 0.2022; 
                pis = 0.0445; 
                iss = 0; 
            }
        }

        if (anexoSelecionado === 'Anexo5') {
            irpj = 0.25; 
            csll = 0.15; 
            cofins = 0.141; 
            pis = 0.0305; 
            cpp = 0.2855; 
            iss = 0.14; 
            if (faixa.aliquota >= 0.155) {
                irpj = 0.23; 
                cpp = 0.2785; 
                iss = 0.17; 
            }
            if (faixa.aliquota >= 0.18) {
                irpj = 0.24; 
                cofins = 0.1492
                pis = 0.0323
                cpp = 0.2385; 
                iss = 0.19; 
            }
            if (faixa.aliquota >= 0.195) {
                irpj = 0.21; 
                cofins = 0.1574; 
                pis = 0.0323; 
                iss = 0.21; 
            }
            if (faixa.aliquota >= 0.205) {
                irpj = 0.23; 
                csll = 0.125; 
                cofins = 0.141; 
                pis = 0.0305; 
                iss = 0.235; 
            }
            if (faixa.aliquota >= 0.23) {
                irpj = 0.35; 
                csll = 0.155; 
                cofins = 0.1644; 
                pis = 0.0356; 
                cpp = 0.295; 
                iss = 0; 
            }
        }

        const aliquota = faixa.aliquota;
        irpj *= aliquota;
        csll *= aliquota;
        cofins *= aliquota;
        pis *= aliquota;
        cpp *= aliquota;
        icms *= aliquota;
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

function createTable(data) {
    const table_anexo = document.createElement('table');
    table_anexo.id = 'tabela-anexo';
    const tabelaAnterior2 = document.getElementById('tabela-anexo');

    if (tabelaAnterior2) {
        tabelaAnterior2.remove();
    }

    // Creating the header row
    const headerRow = document.createElement('tr');
    for (const header of Object.keys(data[0])) {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }
    table_anexo.appendChild(headerRow);
    
    // Adding data rows
    for (const item of data) {
        for (let i = 0; i < item["Faixas"].length; i++) {
            const row = document.createElement('tr');
            for (const key of Object.keys(item)) {
                const td = document.createElement('td');
                td.textContent = item[key][i];
                row.appendChild(td);
            }
            table_anexo.appendChild(row);
        }
    }
    
    document.body.appendChild(table_anexo);
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
    
        const data1 = [
            {
                "Faixas": ["1ª Faixa", "2ª Faixa", "3ª Faixa", "4ª Faixa", "5ª Faixa", "6ª Faixa"],
                "IRPJ": ["5,50%", "5,50%", "5,50%", "5,50%", "5,50%", "13,50%"],
                "CSLL": ["3,50%", "3,50%", "3,50%", "3,50%", "3,50%", "10,00%"],
                "Cofins": ["12,74%", "12,74%", "12,74%", "12,74%", "12,74%", "28,27%"],
                "PIS/Pasep": ["2,76%", "2,76%", "2,76%", "2,76%", "2,76%", "6,13%"],
                "CPP": ["41,50%", "41,50%", "42,00%", "42,00%", "42,00%", "42,10%"],
                "ICMS": ["34,00%", "34,00%", "33,50%", "33,50%", "33,50%", ""]
            }];

        createTable(data1);

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

        const data2 = [{
            "Faixas": ["1ª Faixa", "2ª Faixa", "3ª Faixa", "4ª Faixa", "5ª Faixa", "6ª Faixa"],
            "IRPJ": ["5,50%", "5,50%", "5,50%", "5,50%", "5,50%", "8,50%"],
            "CSLL": ["3,50%", "3,50%", "3,50%", "3,50%", "3,50%", "7,50%"],
            "Cofins": ["11,51%", "11,51%", "11,51%", "11,51%", "11,51%", "20,96%"],
            "PIS/Pasep": ["2,49%", "2,49%", "2,49%", "2,49%", "2,49%", "4,54%"],
            "CPP": ["37,50%", "37,50%", "37,50%", "37,50%", "37,50%", "23,50%"],
            "ICMS": ["7,50%", "7,50%", "7,50%", "7,50%", "7,50%", ""]
        }];

        createTable(data2);
        
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

        const data3 = [{
            "Faixas": ["1ª Faixa", "2ª Faixa", "3ª Faixa", "4ª Faixa", "5ª Faixa", "6ª Faixa"],
            "IRPJ": ["4,00%", "4,00%", "4,00%", "4,00%", "4,00%", "35,00%"],
            "CSLL": ["3,50%", "3,50%", "3,50%", "3,50%", "3,50%", "15,00%"],
            "Cofins": ["12,82%", "14,05%", "13,64%", "13,64%", "12,82%", "16,03%"],
            "PIS/Pasep": ["2,78%", "3,05%", "2,96%", "2,96%", "2,78%", "3,47%"],
            "CPP": ["43,40%", "43,40%", "43,40%", "43,40%", "43,40%", "30,50%"],
            "ICMS": ["33,50%", "32,00%", "32,50%", "32,50%", "33,50%", ""]
        }];
        
        createTable(data3);

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
            
        const data4 = [{
            "Faixas": ["1ª Faixa", "2ª Faixa", "3ª Faixa", "4ª Faixa", "5ª Faixa", "6ª Faixa"],
            "IRPJ": ["18,80%", "19,80%", "20,80%", "17,80%", "18,80%", "53,50%"],
            "CSLL": ["15,20%", "15,20%", "15,20%", "19,20%", "19,20%", "21,50%"],
            "Cofins": ["17,67%", "20,55%", "19,73%", "18,90%", "18,08%", "20,55%"],
            "PIS/Pasep": ["3,83%", "4,45%", "4,27%", "4,10%", "3,92%", "4,45%"],
            "CPP": ["", "", "", "", "", ""],
            "ICMS": ["44,50%", "40,00%", "40,00%", "40,00%", "40,00%", ""]
        }];
        
        createTable(data4);

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

        const data5 = [{
            "Faixas": ["1ª Faixa", "2ª Faixa", "3ª Faixa", "4ª Faixa", "5ª Faixa", "6ª Faixa"],
            "IRPJ": ["25,00%", "23,00%", "24,00%", "21,00%", "23,00%", "35,00%"],
            "CSLL": ["15,00%", "15,00%", "15,00%", "15,00%", "12,50%", "15,50%"],
            "Cofins": ["14,10%", "14,10%", "14,92%", "15,74%", "14,10%", "16,44%"],
            "PIS/Pasep": ["3,05%", "3,05%", "3,23%", "3,41%", "3,05%", "3,56%"],
            "CPP": ["28,85%", "27,85%", "23,85%", "23,85%", "23,85%", "29,50%"],
            "ICMS": ["14,00%", "17,00%", "19,00%", "21,00%", "23,50%", ""]
        }];
        
        createTable(data5);
            break;
        default:
            return null;
    }
    document.body.appendChild(table);
}


