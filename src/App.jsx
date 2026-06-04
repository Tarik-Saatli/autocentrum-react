import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OverOns from './pages/OverOns'
import Diensten from './pages/Diensten'
import Aanbod from './pages/Aanbod'
import Contact from './pages/Contact'

function ScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return null
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<><ScrollToTop /><Home /></>} />
        <Route path="/over-ons" element={<><ScrollToTop /><OverOns /></>} />
        <Route path="/diensten" element={<><ScrollToTop /><Diensten /></>} />
        <Route path="/aanbod" element={<><ScrollToTop /><Aanbod /></>} />
        <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
      </Routes>
      <Footer />
    </>
  )
}
