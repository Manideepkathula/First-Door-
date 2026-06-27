import { useEffect, useRef, useState } from 'react'

const KNOWN_PLACES = [
  { name: 'Logan Airport', lat: 42.3656, lng: -71.0096 },
  { name: 'Boston University', lat: 42.3505, lng: -71.1054 },
  { name: 'Northeastern University', lat: 42.3398, lng: -71.0892 },
  { name: 'MIT', lat: 42.3601, lng: -71.0942 },
  { name: 'Harvard University', lat: 42.3770, lng: -71.1167 },
  { name: 'Tufts University', lat: 42.4075, lng: -71.1190 },
  { name: 'UMass Boston', lat: 42.3131, lng: -71.0378 },
  { name: 'Boston College', lat: 42.3355, lng: -71.1685 },
  { name: 'South Station', lat: 42.3519, lng: -71.0552 },
  { name: 'North Station', lat: 42.3654, lng: -71.0603 },
  { name: 'Downtown Boston', lat: 42.3601, lng: -71.0589 },
  { name: 'Back Bay', lat: 42.3503, lng: -71.0810 },
  { name: 'Fenway', lat: 42.3467, lng: -71.0972 },
  { name: 'Allston', lat: 42.3530, lng: -71.1310 },
  { name: 'Brighton', lat: 42.3520, lng: -71.1560 },
  { name: 'Cambridge', lat: 42.3736, lng: -71.1097 },
  { name: 'Somerville', lat: 42.3876, lng: -71.0995 },
  { name: 'Mission Hill', lat: 42.3297, lng: -71.1040 },
  { name: 'Roxbury', lat: 42.3160, lng: -71.0850 },
  { name: 'Jamaica Plain', lat: 42.3100, lng: -71.1140 },
  { name: 'Brookline', lat: 42.3317, lng: -71.1213 },
  { name: 'Dorchester', lat: 42.3000, lng: -71.0700 },
  { name: 'Medford', lat: 42.4190, lng: -71.1070 },
  { name: 'Waltham', lat: 42.3770, lng: -71.2356 },
  { name: 'Boston Common', lat: 42.3550, lng: -71.0658 },
  { name: 'Kendall Square', lat: 42.3625, lng: -71.0863 },
  { name: 'Harvard Square', lat: 42.3731, lng: -71.1189 },
  { name: 'Davis Square', lat: 42.3967, lng: -71.1222 },
  { name: 'Copley Square', lat: 42.3496, lng: -71.0773 },
]

const MBTA_INFO = {
  'Logan Airport': { lines: ['Silver Line (SL1/SL2/SL3)', 'Blue Line (Airport station)'], note: 'Silver Line from terminals A/B/C/E is FREE to South Station' },
  'Boston University': { lines: ['Green Line B Branch'], note: 'Multiple stops along Comm Ave — BU East, BU Central, BU West' },
  'Northeastern University': { lines: ['Green Line E Branch (Northeastern stop)', 'Orange Line (Ruggles)'], note: 'Both lines within 5 min walk of campus' },
  'MIT': { lines: ['Red Line (Kendall/MIT stop)'], note: 'Kendall/MIT station is right on campus' },
  'Harvard University': { lines: ['Red Line (Harvard stop)'], note: 'Harvard station is at the center of campus' },
  'Tufts University': { lines: ['Red Line to Davis Sq, then 10 min walk or bus 94/96'], note: 'Main campus in Medford — no direct T stop, bus from Davis' },
  'UMass Boston': { lines: ['Red Line (JFK/UMass stop)'], note: 'Free shuttle from JFK/UMass to campus' },
}

const modes = [
  { key: 'foot-walking', label: 'Walking', icon: '🚶', color: '#5dcaa5' },
  { key: 'cycling-regular', label: 'Cycling', icon: '🚲', color: '#7ab8f5' },
  { key: 'driving-car', label: 'Driving', icon: '🚗', color: '#c4a0f5' },
  { key: 'mbta', label: 'MBTA', icon: '🚇', color: '#e8935a' },
]

