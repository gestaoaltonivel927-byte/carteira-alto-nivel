import { useState, useEffect, useMemo } from "react";

// ─── CONFIGURAÇÃO ─────────────────────────────────────────────────────────────
const SENHA_ACESSO = "Altonivel26*";
const SB_URL = "https://clokqryjtrrvuddcluzl.supabase.co";
const SB_KEY = "sb_publishable_Gp_PBosUq-S04-JJC4542w_Dfk2MDFV";

// ─── DADOS INICIAIS ───────────────────────────────────────────────────────────
const SEED = [
  { nome:"ALAMEDA JUNDIAÍ", sindico:"Giovanni", unidades:200, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ALTO NÍVEL", sindico:"", unidades:87, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ANTARES", sindico:"Jorge", unidades:29, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ANTÔNIO CARDOSO", sindico:"Marlene", unidades:19, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ARAGUAIA", sindico:"Wilma", unidades:148, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ARCOS DO CERRADO", sindico:"Lindomar", unidades:240, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ATENAS", sindico:"Denis", unidades:96, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"AVANT", sindico:"Juliana", unidades:12, tipo:"Comercial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"AVENIDA PARQUE", sindico:"João", unidades:547, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"BARCELONA", sindico:"Jorge", unidades:32, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"BELVEDERE", sindico:"Wesley", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"BERLIM", sindico:"Jorge", unidades:16, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"BRISAS DA MATA", sindico:"Hermes", unidades:36, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"CALIFÓRNIA", sindico:"Luzineide", unidades:129, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"CARVALHO", sindico:"Leonardo", unidades:18, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"CENTRO EMPRESARIAL JUNDIAÍ", sindico:"Juliana", unidades:30, tipo:"Comercial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"CHÁCARAS AMERICANAS", sindico:"Leonardo", unidades:24, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"CREMONA", sindico:"Mauri", unidades:44, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DEZ MORADAS", sindico:"Lúcia", unidades:10, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DOM AFONSO", sindico:"Gabriel Cândido", unidades:54, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DOM VICTÓRIO", sindico:"Gabriel", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DOMINIC", sindico:"Ronaldo", unidades:48, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DONA MARIA PAIXÃO", sindico:"Leonardo", unidades:22, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DONA NAJLA", sindico:"Ruba", unidades:8, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"DUNAS DOURADAS", sindico:"Wallace", unidades:52, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"EXECUTIVE PRIVÊ", sindico:"Mauri", unidades:42, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"FENICIA", sindico:"Lauren", unidades:68, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"FORMA OPUS", sindico:"Mário", unidades:63, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"GABRIELA", sindico:"Marden", unidades:58, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"GEMINI", sindico:"Lea", unidades:80, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"GRANADO", sindico:"Natielle", unidades:192, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"GRAND TROPICAL", sindico:"Cristiane", unidades:394, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ICARAÍ", sindico:"Danilo", unidades:18, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"INGÁ", sindico:"Leonardo", unidades:47, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"ITAIM", sindico:"Regiane", unidades:13, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"JAMAICA", sindico:"Jhonata", unidades:42, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"LAGOA FORMOSA", sindico:"Wesley", unidades:28, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"LEBLON", sindico:"Leonardo", unidades:12, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MARACANÃ", sindico:"Gabriel", unidades:48, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MARIA DAS GRAÇAS", sindico:"Jorge", unidades:8, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MARLENE II", sindico:"Jorge", unidades:12, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MONTANA", sindico:"Gabriel Cândido", unidades:12, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MORADA DO BOSQUE", sindico:"José Nunes", unidades:24, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"MORUMBI", sindico:"Junio", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"OÁSIS", sindico:"Jean", unidades:32, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"PALAZZO DI VERONA", sindico:"Lariana", unidades:60, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"PINHEIROS", sindico:"Caroline", unidades:18, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"PORTO BELLO", sindico:"Mária de Fátima", unidades:40, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"PREMIERE PARK", sindico:"Leonardo", unidades:384, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"REAL", sindico:"Jorge", unidades:20, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"RESERVA DA BASE", sindico:"Jorge", unidades:31, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"RESERVA TROPICAL", sindico:"Alef", unidades:184, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"RETIRO DAS CALDAS", sindico:"Sinval", unidades:115, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"RIO NEGRO", sindico:"Rosana", unidades:46, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SALINAS", sindico:"José Aurélio", unidades:80, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SAN GALLEN", sindico:"Sônia", unidades:40, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SAN GIOVANNI", sindico:"Leonardo", unidades:40, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SANTA MARIA", sindico:"Luiz Fábio", unidades:80, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SÃO FRANCISCO", sindico:"Annandy", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SAONA", sindico:"Ana Laura", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SERRA DOURADA", sindico:"Maria Helena", unidades:176, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SOL NASCENTE", sindico:"Everaldo", unidades:120, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"SPOT SMART HOME", sindico:"Beerenice", unidades:38, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"TERRAZO", sindico:"Gabriel", unidades:13, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"TERRA MUNDI", sindico:"Arnaldo", unidades:288, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"TORRE MACEDÔNIA", sindico:"Suely", unidades:57, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"TURIM", sindico:"Clésio", unidades:18, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"TURMALINAS", sindico:"Leonardo", unidades:15, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"UNI LIFE", sindico:"Jorge", unidades:16, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"VALE VERDE", sindico:"Cláudia", unidades:270, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Adilson", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"VENETIAN PALACE", sindico:"João Vítor", unidades:77, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"VENEZA", sindico:"Viviane", unidades:96, tipo:"Residencial", contas_a_pagar:false, cobranca:"Maressa", contador:"Laila", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"VILA MILITAR", sindico:"Alvino/Cida", unidades:64, tipo:"Residencial", contas_a_pagar:false, cobranca:"Thayna", contador:"Roberta", inadimplencia:"baixa", lancamentos:"baixo" },
  { nome:"PRIME SUL", sindico:"Daniel", unidades:352, tipo:"Residencial", contas_a_pagar:true, cobranca:"Thayna", contador:"Catiana", inadimplencia:"baixa", lancamentos:"baixo" },
];

const TC = 100, TK = 90;
const CC = { Maressa:"#0ea5e9", Thayna:"#8b5cf6" };
const CK = { Roberta:"#f59e0b", Catiana:"#10b981", Adilson:"#ef4444", Laila:"#ec4899" };

function hd() {
  return { "Content-Type":"application/json", apikey:SB_KEY, Authorization:"Bearer "+SB_KEY, Prefer:"return=representation" };
}
async function dbGet() {
  const r = await fetch(SB_URL+"/rest/v1/condominios?select=*&order=nome.asc", { headers:hd() });
  if (!r.ok) throw new Error("HTTP "+r.status);
  return r.json();
}
async function dbPatch(id, data) {
  const r = await fetch(SB_URL+"/rest/v1/condominios?id=eq."+id, { method:"PATCH", headers:hd(), body:JSON.stringify(data) });
  if (!r.ok) throw new Error("HTTP "+r.status);
}
async function dbPost(data) {
  const r = await fetch(SB_URL+"/rest/v1/condominios", { method:"POST", headers:hd(), body:JSON.stringify(data) });
  if (!r.ok) throw new Error("HTTP "+r.status);
  return r.json();
}

function calcC(c) {
  const u=c.unidades; let p=u<=20?1:u<=50?2:u<=100?3:u<=200?4:u<=400?5:6;
  if(c.tipo==="Comercial") p++;
  if(c.inadimplencia==="media") p++;
  if(c.inadimplencia==="alta") p+=2;
  return p;
}
function calcK(c) {
  const u=c.unidades; let p=u<=20?1:u<=50?2:u<=100?3:u<=200?4:u<=400?5:6;
  if(c.tipo==="Comercial") p++;
  if(c.contas_a_pagar) p+=2;
  if(c.lancamentos==="medio") p++;
  if(c.lancamentos==="alto") p+=2;
  return p;
}

function Barra({ v, t, cor }) {
  const pct=Math.min((v/t)*100,100), over=v>t, warn=!over&&v/t>=0.85;
  return (
    <div style={{marginTop:6}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3,color:"#94a3b8"}}>
        <span style={{fontWeight:700,color:over?"#ef4444":warn?"#f59e0b":cor}}>{v} pts</span>
        <span>teto {t}</span>
      </div>
      <div style={{background:"#1e293b",borderRadius:4,height:8,overflow:"hidden"}}>
        <div style={{width:pct+"%",height:"100%",borderRadius:4,background:over?"#ef4444":warn?"#f59e0b":cor,transition:"width .4s"}}/>
      </div>
      {over&&<div style={{fontSize:10,color:"#ef4444",marginTop:3,fontWeight:700}}>⚠ SOBRECARGA +{v-t} pts</div>}
      {warn&&<div style={{fontSize:10,color:"#f59e0b",marginTop:3}}>⚡ Próximo do limite</div>}
    </div>
  );
}

