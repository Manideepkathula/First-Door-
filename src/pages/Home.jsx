import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight, ArrowUpRight, MessageCircle, MapPin } from 'lucide-react'
import TypeWriter from '../components/TypeWriter'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'
import DirectionsMap from '../components/DirectionsMap'

const MODULES = [
  { to: '/housing', label: 'Housing', desc: 'Neighborhoods, rent ranges, Massachusetts tenant rights, lease red flags', color: '#ff9f58', glow: 'rgba(255,159,88,0.2)', icon: '🏠', num: '01' },
  { to: '/food', label: 'Food Finder', desc: 'South Asian groceries, Indian restaurants, halal & vegetarian options', color: '#34d399', glow: 'rgba(52,211,153,0.2)', icon: '🛒', num: '02' },
  { to: '/systems', label: 'US Systems 101', desc: 'Credit score from zero, bank accounts without SSN, health insurance', color: '#a78bfa', glow: 'rgba(167,139,250,0.2)', icon: '💳', num: '03' },
  { to: '/transit', label: 'Transit Guide', desc: 'Full MBTA breakdown, Charlie Card setup, Logan Airport arrival', color: '#60a5fa', glow: 'rgba(96,165,250,0.2)', icon: '🚇', num: '04' },
  { to: '/visa', label: 'Visa Survival', desc: 'CPT vs OPT explained, F-1 rules, deadlines you cannot miss', color: '#f472b6', glow: 'rgba(244,114,182,0.2)', icon: '📋', num: '05' },
  { to: '/emergency', label: 'Emergency & Legal', desc: 'Tenant rights, healthcare costs, scam protection, free legal help', color: '#ff9f58', glow: 'rgba(255,159,88,0.2)', icon: '🆘', num: '06' },
]

const NEIGHBORHOODS = [
  { name: 'Allston', lat: 42.353, lng: -71.131, rent: '$1,400–$2,200', rentMin: 1400, safety: 'Good', transit: 'Green Line B', universities: 'BU, Harvard', color: '#ff9f58' },
  { name: 'Brighton', lat: 42.352, lng: -71.156, rent: '$1,500–$2,400', rentMin: 1500, safety: 'Very Good', transit: 'Green Line B', universities: 'BC, BU', color: '#60a5fa' },
  { name: 'Cambridge', lat: 42.373, lng: -71.109, rent: '$2,000–$3,500', rentMin: 2000, safety: 'Excellent', transit: 'Red Line', universities: 'MIT, Harvard', color: '#2dd4bf' },
  { name: 'Mission Hill', lat: 42.330, lng: -71.104, rent: '$1,600–$2,500', rentMin: 1600, safety: 'Moderate', transit: 'Green Line E', universities: 'Northeastern', color: '#a78bfa' },
  { name: 'Somerville', lat: 42.387, lng: -71.100, rent: '$1,800–$2,800', rentMin: 1800, safety: 'Excellent', transit: 'Red Line', universities: 'Tufts', color: '#34d399' },
  { name: 'Roxbury', lat: 42.316, lng: -71.085, rent: '$1,200–$1,900', rentMin: 1200, safety: 'Research carefully', transit: 'Orange Line', universities: 'UMass Boston', color: '#f472b6' },
  { name: 'Brookline', lat: 42.332, lng: -71.121, rent: '$1,800–$3,000', rentMin: 1800, safety: 'Excellent', transit: 'Green Line C/D', universities: 'BU, Northeastern', color: '#60a5fa' },
  { name: 'Jamaica Plain', lat: 42.310, lng: -71.114, rent: '$1,400–$2,200', rentMin: 1400, safety: 'Good', transit: 'Orange Line', universities: 'UMass Boston', color: '#34d399' },
  { name: 'Fenway', lat: 42.347, lng: -71.097, rent: '$1,700–$2,800', rentMin: 1700, safety: 'Good', transit: 'Green Line D', universities: 'Northeastern, BU', color: '#a78bfa' },
  { name: 'Medford', lat: 42.419, lng: -71.107, rent: '$1,300–$2,000', rentMin: 1300, safety: 'Very Good', transit: 'Red Line (Davis)', universities: 'Tufts', color: '#ff9f58' },
  { name: 'Waltham', lat: 42.377, lng: -71.235, rent: '$1,100–$1,800', rentMin: 1100, safety: 'Very Good', transit: 'Commuter Rail', universities: 'Brandeis', color: '#2dd4bf' },
  { name: 'Dorchester', lat: 42.300, lng: -71.070, rent: '$1,200–$1,900', rentMin: 1200, safety: 'Mixed', transit: 'Red Line', universities: 'UMass Boston', color: '#f472b6' },
]

