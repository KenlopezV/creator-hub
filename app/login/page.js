'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage('Error: ' + error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  async function handleRegister() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage('Error: ' + error.message)
    else setMessage('Revisa tu email para confirmar el registro')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 32, fontFamily: 'Arial' }}>
      <h1 style={{ marginBottom: 24, color: '#534AB7' }}>Creator Hub</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 10, marginBottom: 16, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ width: '100%', padding: 10, background: '#534AB7', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 8 }}
      >
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>
      <button
        onClick={handleRegister}
        disabled={loading}
        style={{ width: '100%', padding: 10, background: '#fff', color: '#534AB7', border: '1px solid #534AB7', borderRadius: 6, cursor: 'pointer' }}
      >
        {loading ? 'Cargando...' : 'Registrarse'}
      </button>
      {message && <p style={{ marginTop: 16, color: '#534AB7', fontSize: 13 }}>{message}</p>}
    </div>
  )
}