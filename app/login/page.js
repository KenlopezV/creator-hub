'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setMessage('')
    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Revisa tu email para confirmar el registro')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage('Email o contraseña incorrectos')
      else window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0A1A 0%, #0F1A2E 50%, #0A1520 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 24px' }}>

        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #534AB7, #7C3AED)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(83,74,183,0.4)'
          }}>◈</div>
          <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 }}>Creator Hub</h1>
          <p style={{ color: '#6B7280', fontSize: 13, marginTop: 6 }}>
            {isRegister ? 'Crea tu cuenta' : 'Acceso al sistema'}
          </p>
        </div>

        {/* CARD */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: '32px 28px',
          backdropFilter: 'blur(10px)'
        }}>

          {/* EMAIL */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: 500 }}>Email</label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, color: '#fff', fontSize: 14,
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: 500 }}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, color: '#fff', fontSize: 14,
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: loading ? '#374151' : 'linear-gradient(135deg, #534AB7, #7C3AED)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(83,74,183,0.4)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Cargando...' : (isRegister ? '→ Crear cuenta' : '→ Ingresar')}
          </button>

          {/* MESSAGE */}
          {message && (
            <div style={{
              marginTop: 16, padding: '10px 14px',
              background: message.includes('Error') || message.includes('incorrecto') ? 'rgba(163,45,45,0.2)' : 'rgba(15,110,86,0.2)',
              border: `1px solid ${message.includes('Error') || message.includes('incorrecto') ? 'rgba(163,45,45,0.4)' : 'rgba(15,110,86,0.4)'}`,
              borderRadius: 8, fontSize: 13,
              color: message.includes('Error') || message.includes('incorrecto') ? '#FCA5A5' : '#6EE7B7'
            }}>
              {message}
            </div>
          )}
        </div>

        {/* TOGGLE */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6B7280' }}>
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => { setIsRegister(!isRegister); setMessage('') }}
            style={{ color: '#818CF8', cursor: 'pointer', fontWeight: 600 }}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>

      </div>
    </div>
  )
}