export default function DirectionsMap() {
  const mapRef = useRef(null)
  const leafletMap = useRef(null)
  const routeLayer = useRef(null)
  const markersLayer = useRef(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [mode, setMode] = useState('foot-walking')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [fromSugg, setFromSugg] = useState([])
  const [toSugg, setToSugg] = useState([])
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      import('leaflet').then(L => {
        const Lm = L.default
        delete Lm.Icon.Default.prototype._getIconUrl
        Lm.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
        })
        const map = Lm.map(mapRef.current, { center: [42.355, -71.060], zoom: 12, zoomControl: true, scrollWheelZoom: true })
        leafletMap.current = map
        Lm.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CartoDB', maxZoom: 19 }).addTo(map)
        routeLayer.current = Lm.layerGroup().addTo(map)
        markersLayer.current = Lm.layerGroup().addTo(map)
        setMapReady(true)
      })
    }
  }, [])

  const getSugg = (val) => {
    if (!val || val.length < 2) return []
    return KNOWN_PLACES.filter(p => p.name.toLowerCase().includes(val.toLowerCase())).slice(0, 6)
  }

  const geocode = async (place) => {
    // Check known places first
    const known = KNOWN_PLACES.find(p => p.name.toLowerCase() === place.toLowerCase().trim())
    if (known) return known

    // Try Nominatim via proxy
    try {
      const res = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: place })
      })
      const data = await res.json()
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name.split(',')[0] }
      }
    } catch(e) {}

    // Direct Nominatim fallback
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place + ' Boston MA')}&format=json&limit=1`, { headers: { 'User-Agent': 'FirstDoor/1.0' } })
      const data = await res.json()
      if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name.split(',')[0] }
    } catch(e) {}

    throw new Error(`Could not find "${place}". Try selecting from suggestions or use a full street address like "123 Commonwealth Ave, Boston"`)
  }

  const getMBTAResult = (fromName, toName) => {
    const fromMBTA = MBTA_INFO[fromName]
    const toMBTA = MBTA_INFO[toName]
    return {
      type: 'mbta',
      from: fromName,
      to: toName,
      fromLines: fromMBTA?.lines || ['Check mbta.com for nearest stop'],
      fromNote: fromMBTA?.note || '',
      toLines: toMBTA?.lines || ['Check mbta.com for nearest stop'],
      toNote: toMBTA?.note || '',
      tip: 'Use the MBTA app or Google Maps for real-time train/bus schedules',
      charlieCost: '$1.70 per ride · $90/month unlimited LinkPass'
    }
  }

  const getDirections = async () => {
    if (!from.trim() || !to.trim()) { setError('Please enter both a starting point and destination'); return }
    setLoading(true); setError(''); setResult(null)

    // MBTA mode — no routing needed
    if (mode === 'mbta') {
      const fromCoord = KNOWN_PLACES.find(p => p.name.toLowerCase() === from.toLowerCase().trim())
      const toCoord = KNOWN_PLACES.find(p => p.name.toLowerCase() === to.toLowerCase().trim())
      if (fromCoord && toCoord) {
        import('leaflet').then(L => {
          const Lm = L.default
          routeLayer.current.clearLayers()
          markersLayer.current.clearLayers()
          Lm.circleMarker([fromCoord.lat, fromCoord.lng], { radius: 10, fillColor: '#5dcaa5', color: '#fff', weight: 2, fillOpacity: 1 }).bindPopup(`<b>Start:</b> ${fromCoord.name}`).addTo(markersLayer.current)
          Lm.circleMarker([toCoord.lat, toCoord.lng], { radius: 10, fillColor: '#e8935a', color: '#fff', weight: 2, fillOpacity: 1 }).bindPopup(`<b>End:</b> ${toCoord.name}`).addTo(markersLayer.current)
          leafletMap.current.fitBounds([[fromCoord.lat, fromCoord.lng], [toCoord.lat, toCoord.lng]], { padding: [60, 60] })
        })
      }
      setResult(getMBTAResult(from.trim(), to.trim()))
      setLoading(false)
      return
    }

    try {
      const [fromCoord, toCoord] = await Promise.all([geocode(from), geocode(to)])

      // Try proxy first, fallback to direct
      let data
      try {
        const res = await fetch('/api/directions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fromLng: fromCoord.lng, fromLat: fromCoord.lat, toLng: toCoord.lng, toLat: toCoord.lat, profile: mode })
        })
        data = await res.json()
      } catch(e) {
        const apiKey = import.meta.env.VITE_ORS_API_KEY
        const res = await fetch(`https://api.openrouteservice.org/v2/directions/${mode}?api_key=${apiKey}&start=${fromCoord.lng},${fromCoord.lat}&end=${toCoord.lng},${toCoord.lat}`)
        data = await res.json()
      }

      if (data.error) throw new Error('Route not found between these locations. Try different points.')

      const route = data.features[0]
      const props = route.properties.segments[0]
      const coords = route.geometry.coordinates.map(c => [c[1], c[0]])

      import('leaflet').then(L => {
        const Lm = L.default
        routeLayer.current.clearLayers()
        markersLayer.current.clearLayers()
        Lm.polyline(coords, { color: '#e8935a', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(routeLayer.current)
        Lm.circleMarker([fromCoord.lat, fromCoord.lng], { radius: 10, fillColor: '#5dcaa5', color: '#fff', weight: 2.5, fillOpacity: 1 }).bindPopup(`<b style="color:#5dcaa5">Start:</b> ${fromCoord.name}`).addTo(markersLayer.current)
        Lm.circleMarker([toCoord.lat, toCoord.lng], { radius: 10, fillColor: '#e8935a', color: '#fff', weight: 2.5, fillOpacity: 1 }).bindPopup(`<b style="color:#e8935a">End:</b> ${toCoord.name}`).addTo(markersLayer.current)
        leafletMap.current.fitBounds(Lm.latLngBounds(coords), { padding: [50, 50] })
      })

      setResult({
        type: 'route',
        from: fromCoord.name,
        to: toCoord.name,
        distance: props.distance < 1000 ? `${Math.round(props.distance)}m` : `${(props.distance / 1000).toFixed(1)}km`,
        duration: Math.round(props.duration / 60),
        steps: props.steps.map(s => ({
          instruction: s.instruction,
          distance: s.distance < 1000 ? `${Math.round(s.distance)}m` : `${(s.distance / 1000).toFixed(1)}km`,
          duration: Math.round(s.duration / 60)
        })),
        mode,
        gmapsUrl: `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to + ' Boston MA')}`
      })
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Controls */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--border)', borderRadius: 18, padding: '1.75rem' }}>
        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {modes.map(m => (
            <button key={m.key} onClick={() => { setMode(m.key); setResult(null); setError('') }} style={{
              padding: '8px 18px', borderRadius: 9, border: '0.5px solid',
              borderColor: mode === m.key ? m.color : 'var(--border)',
              background: mode === m.key ? `${m.color}18` : 'transparent',
              color: mode === m.key ? m.color : 'var(--text-muted)',
              fontSize: 13, fontWeight: 600, transition: 'all 0.18s', display: 'flex', alignItems: 'center', gap: 6
            }}>{m.icon} {m.label}</button>
          ))}
        </div>

        {/* From input */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: '#5dcaa5', zIndex: 1, boxShadow: '0 0 8px #5dcaa5' }}/>
          <input value={from} onChange={e => { setFrom(e.target.value); setFromSugg(getSugg(e.target.value)) }}
            onKeyDown={e => e.key === 'Enter' && getDirections()}
            placeholder="From — Logan Airport, your address, neighborhood..."
            style={{ width: '100%', padding: '13px 14px 13px 34px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'border-color 0.15s' }}
            onFocus={e => { e.target.style.borderColor = 'rgba(93,202,165,0.5)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; setTimeout(() => setFromSugg([]), 200) }}
          />
          {fromSugg.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#161410', border: '0.5px solid var(--border)', borderRadius: 10, zIndex: 100, marginTop: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
              {fromSugg.map(s => (
                <div key={s.name} onMouseDown={() => { setFrom(s.name); setFromSugg([]) }}
                  style={{ padding: '10px 16px', fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,147,90,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                ><span>📍</span> {s.name}</div>
              ))}
            </div>
          )}
        </div>

        {/* Swap button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <button onClick={() => { const t = from; setFrom(to); setTo(t); setResult(null) }} style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid var(--border)', borderRadius: 6, padding: '4px 12px', color: 'var(--text-muted)', fontSize: 13, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >⇅ swap</button>
        </div>

        {/* To input */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', zIndex: 1, boxShadow: '0 0 8px var(--accent)' }}/>
          <input value={to} onChange={e => { setTo(e.target.value); setToSugg(getSugg(e.target.value)) }}
            onKeyDown={e => e.key === 'Enter' && getDirections()}
            placeholder="To — MIT, Northeastern, Boston Common..."
            style={{ width: '100%', padding: '13px 14px 13px 34px', background: 'rgba(255,255,255,0.05)', border: '0.5px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'border-color 0.15s' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent-border)'}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; setTimeout(() => setToSugg([]), 200) }}
          />
          {toSugg.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#161410', border: '0.5px solid var(--border)', borderRadius: 10, zIndex: 100, marginTop: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
              {toSugg.map(s => (
                <div key={s.name} onMouseDown={() => { setTo(s.name); setToSugg([]) }}
                  style={{ padding: '10px 16px', fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,147,90,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                ><span>📍</span> {s.name}</div>
              ))}
            </div>
          )}
        </div>

        <button onClick={getDirections} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '13px' }}>
          {loading
            ? <><div style={{ width: 16, height: 16, border: '2.5px solid #080705', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/> Getting directions...</>
            : `Get ${modes.find(m => m.key === mode)?.icon} directions →`
          }
        </button>

        {error && (
          <div style={{ marginTop: '1rem', padding: '12px 16px', background: 'rgba(240,112,112,0.08)', border: '0.5px solid rgba(240,112,112,0.25)', borderRadius: 10, fontSize: 13, color: 'var(--red)', lineHeight: 1.6 }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ borderRadius: 18, overflow: 'hidden', border: '0.5px solid var(--border)', height: 400, position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
        {!mapReady && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0d0a', zIndex: 10, flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 32, height: 32, border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading map...</span>
          </div>
        )}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}/>
      </div>

      {/* Results */}
      {result && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid var(--border)', borderRadius: 18, padding: '1.75rem', animation: 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>
          {result.type === 'mbta' ? (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                🚇 MBTA Guide: <span style={{ color: 'var(--accent)' }}>{result.from}</span> → <span style={{ color: 'var(--accent)' }}>{result.to}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1.25rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(93,202,165,0.07)', border: '0.5px solid rgba(93,202,165,0.2)', borderRadius: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</div>
                  {result.fromLines.map(l => <div key={l} style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500, marginBottom: 4 }}>• {l}</div>)}
                  {result.fromNote && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{result.fromNote}</div>}
                </div>
                <div style={{ padding: '1rem', background: 'rgba(232,147,90,0.07)', border: '0.5px solid rgba(232,147,90,0.2)', borderRadius: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>To</div>
                  {result.toLines.map(l => <div key={l} style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, marginBottom: 4 }}>• {l}</div>)}
                  {result.toNote && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{result.toNote}</div>}
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(122,184,245,0.06)', border: '0.5px solid rgba(122,184,245,0.15)', borderRadius: 10, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                💡 <strong>Cost:</strong> {result.charlieCost}<br/>
                🗺️ <strong>Real-time schedules:</strong> <a href="https://www.mbta.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>mbta.com</a> or the MBTA app
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div><div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Distance</div><div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{result.distance}</div></div>
                <div><div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Est. time</div><div style={{ fontSize: 28, fontWeight: 800, color: 'var(--green)', letterSpacing: '-0.02em' }}>{result.duration} min</div></div>
                <div><div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Mode</div><div style={{ fontSize: 28 }}>{modes.find(m => m.key === result.mode)?.icon}</div></div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Step-by-step</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto', paddingRight: 4 }}>
                {result.steps.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: i === 0 ? 'rgba(93,202,165,0.07)' : 'rgba(255,255,255,0.02)', border: `0.5px solid ${i === 0 ? 'rgba(93,202,165,0.2)' : 'var(--border)'}`, borderRadius: 9 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 0 ? 'rgba(93,202,165,0.2)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--green)' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.instruction}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.distance} · ~{s.duration} min</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '0.5px solid var(--border)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={result.gmapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Open in Google Maps →
                </a>
                <a href="https://www.mbta.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  MBTA real-time schedules →
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
