import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      if (dot.current) {
        dot.current.style.left = pos.current.x + 'px'
        dot.current.style.top = pos.current.y + 'px'
      }
      if (ring.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1
        ring.current.style.left = ringPos.current.x + 'px'
        ring.current.style.top = ringPos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    const enter = (e) => {
      isHovering.current = true
      if (dot.current) { dot.current.style.opacity = '0'; dot.current.style.transform = 'translate(-50%,-50%) scale(3)' }
      if (ring.current) { ring.current.style.width = '56px'; ring.current.style.height = '56px'; ring.current.style.borderColor = '#ff9f58'; ring.current.style.background = 'rgba(255,159,88,0.06)' }
    }
    const leave = () => {
      isHovering.current = false
      if (dot.current) { dot.current.style.opacity = '1'; dot.current.style.transform = 'translate(-50%,-50%) scale(1)' }
      if (ring.current) { ring.current.style.width = '36px'; ring.current.style.height = '36px'; ring.current.style.borderColor = 'rgba(255,159,88,0.35)'; ring.current.style.background = 'transparent' }
    }

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        width: 8, height: 8,
        background: '#ff9f58',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%,-50%)',
        transition: 'opacity 0.2s, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: '0 0 10px rgba(255,159,88,0.6)',
      }}/>
      <div ref={ring} style={{
        width: 36, height: 36,
        border: '1.5px solid rgba(255,159,88,0.35)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, background 0.2s',
      }}/>
    </>
  )
}
