'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login'
      } else {
        setUser(data.user)
      }
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!user) {
    return (
      <div style={loadingScreen}>
        <p style={{ color: '#6C63FF' }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={layout}>
      {/* SIDEBAR */}
      <aside style={sidebar}>
        <div style={sidebarTop}>
          <h1 style={logo}>Creator Hub</h1>
          <p style={email}>{user.email}</p>
        </div>

        <div style={menu}>
          {[
            { id: 'overview', label: 'Resumen', icon: '◈' },
            { id: 'calendar', label: 'Calendario', icon: '◻' },
            { id: 'ideas', label: 'Ideas IA', icon: '✦' },
            { id: 'comments', label: 'Comentarios', icon: '◎' },
            { id: 'trends', label: 'Tendencias', icon: '↑' },
            { id: 'agenda', label: 'Agenda', icon: '▣' },
            { id: 'assistant', label: 'Asistente', icon: '◆' },
            { id: 'profile', label: 'Mi Perfil', icon: '◉' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...menuItem,
                ...(activeTab === item.id
                  ? activeMenuItem
                  : {}),
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div style={{ padding: 20 }}>
          <button
            onClick={handleLogout}
            style={logoutBtn}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={main}>
        {activeTab === 'overview' && (
          <Overview user={user} />
        )}

        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'ideas' && <Ideas />}
        {activeTab === 'comments' && <Comments />}
        {activeTab === 'trends' && <Trends />}
        {activeTab === 'agenda' && <Agenda />}
        {activeTab === 'assistant' && <Assistant />}
        {activeTab === 'profile' && (
          <Profile user={user} />
        )}
      </main>
    </div>
  )
}

/* ===================================================== */
/* ESTILOS */
/* ===================================================== */

const layout = {
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  minHeight: '100vh',
  background: '#F4F6FA',
  fontFamily: 'Arial',
}

const sidebar = {
  background: '#07142B',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: '1px solid rgba(255,255,255,0.05)',
}

const sidebarTop = {
  padding: 24,
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}

const logo = {
  margin: 0,
  fontSize: 20,
  fontWeight: 700,
}

const email = {
  marginTop: 10,
  color: '#7E8CA8',
  fontSize: 12,
}

const menu = {
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}

const menuItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  borderRadius: 14,
  cursor: 'pointer',
  color: '#B9C3D9',
  fontSize: 15,
  transition: '0.2s',
}

const activeMenuItem = {
  background: '#1A2740',
  color: '#fff',
  fontWeight: 600,
}

const logoutBtn = {
  width: '100%',
  padding: '12px',
  background: 'transparent',
  color: '#fff',
  border: '1px solid #3C4A66',
  borderRadius: 10,
  cursor: 'pointer',
}

const main = {
  padding: 32,
}

const loadingScreen = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#F4F6FA',
}

const card = {
  background: '#fff',
  borderRadius: 24,
  padding: 24,
  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
}

const sectionTitle = {
  color: '#7A839A',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1,
  marginBottom: 18,
}

/* ===================================================== */
/* OVERVIEW */
/* ===================================================== */

function Overview({ user }) {
  return (
    <div>
      <h1
        style={{
          fontSize: 48,
          margin: 0,
          color: '#101828',
        }}
      >
        ¡Hola! 👋
      </h1>

      <p
        style={{
          color: '#667085',
          marginTop: 10,
          marginBottom: 40,
          fontSize: 18,
        }}
      >
        Aquí tienes el resumen de hoy.
      </p>

      {/* STATS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(250px,1fr))',
          gap: 20,
        }}
      >
        <StatCard
          title='Seguidores'
          value='22.9K'
          growth='+2.4%'
          color='#22C55E'
          line='#5B8DEF'
        />

        <StatCard
          title='Alcance'
          value='145K'
          growth='+12%'
          color='#22C55E'
          line='#34D399'
        />

        <StatCard
          title='Engagement'
          value='4.1%'
          growth='-0.5%'
          color='#EF4444'
          line='#F87171'
        />

        <StatCard
          title='Views'
          value='842K'
          growth='+8%'
          color='#22C55E'
          line='#F59E0B'
        />
      </div>

      {/* ROW */}
      <div
        style={{
          marginTop: 26,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 24,
        }}
      >
        {/* RENDIMIENTO */}
        <div style={card}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: 30,
              color: '#101828',
            }}
          >
            Rendimiento por Plataforma
          </h2>

          <PlatformBar
            name='Instagram'
            value='65%'
            color='#E1306C'
            width='65%'
          />

          <PlatformBar
            name='TikTok'
            value='45%'
            color='#111827'
            width='45%'
          />

          <PlatformBar
            name='YouTube'
            value='30%'
            color='#FF0000'
            width='30%'
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
              marginTop: 34,
            }}
          >
            <div
              style={{
                background: '#F7F9FC',
                borderRadius: 18,
                padding: 20,
              }}
            >
              <div
                style={{
                  color: '#98A2B3',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                RETENCIÓN MEDIA
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  marginTop: 10,
                  color: '#101828',
                }}
              >
                64.2%
              </div>

              <div
                style={{
                  color: '#22C55E',
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                ↑ 2.1% esta sem.
              </div>
            </div>

            <div
              style={{
                background: '#F7F9FC',
                borderRadius: 18,
                padding: 20,
              }}
            >
              <div
                style={{
                  color: '#98A2B3',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                CTR GLOBAL
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  marginTop: 10,
                  color: '#101828',
                }}
              >
                8.5%
              </div>

              <div
                style={{
                  color: '#22C55E',
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                ↑ 0.4% esta sem.
              </div>
            </div>
          </div>
        </div>

        {/* CRECIMIENTO */}
        <div style={card}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: 30,
              color: '#101828',
            }}
          >
            Crecimiento de Audiencia
          </h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                border: '16px solid #4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 42,
                fontWeight: 700,
                color: '#4F46E5',
              }}
            >
              +14%
            </div>
          </div>

          <div
            style={{
              color: '#98A2B3',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            DEMOGRAFÍA
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#344054',
              fontSize: 15,
              marginBottom: 10,
            }}
          >
            <span>60% Hombres / 40% Mujeres</span>

            <span>
              España, México, Argentina
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: 14,
              background: '#E5E7EB',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: '60%',
                background: '#3B82F6',
              }}
            />

            <div
              style={{
                width: '40%',
                background: '#EC4899',
              }}
            />
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div style={{ marginTop: 30 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: '#101828',
            }}
          >
            Mejores posts de la semana
          </h2>

          <span
            style={{
              color: '#4F46E5',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ver todo
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(260px,1fr))',
            gap: 20,
          }}
        >
          <PostCard
            image='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop'
            title='Rutina de mañana'
            platform='Instagram'
          />

          <PostCard
            image='https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
            title='Setup minimalista'
            platform='TikTok'
          />

          <PostCard
            image='https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
            title='Mi workflow'
            platform='YouTube'
          />
        </div>
      </div>
    </div>
  )
}

