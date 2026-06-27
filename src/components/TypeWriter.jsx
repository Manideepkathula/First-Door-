import { useEffect, useState } from 'react'
export default function TypeWriter({ texts, speed = 75, pause = 2200 }) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = texts[textIndex]
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, speed)
      return () => clearTimeout(t)
    } else if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    } else if (deleting && charIndex > 0) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, speed / 2.5)
      return () => clearTimeout(t)
    } else if (deleting && charIndex === 0) {
      setDeleting(false); setTextIndex(i => (i + 1) % texts.length)
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause])
  return <span>{displayed}<span style={{ borderRight: '2px solid var(--accent)', marginLeft: 1, animation: 'blink 1s step-end infinite' }}/></span>
}
