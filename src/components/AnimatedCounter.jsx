import { useEffect, useState, useRef } from 'react'
export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(String(target).replace(/\D/g, ''))
        const steps = 50; const increment = num / steps; let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= num) { setCount(num); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}
