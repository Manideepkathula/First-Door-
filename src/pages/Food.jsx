import { useState } from 'react'
import { MapPin, Clock, DollarSign, Filter } from 'lucide-react'

const groceries = [
  { name: 'India Quality Foods', area: 'Allston', address: '484 Commonwealth Ave, Boston', type: 'South Asian', diet: ['Vegetarian', 'Halal', 'No Beef', 'No Pork'], hours: 'Mon–Sat 10am–8pm', price: '$', note: 'Best selection of Indian spices and lentils in the city' },
  { name: 'Patel Brothers', area: 'Waltham', address: '277 Moody St, Waltham', type: 'South Asian', diet: ['Vegetarian', 'No Beef', 'No Pork'], hours: 'Daily 10am–8pm', price: '$', note: 'Largest South Asian grocery near Boston — worth the trip' },
  { name: 'India Supermarket', area: 'Quincy', address: '33 Billings Rd, Quincy', type: 'South Asian', diet: ['Vegetarian', 'Halal', 'No Beef', 'No Pork'], hours: 'Daily 9am–9pm', price: '$', note: 'Great for Telugu rice varieties and Telangana staples' },
  { name: 'Harvest Co-op', area: 'Cambridge', address: '581 Massachusetts Ave, Cambridge', type: 'Natural/Organic', diet: ['Vegetarian', 'Vegan', 'No Beef', 'No Pork'], hours: 'Daily 8am–10pm', price: '$$', note: 'Excellent vegetarian and vegan section, near MIT' },
  { name: 'Star Market', area: 'Multiple', address: 'Multiple locations across Boston', type: 'American', diet: ['Vegetarian', 'No Beef option', 'No Pork option'], hours: 'Daily 6am–11pm', price: '$$', note: 'Main American supermarket — good for everyday basics' },
  { name: 'H Mart', area: 'Burlington', address: '3 Wheeler Rd, Burlington', type: 'Asian', diet: ['Vegetarian', 'Halal section', 'No Pork option'], hours: 'Daily 9am–9pm', price: '$', note: 'Huge Korean/Asian supermarket — great for rice, noodles, produce' },
]

const restaurants = [
  { name: 'Dosa Factory', area: 'Cambridge', address: '571 Massachusetts Ave', cuisine: 'South Indian', diet: ['Vegetarian', 'No Beef', 'No Pork'], price: '$', rating: '4.5', note: 'Best dosa in Boston area — authentic South Indian' },
  { name: 'Punjabi Dhaba', area: 'Inman Square', address: '225 Hampshire St, Cambridge', cuisine: 'North Indian', diet: ['No Beef', 'No Pork', 'Vegetarian options'], price: '$', rating: '4.4', note: 'Affordable, generous portions, very student-friendly' },
  { name: 'India Quality Restaurant', area: 'Fenway', address: '484 Commonwealth Ave', cuisine: 'Indian', diet: ['Vegetarian options', 'No Beef', 'No Pork'], price: '$$', rating: '4.3', note: 'Classic Indian restaurant, convenient for BU students' },
  { name: 'Tamarind Bay', area: 'Harvard Square', address: '75 Winthrop St, Cambridge', cuisine: 'Indian', diet: ['Vegetarian options', 'No Beef', 'No Pork'], price: '$$', rating: '4.2', note: 'Upscale Indian near Harvard, great for special occasions' },
  { name: 'Rangoli', area: 'Allston', address: '129 Brighton Ave, Allston', cuisine: 'Indian', diet: ['Vegetarian', 'No Beef', 'No Pork'], price: '$', rating: '4.4', note: 'Student favorite in Allston — great thali and biryani' },
  { name: 'Shan', area: 'Somerville', address: '286 Elm St, Somerville', cuisine: 'Pakistani/Halal', diet: ['Halal', 'No Pork'], price: '$', rating: '4.3', note: 'Excellent halal South Asian food, very affordable' },
  { name: 'Chinatown (area)', area: 'Chinatown', address: 'Beach St & Essex St area', cuisine: 'Asian / Diverse', diet: ['Many vegetarian options', 'Halal spots available'], price: '$', rating: '—', note: 'Explore for cheap, diverse food — many no-pork options' },
  { name: 'Clover Food Lab', area: 'Multiple', address: 'Multiple Boston locations', cuisine: 'Vegetarian', diet: ['Fully Vegetarian', 'Vegan options', 'No Beef', 'No Pork'], price: '$', rating: '4.4', note: 'Boston chain — 100% vegetarian, fast, fresh, student-priced' },
]

