import { Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OverOns from './pages/OverOns'
import Diensten from './pages/Diensten'
import Aanbod from './pages/Aanbod'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/aanbod" element={<Aanbod />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
