import { NavLink } from 'react-router-dom'
import { useNavItems } from '../hooks/useData'

export default function Navbar() {
  const { data: navItems, isLoading } = useNavItems()

  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">华夏文化画廊</NavLink>
      <ul className="nav-links">
        {isLoading ? (
          <li style={{ color: '#8a8278', fontSize: '0.85rem' }}>加载中...</li>
        ) : (
          (navItems || []).map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
                {item.label}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </nav>
  )
}
