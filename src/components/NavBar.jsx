import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function NavBar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <nav className="nav">
      <Link to="/home" className="brand">NETFLIX</Link>
      <div>
        <Link to="/home" style={{ marginRight: 12 }}>Home</Link>
        <button onClick={handleLogout} style={{ background: '#e50914', border: 0, color: '#fff', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}
