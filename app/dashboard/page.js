'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/login'
      else setUser(data.user)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!user) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <p style={{ color: '#534AB7' }}>Cargando...</p>
    </div>
  )

  return (
    <div style={{ fontFamily: 'Arial', fontSize: 14, color: '#333', display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh', background: '#fff' }}>

      {/* SIDEBAR */}
      <div style={{ background: '#F8F8F6', borderRight: '1px solid #EBEBEB', padding: '1rem 0' }}>
        <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid #EBEBEB', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2D2358' }}>Creator Hub</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{user.email}</div>
        </div>
        {[
          { id: 'overview', label: 'Resumen', icon: '◈' },
          { id: 'calendar', label: 'Calendario', icon: '◻' },
          { id: 'ideas', label: 'Ideas IA', icon: '✦' },
          { id: 'comments', label: 'Comentarios', icon: '◎' },
          { id: 'trends', label: 'Tendencias', icon: '↑' },
          { id: 'agenda', label: 'Agenda', icon: '▣' },
          { id: 'assistant', label: 'Asistente', icon: '◆' },
        ].map(item => (
          <div key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 1rem', cursor: 'pointer', fontSize: 13, color: activeTab === item.id ? '#2D2358' : '#888', background: activeTab === item.id ? '#fff' : 'transparent', borderRight: activeTab === item.id ? '2px solid #534AB7' : 'none', fontWeight: activeTab === item.id ? 600 : 400 }}>
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
        <div style={{ padding: '1rem', marginTop: '1rem', borderTop: '1px solid #EBEBEB' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '6px', background: '#fff', color: '#534AB7', border: '1px solid #534AB7', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'ideas' && <Ideas />}
        {activeTab === 'comments' && <Comments />}
        {activeTab === 'trends' && <Trends />}
        {activeTab === 'agenda' && <Agenda />}
        {activeTab === 'assistant' && <Assistant />}
      </div>
    </div>
  )
}

// ── ESTILOS COMPARTIDOS ──────────────────────────────────────────
const card = { background: '#fff', border: '1px solid #EBEBEB', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }
const sectionTitle = { fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }
const badge = (bg, color) => ({ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: bg, color, display: 'inline-block', marginTop: 6 })
const aiBtn = { padding: '6px 14px', fontSize: 13, background: '#534AB7', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }

async function callAI(prompt) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: 'Eres un asistente experto en marketing de redes sociales para creadores de contenido hispanohablantes. Responde siempre en español, de forma concisa y práctica.',
      messages: [{ role: 'user', content: prompt }]
    })
  })
  const d = await r.json()
  return d.content?.[0]?.text || 'No se pudo obtener respuesta.'
}

