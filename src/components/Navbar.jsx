import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function LogoIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect width="34" height="34" rx="10" fill="rgba(255,255,255,0.1)"/>
      <rect width="34" height="34" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <path d="M10 20V14.5L17 10L24 14.5V20" stroke="#ff9f58" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="13" y="17" width="8" height="7" rx="1.5" stroke="rgba(240,238,255,0.9)" strokeWidth="1.5"/>
      <circle cx="17.5" cy="21" r="1" fill="#ff9f58"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to: '/housing', label: 'Housing' },
    { to: '/food', label: 'Food' },
    { to: '/systems', label: 'US Systems' },
    { to: '/transit', label: 'Transit' },
    { to: '/visa', label: 'Visa' },
    { to: '/emergency', label: 'Emergency' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: '0 2.5rem',
        background: scrolled ? 'rgba(13,13,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 66, maxWidth: 1400, margin: '0 auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto', textDecoration: 'none' }}>
            <LogoIcon/>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>FirstDoor</span>
          </Link>

          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="nav-links">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontSize: 13, padding: '7px 13px', borderRadius: 8,
                color: loc.pathname === l.to ? 'var(--amber)' : 'var(--text2)',
                fontWeight: 400, transition: 'color 0.2s', textDecoration: 'none',
              }}
                onMouseEnter={e => { if (loc.pathname !== l.to) e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { if (loc.pathname !== l.to) e.currentTarget.style.color = 'var(--text2)' }}
              >{l.label}</Link>
            ))}
            <Link to="/ask" style={{
              marginLeft: 14, fontSize: 13, padding: '8px 20px',
              background: 'var(--amber)', color: '#0d0d14',
              borderRadius: 100, fontWeight: 700, textDecoration: 'none',
              transition: 'all 0.2s', boxShadow: '0 0 20px rgba(255,159,88,0.2)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(255,159,88,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,159,88,0.2)' }}
            >Ask AI ✦</Link>
          </div>

          <button onClick={() => setOpen(o => !o)} className="nav-hamburger" style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', fontSize: 22, marginLeft: 16 }}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,13,20,0.97)', backdropFilter: 'blur(24px)', zIndex: 499, display: 'flex', flexDirection: 'column', padding: '5rem 2.5rem 3rem' }}>
          {[{ to: '/', label: 'Home' }, ...links, { to: '/ask', label: 'Ask AI ✦' }].map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, padding: '0.75rem 0', color: loc.pathname === l.to ? 'var(--amber)' : 'var(--text)', borderBottom: '1px solid rgba(255,255,255,0.06)', letterSpacing: '-0.025em', textDecoration: 'none' }}>{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`@media(max-width:900px){.nav-links{display:none!important}.nav-hamburger{display:block!important}}`}</style>
    </>
  )
}