// ─── TELA DE SENHA ────────────────────────────────────────────────────────────
function TelaSenha({ onEntrar }) {
  const [s, setS] = useState(""), [err, setErr] = useState(false);
  function tentar() {
    if (s === SENHA_ACESSO) { onEntrar(); }
    else { setErr(true); setS(""); setTimeout(()=>setErr(false),2000); }
  }
  return (
    <div style={{minHeight:"100vh",background:"#080f1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e1b4b)",border:"1px solid #1e293b",borderRadius:16,padding:36,maxWidth:380,width:"100%",textAlign:"center"}}>
        <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:"#fff",margin:"0 auto 20px"}}>A</div>
        <div style={{fontSize:18,fontWeight:700,color:"#f1f5f9",marginBottom:6}}>Alto Nível</div>
        <div style={{fontSize:13,color:"#64748b",marginBottom:28}}>Gestão de Carteira Condominial</div>
        <input
          type="password" value={s} onChange={e=>setS(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&tentar()}
          placeholder="Digite a senha de acesso"
          style={{width:"100%",boxSizing:"border-box",background:"#0f172a",border:"1px solid "+(err?"#ef4444":"#334155"),borderRadius:8,color:"#e2e8f0",padding:"11px 14px",fontSize:14,outline:"none",marginBottom:12,transition:"border .2s"}}
        />
        {err&&<div style={{color:"#ef4444",fontSize:12,marginBottom:10}}>Senha incorreta. Tente novamente.</div>}
        <button onClick={tentar} style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>
          Entrar
        </button>
      </div>
    </div>
  );
}

