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
  SP:{ d:{1:[7],2:[7],3:[8],4:[8],5:[9],6:[9],7:[10],8:[10],9:[11],0:[12]}, exercicio:"MESMO_ANO", n:"São Paulo" },
  SC:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"MESMO_ANO", n:"Santa Catarina" },
  PR:{ d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]}, exercicio:"MESMO_ANO", n:"Paraná" },
  RJ:{ d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]}, exercicio:"MESMO_ANO", n:"Rio de Janeiro" },

  CE:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"ANO_SEGUINTE", n:"Ceará" },
  MG:{ d:{1:[3],2:[4],3:[5],4:[6],5:[7],6:[8],7:[9],8:[10],9:[11],0:[12]}, exercicio:"ANO_SEGUINTE", n:"Minas Gerais" },
  RS:{ d:{1:[7],2:[8],3:[9],4:[10],5:[11],6:[12],7:[1],8:[2],9:[3],0:[4]}, exercicio:"ANO_SEGUINTE", n:"Rio Grande do Sul" }
};

/* =========================
   FUNÇÃO PRINCIPAL
========================= */
function calcular(){
  const digitoVal  = document.getElementById("digito").value.trim();
  const ufVal      = document.getElementById("estado").value;
  const emissaoVal = document.getElementById("emissao").value;
  const area       = document.getElementById("result-area");

  if(digitoVal === "" || !ufVal || !emissaoVal){
    area.innerHTML = `
      <div class="result warn">
        <span class="badge w"><span class="dot"></span>Atenção</span>
        <div class="result-title">Preencha todos os campos</div>
        <div class="result-detail">Informe o dígito da placa, o estado e a data de emissão da CRLV.</div>
      </div>`;
    return;
  }

  const digito = parseInt(digitoVal);
  const r = regras[ufVal];
  const emissao = new Date(emissaoVal + "T00:00:00");

  /* ✅ ANO DE VENCIMENTO CORRETO */
  const anoBase = emissao.getFullYear();
  const anoVenc = r.exercicio === "ANO_SEGUINTE" ? anoBase + 1 : anoBase;

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
    detalhe = `O prazo encerrou em ${dataVenc.toLocaleDateString("pt-BR")} (${r.n}). Regularize para evitar multa e apreensão.`;
  }
  else if(proxima){
    cls = "warn"; bc = "w"; bt = "Vence em breve";
    titulo = `Vence em ${dias} ${dias === 1 ? "dia" : "dias"}`;
    detalhe = `O licenciamento vence em ${dataVenc.toLocaleDateString("pt-BR")} (${r.n}).`;
  }
  else{
    cls = "valid"; bc = "v"; bt = "Regular";
    titulo = `CRLV válida até ${dataVenc.toLocaleDateString("pt-BR")}`;
    detalhe = `Veículo regular em ${r.n}. Restam ${dias} dias até o vencimento.`;
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