const dietFilters = ['All', 'Vegetarian', 'Halal', 'No Beef', 'No Pork', 'Vegan']

export default function Food() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [tab, setTab] = useState('restaurants')

  const filterItems = items =>
    activeFilter === 'All' ? items : items.filter(i => i.diet.some(d => d.includes(activeFilter)))

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 2</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>Food Finder</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '2rem', fontSize: 16 }}>
        South Asian grocery stores, Indian restaurants, halal and vegetarian spots across Boston — 
        filtered for your diet. No beef, no pork options clearly marked.
      </p>

      {/* Diet filter */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Filter size={14} color="var(--text-muted)" style={{ marginRight: 4 }}/>
          {dietFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              fontSize: 13, padding: '5px 14px', borderRadius: 20, border: '0.5px solid',
              borderColor: activeFilter === f ? 'var(--accent)' : 'var(--border)',
              background: activeFilter === f ? 'var(--accent-dim)' : 'transparent',
              color: activeFilter === f ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer', transition: 'all 0.15s'
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', background: 'var(--bg-card)', borderRadius: 9, padding: 4, width: 'fit-content', border: '0.5px solid var(--border)' }}>
        {['restaurants', 'groceries'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontSize: 13, padding: '6px 16px', borderRadius: 7, border: 'none', cursor: 'pointer',
            background: tab === t ? 'rgba(255,255,255,0.08)' : 'transparent',
            color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: tab === t ? 500 : 400, transition: 'all 0.15s'
          }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {/* Listings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filterItems(tab === 'restaurants' ? restaurants : groceries).map(item => (
          <div key={item.name} style={{
            background: 'var(--bg-card)', border: '0.5px solid var(--border)',
            borderRadius: 12, padding: '1.1rem 1.25rem',
            display: 'flex', gap: '1rem', alignItems: 'flex-start'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{item.name}</span>
                {item.rating && item.rating !== '—' && (
                  <span style={{ fontSize: 12, color: 'var(--amber)' }}>★ {item.rating}</span>
                )}
                <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 20, border: '0.5px solid var(--border)' }}>
                  {item.cuisine || item.type}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={11}/>{item.area} · {item.address}
                </span>
                {item.hours && (
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11}/>{item.hours}
                  </span>
                )}
                <span style={{ fontSize: 12, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <DollarSign size={11}/>{item.price}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(232,232,240,0.55)', marginBottom: 8, fontStyle: 'italic' }}>{item.note}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {item.diet.map(d => (
                  <span key={d} style={{
                    fontSize: 11, padding: '2px 9px', borderRadius: 20,
                    background: d.includes('Halal') ? 'rgba(93,202,165,0.1)' :
                                d.includes('Vegetarian') || d.includes('Vegan') ? 'rgba(122,184,245,0.1)' :
                                'rgba(240,192,96,0.1)',
                    border: `0.5px solid ${d.includes('Halal') ? 'rgba(93,202,165,0.25)' :
                              d.includes('Vegetarian') || d.includes('Vegan') ? 'rgba(122,184,245,0.25)' :
                              'rgba(240,192,96,0.25)'}`,
                    color: d.includes('Halal') ? 'var(--green)' :
                           d.includes('Vegetarian') || d.includes('Vegan') ? 'var(--accent)' : 'var(--amber)'
                  }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filterItems(tab === 'restaurants' ? restaurants : groceries).length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: 14 }}>
          No results for this filter. Try a different diet option.
        </div>
      )}

      {/* Tips */}
      <div style={{ marginTop: '3rem', background: 'rgba(122,184,245,0.05)', border: '0.5px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>💡 Student food tips</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          • <strong>Sunday meal prep:</strong> Buy in bulk from Patel Brothers (Waltham) once a month — saves 40% vs daily shopping<br/>
          • <strong>Chinatown:</strong> 10 min from downtown Boston, incredibly cheap produce and tofu<br/>
          • <strong>Star Market student discount:</strong> Sign up for loyalty card — consistent 10–15% off<br/>
          • <strong>Clover Food Lab:</strong> Best value vegetarian fast food, multiple locations near campuses<br/>
          • <strong>SNAP benefits:</strong> F-1 students generally don't qualify, but check masslegalhelp.org if your situation is unique
        </div>
      </div>
    </div>
  )
}
