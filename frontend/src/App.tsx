import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar.tsx'
import Home from './pages/Home.tsx'
import Searches from './pages/Searches.tsx'
import Settings from './pages/Settings.tsx'
import NotFound from './pages/NotFound.tsx'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="searches" element={<Searches />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}