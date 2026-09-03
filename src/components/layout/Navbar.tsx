import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/searches', label: 'Searches' },
  { to: '/settings', label: 'Settings' },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
     <NavLink to={navItems.at(0)!.to}>
   <div className="flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-7 h-7">
    <circle cx="28" cy="28" r="22" fill="none" stroke="#4F46E5" strokeWidth="5"/>
    <polygon points="28,10 32,28 28,46 24,28" fill="#4F46E5"/>
    <line x1="28" y1="6" x2="28" y2="12" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
    <line x1="28" y1="44" x2="28" y2="50" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
    <line x1="6" y1="28" x2="12" y2="28" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
    <line x1="44" y1="28" x2="50" y2="28" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
    <line x1="44" y1="44" x2="56" y2="56" stroke="#4F46E5" strokeWidth="6" strokeLinecap="round"/>
  </svg>
  <span className="text-lg sm:text-xl font-semibold text-gray-800">JobScout</span>
</div></NavLink>
        <ul className="flex space-x-2 sm:space-x-4 overflow-x-auto">
  {navItems.map((item) => (
    <li key={item.to} className="flex-shrink-0">
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
            isActive
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`
        }
      >
        {item.label}
      </NavLink>
    </li>
  ))}
</ul>
      </div>
    </nav>
  )
}