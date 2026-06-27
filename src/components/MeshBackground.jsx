import { useEffect, useRef } from 'react'

export default function MeshBackground() {
  const ref = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = e => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.04
      current.current.y += (mouse.current.y - current.current.y) * 0.04
      if (ref.current) {
        const x = current.current.x * 40 - 20
        const y = current.current.y * 40 - 20
        ref.current.style.transform = `translate(${x}px, ${y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Base gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d0d20 0%, #0d1420 25%, #0d0d1a 50%, #130d20 75%, #0d0d18 100%)' }}/>

      {/* Animated mesh orbs */}
      <div ref={ref} style={{ position: 'absolute', inset: '-20%', transition: 'none' }}>
        {/* Purple orb - top right */}
        <div style={{ position: 'absolute', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)', top: '-5%', right: '0%', animation: 'meshMove 12s ease-in-out infinite' }}/>
        {/* Teal orb - bottom left */}
        <div style={{ position: 'absolute', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(45,212,191,0.14) 0%, transparent 70%)', bottom: '5%', left: '-5%', animation: 'meshMove 15s ease-in-out infinite reverse' }}/>
        {/* Amber orb - center */}
        <div style={{ position: 'absolute', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,159,88,0.1) 0%, transparent 70%)', top: '30%', left: '35%', animation: 'meshMove 10s ease-in-out 3s infinite' }}/>
        {/* Blue orb - top left */}
        <div style={{ position: 'absolute', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(96,165,250,0.12) 0%, transparent 70%)', top: '10%', left: '5%', animation: 'meshMove 18s ease-in-out 6s infinite reverse' }}/>
        {/* Pink orb - bottom right */}
        <div style={{ position: 'absolute', width: '28vw', height: '28vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(244,114,182,0.1) 0%, transparent 70%)', bottom: '15%', right: '10%', animation: 'meshMove 14s ease-in-out 2s infinite' }}/>
      </div>

      {/* Noise texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, opacity: 0.5 }}/>

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px' }}/>
    </div>
  )
}
