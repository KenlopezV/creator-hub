'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)

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
    <div style={{ fontFamily: 'Arial', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ color: '#534AB7' }}>Creator Hub</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#888' }}>{user.email}</span>
          <button
            onClick={handleLogout}
            style={{ padding: '6px 14px', background: '#fff', color: '#534AB7', border: '1px solid #534AB7', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <p style={{ color: '#555' }}>¡Bienvenido! El dashboard completo va aquí. 🚀</p>
    </div>
  )
}