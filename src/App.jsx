import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import OverOns from './pages/OverOns'
import Diensten from './pages/Diensten'
import Aanbod from './pages/Te koop'
import Contact from './pages/Contact'
import CarsPage from './pages/CarsPage'
import AddCarForm from './components/AddCarForm'
import ProtectedRoute from './components/ProtectedRoute';



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

          <Route path="/login" element={<Navigate to="/cars" replace />} />
          <Route path="/register" element={<Navigate to="/cars" replace />} />
          <Route
            path="/toevoegenAuto"
            element={
              <ProtectedRoute>
                <AddCarForm />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/diensten" element={<Diensten />} />
          <Route path="/aanbod" element={<Aanbod />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
