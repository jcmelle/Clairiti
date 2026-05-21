import { Routes, Route } from 'react-router-dom'
import LandingPage  from './pages/LandingPage.jsx'
import UploadPage   from './pages/UploadPage.jsx'
import LoadingPage  from './pages/LoadingPage.jsx'
import ResultsPage  from './pages/ResultsPage.jsx'

// all my routes live here
export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<LandingPage />} />
      <Route path="/upload"  element={<UploadPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}
