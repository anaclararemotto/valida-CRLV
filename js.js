/* =========================
   MESES
========================= */
const MESES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

/* =========================
   REGRAS POR UF
   exercicio:
   - MESMO_ANO  → exige CRLV do próximo exercício logo após o prazo (SP, SC, PR…)
   - ANO_SEGUINTE → CRLV atravessa o ano (CE, MG, RS…)
========================= */
const regras = {
  AC:{ d:{0:[3],1:[3],2:[3],3:[4],4:[4],5:[5],6:[5],7:[6],8:[6],9:[6]}, exercicio:"MESMO_ANO", n:"Acre" },
  AL:{ d:{0:[12],1:[12],2:[12],3:[12],4:[12],5:[12],6:[12],7:[12],8:[12],9:[12]}, exercicio:"MESMO_ANO", n:"Alagoas" },
  AM:{ d:{0:[3],1:[3],2:[4],3:[4],4:[5],5:[5],6:[6],7:[6],8:[7],9:[7]}, exercicio:"MESMO_ANO", n:"Amazonas" },
  AP:{ d:{0:[3],1:[3],2:[3],3:[4],4:[4],5:[5],6:[5],7:[6],8:[6],9:[6]}, exercicio:"MESMO_ANO", n:"Amapá" },
  BA:{ d:{0:[10],1:[10],2:[10],3:[10],4:[10],5:[10],6:[10],7:[10],8:[10],9:[10]}, exercicio:"MESMO_ANO", n:"Bahia" },

  CE:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"ANO_SEGUINTE", n:"Ceará" },

  DF:{ d:{1:[2],2:[3],3:[4],4:[5],5:[6],6:[7],7:[8],8:[9],9:[10],0:[11]}, exercicio:"MESMO_ANO", n:"Distrito Federal" },

  ES:{ d:{1:[9],2:[9],3:[9],4:[9],5:[9],6:[10],7:[10],8:[10],9:[10],0:[10]}, exercicio:"MESMO_ANO", n:"Espírito Santo" },

  GO:{ d:{0:[10],1:[10],2:[10],3:[10],4:[10],5:[10],6:[10],7:[11],8:[11],9:[11]}, exercicio:"MESMO_ANO", n:"Goiás" },

  MA:{ d:{0:[10],1:[10],2:[10],3:[10],4:[10],5:[10],6:[11],7:[11],8:[11],9:[11]}, exercicio:"MESMO_ANO", n:"Maranhão" },

  MG:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"ANO_SEGUINTE", n:"Minas Gerais" },

  MS:{ d:{1:[4],2:[4],3:[5],4:[5],5:[6],6:[6],7:[7],8:[7],9:[7],0:[7]}, exercicio:"MESMO_ANO", n:"Mato Grosso do Sul" },

  MT:{ d:{1:[3],2:[3],3:[4],4:[4],5:[5],6:[5],7:[6],8:[6],9:[6],0:[6]}, exercicio:"MESMO_ANO", n:"Mato Grosso" },

  PA:{ d:{1:[8],2:[8],3:[8],4:[8],5:[9],6:[9],7:[9],8:[9],9:[10],0:[10]}, exercicio:"MESMO_ANO", n:"Pará" },

  PB:{ d:{1:[7],2:[7],3:[8],4:[8],5:[9],6:[9],7:[10],8:[10],9:[11],0:[11]}, exercicio:"MESMO_ANO", n:"Paraíba" },

  PE:{ d:{1:[7],2:[7],3:[7],4:[8],5:[8],6:[8],7:[9],8:[9],9:[9],0:[9]}, exercicio:"MESMO_ANO", n:"Pernambuco" },

  PI:{ d:{1:[7],2:[7],3:[7],4:[8],5:[8],6:[8],7:[9],8:[9],9:[9],0:[9]}, exercicio:"MESMO_ANO", n:"Piauí" },

  PR:{ d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]}, exercicio:"MESMO_ANO", n:"Paraná" },

  RJ:{ d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]}, exercicio:"MESMO_ANO", n:"Rio de Janeiro" },

  RN:{ d:{1:[3],2:[3],3:[4],4:[4],5:[5],6:[5],7:[6],8:[6],9:[7],0:[7]}, exercicio:"MESMO_ANO", n:"Rio Grande do Norte" },

  RO:{ d:{1:[7],2:[7],3:[7],4:[8],5:[8],6:[8],7:[9],8:[9],9:[9],0:[9]}, exercicio:"MESMO_ANO", n:"Rondônia" },

  RR:{ d:{1:[6],2:[6],3:[6],4:[7],5:[7],6:[7],7:[8],8:[8],9:[8],0:[8]}, exercicio:"MESMO_ANO", n:"Roraima" },

  RS:{ d:{1:[7],2:[8],3:[9],4:[10],5:[11],6:[12],7:[1],8:[2],9:[3],0:[4]}, exercicio:"ANO_SEGUINTE", n:"Rio Grande do Sul" },

  SC:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"MESMO_ANO", n:"Santa Catarina" },

  SE:{ d:{1:[3],2:[3],3:[4],4:[4],5:[5],6:[5],7:[6],8:[6],9:[6],0:[6]}, exercicio:"MESMO_ANO", n:"Sergipe" },

  SP:{ d:{1:[7],2:[7],3:[8],4:[8],5:[9],6:[9],7:[10],8:[10],9:[11],0:[12]}, exercicio:"MESMO_ANO", n:"São Paulo" },

  TO:{ d:{1:[10],2:[10],3:[10],4:[10],5:[10],6:[10],7:[11],8:[11],9:[11],0:[11]}, exercicio:"MESMO_ANO", n:"Tocantins" }
};
``

