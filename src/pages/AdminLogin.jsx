import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Scissors } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Email o password errati.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Scissors size={36} color="#C41230" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 400, color: '#F5F0EA', margin: 0 }}>
            Parrucchieria Debora
          </h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C41230', marginTop: '0.5rem' }}>
            Area Amministrativa
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ background: '#161616', padding: '2.5rem', border: '1px solid rgba(196,18,48,0.15)' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              placeholder="admin@esempio.com"
            />
          </div>
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#C41230', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#7a0a1c' : '#C41230', color: '#F5F0EA', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'background 0.3s' }}>
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="#/" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', color: 'rgba(245,240,234,0.3)', textDecoration: 'none' }}>
            ← Torna al sito
          </a>
        </p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.6rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,234,0.5)',
  marginBottom: '0.5rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: '#0e0e0e',
  border: '1px solid rgba(196,18,48,0.2)',
  color: '#F5F0EA',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
}
