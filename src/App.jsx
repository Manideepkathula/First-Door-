import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Housing from './pages/Housing'
import Food from './pages/Food'
import Systems from './pages/Systems'
import Transit from './pages/Transit'
import Visa from './pages/Visa'
import Emergency from './pages/Emergency'
import Ask from './pages/Ask'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/food" element={<Food />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/transit" element={<Transit />} />
        <Route path="/visa" element={<Visa />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </BrowserRouter>
  )
}