// ── OVERVIEW ────────────────────────────────────────────────────
function Overview() {
  return (
    <div>
      <p style={sectionTitle}>Esta semana</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: '1.5rem' }}>
        {[
          { val: '14.2K', label: 'Seguidores IG', delta: '↑ 3.2%', up: true },
          { val: '8.7K', label: 'Seguidores TK', delta: '↑ 7.8%', up: true },
          { val: '6', label: 'Posts esta semana', delta: 'Meta: 7', up: true },
          { val: '4.1%', label: 'Engagement', delta: '↑ 0.5%', up: true },
        ].map((m, i) => (
          <div key={i} style={{ background: '#F8F8F6', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{m.val}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: m.up ? '#0F6E56' : '#A32D2D', marginTop: 4 }}>{m.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={card}>
          <div style={sectionTitle}>Rendimiento por plataforma</div>
          {[{ name: '📷 Instagram', pct: 65, color: '#534AB7' }, { name: '🎵 TikTok', pct: 35, color: '#1D9E75' }].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i === 0 ? '1px solid #EBEBEB' : 'none' }}>
              <span style={{ fontSize: 13 }}>{p.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 80, height: 4, background: '#EBEBEB', borderRadius: 2 }}>
                  <div style={{ width: `${p.pct}%`, height: 4, background: p.color, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.pct}%</span>
              </div>
            </div>
          ))}
        </div>
        <div style={card}>
          <div style={sectionTitle}>Mejores posts</div>
          {[
            { plat: '📷 IG', title: 'Rutina matutina 🌅', stat: '1,204 likes · 87 comentarios', delta: '8.3% engagement', color: '#534AB7' },
            { plat: '🎵 TK', title: 'POV: primer café', stat: '23K views · 312 likes', delta: 'Viral potencial', color: '#1D9E75' },
          ].map((p, i) => (
            <div key={i} style={{ background: '#F8F8F6', borderRadius: 8, padding: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: p.color, fontWeight: 600, marginBottom: 4 }}>{p.plat}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{p.stat}</div>
              <div style={{ fontSize: 11, color: '#0F6E56', marginTop: 4 }}>↑ {p.delta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── CALENDAR ────────────────────────────────────────────────────
function Calendar() {
  const posts = { 1:'ig',3:'tk',4:'ig',5:'both',7:'ig',8:'tk',10:'ig',12:'both',13:'tk',14:'ig',16:'ig',17:'tk',18:'both',19:'ig',21:'tk',22:'ig',24:'both',25:'ig',26:'tk',27:'both' }
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
  const today = 27

  return (
    <div>
      <p style={sectionTitle}>Mayo 2026</p>
      <div style={card}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
          {days.map(d => <div key={d} style={{ fontSize: 10, color: '#888', textAlign: 'center', padding: '2px 0', fontWeight: 600 }}>{d}</div>)}
          {Array(4).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
            const p = posts[d] || ''
            const bg = p === 'ig' ? '#EEEDFE' : p === 'tk' ? '#E1F5EE' : p === 'both' ? 'linear-gradient(135deg,#EEEDFE 50%,#E1F5EE 50%)' : '#F8F8F6'
            const color = p === 'ig' ? '#3C3489' : p === 'tk' ? '#085041' : p === 'both' ? '#3C3489' : '#888'
            return (
              <div key={d} style={{ aspectRatio: '1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, background: bg, color, border: d === today ? '2px solid #534AB7' : 'none', fontWeight: d === today ? 700 : 400 }}>
                {d}
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {[{ bg: '#EEEDFE', color: '#3C3489', label: 'Instagram' }, { bg: '#E1F5EE', color: '#085041', label: 'TikTok' }, { bg: '#534AB7', color: '#fff', label: 'Ambas' }].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: l.bg }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[{ val: '18', label: 'Posts totales' }, { val: '4.6', label: 'Promedio semanal' }, { val: '78%', label: 'Meta cumplida' }].map((s, i) => (
          <div key={i} style={{ background: '#F8F8F6', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── IDEAS IA ─────────────────────────────────────────────────────
function Ideas() {
  const [platform, setPlatform] = useState('Instagram')
  const [topic, setTopic] = useState('Lifestyle')
  const [format, setFormat] = useState('Reel / Video corto')
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    try {
      const res = await callAI(`Genera 4 ideas creativas de contenido para ${platform} sobre "${topic}" en formato "${format}". Responde SOLO en JSON con array "ideas" de objetos {titulo, descripcion, gancho, plataforma}. Sin texto extra.`)
      const clean = res.replace(/```json|```/g, '').trim()
      const data = JSON.parse(clean)
      setIdeas(data.ideas || [])
    } catch { setIdeas([]) }
    setLoading(false)
  }

  const sel = { fontSize: 13, padding: '6px 10px', borderRadius: 8, border: '1px solid #EBEBEB', background: '#F8F8F6', flex: 1 }

  return (
    <div>
      <p style={sectionTitle}>Generador de ideas con IA</p>
      <div style={card}>
        <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
          <select style={sel} value={platform} onChange={e => setPlatform(e.target.value)}>
            {['Instagram', 'TikTok', 'Ambas'].map(o => <option key={o}>{o}</option>)}
          </select>
          <select style={sel} value={topic} onChange={e => setTopic(e.target.value)}>
            {['Lifestyle', 'Fitness', 'Cocina', 'Viajes', 'Tech', 'Moda', 'Motivación'].map(o => <option key={o}>{o}</option>)}
          </select>
          <select style={sel} value={format} onChange={e => setFormat(e.target.value)}>
            {['Reel / Video corto', 'Carrusel', 'Historia', 'Post estático'].map(o => <option key={o}>{o}</option>)}
          </select>
          <button onClick={generate} disabled={loading} style={aiBtn}>
            {loading ? 'Generando...' : 'Generar ideas ↗'}
          </button>
        </div>
        {ideas.length === 0 && !loading && (
          <p style={{ fontSize: 13, color: '#888' }}>Selecciona los filtros y presiona "Generar ideas" para obtener sugerencias personalizadas.</p>
        )}
        {loading && <p style={{ fontSize: 13, color: '#534AB7' }}>Generando ideas...</p>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {ideas.map((idea, i) => (
            <div key={i} style={{ background: '#F8F8F6', borderRadius: 10, padding: '1rem', border: '1px solid #EBEBEB' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{idea.titulo}</div>
              <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{idea.descripcion}</div>
              <div style={{ fontSize: 11, color: '#333', marginTop: 6, fontStyle: 'italic' }}>"{idea.gancho}"</div>
              <span style={badge('#EEEDFE', '#3C3489')}>{idea.plataforma || platform}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── COMMENTS ────────────────────────────────────────────────────
function Comments() {
  const [analysis, setAnalysis] = useState('Tu audiencia responde muy bien al contenido auténtico. 80% de sentimiento positivo. La pregunta sobre horarios representa una oportunidad — considera un reel explicando tu rutina detallada.')
  const [loading, setLoading] = useState(false)

  const comments = [
    { user: '@mariana_v', plat: '📷 Instagram', text: 'Esto me cambió la vida, llevo 2 semanas siguiendo tu rutina y me siento increíble! 😍', sentiment: 'Positivo', sc: ['#EAF3DE', '#3B6D11'] },
    { user: '@carlos_fit', plat: '📷 Instagram', text: '¿A qué hora te despiertas exactamente? Yo intento pero no logro levantarme antes de las 8am', sentiment: 'Neutral', sc: ['#F1EFE8', '#5F5E5A'] },
    { user: '@user_tk_921', plat: '🎵 TikTok', text: 'jajaja esto soy yo EXACTAMENTE cada mañana 😂', sentiment: 'Positivo', sc: ['#EAF3DE', '#3B6D11'] },
    { user: '@sofia_design', plat: '📷 Instagram', text: 'Qué bueno ver el proceso! Me encanta que muestres todo lo que hay detrás. Muy auténtico ✨', sentiment: 'Positivo', sc: ['#EAF3DE', '#3B6D11'] },
    { user: '@anonymous_123', plat: '🎵 TikTok', text: 'Muy repetitivo, ya vi este tipo de contenido mil veces. Nada original.', sentiment: 'Negativo', sc: ['#FCEBEB', '#A32D2D'] },
  ]

  async function analyze() {
    setLoading(true)
    const res = await callAI(`Analiza estos comentarios de un creador de lifestyle en Instagram y TikTok:\n${comments.map((c, i) => `${i + 1}. "${c.text}"`).join('\n')}\nDa un análisis de 3-4 oraciones sobre sentimiento general, oportunidades de contenido y una recomendación accionable. Máximo 80 palabras.`)
    setAnalysis(res)
    setLoading(false)
  }

  return (
    <div>
      <p style={sectionTitle}>Últimos comentarios</p>
      {comments.map((c, i) => (
        <div key={i} style={{ ...card, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{c.user}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{c.plat}</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: c.sc[0], color: c.sc[1], height: 'fit-content' }}>{c.sentiment}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>{c.text}</div>
        </div>
      ))}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Análisis IA</div>
          <button onClick={analyze} disabled={loading} style={{ ...aiBtn, fontSize: 12, padding: '4px 10px' }}>
            {loading ? 'Analizando...' : 'Actualizar ↗'}
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>{analysis}</p>
      </div>
    </div>
  )
}

// ── TRENDS ───────────────────────────────────────────────────────
function Trends() {
  const [trends, setTrends] = useState([
    { titulo: '"Day in my life" + voz en off', descripcion: 'El formato de narración personal sigue dominando. Engagement 2x superior al promedio.', tags: ['Lifestyle', 'IG Reels', 'TikTok'] },
    { titulo: 'Minimalismo y slow living', descripcion: 'Contenido enfocado en calma y simplicidad. Alta retención y buenos saves.', tags: ['Bienestar', 'Estética'] },
    { titulo: 'Transiciones manuales en TikTok', descripcion: 'Las transiciones sin efectos digitales tienen mayor reach orgánico actualmente.', tags: ['TikTok', 'Edición'] },
    { titulo: 'Carruseles de valor en Instagram', descripcion: 'Carruseles de 7-10 slides con consejos accionables generan alto share y saves.', tags: ['Instagram', 'Educativo'] },
  ])
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const res = await callAI(`Lista 4 tendencias actuales de contenido para Instagram y TikTok en el nicho de lifestyle hispanohablante. Responde SOLO en JSON con array "tendencias" de objetos {titulo, descripcion, tags:[]}. Sin texto extra.`)
      const clean = res.replace(/```json|```/g, '').trim()
      const data = JSON.parse(clean)
      if (data.tendencias) setTrends(data.tendencias)
    } catch {}
    setLoading(false)
  }

  return (
    <div>
      <p style={sectionTitle}>Tendencias en tu nicho</p>
      {trends.map((t, i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: '#534AB7', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{t.titulo}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{t.descripcion}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {(t.tags || []).map((tag, j) => <span key={j} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#E6F1FB', color: '#185FA5' }}>{tag}</span>)}
            </div>
          </div>
        </div>
      ))}
      <button onClick={refresh} disabled={loading} style={aiBtn}>
        {loading ? 'Analizando...' : 'Actualizar tendencias con IA ↗'}
      </button>
    </div>
  )
}

// ── AGENDA ───────────────────────────────────────────────────────
function Agenda() {
  const items = [
    { time: 'Lun 28\n10:00 AM', title: 'Grabar reel "Rutina de noche"', desc: 'Continuación del reel matutino. Alta demanda de la audiencia.', type: 'Post', tc: ['#EEEDFE', '#3C3489'] },
    { time: 'Mar 29\n3:00 PM', title: 'Publicar TikTok "5 hábitos"', desc: 'Video ya grabado, pendiente edición final y subtítulos.', type: 'Post', tc: ['#EEEDFE', '#3C3489'] },
    { time: 'Mié 30\n11:00 AM', title: 'Reunión con marca @organiclab', desc: 'Revisión de propuesta para campaña de mayo.', type: 'Colaboración', tc: ['#FAEEDA', '#633806'] },
    { time: 'Vie 2\n5:00 PM', title: 'Revisión mensual de métricas', desc: 'Analizar desempeño de abril y planear mayo.', type: 'Revisión', tc: ['#E1F5EE', '#085041'] },
    { time: 'Sáb 3\n9:00 AM', title: 'Batch de contenido', desc: 'Grabar 4-5 piezas para la semana siguiente.', type: 'Post', tc: ['#EEEDFE', '#3C3489'] },
  ]
  return (
    <div>
      <p style={sectionTitle}>Próximos compromisos</p>
      {items.map((item, i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 16 }}>
          <div style={{ fontSize: 12, color: '#888', minWidth: 80, whiteSpace: 'pre' }}>{item.time}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#555' }}>{item.desc}</div>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: item.tc[0], color: item.tc[1], display: 'inline-block', marginTop: 6 }}>{item.type}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── ASSISTANT ────────────────────────────────────────────────────
function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hola! Soy tu asistente de contenido 👋 Puedo ayudarte a planear tu estrategia, crear captions, sugerir hashtags, o responder cualquier duda sobre tus redes. ¿En qué te ayudo hoy?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    const res = await callAI(`Eres el asistente de un creador de contenido de lifestyle en Instagram y TikTok. El creador pregunta: "${userMsg}". Responde de forma práctica y concisa en español (máx 3 párrafos).`)
    setMessages(prev => [...prev, { role: 'ai', text: res }])
    setLoading(false)
  }

  return (
    <div>
      <p style={sectionTitle}>Asistente de contenido</p>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.6, maxWidth: '85%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#534AB7' : '#F8F8F6', color: m.role === 'user' ? '#fff' : '#333', border: m.role === 'ai' ? '1px solid #EBEBEB' : 'none' }}>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ padding: '10px 14px', borderRadius: 12, fontSize: 13, background: '#F8F8F6', border: '1px solid #EBEBEB', alignSelf: 'flex-start', color: '#888' }}>Escribiendo...</div>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Escríbeme algo..." style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #EBEBEB', fontSize: 13 }} />
          <button onClick={send} disabled={loading} style={aiBtn}>Enviar</button>
        </div>
      </div>
    </div>
  )
}