// ─── TELA DE CARGA INICIAL ────────────────────────────────────────────────────
function TelaSeed({ onSeed, busy, onSair }) {
  return (
    <div style={{minHeight:"100vh",background:"#080f1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:"#e2e8f0"}}>
      <div style={{textAlign:"center",maxWidth:400,padding:24}}>
        <div style={{fontSize:44,marginBottom:16}}>🏢</div>
        <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Banco conectado!</div>
        <div style={{color:"#64748b",fontSize:13,marginBottom:24}}>Primeira utilização detectada. Clique para carregar os 74 condomínios da carteira.</div>
        <button onClick={onSeed} disabled={busy} style={{padding:"12px 28px",background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",display:"block",width:"100%",marginBottom:10}}>
          {busy?"Carregando...":"Carregar carteira inicial"}
        </button>
        <button onClick={onSair} style={{background:"none",border:"none",color:"#475569",fontSize:12,cursor:"pointer"}}>Sair</button>
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [autenticado, setAutenticado] = useState(() => sessionStorage.getItem("an_auth") === "1");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [salvando, setSalvando] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [aba, setAba] = useState("dashboard");
  const [filtroC, setFiltroC] = useState("Todos");
  const [filtroK, setFiltroK] = useState("Todos");
  const [nNome,setNNome]=useState(""); const [nUnid,setNUnid]=useState("");
  const [nTipo,setNTipo]=useState("Residencial"); const [nCAP,setNCAP]=useState(false);
  const [nCobr,setNCobr]=useState("Maressa"); const [nCont,setNCont]=useState("Roberta");
  const [nInad,setNInad]=useState("baixa"); const [nLanc,setNLanc]=useState("baixo");

  function tk(msg,tipo){ setToast({msg,tipo:tipo||"ok"}); setTimeout(()=>setToast(null),3000); }

  function entrar() { sessionStorage.setItem("an_auth","1"); setAutenticado(true); }
  function sair() { sessionStorage.removeItem("an_auth"); setAutenticado(false); setRows([]); }

  async function carregar() {
    setLoading(true);
    try { const d=await dbGet(); setRows(d); }
    catch(e){ tk("Erro ao carregar: "+e.message,"erro"); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (autenticado) carregar(); }, [autenticado]);

  async function seedar() {
    setSeeding(true);
    try { await dbPost(SEED); await carregar(); tk("74 condomínios carregados!"); }
    catch(e){ tk("Erro: "+e.message,"erro"); }
    finally { setSeeding(false); }
  }

  async function atualizar(id, campo, valor) {
    setRows(p=>p.map(r=>r.id===id?{...r,[campo]:valor}:r));
    setSalvando(s=>new Set(s).add(id));
    try { await dbPatch(id,{[campo]:valor}); tk("Salvo ✓"); }
    catch(e){ tk("Erro: "+e.message,"erro"); }
    finally { setSalvando(s=>{const n=new Set(s);n.delete(id);return n;}); }
  }

  async function adicionar() {
    if(!nNome||!nUnid) return;
    const rec={nome:nNome.toUpperCase(),sindico:"",unidades:parseInt(nUnid),tipo:nTipo,contas_a_pagar:nCAP,cobranca:nCobr,contador:nCont,inadimplencia:nInad,lancamentos:nLanc};
    try {
      const res=await dbPost(rec);
      setRows(p=>[...p, Array.isArray(res)?res[0]:res]);
      setNNome(""); setNUnid("");
      tk("Condomínio adicionado!");
    } catch(e){ tk("Erro: "+e.message,"erro"); }
  }

  const rC = useMemo(()=>rows.map(r=>({...r,pts:calcC(r)})),[rows]);
  const rK = useMemo(()=>rows.map(r=>({...r,pts:calcK(r)})),[rows]);
  const stC = useMemo(()=>["Maressa","Thayna"].map(n=>{const l=rC.filter(r=>r.cobranca===n);return{n,cnt:l.length,tot:l.reduce((s,r)=>s+r.pts,0),l};}), [rC]);
  const stK = useMemo(()=>["Roberta","Catiana","Adilson","Laila"].map(n=>{const l=rK.filter(r=>r.contador===n);return{n,cnt:l.length,tot:l.reduce((s,r)=>s+r.pts,0),l};}), [rK]);

  if (!autenticado) return <TelaSenha onEntrar={entrar}/>;
  if (!loading && rows.length===0) return <TelaSeed onSeed={seedar} busy={seeding} onSair={sair}/>;

  const S={background:"#0f172a",border:"1px solid #334155",borderRadius:5,color:"#e2e8f0",padding:"4px 7px",fontSize:11,outline:"none"};
  const I={...S,padding:"7px 10px",fontSize:12};
  function PB({v}){ return <span style={{fontWeight:800,fontSize:14,color:v>=6?"#ef4444":v>=4?"#f59e0b":"#10b981"}}>{v}</span>; }
  function TH({h}){ return <th style={{padding:"8px 9px",borderBottom:"1px solid #1e293b",fontSize:10,fontWeight:600,textTransform:"uppercase",color:"#64748b",textAlign:"left",whiteSpace:"nowrap"}}>{h}</th>; }

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#080f1a",minHeight:"100vh",color:"#e2e8f0"}}>
      {toast&&<div style={{position:"fixed",bottom:20,right:20,zIndex:999,background:toast.tipo==="erro"?"#7f1d1d":"#14532d",border:"1px solid "+(toast.tipo==="erro"?"#ef4444":"#22c55e"),color:toast.tipo==="erro"?"#fca5a5":"#86efac",borderRadius:8,padding:"9px 14px",fontSize:13,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>{toast.msg}</div>}

      <div style={{background:"linear-gradient(135deg,#0f172a,#1e1b4b)",borderBottom:"1px solid #1e293b",padding:"15px 22px 11px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:7,background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#fff"}}>A</div>
            <div>
              <div style={{fontSize:14,fontWeight:700}}>Alto Nível — Gestão de Carteira</div>
              <div style={{fontSize:10,color:"#64748b"}}>SISTEMA DE PONTUAÇÃO PONDERADA · {rows.length} condomínios</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e"}}/>
            <span style={{fontSize:11,color:"#22c55e",fontWeight:600}}>Conectado</span>
            <button onClick={()=>carregar()} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:5,color:"#94a3b8",padding:"3px 9px",fontSize:11,cursor:"pointer"}}>↻</button>
            <button onClick={sair} style={{background:"none",border:"1px solid #334155",borderRadius:5,color:"#475569",padding:"3px 9px",fontSize:11,cursor:"pointer"}}>Sair</button>
          </div>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {[["dashboard","📊 Dashboard"],["cobranca","💼 Cobrança"],["contabilidade","📒 Contabilidade"],["carteira","🏢 Carteira"],["novo","＋ Novo"],["metodologia","📋 Metodologia"]].map(([k,l])=>(
            <button key={k} onClick={()=>setAba(k)} style={{padding:"5px 13px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:aba===k?"linear-gradient(135deg,#0ea5e9,#8b5cf6)":"#1e293b",color:aba===k?"#fff":"#94a3b8"}}>{l}</button>
          ))}
        </div>
      </div>

      {loading&&<div style={{textAlign:"center",padding:40,color:"#64748b",fontSize:13}}>Carregando...</div>}

      {!loading&&<div style={{padding:"18px 22px"}}>

        {aba==="dashboard"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
              {[{l:"Condomínios",v:rows.length,c:"#0ea5e9"},{l:"Unidades",v:rows.reduce((s,r)=>s+r.unidades,0).toLocaleString("pt-BR"),c:"#8b5cf6"},{l:"Com CAP",v:rows.filter(r=>r.contas_a_pagar).length,c:"#f59e0b"},{l:"Inadimplência Alta",v:rows.filter(r=>r.inadimplencia==="alta").length,c:"#ef4444"}].map(k=>(
                <div key={k.l} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:10,color:"#64748b",marginBottom:4,textTransform:"uppercase"}}>{k.l}</div>
                  <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
                </div>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",textTransform:"uppercase"}}>Cobrança</div>
                <div style={{fontSize:10,color:"#475569",background:"#1e293b",borderRadius:4,padding:"2px 8px"}}>Unidades · Tipo · Inadimplência</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {stC.map(p=>(
                  <div key={p.n} style={{background:"#0f172a",border:"1px solid "+CC[p.n]+"33",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:CC[p.n]}}/><span style={{fontWeight:700,fontSize:14}}>{p.n}</span></div>
                      <span style={{fontSize:11,color:"#64748b"}}>{p.cnt} condos</span>
                    </div>
                    <Barra v={p.tot} t={TC} cor={CC[p.n]}/>
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
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",textTransform:"uppercase"}}>Contabilidade</div>
                <div style={{fontSize:10,color:"#475569",background:"#1e293b",borderRadius:4,padding:"2px 8px"}}>Unidades · Tipo · Contas a Pagar · Lançamentos</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {stK.map(p=>(
                  <div key={p.n} style={{background:"#0f172a",border:"1px solid "+CK[p.n]+"33",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}><div style={{width:8,height:8,borderRadius:"50%",background:CK[p.n]}}/><span style={{fontWeight:700,fontSize:13}}>{p.n}</span></div>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{p.cnt} condos</div>
                    <Barra v={p.tot} t={TK} cor={CK[p.n]}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {aba==="cobranca"&&(
          <div>
            <div style={{background:"#0f172a",border:"1px solid #1e3a5f",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:11,color:"#64748b"}}>
              <span style={{color:"#38bdf8",fontWeight:700}}>Critérios — Cobrança: </span>Unidades (1–6 pts) · Tipo Comercial (+1) · Inadimplência Média (+1) / Alta (+2)
            </div>
            <div style={{display:"flex",gap:7,marginBottom:12}}>
              {["Todos","Maressa","Thayna"].map(f=><button key={f} onClick={()=>setFiltroC(f)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filtroC===f?(CC[f]||"#0ea5e9"):"#1e293b",color:"#fff"}}>{f}</button>)}
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH h="Condomínio"/><TH h="Unid."/><TH h="Tipo"/><TH h="Inadimplência"/><TH h="Pts"/><TH h="Responsável"/></tr></thead>
                <tbody>
                  {rC.filter(r=>filtroC==="Todos"||r.cobranca===filtroC).sort((a,b)=>b.pts-a.pts).map(r=>(
                    <tr key={r.id} style={{borderBottom:"1px solid #0f172a",opacity:salvando.has(r.id)?0.6:1}}>
                      <td style={{padding:"8px 9px",fontWeight:600}}>{r.nome}{salvando.has(r.id)&&<span style={{fontSize:9,color:"#64748b",marginLeft:6}}>salvando...</span>}</td>
                      <td style={{padding:"8px 9px",color:"#94a3b8"}}>{r.unidades}</td>
                      <td style={{padding:"8px 9px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                      <td style={{padding:"8px 9px"}}><select value={r.inadimplencia||"baixa"} onChange={e=>atualizar(r.id,"inadimplencia",e.target.value)} style={S}><option value="baixa">Baixa +0</option><option value="media">Média +1</option><option value="alta">Alta +2</option></select></td>
                      <td style={{padding:"8px 9px"}}><PB v={r.pts}/></td>
                      <td style={{padding:"8px 9px"}}><select value={r.cobranca||""} onChange={e=>atualizar(r.id,"cobranca",e.target.value)} style={{...S,color:CC[r.cobranca]}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
              {stC.map(p=><div key={p.n} style={{background:"#0f172a",border:"1px solid "+CC[p.n]+"33",borderRadius:9,padding:"10px 12px"}}><span style={{fontWeight:700,color:CC[p.n]}}>{p.n}</span><span style={{color:"#64748b",fontSize:12,marginLeft:8}}>{p.cnt} condos · {p.tot} pts</span><Barra v={p.tot} t={TC} cor={CC[p.n]}/></div>)}
            </div>
          </div>
        )}

        {aba==="contabilidade"&&(
          <div>
            <div style={{background:"#0f172a",border:"1px solid #1e3a5f",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:11,color:"#64748b"}}>
              <span style={{color:"#38bdf8",fontWeight:700}}>Critérios — Contabilidade: </span>Unidades (1–6 pts) · Tipo Comercial (+1) · Contas a Pagar (+2) · Lançamentos Médio (+1) / Alto (+2)
            </div>
            <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
              {["Todos","Roberta","Catiana","Adilson","Laila"].map(f=><button key={f} onClick={()=>setFiltroK(f)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filtroK===f?(CK[f]||"#0ea5e9"):"#1e293b",color:"#fff"}}>{f}</button>)}
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH h="Condomínio"/><TH h="Unid."/><TH h="Tipo"/><TH h="Contas a Pagar"/><TH h="Vol. Lançamentos"/><TH h="Pts"/><TH h="Contador"/></tr></thead>
                <tbody>
                  {rK.filter(r=>filtroK==="Todos"||r.contador===filtroK).sort((a,b)=>b.pts-a.pts).map(r=>(
                    <tr key={r.id} style={{borderBottom:"1px solid #0f172a",opacity:salvando.has(r.id)?0.6:1}}>
                      <td style={{padding:"8px 9px",fontWeight:600}}>{r.nome}</td>
                      <td style={{padding:"8px 9px",color:"#94a3b8"}}>{r.unidades}</td>
                      <td style={{padding:"8px 9px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                      <td style={{padding:"8px 9px"}}><select value={r.contas_a_pagar?"sim":"nao"} onChange={e=>atualizar(r.id,"contas_a_pagar",e.target.value==="sim")} style={S}><option value="nao">Não +0</option><option value="sim">Sim +2</option></select></td>
                      <td style={{padding:"8px 9px"}}><select value={r.lancamentos||"baixo"} onChange={e=>atualizar(r.id,"lancamentos",e.target.value)} style={S}><option value="baixo">Até 20/mês +0</option><option value="medio">21–50/mês +1</option><option value="alto">Acima 50/mês +2</option></select></td>
                      <td style={{padding:"8px 9px"}}><PB v={r.pts}/></td>
                      <td style={{padding:"8px 9px"}}><select value={r.contador||""} onChange={e=>atualizar(r.id,"contador",e.target.value)} style={{...S,color:CK[r.contador]}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:12}}>
              {stK.map(p=><div key={p.n} style={{background:"#0f172a",border:"1px solid "+CK[p.n]+"33",borderRadius:9,padding:"10px 12px"}}><span style={{fontWeight:700,color:CK[p.n]}}>{p.n}</span><span style={{color:"#64748b",fontSize:11,marginLeft:8}}>{p.cnt} condos</span><Barra v={p.tot} t={TK} cor={CK[p.n]}/></div>)}
            </div>
          </div>
        )}

        {aba==="carteira"&&(
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead><tr><TH h="Condomínio"/><TH h="Síndico"/><TH h="Unid."/><TH h="Tipo"/><TH h="CAP"/><TH h="Lançamentos"/><TH h="Inadimpl."/><TH h="Pts C"/><TH h="Pts K"/><TH h="Cobrança"/><TH h="Contador"/></tr></thead>
              <tbody>
                {rows.map(r=>{const pc=calcC(r),pk=calcK(r); return(
                  <tr key={r.id} style={{borderBottom:"1px solid #0f172a",opacity:salvando.has(r.id)?0.6:1}}>
                    <td style={{padding:"7px 8px",fontWeight:600}}>{r.nome}</td>
                    <td style={{padding:"7px 8px",color:"#64748b"}}>{r.sindico||"—"}</td>
                    <td style={{padding:"7px 8px",color:"#94a3b8"}}>{r.unidades}</td>
                    <td style={{padding:"7px 8px"}}><span style={{fontSize:10,color:r.tipo==="Comercial"?"#f59e0b":"#64748b"}}>{r.tipo}</span></td>
                    <td style={{padding:"7px 8px"}}><select value={r.contas_a_pagar?"sim":"nao"} onChange={e=>atualizar(r.id,"contas_a_pagar",e.target.value==="sim")} style={{...S,fontSize:10}}><option value="nao">Não</option><option value="sim">Sim</option></select></td>
                    <td style={{padding:"7px 8px"}}><select value={r.lancamentos||"baixo"} onChange={e=>atualizar(r.id,"lancamentos",e.target.value)} style={{...S,fontSize:10}}><option value="baixo">Baixo</option><option value="medio">Médio</option><option value="alto">Alto</option></select></td>
                    <td style={{padding:"7px 8px"}}><select value={r.inadimplencia||"baixa"} onChange={e=>atualizar(r.id,"inadimplencia",e.target.value)} style={{...S,fontSize:10}}><option value="baixa">Baixa</option><option value="media">Média</option><option value="alta">Alta</option></select></td>
                    <td style={{padding:"7px 8px"}}><PB v={pc}/></td>
                    <td style={{padding:"7px 8px"}}><PB v={pk}/></td>
                    <td style={{padding:"7px 8px"}}><select value={r.cobranca||""} onChange={e=>atualizar(r.id,"cobranca",e.target.value)} style={{...S,color:CC[r.cobranca],fontSize:10}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select></td>
                    <td style={{padding:"7px 8px"}}><select value={r.contador||""} onChange={e=>atualizar(r.id,"contador",e.target.value)} style={{...S,color:CK[r.contador],fontSize:10}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select></td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        )}

        {aba==="novo"&&(
          <div style={{maxWidth:480}}>
            <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:20}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Adicionar novo cliente</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  ["Nome",<input value={nNome} onChange={e=>setNNome(e.target.value)} style={{...I,width:"100%",boxSizing:"border-box"}} placeholder="RESIDENCIAL PARQUE"/>],
                  ["Unidades",<input type="number" value={nUnid} onChange={e=>setNUnid(e.target.value)} style={{...I,width:"100%",boxSizing:"border-box"}} placeholder="120"/>],
                  ["Tipo",<select value={nTipo} onChange={e=>setNTipo(e.target.value)} style={{...S,width:"100%"}}><option value="Residencial">Residencial</option><option value="Comercial">Comercial (+1)</option></select>],
                  ["Contas a pagar",<select value={nCAP?"s":"n"} onChange={e=>setNCAP(e.target.value==="s")} style={{...S,width:"100%"}}><option value="n">Não</option><option value="s">Sim (+2)</option></select>],
                  ["Inadimplência",<select value={nInad} onChange={e=>setNInad(e.target.value)} style={{...S,width:"100%"}}><option value="baixa">Baixa +0</option><option value="media">Média +1</option><option value="alta">Alta +2</option></select>],
                  ["Vol. lançamentos",<select value={nLanc} onChange={e=>setNLanc(e.target.value)} style={{...S,width:"100%"}}><option value="baixo">Até 20/mês +0</option><option value="medio">21–50/mês +1</option><option value="alto">Acima 50/mês +2</option></select>],
                  ["Cobrança",<select value={nCobr} onChange={e=>setNCobr(e.target.value)} style={{...S,width:"100%",color:CC[nCobr]}}><option value="Maressa">Maressa</option><option value="Thayna">Thayna</option></select>],
                  ["Contador",<select value={nCont} onChange={e=>setNCont(e.target.value)} style={{...S,width:"100%",color:CK[nCont]}}>{["Roberta","Catiana","Adilson","Laila"].map(n=><option key={n} value={n}>{n}</option>)}</select>],
                ].map(([l,el])=>(
                  <div key={l}><label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:4}}>{l}</label>{el}</div>
                ))}
              </div>
              {nUnid&&(()=>{
                const pc=calcC({unidades:parseInt(nUnid||0),tipo:nTipo,inadimplencia:nInad});
                const pk=calcK({unidades:parseInt(nUnid||0),tipo:nTipo,contas_a_pagar:nCAP,lancamentos:nLanc});
                const sc=stC.find(x=>x.n===nCobr), sk=stK.find(x=>x.n===nCont);
                const nc=sc.tot+pc, nk=sk.tot+pk;
                return(
                  <div style={{background:"#1e293b",borderRadius:8,padding:12,marginTop:12}}>
                    <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>Impacto na carteira:</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                      {[{l:"Pts Cobr.",v:pc,c:pc>=5?"#ef4444":"#f59e0b"},{l:"Pts Cont.",v:pk,c:pk>=5?"#ef4444":"#f59e0b"},{l:nCobr+" após",v:nc,c:nc>TC?"#ef4444":"#10b981",a:nc>TC},{l:nCont+" após",v:nk,c:nk>TK?"#ef4444":"#10b981",a:nk>TK}].map(k=>(
                        <div key={k.l} style={{textAlign:"center"}}>
                          <div style={{color:"#64748b",fontSize:10,marginBottom:3}}>{k.l}</div>
                          <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
                          {k.a&&<div style={{fontSize:9,color:"#ef4444"}}>⚠ SOBRECARGA</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              <button onClick={adicionar} style={{marginTop:14,width:"100%",padding:"10px",background:"linear-gradient(135deg,#0ea5e9,#8b5cf6)",border:"none",borderRadius:7,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                Salvar no banco
              </button>
            </div>
          </div>
        )}

        {aba==="metodologia"&&(
          <div style={{maxWidth:700}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:16,color:"#f1f5f9"}}>Metodologia — Sistema de Pontuação Ponderada</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <div style={{background:"#0f172a",border:"1px solid #0ea5e933",borderRadius:12,padding:18}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:8,height:8,borderRadius:"50%",background:"#0ea5e9"}}/><span style={{fontWeight:700,fontSize:14,color:"#0ea5e9"}}>Cobrança</span></div>
                {[{f:"Unidades",v:"≤20→1pt · 21-50→2pts · 51-100→3pts · 101-200→4pts · 201-400→5pts · 400+→6pts"},{f:"Tipo Comercial",v:"+1 pt"},{f:"Inadimplência Média",v:"+1 pt"},{f:"Inadimplência Alta",v:"+2 pts"}].map(r=>(
                  <div key={r.f} style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #1e293b"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#e2e8f0",marginBottom:3}}>{r.f}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{r.v}</div>
                  </div>
                ))}
                <div style={{background:"#0ea5e911",borderRadius:6,padding:"8px 10px",fontSize:11}}><span style={{color:"#0ea5e9",fontWeight:700}}>Teto: 100 pts por analista</span></div>
              </div>
              <div style={{background:"#0f172a",border:"1px solid #8b5cf633",borderRadius:12,padding:18}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:8,height:8,borderRadius:"50%",background:"#8b5cf6"}}/><span style={{fontWeight:700,fontSize:14,color:"#8b5cf6"}}>Contabilidade</span></div>
                {[{f:"Unidades",v:"≤20→1pt · 21-50→2pts · 51-100→3pts · 101-200→4pts · 201-400→5pts · 400+→6pts"},{f:"Tipo Comercial",v:"+1 pt"},{f:"Contas a Pagar",v:"+2 pts"},{f:"Lançamentos 21–50/mês",v:"+1 pt"},{f:"Lançamentos acima de 50/mês",v:"+2 pts"}].map(r=>(
                  <div key={r.f} style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #1e293b"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#e2e8f0",marginBottom:3}}>{r.f}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{r.v}</div>
                  </div>
                ))}
                <div style={{background:"#8b5cf611",borderRadius:6,padding:"8px 10px",fontSize:11}}><span style={{color:"#8b5cf6",fontWeight:700}}>Teto: 90 pts por contador</span></div>
              </div>
            </div>
            <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:16,fontSize:12}}>
              <div style={{fontWeight:700,color:"#f59e0b",marginBottom:10}}>⚡ Regra de entrada de novos clientes</div>
              <div style={{color:"#94a3b8",lineHeight:1.9}}>
                1. Calcule os pontos do novo condomínio (aba ＋ Novo)<br/>
                2. Verifique quem tem capacidade disponível antes de atribuir<br/>
                3. Nunca atribua se gerar sobrecarga — redistribua primeiro<br/>
                4. Revisão semestral obrigatória da carteira completa
              </div>
            </div>
          </div>
        )}

      </div>}
    </div>
  );
}
