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
        <span className="text-lg sm:text-xl font-semibold text-gray-800">
          JobScout
        </span>
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