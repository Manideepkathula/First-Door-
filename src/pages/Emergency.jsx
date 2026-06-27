import { Phone, Shield, Heart, Home, AlertTriangle, CheckCircle } from 'lucide-react'

const emergencyNumbers = [
  { label: 'Emergency (police, fire, ambulance)', number: '911', color: '#f08080', always: true },
  { label: 'Non-emergency police', number: '617-343-4433', color: '#f0c060' },
  { label: 'Boston Public Health Commission', number: '617-534-5395', color: '#7ab8f5' },
  { label: 'Poison Control', number: '1-800-222-1222', color: '#c4a0f5' },
  { label: 'Crisis Text Line', number: 'Text HOME to 741741', color: '#5dcaa5' },
  { label: 'Nearest Urgent Care (Mass General)', number: '617-724-4000', color: '#7ab8f5' },
]

const healthCosts = [
  { situation: 'Doctor visit (primary care)', withInsurance: '$20–50 copay', withoutInsurance: '$150–400', advice: 'Always use insurance. Find an in-network doctor before you need one.' },
  { situation: 'Urgent Care visit', withInsurance: '$50–100 copay', withoutInsurance: '$150–300', advice: 'For illness, minor injury, fever. Much cheaper and faster than ER.' },
  { situation: 'Emergency Room visit', withInsurance: '$200–500+ copay', withoutInsurance: '$1,000–10,000+', advice: 'Only for life-threatening emergencies. ER for a cold will bankrupt you without insurance.' },
  { situation: 'Prescription medication', withInsurance: '$5–30 copay', withoutInsurance: '$50–500+', advice: 'Use GoodRx app at any pharmacy for discounts even without insurance.' },
  { situation: 'Mental health therapy', withInsurance: '$20–50 copay', withoutInsurance: '$150–300/session', advice: 'Your university health center likely offers free or low-cost counseling. Use it.' },
  { situation: 'Ambulance ride', withInsurance: '$100–300', withoutInsurance: '$1,200–2,000', advice: 'If you can safely get to urgent care by Uber — do it. Ambulances are extremely expensive.' },
]

const tenantRights = [
  { right: 'Security deposit = 1 month max', detail: 'If asked for more, refuse and report to Office of Consumer Affairs: 617-973-8787', good: true },
  { right: 'Your deposit must earn interest', detail: 'Placed in a separate bank account. You receive statement within 30 days. No compliance = deposit refunded in full.', good: true },
  { right: 'Landlord must give 24hrs notice before entering', detail: 'Except in emergencies. Landlord cannot just walk in — this is illegal.', good: true },
  { right: 'Heat 68°F guaranteed Sept 15 – June 15', detail: 'If heat fails, report to Boston Inspectional Services: 617-635-5300', good: true },
  { right: 'You can withhold rent for serious problems', detail: 'Must notify landlord in writing first. Use "repair and deduct" law for urgent issues. Get legal advice first.', good: false },
  { right: 'Retaliation for complaining is illegal', detail: 'If you report conditions and landlord raises rent or threatens eviction — that\'s illegal retaliation. Document everything.', good: true },
]

const scamAlerts = [
  { title: 'Too-good-to-be-true rent', detail: 'A $800/month 1BR in Boston does not exist. If it sounds incredible — it\'s a scam. Never wire money before seeing a place in person.' },
  { title: 'Landlord is "out of the country"', detail: 'Classic scam. Real landlords meet you in person. If they ask you to mail keys deposit to an address — stop immediately.' },
  { title: 'Asking for Zelle/Venmo deposit', detail: 'Legitimate landlords accept check or bank transfer (ACH). Zelle/Venmo cannot be reversed — you will lose your money.' },
  { title: 'No written lease', detail: 'Never move in without a signed lease. Verbal agreements are nearly impossible to enforce. If they refuse to give you a lease — walk away.' },
  { title: 'Fake student discounts online', detail: 'Craigslist and Facebook Marketplace are full of fake rental scams targeting students. Use verified platforms: Zillow, Apartments.com, or university housing boards.' },
]

export default function Emergency() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 6</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>Emergency & Legal</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '3rem', fontSize: 16 }}>
        What to do when things go wrong — tenant scams, medical emergencies, healthcare costs, 
        and your rights as an international student. Save this page.
      </p>

      {/* Emergency numbers */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1.25rem' }}>Emergency numbers — save these now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
          {emergencyNumbers.map(e => (
            <div key={e.label} style={{ background: `${e.color}0d`, border: `0.5px solid ${e.color}30`, borderRadius: 10, padding: '1rem 1.1rem', display: 'flex', gap: 10, alignItems: 'center' }}>
              <Phone size={15} color={e.color} style={{ flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{e.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: e.color }}>{e.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* Healthcare costs */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Healthcare costs in the US</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.5rem' }}>The US healthcare system is expensive. Know the costs before you need care.</p>
        <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '0.75rem 1.25rem', borderBottom: '0.5px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Situation</div>
            <div style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>With Insurance</div>
            <div style={{ fontSize: 11, color: 'var(--red)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Without</div>
          </div>
          {healthCosts.map((h, i) => (
            <div key={h.situation} style={{ padding: '0.875rem 1.25rem', borderBottom: i < healthCosts.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.5rem', marginBottom: 5 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{h.situation}</div>
                <div style={{ fontSize: 14, color: 'var(--green)', fontWeight: 500 }}>{h.withInsurance}</div>
                <div style={{ fontSize: 14, color: 'var(--red)', fontWeight: 500 }}>{h.withoutInsurance}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', gridColumn: '1 / -1' }}>{h.advice}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* Tenant rights */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Your tenant rights in Massachusetts</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.25rem' }}>These are legal protections — not suggestions</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tenantRights.map(r => (
            <div key={r.right} style={{ display: 'flex', gap: 10, padding: '1rem 1.1rem', background: r.good ? 'rgba(93,202,165,0.05)' : 'rgba(240,192,96,0.05)', border: `0.5px solid ${r.good ? 'rgba(93,202,165,0.15)' : 'rgba(240,192,96,0.15)'}`, borderRadius: 10, alignItems: 'flex-start' }}>
              {r.good ? <CheckCircle size={15} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }}/> : <AlertTriangle size={15} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }}/>}
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{r.right}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* Scams */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Rental scams targeting students</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.25rem' }}>International students are heavily targeted. Know the red flags.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {scamAlerts.map(s => (
            <div key={s.title} style={{ background: 'rgba(240,128,128,0.05)', border: '0.5px solid rgba(240,128,128,0.15)', borderRadius: 10, padding: '1rem 1.1rem' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'center' }}>
                <AlertTriangle size={14} color="var(--red)"/>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.title}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal help */}
      <div style={{ background: 'rgba(122,184,245,0.05)', border: '0.5px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Free legal resources in Boston</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9 }}>
          <strong>Boston Tenant Coalition:</strong> 617-603-0843 · Free renter advice<br/>
          <strong>Greater Boston Legal Services:</strong> 617-603-1700 · Free civil legal aid<br/>
          <strong>Mass Legal Help:</strong> masslegalhelp.org · Written guides for every situation<br/>
          <strong>Student Legal Services:</strong> Check your university — many offer free consultations<br/>
          <strong>Northeastern Legal Aid:</strong> Open to the public, sliding scale fees
        </div>
      </div>
    </div>
  )
}
