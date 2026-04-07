const MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const regras={
  SP:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"São Paulo"},
  RJ:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Rio de Janeiro"},
  MG:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Minas Gerais"},
  RS:{d:{1:[7],2:[8],3:[9],4:[10],5:[11],6:[12],7:[1],8:[2],9:[3],0:[4,5,6]},n:"Rio Grande do Sul"},
  PR:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Paraná"},
  SC:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Santa Catarina"},
  BA:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10,11,12]},n:"Bahia"},
  GO:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Goiás"},
  PE:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Pernambuco"},
  CE:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Ceará"},
  PA:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Pará"},
  MA:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Maranhão"},
  AM:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Amazonas"},
  ES:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Espírito Santo"},
  RN:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Rio Grande do Norte"},
  PB:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Paraíba"},
  AL:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Alagoas"},
  PI:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Piauí"},
  DF:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Distrito Federal"},
  MT:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Mato Grosso"},
  MS:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Mato Grosso do Sul"},
  RO:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Rondônia"},
  AC:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Acre"},
  AP:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Amapá"},
  RR:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Roraima"},
  TO:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Tocantins"},
  SE:{d:{1:[1],2:[2],3:[3],4:[4],5:[5],6:[6],7:[7],8:[8],9:[9],0:[10]},n:"Sergipe"},
};

function calcular(){
  const digitoVal=document.getElementById('digito').value.trim();
  const ufVal=document.getElementById('estado').value;
  const emissaoVal=document.getElementById('emissao').value;
  const area=document.getElementById('result-area');
  if(digitoVal===''||!ufVal||!emissaoVal){
    area.innerHTML=`<div class="result warn"><span class="badge w"><span class="dot"></span>Atenção</span><div class="result-title">Preencha todos os campos</div><div class="result-detail">Informe o dígito da placa, o estado e a data de emissão da CRLV.</div></div>`;
    return;
  }
  const digito=parseInt(digitoVal);
  const r=regras[ufVal];
  const mesesVenc=r.d[digito];
  const emissao=new Date(emissaoVal+'T00:00:00');
  const anoVenc=emissao.getFullYear()+1;
  const mesVencPrincipal=mesesVenc[mesesVenc.length-1];
  const dataVenc=new Date(anoVenc,mesVencPrincipal-1,31);
  const hoje=new Date();
  const dias=Math.ceil((dataVenc-hoje)/(1000*60*60*24));
  const vencida=dias<0;
  const proxima=dias>=0&&dias<=30;
  const mesesNomes=mesesVenc.map(m=>MESES[m-1]).join(', ');
  let cls,bc,bt,titulo,detalhe;
  if(vencida){cls='invalid';bc='i';bt='Vencida';titulo=`Licenciamento vencido há ${Math.abs(dias)} dias`;detalhe=`O prazo encerrou em ${MESES[mesVencPrincipal-1]} de ${anoVenc} para ${r.n}. Regularize para evitar multas e apreensão do veículo.`;}
  else if(proxima){cls='warn';bc='w';bt='Vence em breve';titulo=`Vence em ${dias} ${dias===1?'dia':'dias'}`;detalhe=`Seu licenciamento vence em ${MESES[mesVencPrincipal-1]}/${anoVenc} (${r.n}). Providencie o pagamento do IPVA e DPVAT/SPVAT.`;}
  else{cls='valid';bc='v';bt='Regular';titulo=`CRLV válida até ${MESES[mesVencPrincipal-1]}/${anoVenc}`;detalhe=`Veículo com licenciamento em dia em ${r.n}. Restam ${dias} dias até o vencimento.`;}

  const pills=MESES.map((m,i)=>`<span class="month-pill${mesesVenc.includes(i+1)?' active':''}">${m.slice(0,3)}</span>`).join('');

  area.innerHTML=`
    <div class="result ${cls}">
      <span class="badge ${bc}"><span class="dot"></span>${bt}</span>
      <div class="result-title">${titulo}</div>
      <div class="result-detail">${detalhe}</div>
    </div>
    <div class="info-box">
      <div class="info-title">Meses de vencimento — placa final ${digito} · ${ufVal}</div>
      <div class="months-grid">${pills}</div>
      <div class="meta">
        <span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1"/><path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          Emissão: ${emissao.toLocaleDateString('pt-BR')}
        </span>
        <span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1"/><path d="M6 3.5V6l1.5 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
          Ano de referência: ${anoVenc}
        </span>
      </div>
    </div>`;
}
document.getElementById('emissao').max=new Date().toISOString().split('T')[0];