/* =========================
   FUNÇÃO PRINCIPAL
========================= */
function calcular(){
  const digitoVal  = document.getElementById("digito").value.trim();
  const ufVal      = document.getElementById("estado").value;
  const emissaoVal = document.getElementById("emissao").value;
  const area       = document.getElementById("result-area");
  const exercicioVal = document.getElementById("exercicio").value.trim();

  if(digitoVal === "" || !ufVal || !emissaoVal || exercicioVal === ""){
  area.innerHTML = `
    <div class="result warn">
      <span class="badge w"><span class="dot"></span>Atenção</span>
      <div class="result-title">Preencha todos os campos</div>
      <div class="result-detail">
        Informe o dígito da placa, o estado, a data de emissão e o exercício da CRLV.
      </div>
    </div>`;
  return;
}

  const digito = parseInt(digitoVal);
  const r = regras[ufVal];
  const emissao = new Date(emissaoVal + "T00:00:00");

  /* ✅ ANO DE VENCIMENTO CORRETO */
  const exercicioCRLV = parseInt(exercicioVal);
const anoVenc = exercicioCRLV;

  const mesesVenc = r.d[digito];
  const mesVenc   = mesesVenc[mesesVenc.length - 1];

  /* ✅ ÚLTIMO DIA REAL DO MÊS */
  const dataVenc = new Date(anoVenc, mesVenc, 0);

  const hoje = new Date();
  hoje.setHours(0,0,0,0);

  const dias = Math.floor((dataVenc - hoje) / (1000 * 60 * 60 * 24));
  const vencida = dias < 0;
  const proxima = dias >= 0 && dias <= 30;

  let cls, bc, bt, titulo, detalhe;

  if(vencida){
    cls = "invalid"; bc = "i"; bt = "Vencida";
    titulo = `Licenciamento vencido há ${Math.abs(dias)} dias`;
    detalhe = `
  Exercício da CRLV: <strong>${exercicioCRLV}</strong><br>
  O prazo encerrou em ${dataVenc.toLocaleDateString("pt-BR")} (${r.n}).
  Regularize para evitar multa e apreensão.
`;

  }
  else if(proxima){
    cls = "warn"; bc = "w"; bt = "Vence em breve";
    titulo = `Vence em ${dias} ${dias === 1 ? "dia" : "dias"}`;
   detalhe = `
  Exercício da CRLV: <strong>${exercicioCRLV}</strong><br>
  O licenciamento vence em ${dataVenc.toLocaleDateString("pt-BR")} (${r.n}).
`;
``
  }
  else{
    cls = "valid"; bc = "v"; bt = "Regular";
    titulo = `CRLV válida até ${dataVenc.toLocaleDateString("pt-BR")}`;
    detalhe = `
  Exercício da CRLV: <strong>${exercicioCRLV}</strong><br>
  Veículo regular em ${r.n}. Restam ${dias} dias até o vencimento.
`;

  }

  area.innerHTML = `
    <div class="result ${cls}">
      <span class="badge ${bc}"><span class="dot"></span>${bt}</span>
      <div class="result-title">${titulo}</div>
      <div class="result-detail">${detalhe}</div>
    </div>
  `;
}

/* =========================
   LIMITE DATA EMISSÃO
========================= */
document.getElementById("emissao").max =
  new Date().toISOString().split("T")[0];