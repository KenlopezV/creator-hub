import { NextResponse } from 'next/server'

export async function POST(req) {
  const { prompt } = await req.json()
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: 'Eres un experto en marketing de redes sociales hispanohablante. Responde SOLO en JSON con array "ideas" de objetos {title, description}. Sin texto extra ni backticks.',
      messages: [{ role: 'user', content: prompt }]
    })
  })
  const d = await r.json()
  const text = d.content?.[0]?.text || '[]'
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)
  return NextResponse.json({ result: parsed.ideas || parsed })
}