/* ===================================================== */
/* COMPONENTES */
/* ===================================================== */

function StatCard({
  title,
  value,
  growth,
  color,
  line,
}) {
  return (
    <div style={card}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <span
          style={{
            color: '#667085',
            fontSize: 15,
          }}
        >
          {title}
        </span>

        <span
          style={{
            color,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {growth}
        </span>
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 700,
          color: '#101828',
        }}
      >
        {value}
      </div>

      {/* GRAFICO */}
      <svg
        width='100%'
        height='60'
        viewBox='0 0 300 60'
        style={{ marginTop: 20 }}
      >
        <path
          d='M0 40 C40 10, 80 60, 120 30 S200 10, 240 45 S280 50, 300 10'
          stroke={line}
          strokeWidth='4'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
}

function PlatformBar({
  name,
  value,
  color,
  width,
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span style={{ color: '#344054' }}>
          {name}
        </span>

        <span style={{ color: '#667085' }}>
          {value}
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: 10,
          background: '#E5E7EB',
          borderRadius: 20,
        }}
      >
        <div
          style={{
            width,
            height: '100%',
            background: color,
            borderRadius: 20,
          }}
        />
      </div>
    </div>
  )
}

function PostCard({
  image,
  title,
  platform,
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}
    >
      <img
        src={image}
        style={{
          width: '100%',
          height: 240,
          objectFit: 'cover',
        }}
      />

      <div style={{ padding: 18 }}>
        <div
          style={{
            color: '#667085',
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          {platform}
        </div>

        <div
          style={{
            fontWeight: 700,
            color: '#101828',
            fontSize: 18,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  )
}

/* ===================================================== */
/* CALENDAR */
/* ===================================================== */

function Calendar() {
  const [events, setEvents] = useState([
    {
      day: 12,
      title: 'Grabar Reel',
    },
    {
      day: 18,
      title: 'Live TikTok',
    },
  ])

  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')

  function addEvent() {
    if (!title || !day) return

    setEvents(prev => [
      ...prev,
      {
        day: Number(day),
        title,
      },
    ])

    setTitle('')
    setDay('')
  }

  return (
    <div>
      <h1 style={{ color: '#101828' }}>
        Calendario
      </h1>

      <div
        style={{
          ...card,
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(7,1fr)',
            gap: 10,
          }}
        >
          {Array.from(
            { length: 31 },
            (_, i) => i + 1
          ).map(dayNumber => {
            const event = events.find(
              e => e.day === dayNumber
            )

            return (
              <div
                key={dayNumber}
                style={{
                  background: '#F7F9FC',
                  borderRadius: 14,
                  minHeight: 100,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: '#101828',
                  }}
                >
                  {dayNumber}
                </div>

                {event && (
                  <div
                    style={{
                      marginTop: 10,
                      background: '#4F46E5',
                      color: '#fff',
                      padding: 8,
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    {event.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div
          style={{
            marginTop: 30,
            display: 'flex',
            gap: 10,
          }}
        >
          <input
            value={title}
            onChange={e =>
              setTitle(e.target.value)
            }
            placeholder='Evento'
            style={calendarInput}
          />

          <input
            value={day}
            onChange={e =>
              setDay(e.target.value)
            }
            placeholder='Día'
            style={calendarInput}
          />

          <button
            onClick={addEvent}
            style={calendarBtn}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

const calendarInput = {
  padding: '12px',
  borderRadius: 10,
  border: '1px solid #D0D5DD',
  flex: 1,
}

const calendarBtn = {
  padding: '12px 20px',
  border: 'none',
  borderRadius: 10,
  background: '#4F46E5',
  color: '#fff',
  cursor: 'pointer',
}

/* ===================================================== */
/* IDEAS IA */
/* ===================================================== */

async function callAI(prompt) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  const data = await res.json()

  return data.result
}

function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] =
    useState(false)

  async function generateIdeas() {
    setLoading(true)

    try {
      const result = await callAI(
        'Genera 4 ideas virales para Instagram y TikTok'
      )

      setIdeas(result)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <h1 style={{ color: '#101828' }}>
        Ideas IA
      </h1>

      <div style={{ ...card, marginTop: 20 }}>
        <button
          onClick={generateIdeas}
          style={{
            background: '#4F46E5',
            color: '#fff',
            border: 'none',
            padding: '14px 22px',
            borderRadius: 12,
            cursor: 'pointer',
            marginBottom: 30,
          }}
        >
          {loading
            ? 'Generando...'
            : 'Generar ideas con IA'}
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: 20,
          }}
        >
          {ideas.map((idea, i) => (
            <div
              key={i}
              style={{
                background: '#F7F9FC',
                borderRadius: 18,
                padding: 20,
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: '#101828',
                }}
              >
                {idea.title}
              </h3>

              <p
                style={{
                  color: '#667085',
                  lineHeight: 1.6,
                }}
              >
                {idea.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===================================================== */
/* PLACEHOLDERS */
/* ===================================================== */

function Comments() {
  return (
    <div>
      <p style={sectionTitle}>Comentarios</p>

      <div style={card}>
        <p>No hay comentarios todavía.</p>
      </div>
    </div>
  )
}

function Trends() {
  return (
    <div>
      <p style={sectionTitle}>Tendencias</p>

      <div style={card}>
        <p>Tendencias del nicho.</p>
      </div>
    </div>
  )
}

function Agenda() {
  return (
    <div>
      <p style={sectionTitle}>Agenda</p>

      <div style={card}>
        <p>Próximos eventos.</p>
      </div>
    </div>
  )
}

function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hola 👋 Soy tu asistente de contenido. ¿En qué te ayudo hoy?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    const res = await callAI(
      `Eres el asistente de un creador de contenido de lifestyle en Instagram y TikTok. El creador pregunta: "${userMsg}". Responde de forma práctica y concisa en español (máx 3 párrafos). No uses JSON, responde en texto normal.`
    )
    setMessages(prev => [...prev, { role: 'ai', text: res }])
    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: '#101828' }}>Asistente IA</h2>
      <div style={{ border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, marginTop: 10, background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, maxHeight: 400, overflowY: 'auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ background: m.role === 'user' ? '#4F46E5' : '#F7F9FC', color: m.role === 'user' ? '#fff' : '#101828', padding: '10px 14px', borderRadius: 12, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '75%', fontSize: 14, lineHeight: 1.6 }}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div style={{ background: '#F7F9FC', color: '#667085', padding: '10px 14px', borderRadius: 12, alignSelf: 'flex-start', fontSize: 14 }}>
              Escribiendo...
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Escribe algo..." style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #D0D5DD', fontSize: 14, color: '#101828', background: '#fff' }} />
          <button onClick={send} disabled={loading} style={{ padding: '12px 20px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Enviar</button>
        </div>
      </div>
    </div>
  )
}

function Profile({ user }) {
  const [name, setName] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) {
        setName(data.name || '')
        setInstagram(data.instagram_handle || '')
        setTiktok(data.tiktok_handle || '')
      }
    }
    loadProfile()
  }, [user])

  async function saveProfile() {
    setLoading(true)
    setSaved(false)
    await supabase.from('profiles').upsert({
      id: user.id,
      name,
      instagram_handle: instagram,
      tiktok_handle: tiktok,
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle = {
  width: '100%', padding: '12px 16px',
  border: '1px solid #D0D5DD', borderRadius: 10,
  fontSize: 14, boxSizing: 'border-box',
  background: '#fff', outline: 'none',
  color: '#101828'
}

  return (
    <div>
      <h1 style={{ color: '#101828' }}>Mi Perfil</h1>
      <div style={{ ...card, maxWidth: 520, marginTop: 20 }}>

        {/* AVATAR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #F2F4F7' }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#fff', fontWeight: 700 }}>
            {name ? name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#101828' }}>{name || 'Sin nombre'}</div>
            <div style={{ fontSize: 13, color: '#667085', marginTop: 3 }}>{user.email}</div>
          </div>
        </div>

        {/* CAMPOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 8 }}>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre o nombre del canal" style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 8 }}>📷 Instagram</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D0D5DD', borderRadius: 10, background: '#F7F9FC', overflow: 'hidden' }}>
              <span style={{ padding: '12px 14px', fontSize: 14, color: '#667085', borderRight: '1px solid #D0D5DD' }}>@</span>
              <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="tu_usuario" style={{ ...inputStyle, border: 'none', borderRadius: 0, background: 'transparent' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 8 }}>🎵 TikTok</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D0D5DD', borderRadius: 10, background: '#F7F9FC', overflow: 'hidden' }}>
              <span style={{ padding: '12px 14px', fontSize: 14, color: '#667085', borderRight: '1px solid #D0D5DD' }}>@</span>
              <input value={tiktok} onChange={e => setTiktok(e.target.value)} placeholder="tu_usuario" style={{ ...inputStyle, border: 'none', borderRadius: 0, background: 'transparent' }} />
            </div>
          </div>

          <button onClick={saveProfile} disabled={loading} style={{ padding: '13px', background: loading ? '#9CA3AF' : '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer' }}>
            {loading ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>

          {saved && <div style={{ fontSize: 13, color: '#22C55E', textAlign: 'center' }}>✓ Perfil actualizado correctamente</div>}
        </div>
      </div>
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div style={card}>
      <h1 style={{ color: '#101828' }}>
        {title}
      </h1>

      <p style={{ color: '#667085' }}>
        Sección en construcción.
      </p>
    </div>
  )
}