import { useState } from 'react'
import { MapPin, DollarSign, Train, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

const neighborhoods = [
  {
    name: 'Allston',
    rent: '$1,400–$2,200/mo',
    safety: 'Good',
    transit: 'B Line (Green)',
    vibe: 'Student hub — Boston University nearby, tons of international students, affordable',
    pros: ['Cheapest rents near BU', 'Huge international community', 'Lots of Asian/Indian grocery stores nearby'],
    cons: ['Noisy on weekends', 'Apartment quality varies a lot', 'Parking nightmare'],
    color: '#7ab8f5',
    universities: ['Boston University', 'Harvard (15 min)'],
  },
  {
    name: 'Brighton',
    rent: '$1,500–$2,400/mo',
    safety: 'Very Good',
    transit: 'B Line (Green), 57 Bus',
    vibe: 'Quieter than Allston, more families and grad students, good value',
    pros: ['Safer and quieter than Allston', 'Good public transport', 'More spacious apartments'],
    cons: ['Fewer restaurants/nightlife', 'Slightly further from downtown'],
    color: '#5dcaa5',
    universities: ['Boston College', 'Boston University'],
  },
  {
    name: 'Mission Hill',
    rent: '$1,600–$2,500/mo',
    safety: 'Moderate',
    transit: 'E Line (Green), 39 Bus',
    vibe: 'Medical student area, close to Northeastern and Wentworth, diverse community',
    pros: ['Close to hospitals and Northeastern', 'Diverse community', 'Good food options'],
    cons: ['Some blocks feel unsafe at night', 'Hilly terrain'],
    color: '#c4a0f5',
    universities: ['Northeastern', 'Wentworth', 'Mass College of Art'],
  },
  {
    name: 'Somerville / Davis Sq',
    rent: '$1,800–$2,800/mo',
    safety: 'Excellent',
    transit: 'Red Line',
    vibe: 'Trendy, safe, artsy — popular with grad students from Tufts and Harvard',
    pros: ['Very safe', 'Vibrant local culture', 'Easy Red Line access to Cambridge/Boston'],
    cons: ['More expensive', 'Further from some universities'],
    color: '#f0c060',
    universities: ['Tufts University', 'Harvard (Red Line)'],
  },
  {
    name: 'Roxbury / Dorchester',
    rent: '$1,200–$1,900/mo',
    safety: 'Mixed — research specific streets',
    transit: 'Orange Line, Red Line',
    vibe: 'Most affordable in the city, improving rapidly, diverse — research your specific street',
    pros: ['Lowest rents in the city', 'Good transit options', 'Real Boston community feel'],
    cons: ['Safety varies block by block', 'Less walkable nightlife', 'Research carefully before signing'],
    color: '#f08080',
    universities: ['UMass Boston', 'Roxbury Community College'],
  },
  {
    name: 'Cambridge',
    rent: '$2,000–$3,500/mo',
    safety: 'Excellent',
    transit: 'Red Line throughout',
    vibe: 'Academic, international, walkable — home to MIT and Harvard',
    pros: ['World-class academic community', 'Very safe', 'Tons of international students'],
    cons: ['Expensive', 'Competitive rental market', 'Leases fill fast (apply by April)'],
    color: '#7ab8f5',
    universities: ['MIT', 'Harvard'],
  },
]

const leaseRules = [
  { title: 'Security deposit cap', detail: 'Massachusetts law caps security deposits at exactly ONE month\'s rent. If a landlord asks for more — that\'s illegal. You can report them to the Office of Consumer Affairs.', icon: CheckCircle, good: true },
  { title: 'Receipt required', detail: 'Your landlord MUST give you a receipt within 30 days, in an interest-bearing account. If they don\'t, you\'re entitled to your full deposit back.', icon: CheckCircle, good: true },
  { title: 'Last month\'s rent', detail: 'Landlords CAN ask for first + last month\'s rent upfront. This is legal and common in Boston. Budget for 2-3 months rent when apartment hunting.', icon: AlertTriangle, good: false },
  { title: 'No lease = month-to-month', detail: 'If you don\'t sign a lease, you\'re automatically on a month-to-month tenancy. Both you and your landlord can end it with 30 days notice.', icon: CheckCircle, good: true },
  { title: 'Heat must be included', detail: 'Massachusetts law requires landlords to provide heat of at least 68°F from Sept 15 – June 15. If heat isn\'t working, report it to Inspectional Services.', icon: CheckCircle, good: true },
  { title: 'Red flag: verbal promises', detail: 'Never trust verbal promises. If your landlord says they\'ll fix something — get it in writing BEFORE you sign. Courts only recognize what\'s in the lease.', icon: AlertTriangle, good: false },
]

export default function Housing() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 1</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>Housing Guide</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '3rem', fontSize: 16 }}>
        Boston's rental market is competitive and moves fast. Here's what you actually need to know — 
        neighborhoods, rent ranges, tenant rights, and the red flags nobody warns you about.
      </p>

      {/* Warning banner */}
      <div style={{
        background: 'rgba(240,192,96,0.08)', border: '0.5px solid rgba(240,192,96,0.25)',
        borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '3rem',
        display: 'flex', gap: 12, alignItems: 'flex-start'
      }}>
        <AlertTriangle size={16} color="#f0c060" style={{ marginTop: 2, flexShrink: 0 }}/>
        <div style={{ fontSize: 13, color: 'rgba(232,232,240,0.75)' }}>
          <strong style={{ color: '#f0c060' }}>Boston lease tip:</strong> Most leases start September 1st. 
          The market floods in July–August. Start looking in May–June and be ready to decide fast — 
          good apartments go in 24–48 hours.
        </div>
      </div>

      {/* Neighborhoods */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Neighborhoods by student</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.5rem' }}>Click any neighborhood for full details</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {neighborhoods.map((n, i) => (
            <div key={n.name} style={{
              background: 'var(--bg-card)', border: `0.5px solid ${expanded === i ? n.color + '55' : 'var(--border)'}`,
              borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s'
            }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} style={{
                width: '100%', padding: '1.1rem 1.25rem', background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: n.color, flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'rgba(240,238,255,0.9)' }}>{n.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{n.vibe}</div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: n.color }}>{n.rent}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.transit}</div>
                  </div>
                  {expanded === i ? <ChevronUp size={16} color="var(--text-muted)"/> : <ChevronDown size={16} color="var(--text-muted)"/>}
                </div>
              </button>

              {expanded === i && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '0.5px solid var(--border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pros</div>
                      {n.pros.map(p => (
                        <div key={p} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                          <CheckCircle size={13} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }}/>{p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Watch out for</div>
                      {n.cons.map(c => (
                        <div key={c} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                          <AlertTriangle size={13} color="var(--amber)" style={{ marginTop: 2, flexShrink: 0 }}/>{c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Nearby universities</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {n.universities.map(u => (
                        <span key={u} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: `${n.color}15`, border: `0.5px solid ${n.color}35`, color: n.color }}>{u}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* Lease rights */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Massachusetts tenant rights</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.5rem' }}>What you're legally entitled to — and what's a red flag</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
          {leaseRules.map(r => (
            <div key={r.title} style={{
              background: 'var(--bg-card)', border: `0.5px solid ${r.good ? 'rgba(93,202,165,0.15)' : 'rgba(240,192,96,0.15)'}`,
              borderRadius: 10, padding: '1.1rem'
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <r.icon size={15} color={r.good ? 'var(--green)' : 'var(--amber)'}/>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{r.title}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contact */}
      <div style={{ marginTop: '3rem', background: 'rgba(122,184,245,0.06)', border: '0.5px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Need help with a housing issue?</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>Boston Tenant Coalition:</strong> (617) 603-0843 · Free advice for renters<br/>
          <strong>Mass Legal Help:</strong> masslegalhelp.org · Free legal resources<br/>
          <strong>City of Boston ISD:</strong> 311 · Report bad housing conditions
        </div>
      </div>
    </div>
  )
}