// 3D CSS Character component
function Character({ walking, entering }) {
  return (
    <div style={{
      width: 64, height: 96,
      position: 'relative',
      opacity: entering ? 0 : 1,
      transition: 'opacity 0.4s ease',
      filter: 'drop-shadow(0 8px 24px rgba(255,159,88,0.35))',
    }}>
      {/* Head — 3D sphere effect */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 32, height: 32, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #fff5ee, #f0d4b8, #d4956a)',
        boxShadow: '2px 3px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(0,0,0,0.15), inset 1px 1px 4px rgba(255,255,255,0.5)',
      }}>
        {/* Eyes */}
        <div style={{ position:'absolute', top:11, left:7, width:5, height:5, borderRadius:'50%', background:'#1a1a2e', boxShadow:'inset 1px 1px 2px rgba(255,255,255,0.3)' }}/>
        <div style={{ position:'absolute', top:11, right:7, width:5, height:5, borderRadius:'50%', background:'#1a1a2e', boxShadow:'inset 1px 1px 2px rgba(255,255,255,0.3)' }}/>
        {/* Smile */}
        <div style={{ position:'absolute', bottom:6, left:'50%', transform:'translateX(-50%)', width:12, height:5, borderBottom:'2px solid #c47040', borderRadius:'0 0 6px 6px' }}/>
        {/* Hair */}
        <div style={{ position:'absolute', top:-2, left:2, right:2, height:10, borderRadius:'50% 50% 0 0', background:'linear-gradient(135deg, #2a1a0a, #4a2a10)', boxShadow:'0 -2px 4px rgba(0,0,0,0.3)' }}/>
      </div>

      {/* Neck */}
      <div style={{ position:'absolute', top:30, left:'50%', transform:'translateX(-50%)', width:10, height:8, background:'linear-gradient(180deg, #e8c4a0, #d4956a)', borderRadius:3 }}/>

      {/* Body — 3D cylinder effect */}
      <div style={{
        position: 'absolute', top: 36, left: '50%', transform: 'translateX(-50%)',
        width: 30, height: 32, borderRadius: 8,
        background: 'linear-gradient(135deg, #ffb878 0%, #ff9f58 40%, #d4743a 100%)',
        boxShadow: '3px 4px 10px rgba(0,0,0,0.4), inset -3px 0 8px rgba(0,0,0,0.15), inset 1px 1px 4px rgba(255,255,255,0.25)',
      }}>
        {/* Shirt detail */}
        <div style={{ position:'absolute', top:4, left:4, right:4, height:1.5, background:'rgba(255,255,255,0.2)', borderRadius:1 }}/>
        <div style={{ position:'absolute', top:8, left:4, right:4, height:1, background:'rgba(255,255,255,0.12)', borderRadius:1 }}/>
      </div>

      {/* Backpack */}
      <div style={{
        position: 'absolute', top: 34, right: 4,
        width: 14, height: 22, borderRadius: 5,
        background: 'linear-gradient(135deg, #c4a0f5, #9060d0)',
        boxShadow: '2px 3px 8px rgba(0,0,0,0.35), inset -1px -1px 4px rgba(0,0,0,0.2)',
      }}>
        <div style={{ position:'absolute', top:4, left:2, right:2, height:2, background:'rgba(255,255,255,0.25)', borderRadius:1 }}/>
        <div style={{ position:'absolute', top:9, left:2, right:2, height:2, background:'rgba(255,255,255,0.15)', borderRadius:1 }}/>
      </div>

      {/* Left arm */}
      <div style={{
        position: 'absolute', top: 38, left: 4,
        width: 10, height: 22, borderRadius: 5,
        background: 'linear-gradient(180deg, #ffb878, #d4956a)',
        boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
        transformOrigin: 'top center',
        transform: walking ? 'rotate(-20deg)' : 'rotate(15deg)',
        transition: 'transform 0.3s ease',
      }}/>

      {/* Right arm */}
      <div style={{
        position: 'absolute', top: 38, right: 4,
        width: 10, height: 22, borderRadius: 5,
        background: 'linear-gradient(180deg, #ffb878, #d4956a)',
        boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
        transformOrigin: 'top center',
        transform: walking ? 'rotate(20deg)' : 'rotate(-15deg)',
        transition: 'transform 0.3s ease',
      }}/>

      {/* Left leg */}
      <div style={{
        position: 'absolute', bottom: 0, left: 10,
        width: 12, height: 28, borderRadius: 6,
        background: 'linear-gradient(180deg, #2a3a5a, #1a2a4a)',
        boxShadow: '1px 2px 4px rgba(0,0,0,0.4)',
        transformOrigin: 'top center',
        transform: walking ? 'rotate(-18deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}>
        {/* Left shoe */}
        <div style={{ position:'absolute', bottom:-4, left:-3, width:16, height:8, borderRadius:4, background:'linear-gradient(135deg, #1a1a2e, #0a0a1e)', boxShadow:'1px 2px 4px rgba(0,0,0,0.5)' }}/>
      </div>

      {/* Right leg */}
      <div style={{
        position: 'absolute', bottom: 0, right: 10,
        width: 12, height: 28, borderRadius: 6,
        background: 'linear-gradient(180deg, #2a3a5a, #1a2a4a)',
        boxShadow: '1px 2px 4px rgba(0,0,0,0.4)',
        transformOrigin: 'top center',
        transform: walking ? 'rotate(18deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}>
        {/* Right shoe */}
        <div style={{ position:'absolute', bottom:-4, right:-3, width:16, height:8, borderRadius:4, background:'linear-gradient(135deg, #1a1a2e, #0a0a1e)', boxShadow:'1px 2px 4px rgba(0,0,0,0.5)' }}/>
      </div>

      {/* Shadow on ground */}
      <div style={{ position:'absolute', bottom:-12, left:'50%', transform:'translateX(-50%)', width:40, height:8, borderRadius:'50%', background:'rgba(0,0,0,0.3)', filter:'blur(4px)' }}/>
    </div>
  )
}

// 3D Door component
function Door3D({ isOpen, mouseX, mouseY }) {
  const tiltX = (mouseY - 0.5) * 12
  const tiltY = (mouseX - 0.5) * -12

  return (
    <div style={{ perspective: '1200px', width: 280, height: 400 }}>
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}>
        {/* Outer glow */}
        <div style={{
          position: 'absolute', inset: -80,
          background: 'radial-gradient(ellipse, rgba(255,159,88,0.15) 0%, rgba(167,139,250,0.1) 50%, transparent 70%)',
          filter: 'blur(24px)',
          animation: 'doorPulse 3s ease-in-out infinite',
          borderRadius: '50%',
        }}/>

        {/* Door frame */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: 14,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          boxShadow: '0 0 60px rgba(255,159,88,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}/>

        {/* Arch */}
        <div style={{
          position: 'absolute', top: -2, left: -2, right: -2, height: 120,
          borderRadius: '140px 140px 0 0',
          border: '2px solid rgba(255,255,255,0.1)',
          borderBottom: 'none',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
        }}/>

        {/* Light band 1 - teal */}
        <div style={{
          position: 'absolute', top: 50, left: -20, right: -20, height: 2,
          background: 'linear-gradient(90deg, transparent, #2dd4bf, transparent)',
          filter: 'blur(1px)', animation: 'band1 5s ease-in-out infinite',
        }}/>
        {/* Light band 2 - purple */}
        <div style={{
          position: 'absolute', top: 58, left: -30, right: -30, height: 6,
          background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.8), #a78bfa, rgba(167,139,250,0.4), transparent)',
          filter: 'blur(2px)', animation: 'band2 5s ease-in-out infinite',
        }}/>
        {/* Light band 3 - amber */}
        <div style={{
          position: 'absolute', top: 68, left: -10, right: -10, height: 1.5,
          background: 'linear-gradient(90deg, transparent, #ff9f58, transparent)',
          filter: 'blur(1px)', animation: 'band3 5s ease-in-out infinite',
        }}/>

        {/* Door leaf - opens with 3D perspective */}
        <div style={{
          position: 'absolute', inset: 8,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          transformOrigin: 'left center',
          transform: isOpen ? 'perspective(800px) rotateY(-75deg)' : 'perspective(800px) rotateY(0deg)',
          transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: isOpen ? '-20px 0 60px rgba(255,159,88,0.2)' : 'none',
        }}>
          {/* Door panels */}
          <div style={{ position: 'absolute', top: 80, left: 16, right: 16, bottom: 50, display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)' }}/>
            ))}
          </div>
          {/* Knob */}
          <div style={{
            position: 'absolute', right: 22, top: '55%',
            width: 14, height: 14, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), #ff9f58, rgba(200,80,0,0.4))',
            boxShadow: '0 0 14px rgba(255,159,88,0.7)',
          }}/>
        </div>

        {/* Light burst when open */}
        {isOpen && (
          <div style={{
            position: 'absolute', inset: 8,
            borderRadius: 10,
            background: 'radial-gradient(ellipse at center, rgba(255,220,180,0.25) 0%, rgba(255,159,88,0.1) 40%, transparent 70%)',
            animation: 'lightBurst 0.5s ease-out forwards',
          }}/>
        )}

        {/* Ground shadow */}
        <div style={{
          position: 'absolute', bottom: -30, left: '15%', right: '15%', height: 30,
          background: 'radial-gradient(ellipse, rgba(255,159,88,0.18) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}/>
      </div>
    </div>
  )
}

export default function Home() {
  const [phase, setPhase] = useState('hero') // 'hero' | 'walking' | 'opening' | 'entering' | 'modules' | 'content'
  const [doorOpen, setDoorOpen] = useState(false)
  const [charWalking, setCharWalking] = useState(false)
  const [charEntering, setCharEntering] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [budget, setBudget] = useState('')
  const [budgetResult, setBudgetResult] = useState(null)
  const [selectedN, setSelectedN] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  const leafletMap = useRef(null)
  const charRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => { document.title = 'FirstDoor — Boston Guide for International Students' }, [])

  useEffect(() => {
    const fn = e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  // GSAP hero entrance
  useEffect(() => {
    gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power4.out', delay: 0.2 })
    gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.8 })
    gsap.from('.hero-door-wrap', { opacity: 0, scale: 0.8, duration: 1.4, ease: 'power3.out', delay: 0.1 })
    gsap.from('.hero-char', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 1 })
    gsap.from('.ready-btn', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 1.2 })
  }, [])

  // Module cards reveal
  useEffect(() => {
    if (phase === 'modules') {
      setTimeout(() => {
        gsap.fromTo('.module-card-enter',
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.08, clearProps: 'all' }
        )
        gsap.fromTo('.modules-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
        )
      }, 100)
    }
  }, [phase])

  const handleReady = async () => {
    if (phase !== 'hero') return

    // Step 1: character starts walking
    setPhase('walking')
    setCharWalking(true)

    // Animate character moving toward door
    await new Promise(r => {
      gsap.to(charRef.current, {
        x: 80, y: -20, scale: 0.7,
        duration: 1.2, ease: 'power2.inOut',
        onComplete: r,
      })
    })

    // Step 2: door opens
    setPhase('opening')
    setDoorOpen(true)
    await new Promise(r => setTimeout(r, 700))

    // Step 3: character enters
    setPhase('entering')
    setCharEntering(true)
    await new Promise(r => {
      gsap.to(charRef.current, {
        x: 140, opacity: 0, scale: 0.3,
        duration: 0.8, ease: 'power2.in',
        onComplete: r,
      })
    })

    // Step 4: flash transition
    await new Promise(r => {
      gsap.to('.flash-overlay', {
        opacity: 1, duration: 0.3, ease: 'power2.in',
        onComplete: r,
      })
    })

    // Step 5: show modules
    setPhase('modules')
    gsap.to('.flash-overlay', { opacity: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' })
  }

  // Map setup (only when content phase)
  useEffect(() => {
    if (phase !== 'content') return
    const timer = setTimeout(() => {
      if (mapRef.current && !leafletMap.current) {
        import('leaflet').then(L => {
          const Lm = L.default
          delete Lm.Icon.Default.prototype._getIconUrl
          Lm.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' })
          const map = Lm.map(mapRef.current, { center: [42.355, -71.095], zoom: 11, zoomControl: true, scrollWheelZoom: false })
          leafletMap.current = map
          Lm.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap © CartoDB', maxZoom: 19 }).addTo(map)
          NEIGHBORHOODS.forEach(n => {
            const outer = Lm.circleMarker([n.lat, n.lng], { radius: 16, fillColor: n.color, color: n.color, weight: 1.5, opacity: 0.35, fillOpacity: 0.15 }).addTo(map)
            const inner = Lm.circleMarker([n.lat, n.lng], { radius: 7, fillColor: n.color, color: 'white', weight: 2.5, opacity: 1, fillOpacity: 1 }).addTo(map)
            inner.bindTooltip(n.name, { permanent: true, direction: 'top', offset: [0, -12], className: 'n-label' })
            const click = () => setSelectedN(n)
            outer.on('click', click); inner.on('click', click)
          })
          // Remove any existing n-label styles and add fresh ones
          document.querySelectorAll('style[data-nlabel]').forEach(el => el.remove())
          const s = document.createElement('style')
          s.setAttribute('data-nlabel', '1')
          s.textContent = `.n-label { background: #1a1a2e !important; border: 1px solid rgba(255,159,88,0.5) !important; border-radius: 6px !important; padding: 4px 10px !important; box-shadow: 0 2px 12px rgba(0,0,0,0.5) !important; color: white !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.03em !important; white-space: nowrap !important; } .n-label::before { display: none !important; }`
          document.head.appendChild(s)
          setMapLoaded(true)
        })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [phase])

  const calcBudget = () => {
    const b = parseInt(budget)
    if (!b || b < 500) { setBudgetResult({ error: true }); return }
    setBudgetResult({ budget: b, affordable: NEIGHBORHOODS.filter(n => n.rentMin <= b), stretch: NEIGHBORHOODS.filter(n => n.rentMin > b && n.rentMin <= b * 1.25) })
  }

  return (
    <div style={{ background: '#0c0c14', minHeight: '100vh', position: 'relative' }}>
      <style>{`
        @keyframes doorPulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
        @keyframes band1{0%,100%{opacity:.7;transform:translateX(0)}50%{opacity:1;transform:translateX(12px)}}
        @keyframes band2{0%,100%{opacity:.6;transform:translateX(0)}50%{opacity:1;transform:translateX(-10px)}}
        @keyframes band3{0%,100%{opacity:.5;transform:translateX(0)}50%{opacity:1;transform:translateX(8px)}}
        @keyframes lightBurst{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        @keyframes legWalk{0%,100%{transform:rotate(0deg)}50%{transform:rotate(15deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .module-card-enter{cursor:none}
        .module-card-enter:hover{transform:translateY(-8px) scale(1.02)!important;box-shadow:0 24px 60px rgba(0,0,0,0.4)!important}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.09);border-radius:20px;transition:all .3s cubic-bezier(.16,1,.3,1)}
        .glass:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15)}
        .module-row{border-bottom:1px solid rgba(255,255,255,0.07);transition:all .3s cubic-bezier(.16,1,.3,1)}
        .module-row:hover{background:rgba(255,255,255,0.03);padding-left:1.5rem!important}
        .module-row:hover .mod-arrow{opacity:1!important;transform:translate(4px,-4px)!important}
        input:focus{outline:none}
        .n-label{background:rgba(255,255,255,0.96)!important;border:1.5px solid rgba(0,0,0,0.12)!important;border-radius:6px!important;padding:3px 9px!important}
        .n-label::before{display:none!important}
      `}</style>

      {/* Flash overlay for transition */}
      <div className="flash-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(255,220,180,0.95)', zIndex: 9999, opacity: 0, pointerEvents: 'none' }}/>

      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)', top: '-5%', right: '-5%', animation: 'floatY 12s ease-in-out infinite' }}/>
        <div style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(45,212,191,0.07) 0%, transparent 70%)', bottom: '10%', left: '-5%', animation: 'floatY 15s ease-in-out infinite reverse' }}/>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '80px 80px' }}/>
      </div>

      {/* ═══ HERO ═══ */}
      {(phase === 'hero' || phase === 'walking' || phase === 'opening' || phase === 'entering') && (
        <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 1 }}>

          {/* Top left badge */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '2.5rem', display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }}/>
            <span style={{ fontSize: 11, color: '#34d399', fontWeight: 600, letterSpacing: '0.05em' }}>Live · Boston, MA · Free</span>
          </div>

          {/* Center layout: door + character */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative', zIndex: 2 }}>

            {/* Door */}
            <div className="hero-door-wrap">
              <Door3D isOpen={doorOpen} mouseX={mouse.x} mouseY={mouse.y}/>
            </div>

            {/* Character standing in front of door */}
            <div ref={charRef} className="hero-char" style={{
              position: 'absolute', bottom: -20,
              left: '50%', transform: 'translateX(-50%)',
              zIndex: 10, transformOrigin: 'bottom center',
            }}>
              <Character walking={charWalking} entering={charEntering}/>
            </div>
          </div>

          {/* Catchline — bottom left */}
          <div className="hero-title" style={{ position: 'absolute', bottom: '8rem', left: '3rem', maxWidth: 500, zIndex: 5 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 600 }}>
              For international students
            </div>
            <h1 style={{ fontSize: 'clamp(36px,5vw,68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em', color: 'white', marginBottom: '0.75rem' }}>
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>Your first</span>{' '}
              <span style={{ background: 'linear-gradient(90deg,#ff9f58,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>door</span>
              <br/>
              <span style={{ fontWeight: 900 }}>into Boston.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              Someone right now is worried about{' '}
              <span style={{ color: '#ff9f58', fontWeight: 600 }}>
                <TypeWriter texts={['finding housing', 'building credit', 'CPT vs OPT', 'halal food', 'the Logan route']} speed={70}/>
              </span>
            </p>
          </div>

          {/* Ready button — bottom right */}
          <div className="ready-btn" style={{ position: 'absolute', bottom: '8rem', right: '3rem', zIndex: 5 }}>
            {phase === 'hero' && (
              <button onClick={handleReady} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: 'none', border: 'none', cursor: 'none',
              }}>
                <div style={{
                  padding: '16px 40px',
                  background: 'linear-gradient(135deg, #ff9f58, #a78bfa)',
                  borderRadius: 100, fontSize: 16, fontWeight: 700,
                  color: '#0c0c14', letterSpacing: '-0.01em',
                  boxShadow: '0 0 40px rgba(255,159,88,0.3)',
                  transition: 'all 0.25s',
                  animation: 'doorPulse 3s ease-in-out infinite',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(255,159,88,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,159,88,0.3)' }}
                >
                  I'm Ready →
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Click to enter</span>
              </button>
            )}
            {(phase === 'walking' || phase === 'opening' || phase === 'entering') && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
                  {phase === 'walking' && 'Walking to the door...'}
                  {phase === 'opening' && 'Opening the door...'}
                  {phase === 'entering' && 'Entering Boston...'}
                </div>
              </div>
            )}
          </div>

          {/* AI link — top right */}
          <Link to="/ask" style={{ position: 'absolute', top: '1.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', backdropFilter: 'blur(12px)', transition: 'all 0.2s', zIndex: 10 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          ><MessageCircle size={14}/> Ask AI</Link>
        </section>
      )}

      {/* ═══ MODULES SCREEN ═══ */}
      {phase === 'modules' && (
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '7rem 3rem', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

            <div className="modules-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Welcome to Boston
              </div>
              <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.035em', marginBottom: '1rem' }}>
                What do you need<br/>
                <span style={{ background: 'linear-gradient(90deg,#ff9f58,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>right now?</span>
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto' }}>
                Six modules. Everything you need on day one. Pick where to start.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {MODULES.map((m, i) => (
                <Link key={m.to} to={m.to} className="module-card-enter" style={{
                  display: 'block', textDecoration: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${m.color}25`,
                  borderRadius: 20,
                  padding: '2rem',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {/* Glow in corner */}
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(ellipse, ${m.glow} 0%, transparent 70%)`, pointerEvents: 'none' }}/>

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: `1px solid ${m.color}30` }}>{m.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: m.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{m.num}</div>
                        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>{m.label}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={20} color={m.color} style={{ marginTop: 4, opacity: 0.7 }}/>
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{m.desc}</div>
                  <div style={{ marginTop: '1.5rem', height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${m.color}60, ${m.color}10)` }}/>
                </Link>
              ))}
            </div>

            {/* Also show content below */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button onClick={() => setPhase('content')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '12px 28px', fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >Explore tools & map ↓</button>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONTENT (tools, map, story) ═══ */}
      {phase === 'content' && (
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Modules grid at top */}
          <section style={{ padding: '5rem 3rem 3rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, marginBottom: '2rem' }}>
                {MODULES.map(m => (
                  <Link key={m.to} to={m.to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.color}20`, borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${m.color}10`; e.currentTarget.style.borderColor = `${m.color}40` }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${m.color}20` }}
                  >
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{m.label}</span>
                    <ArrowUpRight size={14} color={m.color} style={{ marginLeft: 'auto' }}/>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Map */}
          <section style={{ padding: '3rem 3rem 5rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '5rem', alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem', fontWeight: 600 }}>Interactive map</div>
                  <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Explore Boston neighborhoods</h2>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '2rem' }}>Click any marker for rent, safety, transit and university info.</p>
                  {selectedN ? (
                    <div className="glass" style={{ padding: '1.5rem', border: `1px solid ${selectedN.color}40`, animation: 'fadeUp 0.3s ease' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: selectedN.color }}>{selectedN.name}</div>
                        <button onClick={() => setSelectedN(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 20 }}>×</button>
                      </div>
                      {[['Rent', selectedN.rent+'/mo'],['Safety',selectedN.safety],['Transit',selectedN.transit],['Near',selectedN.universities]].map(([l,v]) => (
                        <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,0.07)', fontSize:13 }}>
                          <span style={{color:'rgba(255,255,255,0.3)'}}>{l}</span>
                          <span style={{color:'rgba(255,255,255,0.85)',fontWeight:600,textAlign:'right',maxWidth:160}}>{v}</span>
                        </div>
                      ))}
                      <Link to="/housing" style={{ display:'inline-flex',alignItems:'center',gap:6,marginTop:'1.25rem',padding:'11px 20px',background:'#ff9f58',color:'#0c0c14',borderRadius:100,fontSize:13,fontWeight:700,textDecoration:'none',width:'100%',justifyContent:'center' }}>Full housing guide <ArrowRight size={13}/></Link>
                    </div>
                  ) : (
                    <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                      {NEIGHBORHOODS.slice(0,8).map(n => (
                        <button key={n.name} onClick={() => setSelectedN(n)} style={{ fontSize:12,color:'rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:100,padding:'5px 14px',display:'flex',alignItems:'center',gap:6,transition:'all 0.2s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=n.color+'80';e.currentTarget.style.color=n.color;e.currentTarget.style.background=n.color+'15'}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='rgba(255,255,255,0.4)';e.currentTarget.style.background='rgba(255,255,255,0.06)'}}
                        ><div style={{width:7,height:7,borderRadius:'50%',background:n.color}}/>{n.name}</button>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ borderRadius:20,overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',height:500,position:'relative',boxShadow:'0 40px 100px rgba(0,0,0,0.5)' }}>
                  {!mapLoaded && (
                    <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#1a1a2e',zIndex:10,flexDirection:'column',gap:14 }}>
                      <div style={{ width:32,height:32,border:'2px solid #ff9f58',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.8s linear infinite' }}/>
                      <span style={{ fontSize:13,color:'rgba(255,255,255,0.3)' }}>Loading map...</span>
                    </div>
                  )}
                  <div ref={mapRef} style={{ width:'100%',height:'100%' }}/>
                </div>
              </div>
            </div>
          </section>

          {/* Tools */}
          <section style={{ padding:'3rem 3rem 5rem' }}>
            <div style={{ maxWidth:1200,margin:'0 auto' }}>
              <div style={{ fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'0.75rem',fontWeight:600 }}>Interactive tools</div>
              <h2 style={{ fontSize:'clamp(28px,3.5vw,48px)',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'3rem' }}>Real tools. Not just guides.</h2>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem' }}>
                <div className="glass" style={{ padding:'2.5rem' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:'1.5rem' }}>
                    <div style={{ width:44,height:44,borderRadius:12,background:'rgba(255,159,88,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,border:'1px solid rgba(255,159,88,0.2)' }}>💰</div>
                    <div>
                      <div style={{ fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:3,fontWeight:600 }}>Budget calculator</div>
                      <div style={{ fontSize:17,fontWeight:700,letterSpacing:'-0.01em' }}>Which neighborhoods can I afford?</div>
                    </div>
                  </div>
                  <div style={{ display:'flex',gap:10,marginBottom:'1.25rem' }}>
                    <div style={{ position:'relative',flex:1 }}>
                      <span style={{ position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.3)',fontWeight:700 }}>$</span>
                      <input type="number" placeholder="Monthly budget" value={budget}
                        onChange={e=>{setBudget(e.target.value);setBudgetResult(null)}}
                        onKeyDown={e=>e.key==='Enter'&&calcBudget()}
                        style={{ width:'100%',padding:'13px 14px 13px 30px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:10,color:'white',fontSize:15,transition:'border-color 0.2s' }}
                        onFocus={e=>e.target.style.borderColor='#ff9f58'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'}
                      />
                    </div>
                    <button onClick={calcBudget} style={{ padding:'13px 22px',background:'#ff9f58',color:'#0c0c14',border:'none',borderRadius:10,fontSize:14,fontWeight:700,transition:'all 0.2s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.03)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                    >Find →</button>
                  </div>
                  {budgetResult&&(
                    <div style={{animation:'fadeUp 0.3s ease'}}>
                      {budgetResult.error ? <div style={{fontSize:13,color:'#f472b6',padding:'10px 14px',background:'rgba(244,114,182,0.1)',borderRadius:8}}>Enter a valid budget (min $500)</div>
                      : budgetResult.affordable.length===0 ? <div style={{fontSize:13,color:'#ff9f58',padding:'10px 14px',background:'rgba(255,159,88,0.1)',borderRadius:8,lineHeight:1.6}}>Most students split 2–3 ways.</div>
                      : <div>
                        <div style={{fontSize:12,color:'#34d399',fontWeight:700,marginBottom:10,letterSpacing:'0.04em',textTransform:'uppercase'}}>✓ {budgetResult.affordable.length} neighborhoods</div>
                        {budgetResult.affordable.slice(0,4).map(n=>(
                          <div key={n.name} style={{display:'flex',justifyContent:'space-between',padding:'9px 12px',background:'rgba(52,211,153,0.08)',border:'1px solid rgba(52,211,153,0.15)',borderRadius:9,marginBottom:6}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:8,height:8,borderRadius:'50%',background:n.color}}/><span style={{fontSize:13,fontWeight:600}}>{n.name}</span></div>
                            <span style={{fontSize:13,color:'#34d399',fontWeight:700}}>{n.rent}/mo</span>
                          </div>
                        ))}
                      </div>}
                    </div>
                  )}
                </div>
                <div className="glass" style={{ padding:'2.5rem' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:'1.5rem' }}>
                    <div style={{ width:44,height:44,borderRadius:12,background:'rgba(96,165,250,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,border:'1px solid rgba(96,165,250,0.2)' }}>🧭</div>
                    <div>
                      <div style={{ fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:3,fontWeight:600 }}>Directions</div>
                      <div style={{ fontSize:17,fontWeight:700,letterSpacing:'-0.01em' }}>Get directions anywhere in Boston</div>
                    </div>
                  </div>
                  <DirectionsMap compact={true}/>
                </div>
              </div>
            </div>
          </section>

          {/* Story */}
          <section style={{ padding:'3rem 3rem 5rem' }}>
            <div style={{ maxWidth:1200,margin:'0 auto' }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'7rem',alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'1rem',fontWeight:600 }}>The story</div>
                  <h2 style={{ fontSize:'clamp(24px,3vw,40px)',fontWeight:800,letterSpacing:'-0.025em',marginBottom:'2rem',lineHeight:1.3 }}>"I spent weeks figuring out things that should have taken hours."</h2>
                  <div style={{ fontSize:15,color:'rgba(255,255,255,0.5)',lineHeight:1.9,marginBottom:'2.5rem' }}>
                    I arrived in Boston from Warangal, India with one suitcase and zero context. My landlord asked for 3 months deposit. I had no SSN, no credit history, no idea which bank would open an account.<br/><br/>
                    I took the wrong train from Logan three times. I nearly missed a CPT deadline. Nobody tells you this stuff.<br/><br/>
                    So I built the guide I needed on day one.
                  </div>
                  <div style={{ display:'flex',alignItems:'center',gap:16 }}>
                    <div style={{ width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,#ff9f58,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:900,color:'#0c0c14',flexShrink:0 }}>M</div>
                    <div>
                      <div style={{ fontSize:15,fontWeight:700 }}>Manideep Kathula</div>
                      <div style={{ fontSize:12,color:'rgba(255,255,255,0.3)',display:'flex',alignItems:'center',gap:4,marginTop:3 }}><MapPin size={11}/> Warangal, India → Boston, MA</div>
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                  {[
                    {q:'My landlord asked for 3 months deposit. Is that legal?',a:'No. Massachusetts caps it at 1 month. Report them immediately.',c:'#ff9f58'},
                    {q:'Which bank opens an account without SSN?',a:'DCU, Bank of America, Citizens Bank. Bring I-20 + passport.',c:'#60a5fa'},
                    {q:'How do I get from Logan Airport to MIT?',a:'Silver Line (FREE) → South Station → Red Line. ~20 min.',c:'#34d399'},
                    {q:'What if I miss my OPT application deadline?',a:'Contact your DSO immediately. Apply 90 days before graduation.',c:'#a78bfa'},
                  ].map((item,i)=>(
                    <div key={i} className="glass" style={{ padding:'1.25rem 1.5rem',background:`${item.c}08`,border:`1px solid ${item.c}25`,borderRadius:14,transition:'all 0.3s' }}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 12px 32px ${item.c}15`}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
                    >
                      <div style={{ fontSize:13,color:'rgba(255,255,255,0.4)',marginBottom:8,fontStyle:'italic',lineHeight:1.5 }}>"{item.q}"</div>
                      <div style={{ fontSize:13,color:item.c,fontWeight:600,lineHeight:1.55 }}>→ {item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI CTA */}
          <section style={{ padding:'3rem 3rem 8rem' }}>
            <div style={{ maxWidth:1200,margin:'0 auto' }}>
              <div className="glass" style={{ padding:'4rem',background:'linear-gradient(135deg,rgba(255,159,88,0.07),rgba(167,139,250,0.05))',border:'1px solid rgba(255,255,255,0.09)',display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:'4rem',alignItems:'center',borderRadius:28,position:'relative',overflow:'hidden' }}>
                <div style={{ position:'absolute',top:-80,right:-80,width:280,height:280,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(255,159,88,0.1),transparent)',pointerEvents:'none' }}/>
                <div style={{ position:'relative' }}>
                  <div style={{ fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'1rem',fontWeight:600 }}>AI Assistant</div>
                  <h2 style={{ fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'1.25rem' }}>Still have a specific question?</h2>
                  <p style={{ fontSize:15,color:'rgba(255,255,255,0.45)',lineHeight:1.8,maxWidth:400,marginBottom:'2rem' }}>The FirstDoor AI knows Boston tenant law, which banks accept F-1 students, MBTA routes, and CPT/OPT rules.</p>
                  <Link to="/ask" style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'14px 30px',background:'#ff9f58',color:'#0c0c14',borderRadius:100,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(255,159,88,0.25)' }}><MessageCircle size={16}/> Ask anything</Link>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
                  {['How do I build credit with no US credit history?',"Is my landlord's 3-month deposit request legal?",'What is the difference between CPT and OPT?','How do I get from Logan Airport to Northeastern?'].map(q=>(
                    <button key={q} onClick={()=>navigate('/ask')} style={{ padding:'13px 16px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:12,fontSize:12,color:'rgba(255,255,255,0.4)',textAlign:'left',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,transition:'all 0.2s' }}
                      onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,159,88,0.1)';e.currentTarget.style.borderColor='rgba(255,159,88,0.3)';e.currentTarget.style.color='rgba(255,255,255,0.85)'}}
                      onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.borderColor='rgba(255,255,255,0.09)';e.currentTarget.style.color='rgba(255,255,255,0.4)'}}
                    ><span>"{q}"</span><ArrowRight size={13} color="#ff9f58" style={{flexShrink:0}}/></button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <footer style={{ borderTop:'1px solid rgba(255,255,255,0.07)',padding:'3rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem',position:'relative',zIndex:1 }}>
            <div style={{ display:'flex',alignItems:'center',gap:12 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:'#ff9f58',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:'#0c0c14' }}>F</div>
              <span style={{ fontSize:14,fontWeight:600,letterSpacing:'-0.01em' }}>FirstDoor</span>
              <span style={{ fontSize:13,color:'rgba(255,255,255,0.25)' }}>· Manideep Kathula · Boston · 2026</span>
            </div>
            <div style={{ display:'flex',gap:'2rem' }}>
              {[['GitHub','https://github.com/Manideepkathula/First-Door-'],['LinkedIn','https://linkedin.com/in/manideep-kathula'],['Live Site','https://first-door.vercel.app']].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize:13,color:'rgba(255,255,255,0.25)',transition:'color 0.2s',textDecoration:'none' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#ff9f58'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}
                >{l}</a>
              ))}
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
