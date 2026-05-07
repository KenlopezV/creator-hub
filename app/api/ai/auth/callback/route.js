import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'No code received' })
  }

  // Mostrar el code temporalmente para obtener el token
  return new Response(`
    <html>
      <body style="font-family:Arial;padding:40px;background:#F4F6FA">
        <h2 style="color:#4F46E5">¡Autorización exitosa!</h2>
        <p>Copia este código:</p>
        <code style="background:#fff;padding:16px;border-radius:8px;display:block;word-break:break-all;border:1px solid #ddd">${code}</code>
        <p style="color:#667085;margin-top:20px">No cierres esta página todavía.</p>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } })
}