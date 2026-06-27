import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader } from 'lucide-react'

const SYSTEM_PROMPT = `You are the FirstDoor AI assistant — a knowledgeable, friendly guide for international students living in Boston, Massachusetts. You were created by Manideep Kathula, an international student from Warangal, India who went through every challenge you help with.

Your expertise covers:
1. HOUSING: Boston neighborhoods (Allston, Brighton, Cambridge, Somerville, Mission Hill, Roxbury), rent ranges, Massachusetts tenant law (1-month security deposit cap, 24hr notice requirement, heat laws), lease red flags, scam warnings
2. FOOD: South Asian grocery stores (India Quality Foods in Allston, Patel Brothers in Waltham, H Mart in Burlington), Indian restaurants, halal options, vegetarian/vegan spots, budget tips
3. US SYSTEMS: Credit score building from zero, bank accounts without SSN (Bank of America, Citizens Bank, DCU accept F-1 students), ITIN vs SSN, health insurance (university plans vs private), how urgent care vs ER works
4. TRANSIT: MBTA subway lines (Red, Green, Orange, Blue, Silver), Charlie Card setup, fares ($1.70 with Charlie Card, $90/month LinkPass), getting from Logan Airport (Silver Line is FREE), service hours
5. VISA: F-1 status rules, CPT vs OPT differences (full-time CPT >12 months kills OPT eligibility), STEM OPT extension, status violations to avoid, DSO communication
6. EMERGENCY & LEGAL: 911, Boston tenant rights, healthcare costs with/without insurance, rental scams targeting students, free legal resources (Greater Boston Legal Services, Mass Legal Help)

Tone: Warm, specific, direct — like a senior friend who figured it all out and is sharing real knowledge. Never vague. Always give specific names, phone numbers, addresses, or steps when relevant.

Always clarify: You provide general guidance, not legal or medical advice. For immigration decisions, always recommend consulting their DSO.

If asked something outside Boston international student life, politely redirect to what you know best.`

const SUGGESTED = [
  "I just landed in Boston. What do I do first?",
  "How do I build credit with no US credit history?",
  "Which bank can I open an account with? I don't have an SSN yet.",
  "My landlord is asking for 3 months deposit. Is that legal?",
  "What's the difference between CPT and OPT?",
  "Where can I find South Indian food near Allston?",
  "How do I get from Logan Airport to Cambridge?",
  "What does health insurance actually cover in the US?",
]

export default function Ask() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text || 'Sorry, I had trouble responding. Please try again.'
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error. Please check your internet and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem', height: 'calc(100vh - 58px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1.5rem', flexShrink: 0 }}>
        <div className="section-label">AI Assistant</div>
        <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>Ask FirstDoor AI</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Powered by Claude · Boston-specific knowledge for international students</p>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', paddingRight: 4 }}>
        {messages.length === 0 ? (
          <div>
            {/* Welcome */}
            <div style={{ textAlign: 'center', padding: '2rem 0 1.5rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent-dim)', border: '0.5px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Bot size={22} color="var(--accent)"/>
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>What do you need to know?</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 380, margin: '0 auto' }}>
                Ask anything about housing, food, credit, transit, visa, or emergencies in Boston.
              </div>
            </div>

            {/* Suggested questions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, padding: '0 0 1rem' }}>
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  background: 'var(--bg-card)', border: '0.5px solid var(--border)',
                  borderRadius: 10, padding: '0.875rem 1rem', fontSize: 13,
                  color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left',
                  transition: 'border-color 0.15s, color 0.15s', lineHeight: 1.45
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >{q}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '0.5rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: m.role === 'user' ? 'var(--accent-dim)' : 'rgba(255,255,255,0.05)',
                  border: `0.5px solid ${m.role === 'user' ? 'var(--accent-border)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {m.role === 'user' ? <User size={14} color="var(--accent)"/> : <Bot size={14} color="var(--text-muted)"/>}
                </div>
                <div style={{
                  maxWidth: '80%', padding: '0.875rem 1.1rem', borderRadius: 12,
                  background: m.role === 'user' ? 'var(--accent-dim)' : 'var(--bg-card)',
                  border: `0.5px solid ${m.role === 'user' ? 'var(--accent-border)' : 'var(--border)'}`,
                  fontSize: 14, lineHeight: 1.7, color: m.role === 'user' ? '#c8ddf5' : 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px'
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={14} color="var(--text-muted)"/>
                </div>
                <div style={{ padding: '0.875rem 1.1rem', borderRadius: '12px 12px 12px 2px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <Loader size={14} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }}/>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '0.75rem', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about living in Boston as an international student..."
          rows={1}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 14, color: 'var(--text-primary)', resize: 'none',
            lineHeight: 1.5, maxHeight: 120, overflowY: 'auto',
            '::placeholder': { color: 'var(--text-muted)' }
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{
            width: 36, height: 36, borderRadius: 8, border: 'none', flexShrink: 0,
            background: input.trim() && !loading ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
            color: input.trim() && !loading ? '#0a0a0f' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s'
          }}
        >
          <Send size={15}/>
        </button>
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
        For immigration decisions, always consult your DSO · This is general guidance, not legal advice
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
