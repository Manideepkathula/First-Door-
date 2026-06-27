import { Train, Bus, MapPin, DollarSign, Clock, AlertTriangle } from 'lucide-react'

const lines = [
  { name: 'Red Line', color: '#e03030', from: 'Alewife → Braintree/Ashmont', key: 'Cambridge, Harvard, MIT, South Station, JFK/UMass', tip: 'Most important line for students — connects Harvard, MIT, and downtown' },
  { name: 'Green Line', color: '#3a7a3a', from: 'Multiple branches (B, C, D, E)', key: 'BU, Northeastern, Copley, Government Center', tip: 'B Line runs through Allston/Brighton — essential for BU students. Gets crowded at rush hour' },
  { name: 'Orange Line', color: '#d07020', from: 'Oak Grove → Forest Hills', key: 'Back Bay, Mass Ave, Ruggles (Northeastern), Downtown', tip: 'Best for Northeastern students, also connects to Back Bay' },
  { name: 'Blue Line', color: '#2050c0', from: 'Bowdoin → Wonderland', key: 'Airport, Aquarium, Government Center', tip: 'Mainly useful for getting to Logan Airport — take Blue Line to Airport station, then free shuttle' },
  { name: 'Silver Line', color: '#808080', from: 'South Station → Logan Airport', key: 'Airport (free from Logan), South Station', tip: 'FREE from Logan Airport to South Station when you first arrive in Boston. Take it immediately from arrivals.' },
  { name: 'Commuter Rail', color: '#7a3a9a', from: 'Multiple lines across Massachusetts', key: 'South Station, North Station, Back Bay', tip: 'More expensive ($2.40–$13 depending on zone). Use for trips to suburbs or Waltham (for Patel Brothers grocery)' },
]

const fareInfo = [
  { type: 'Charlie Card (stored value)', price: '$1.70/ride', note: 'Best option — cheaper than CharlieTicket' },
  { type: 'CharlieTicket (paper)', price: '$2.00/ride', note: 'Avoid this — costs more than Charlie Card' },
  { type: 'Monthly LinkPass', price: '$90/month', note: 'Unlimited subway + local bus — best value if you commute daily' },
  { type: 'Student LinkPass', price: 'Check with your school', note: 'Many universities offer subsidized T passes — ask your student services office' },
  { type: 'Bus (local)', price: '$1.70 with Charlie Card', note: 'Same price as subway — many routes complement the T' },
]

const airportTips = [
  'Take Silver Line (SL1) FREE from Terminal A/B/C/E to South Station — no Charlie Card needed on this route',
  'From South Station, take Red Line to reach most of Boston and Cambridge',
  'Uber/Lyft from airport to Allston/Cambridge typically $25–$45 depending on time',
  'Never take airport taxi — they charge $50–$80 for what Uber does for $30',
  'If arriving late at night (after 12:30am), subway stops — take Uber or pre-arrange a pickup',
]

export default function Transit() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 4</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>Transit Guide</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '2rem', fontSize: 16 }}>
        The MBTA ("the T") is Boston's subway and bus system. Here's everything you need to 
        get around without confusion or overpaying.
      </p>

      {/* Airport tip — first thing you need */}
      <div style={{ background: 'rgba(93,202,165,0.08)', border: '0.5px solid rgba(93,202,165,0.25)', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--green)', marginBottom: 10 }}>🛬 Just landed at Logan Airport?</div>
        {airportTips.map(t => (
          <div key={t} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: 'rgba(232,232,240,0.75)', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--green)', flexShrink: 0 }}>→</span>{t}
          </div>
        ))}
      </div>

      {/* Charlie Card */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>First thing: Get a Charlie Card</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.25rem' }}>
          The Charlie Card is a reusable transit card — like an Oyster Card (London) or Metro Card (NYC). 
          Pick one up for free at any T station from the attendant or kiosk. Load money onto it and tap to ride.
        </p>
        <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {fareInfo.map((f, i) => (
            <div key={f.type} style={{
              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
              borderBottom: i < fareInfo.length - 1 ? '0.5px solid var(--border)' : 'none'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{f.type}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{f.note}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{f.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lines */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>The T Lines — What each one covers</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.25rem' }}>Find your university below and which line to use</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {lines.map(l => (
            <div key={l.name} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '1.1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: l.color, flexShrink: 0, marginTop: 4 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{l.from}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <strong>Key stops:</strong> {l.key}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(232,232,240,0.5)', fontStyle: 'italic' }}>💡 {l.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours */}
      <div style={{ background: 'rgba(240,192,96,0.07)', border: '0.5px solid rgba(240,192,96,0.2)', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
          <Clock size={15} color="var(--amber)"/>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--amber)' }}>Service hours</div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <strong>Subway:</strong> 5:00am – 12:30am (Mon–Sat) · 5:00am – 12:00am (Sunday)<br/>
          <strong>Late night (Fri & Sat):</strong> Limited Blue and Orange Line service until 2:30am on some routes<br/>
          <strong>After midnight:</strong> Use Uber/Lyft or the 66 bus (runs late on key routes)<br/>
          <strong>Real-time tracking:</strong> mbta.com or the MBTA app — always check before you leave
        </div>
      </div>

      <div style={{ background: 'rgba(122,184,245,0.05)', border: '0.5px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Key apps to download now</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <strong>MBTA:</strong> Official app, real-time arrival times<br/>
          <strong>Transit App:</strong> Better UI than MBTA official, shows all buses and trains on one map<br/>
          <strong>Google Maps:</strong> Works perfectly for Boston transit routing<br/>
          <strong>Uber / Lyft:</strong> Essential for late nights and bad weather
        </div>
      </div>
    </div>
  )
}
