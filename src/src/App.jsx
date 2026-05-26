import { useState, useEffect, useMemo } from "react";

const SEED = [
  { id:1, nome:"ALAMEDA JUNDIAÍ", sindico:"Giovanni", unidades:200, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:2, nome:"ALTO NÍVEL", sindico:"", unidades:87, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"", inadimplencia:"baixa" },
  { id:3, nome:"ANTARES", sindico:"Jorge", unidades:29, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:4, nome:"ANTÔNIO CARDOSO", sindico:"Marlene", unidades:19, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:5, nome:"ARAGUAIA", sindico:"Wilma", unidades:148, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:6, nome:"ARCOS DO CERRADO", sindico:"Lindomar", unidades:240, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa" },
  { id:7, nome:"ATENAS", sindico:"Denis", unidades:96, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:8, nome:"AVANT", sindico:"Juliana", unidades:12, tipo:"Comercial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:9, nome:"AVENIDA PARQUE", sindico:"João", unidades:547, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:10, nome:"BARCELONA", sindico:"Jorge", unidades:32, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:11, nome:"BELVEDERE", sindico:"Wesley", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Em integração", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:12, nome:"BERLIM", sindico:"Jorge", unidades:16, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:13, nome:"BRISAS DA MATA", sindico:"Hermes", unidades:36, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:14, nome:"CALIFÓRNIA", sindico:"Luzineide", unidades:129, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:15, nome:"CARVALHO", sindico:"Leonardo", unidades:18, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:16, nome:"CENTRO EMPRESARIAL JUNDIAÍ", sindico:"Juliana", unidades:30, tipo:"Comercial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:17, nome:"CHÁCARAS AMERICANAS", sindico:"Leonardo", unidades:24, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:18, nome:"CREMONA", sindico:"Mauri", unidades:44, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa" },
  { id:19, nome:"DEZ MORADAS", sindico:"Lúcia", unidades:10, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:20, nome:"DOM AFONSO", sindico:"Gabriel Cândido", unidades:54, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:21, nome:"DOM VICTÓRIO", sindico:"Gabriel", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:22, nome:"DOMINIC", sindico:"Ronaldo", unidades:48, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:23, nome:"DONA MARIA PAIXÃO", sindico:"Leonardo", unidades:22, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:24, nome:"DONA NAJLA", sindico:"Ruba", unidades:8, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:25, nome:"DUNAS DOURADAS", sindico:"Wallace", unidades:52, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:26, nome:"EXECUTIVE PRIVÊ", sindico:"Mauri", unidades:42, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa" },
  { id:27, nome:"FENICIA", sindico:"Lauren", unidades:68, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:28, nome:"FORMA OPUS", sindico:"Mário", unidades:63, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:29, nome:"GABRIELA", sindico:"Marden", unidades:58, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa" },
  { id:30, nome:"GEMINI", sindico:"Lea", unidades:80, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:31, nome:"GRANADO", sindico:"Natielle", unidades:192, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:32, nome:"GRAND TROPICAL", sindico:"Cristiane", unidades:394, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:33, nome:"ICARAÍ", sindico:"Danilo", unidades:18, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:34, nome:"INGÁ", sindico:"Leonardo", unidades:47, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:35, nome:"ITAIM", sindico:"Regiane", unidades:13, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:36, nome:"JAMAICA", sindico:"Jhonata", unidades:42, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:37, nome:"LAGOA FORMOSA", sindico:"Wesley", unidades:28, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:38, nome:"LEBLON", sindico:"Leonardo", unidades:12, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa" },
  { id:39, nome:"MARACANÃ", sindico:"Gabriel", unidades:48, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:40, nome:"MARIA DAS GRAÇAS", sindico:"Jorge", unidades:8, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:41, nome:"MARLENE II", sindico:"Jorge", unidades:12, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:42, nome:"MONTANA", sindico:"Gabriel Cândido", unidades:12, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:43, nome:"MORADA DO BOSQUE", sindico:"José Nunes", unidades:24, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:44, nome:"MORUMBI", sindico:"Junio", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:45, nome:"OÁSIS", sindico:"Jean", unidades:32, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:46, nome:"PALAZZO DI VERONA", sindico:"Lariana", unidades:60, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:47, nome:"PINHEIROS", sindico:"Caroline", unidades:18, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:48, nome:"PORTO BELLO", sindico:"Mária de Fátima", unidades:40, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:49, nome:"PREMIERE PARK", sindico:"Leonardo", unidades:384, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:50, nome:"REAL", sindico:"Jorge", unidades:20, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:51, nome:"RESERVA DA BASE", sindico:"Jorge", unidades:31, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:52, nome:"RESERVA TROPICAL", sindico:"Alef", unidades:184, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:53, nome:"RETIRO DAS CALDAS", sindico:"Sinval", unidades:115, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:54, nome:"RIO NEGRO", sindico:"Rosana", unidades:46, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:55, nome:"SALINAS", sindico:"José Aurélio", unidades:80, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:56, nome:"SAN GALLEN", sindico:"Sônia", unidades:40, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:57, nome:"SAN GIOVANNI", sindico:"Leonardo", unidades:40, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:58, nome:"SANTA MARIA", sindico:"Luiz Fábio", unidades:80, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:59, nome:"SÃO FRANCISCO", sindico:"Annandy", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:60, nome:"SAONA", sindico:"Ana Laura", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:61, nome:"SERRA DOURADA", sindico:"Maria Helena", unidades:176, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa" },
  { id:62, nome:"SOL NASCENTE", sindico:"Everaldo", unidades:120, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:63, nome:"SPOT SMART HOME", sindico:"Beerenice", unidades:38, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa" },
  { id:64, nome:"TERRAZO", sindico:"Gabriel", unidades:13, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa" },
  { id:65, nome:"TERRA MUNDI", sindico:"Arnaldo", unidades:288, tipo:"Residencial", contas_a_pagar:false, integracao:"Em integração", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:66, nome:"TORRE MACEDÔNIA", sindico:"Suely", unidades:57, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:67, nome:"TURIM", sindico:"Clésio", unidades:18, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa" },
  { id:68, nome:"TURMALINAS", sindico:"Leonardo", unidades:15, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
  { id:69, nome:"UNI LIFE", sindico:"Jorge", unidades:16, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa" },
  { id:70, nome:"VALE VERDE", sindico:"Cláudia", unidades:270, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa" },
  { id:71, nome:"VENETIAN PALACE", sindico:"João Vítor", unidades:77, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:72, nome:"VENEZA", sindico:"Viviane", unidades:96, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa" },
  { id:73, nome:"VILA MILITAR", sindico:"Alvino/Cida", unidades:64, tipo:"Residencial", contas_a_pagar:false, integracao:"Concluído", cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa" },
  { id:74, nome:"PRIME SUL", sindico:"Daniel", unidades:352, tipo:"Residencial", contas_a_pagar:true, integracao:"Em integração", cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa" },
];

const TC = 100, TK = 90;
const CC = { Maressa:"#0ea5e9", Thayna:"#8b5cf6" };
const CK = { Roberta:"#f59e0b", Catiana:"#10b981", Adilson:"#ef4444", Laila:"#ec4899" };

function calcPts(c) {
  const u = c.unidades;
  let p = u<=20?1:u<=50?2:u<=100?3:u<=200?4:u<=400?5:6;
  if (c.tipo==="Comercial") p++;
  if (c.contas_a_pagar) p+=2;
  if (c.integracao==="Em integração") p++;
  if (c.inadimplencia==="media") p++;
  if (c.inadimplencia==="alta") p+=2;
  return p;
}

async function salvarStorage(rows) {
  try { await window.storage.set("carteira-an", JSON.stringify(rows)); } catch(e) { console.error(e); }
}

async function carregarStorage() {
  try {
    const r = await window.storage.get("carteira-an");
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}

function Barra({ valor, teto, cor }) {
  const pct = Math.min((valor/teto)*100, 100);
  const over = valor > teto, warn = !over && valor/teto >= 0.85;
  return (
    <div style={{marginTop:6}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3,color:"#94a3b8"}}>
        <span style={{fontWeight:700,color:over?"#ef4444":warn?"#f59e0b":cor}}>{valor} pts</span>
        <span>teto {teto}</span>
      </div>
      <div style={{background:"#1e293b",borderRadius:4,height:8,overflow:"hidden"}}>
        <div style={{width:pct+"%",height:"100%",borderRadius:4,background:over?"#ef4444":warn?"#f59e0b":cor,transition:"width .4s"}}/>
      </div>
      {over && <div style={{fontSize:10,color:"#ef4444",marginTop:3,fontWeight:700}}>⚠ SOBRECARGA +{valor-teto} pts</div>}
      {warn && <div style={{fontSize:10,color:"#f59e0b",marginTop:3}}>⚡ Próximo do limite</div>}
    </div>
  );
}

export default function App() {
  const [rows, setRows] = useState(null);
  const [aba, setAba] = useState("dashboard");
  const [filtroC, setFiltroC] = useState("Todos");
  const [filtroK, setFiltroK] = useState("Todos");
  const [toast, setToast] = useState(null);
  const [nNome,setNNome]=useState(""); const [nUnid,setNUnid]=useState("");
  const [nTipo,setNTipo]=useState("Residencial"); const [nCAP,setNCAP]=useState(false);
  const [nInteg,setNInteg]=useState("Em integração"); const [nCobr,setNCobr]=useState("Maressa");
  const [nCont,setNCont]=useState("Roberta"); const [nInad,setNInad]=useState("baixa");

  useEffect(() => {
    carregarStorage().then(dados => {
      setRows(dados || SEED);
    });
  }, []);

  function toast_(msg, tipo) { setToast({msg,tipo:tipo||"ok"}); setTimeout(()=>setToast(null),3000); }

  function atualizar(id, campo, valor) {
    setRows(prev => {
      const novo = prev.map(r => r.id===id ? {...r,[campo]:valor} : r);
      salvarStorage(novo).then(() => toast_("Salvo ✓"));
      return novo;
    });
  }

  function adicionarCondo() {
    if (!nNome || !nUnid) return;
    const novoId = Math.max(...(rows||[]).map(r=>r.id), 0) + 1;
    const novo = { id:novoId, nome:nNome.toUpperCase(), sindico:"", unidades:parseInt(nUnid), tipo:nTipo, contas_a_pagar:nCAP, integracao:nInteg, cobranca:nCobr, contador:nCont, inadimplencia:nInad };
    setRows(prev => {
      const atualizado = [...prev, novo];
      salvarStorage(atualizado).then(() => toast_("Condomínio adicionado!"));
      return atualizado;
    });
    setNNome(""); setNUnid("");
  }

  const rowsPts = useMemo(() => (rows||[]).map(r => ({...r, pts:calcPts(r)})), [rows]);
  const stC = useMemo(() => ["Maressa","Thayna"].map(n => { const l=rowsPts.filter(r=>r.cobranca===n); return {n,cnt:l.length,tot:l.reduce((s,r)=>s+r.pts,0),l}; }), [rowsPts]);
  const stK = useMemo(() => ["Roberta","Catiana","Adilson","Laila"].map(n => { const l=rowsPts.filter(r=>r.contador===n); return {n,cnt:l.length,tot:l.reduce((s,r)=>s+r.pts,0),l}; }), [rowsPts]);

  if (rows === null) return <div style={{minHeight:"100vh",background:"#080f1a",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14}}>Carregando...</div>;

  const SEL = {background:"#0f172a",border:"1px solid #334155",borderRadius:5,color:"#e2e8f0",padding:"4px 7px",fontSize:11,outline:"none"};
  const INP = {...SEL, padding:"7px 10px", fontSize:12};
  function PB({v}) { return <span style={{fontWeight:800,fontSize:14,color:v>=5?"#ef4444":v>=3?"#f59e0b":"#10b981"}}>{v}</span>; }
  function SB({v}) { const em=v==="Em integração"; return <span style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:em?"#f59e0b22":"#10b98122",color:em?"#f59e0b":"#10b981"}}>{em?"⚡ Integrando":"✓ OK"}</span>; }
  function TH({h}) { return <th style={{padding:"8px 9px",borderBottom:"1px solid #1e293b",fontSize:10,fontWeight:600,textTransform:"uppercase",color:"#64748b",textAlign:"left",whiteSpace:"nowrap"}}>{h}</th>; }

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#080f1a",minHeight:"100vh",color:"#e2e8f0"}}>
      {toast && <div style={{position:"fixed",bottom:20,right:20,zIndex:999,background:toast.tipo==="erro"?"#7f1d1d":"#14532d",border:"1px solid "+(toast.tipo==="erro"?"#ef4444":"#22c55e"),color:toast.tipo==="erro"?"#fca5a5":"#86efac",borderRadius:8,padding:"9px 14px",fontSize:13,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>{toast.msg}</div>}

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e1b4b)",borderBottom:"1px solid #1e293b",padding:"15px 22px 11px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:7,background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#fff"}}>A</div>
            <div>
              <div style={{fontSize:14,fontWeight:700}}>Alto Nível — Gestão de Carteira</div>
              <div style={{fontSize:10,color:"#64748b"}}>SISTEMA DE PONTUAÇÃO PONDERADA · {rows.length} condomínios</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e"}}/>
            <span style={{fontSize:11,color:"#22c55e",fontWeight:600}}>Dados salvos</span>
          </div>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {[["dashboard","📊 Dashboard"],["cobranca","💼 Cobrança"],["contabilidade","📒 Contabilidade"],["carteira","🏢 Carteira"],["novo","＋ Novo"]].map(([k,l])=>(
            <button key={k} onClick={()=>setAba(k)} style={{padding:"5px 13px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:aba===k?"linear-gradient(135deg,#0ea5e9,#8b5cf6)":"#1e293b",color:aba===k?"#fff":"#94a3b8"}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"18px 22px"}}>

        {/* DASHBOARD */}
        {aba==="dashboard" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
              {[{l:"Condomínios",v:rows.length,c:"#0ea5e9"},{l:"Unidades",v:rows.reduce((s,r)=>s+r.unidades,0).toLocaleString("pt-BR"),c:"#8b5cf6"},{l:"Pontos Totais",v:rowsPts.reduce((s,r)=>s+r.pts,0),c:"#10b981"},{l:"Em Integração",v:rows.filter(r=>r.integracao==="Em integração").length,c:"#f59e0b"}].map(k=>(
                <div key={k.l} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:"#64748b",marginBottom:4,textTransform:"uppercase"}}>{k.l}</div>
                  <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",marginBottom:8,textTransform:"uppercase"}}>Cobrança</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {stC.map(p=>(
                  <div key={p.n} style={{background:"#0f172a",border:"1px solid "+CC[p.n]+"33",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:CC[p.n]}}/><span style={{fontWeight:700,fontSize:14}}>{p.n}</span></div>
                      <span style={{fontSize:11,color:"#64748b"}}>{p.cnt} condos</span>
                    </div>
                    <Barra valor={p.tot} teto={TC} cor={CC[p.n]}/>
                    <div style={{marginTop:7,display:"flex",flexWrap:"wrap",gap:3}}>
                      {p.l.filter(r=>r.pts>=4).sort((a,b)=>b.pts-a.pts).slice(0,5).map(r=>(
                        <span key={r.id} style={{fontSize:10,padding:"2px 6px",borderRadius:20,background:"#1e293b",color:"#94a3b8",border:"1px solid #334155"}}>{r.nome} <span style={{color:CC[p.n]}}>{r.pts}p</span></span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",marginBottom:8,textTransform:"uppercase"}}>Contabilidade</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {stK.map(p=>(
                  <div key={p.n} style={{background:"#0f172a",border:"1px solid "+CK[p.n]+"33",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}><div style={{width:8,height:8,borderRadius:"50%",background:CK[p.n]}}/><span style={{fontWeight:700,fontSize:13}}>{p.n}</span></div>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{p.cnt} condos</div>
                    <Barra valor={p.tot} teto={TK} cor={CK[p.n]}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COBRANÇA */}
        {aba==="cobranca" && (
          <div>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {["Todos","Maressa","Thayna"].map(f=><button key={f} onClick={()=>setFiltroC(f)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filtroC===f?(CC[f]||"#0ea5e9"):"#1e293b",color:"#fff"}}>{f}</button>)}
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH h="Condomínio"/><TH h="Unid."/><TH h="Tipo"/><TH h="CAP"/><TH h="Integração"/><TH h="Inadimpl."/><TH h="Pts"/><TH h="Cobrança"/></tr></thead>
                <tbody>
                  {rowsPts.filter(r=>filtroC==="Todos"||r.cobranca===filtroC).sort((a,b)=>b.pts-a.pts).map(r=>(
                    <tr key={r.id} style={{borderBottom:"1px solid #0f172a"}}>
                      <td style={{padding:"8px 9px",fontWeight:600}}>{r.nome}</td>
                      <td style={{padding:"8px 9px",color:"#94a3b8"}}>{r.unidades}</td>
                      <td style={{padding:"8px 9px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                      <td style={{padding:"8px 9px"}}><select value={r.contas_a_pagar?"sim":"nao"} onChange={e=>atualizar(r.id,"contas_a_pagar",e.target.value==="sim")} style={SEL}><option value="nao">Não</option><option value="sim">Sim</option></select></td>
                      <td style={{padding:"8px 9px"}}><SB v={r.integracao}/></td>
                      <td style={{padding:"8px 9px"}}><select value={r.inadimplencia||"baixa"} onChange={e=>atualizar(r.id,"inadimplencia",e.target.value)} style={SEL}><option value="baixa">Baixa</option><option value="media">Média +1</option><option value="alta">Alta +2</option></select></td>
                      <td style={{padding:"8px 9px"}}><PB v={r.pts}/></td>
                      <td style={{padding:"8px 9px"}}><select value={r.cobranca||""} onChange={e=>atualizar(r.id,"cobranca",e.target.value)} style={{...SEL,color:CC[r.cobranca]}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
              {stC.map(p=><div key={p.n} style={{background:"#0f172a",border:"1px solid "+CC[p.n]+"33",borderRadius:9,padding:"10px 12px"}}><span style={{fontWeight:700,color:CC[p.n]}}>{p.n}</span><span style={{color:"#64748b",fontSize:12,marginLeft:8}}>{p.cnt} condos · {p.tot} pts</span><Barra valor={p.tot} teto={TC} cor={CC[p.n]}/></div>)}
            </div>
          </div>
        )}

        {/* CONTABILIDADE */}
        {aba==="contabilidade" && (
          <div>
            <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
              {["Todos","Roberta","Catiana","Adilson","Laila"].map(f=><button key={f} onClick={()=>setFiltroK(f)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filtroK===f?(CK[f]||"#0ea5e9"):"#1e293b",color:"#fff"}}>{f}</button>)}
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH h="Condomínio"/><TH h="Unid."/><TH h="Tipo"/><TH h="CAP"/><TH h="Inadimpl."/><TH h="Pts"/><TH h="Contador"/></tr></thead>
                <tbody>
                  {rowsPts.filter(r=>filtroK==="Todos"||r.contador===filtroK).sort((a,b)=>b.pts-a.pts).map(r=>(
                    <tr key={r.id} style={{borderBottom:"1px solid #0f172a"}}>
                      <td style={{padding:"8px 9px",fontWeight:600}}>{r.nome}</td>
                      <td style={{padding:"8px 9px",color:"#94a3b8"}}>{r.unidades}</td>
                      <td style={{padding:"8px 9px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                      <td style={{padding:"8px 9px"}}><select value={r.contas_a_pagar?"sim":"nao"} onChange={e=>atualizar(r.id,"contas_a_pagar",e.target.value==="sim")} style={SEL}><option value="nao">Não</option><option value="sim">Sim</option></select></td>
                      <td style={{padding:"8px 9px"}}><select value={r.inadimplencia||"baixa"} onChange={e=>atualizar(r.id,"inadimplencia",e.target.value)} style={SEL}><option value="baixa">Baixa</option><option value="media">Média +1</option><option value="alta">Alta +2</option></select></td>
                      <td style={{padding:"8px 9px"}}><PB v={r.pts}/></td>
                      <td style={{padding:"8px 9px"}}><select value={r.contador||""} onChange={e=>atualizar(r.id,"contador",e.target.value)} style={{...SEL,color:CK[r.contador]}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:12}}>
              {stK.map(p=><div key={p.n} style={{background:"#0f172a",border:"1px solid "+CK[p.n]+"33",borderRadius:9,padding:"10px 12px"}}><span style={{fontWeight:700,color:CK[p.n]}}>{p.n}</span><span style={{color:"#64748b",fontSize:11,marginLeft:8}}>{p.cnt} condos</span><Barra valor={p.tot} teto={TK} cor={CK[p.n]}/></div>)}
            </div>
          </div>
        )}

        {/* CARTEIRA */}
        {aba==="carteira" && (
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead><tr><TH h="Condomínio"/><TH h="Síndico"/><TH h="Unid."/><TH h="Tipo"/><TH h="CAP"/><TH h="Integração"/><TH h="Inadimpl."/><TH h="Pts"/><TH h="Cobrança"/><TH h="Contador"/></tr></thead>
              <tbody>
                {rowsPts.sort((a,b)=>b.pts-a.pts).map(r=>(
                  <tr key={r.id} style={{borderBottom:"1px solid #0f172a"}}>
                    <td style={{padding:"7px 8px",fontWeight:600}}>{r.nome}</td>
                    <td style={{padding:"7px 8px",color:"#64748b"}}>{r.sindico||"—"}</td>
                    <td style={{padding:"7px 8px",color:"#94a3b8"}}>{r.unidades}</td>
                    <td style={{padding:"7px 8px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                    <td style={{padding:"7px 8px"}}><select value={r.contas_a_pagar?"sim":"nao"} onChange={e=>atualizar(r.id,"contas_a_pagar",e.target.value==="sim")} style={{...SEL,fontSize:10}}><option value="nao">Não</option><option value="sim">Sim</option></select></td>
                    <td style={{padding:"7px 8px"}}><SB v={r.integracao}/></td>
                    <td style={{padding:"7px 8px"}}><select value={r.inadimplencia||"baixa"} onChange={e=>atualizar(r.id,"inadimplencia",e.target.value)} style={{...SEL,fontSize:10}}><option value="baixa">Baixa</option><option value="media">Média</option><option value="alta">Alta</option></select></td>
                    <td style={{padding:"7px 8px"}}><PB v={r.pts}/></td>
                    <td style={{padding:"7px 8px"}}><select value={r.cobranca||""} onChange={e=>atualizar(r.id,"cobranca",e.target.value)} style={{...SEL,color:CC[r.cobranca],fontSize:10}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select></td>
                    <td style={{padding:"7px 8px"}}><select value={r.contador||""} onChange={e=>atualizar(r.id,"contador",e.target.value)} style={{...SEL,color:CK[r.contador],fontSize:10}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* NOVO */}
        {aba==="novo" && (
          <div style={{maxWidth:480}}>
            <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:20}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Adicionar novo cliente</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  ["Nome",<input value={nNome} onChange={e=>setNNome(e.target.value)} style={{...INP,width:"100%",boxSizing:"border-box"}} placeholder="RESIDENCIAL PARQUE"/>],
                  ["Unidades",<input type="number" value={nUnid} onChange={e=>setNUnid(e.target.value)} style={{...INP,width:"100%",boxSizing:"border-box"}} placeholder="120"/>],
                  ["Tipo",<select value={nTipo} onChange={e=>setNTipo(e.target.value)} style={{...SEL,width:"100%"}}><option value="Residencial">Residencial</option><option value="Comercial">Comercial (+1)</option></select>],
                  ["Contas a pagar",<select value={nCAP?"s":"n"} onChange={e=>setNCAP(e.target.value==="s")} style={{...SEL,width:"100%"}}><option value="n">Não</option><option value="s">Sim (+2)</option></select>],
                  ["Integração",<select value={nInteg} onChange={e=>setNInteg(e.target.value)} style={{...SEL,width:"100%"}}><option value="Em integração">Em integração (+1)</option><option value="Concluído">Já integrado</option></select>],
                  ["Inadimplência",<select value={nInad} onChange={e=>setNInad(e.target.value)} style={{...SEL,width:"100%"}}><option value="baixa">Baixa</option><option value="media">Média (+1)</option><option value="alta">Alta (+2)</option></select>],
                  ["Cobrança",<select value={nCobr} onChange={e=>setNCobr(e.target.value)} style={{...SEL,width:"100%",color:CC[nCobr]}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select>],
                  ["Contador",<select value={nCont} onChange={e=>setNCont(e.target.value)} style={{...SEL,width:"100%",color:CK[nCont]}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select>],
                ].map(([l,el])=>(
                  <div key={l}><label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:4}}>{l}</label>{el}</div>
                ))}
              </div>
              {nUnid && (()=>{
                const p=calcPts({unidades:parseInt(nUnid||0),tipo:nTipo,contas_a_pagar:nCAP,integracao:nInteg,inadimplencia:nInad});
                const sc=stC.find(x=>x.n===nCobr), sk=stK.find(x=>x.n===nCont);
                const nc=sc.tot+p, nk=sk.tot+p;
                return(
                  <div style={{background:"#1e293b",borderRadius:8,padding:12,marginTop:12}}>
                    <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>Impacto na carteira:</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      {[{l:"Pts novo",v:p,c:p>=5?"#ef4444":"#f59e0b",a:false},{l:nCobr+" após",v:nc,c:nc>TC?"#ef4444":"#10b981",a:nc>TC},{l:nCont+" após",v:nk,c:nk>TK?"#ef4444":"#10b981",a:nk>TK}].map(k=>(
                        <div key={k.l} style={{textAlign:"center"}}>
                          <div style={{color:"#64748b",fontSize:10,marginBottom:3}}>{k.l}</div>
                          <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
                          {k.a&&<div style={{fontSize:9,color:"#ef4444"}}>⚠ SOBRECARGA</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              <button onClick={adicionarCondo} style={{marginTop:14,width:"100%",padding:"10px",background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",border:"none",borderRadius:7,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                Adicionar à carteira
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
