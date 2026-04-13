import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    window.dispatchEvent(new Event('cookie_consent_update'))
  }

  function reject() {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#111',
      borderTop: '1px solid rgba(196,18,48,0.3)',
      padding: '1.25rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 300,
        color: 'rgba(245,240,234,0.65)',
        lineHeight: 1.7,
        margin: 0,
        maxWidth: 700,
      }}>
        Utilizziamo cookie analitici (Google Analytics) per migliorare l'esperienza di navigazione.
        Puoi accettare o rifiutare i cookie non essenziali.{' '}
        <span
          onClick={() => navigate('/privacy')}
          style={{ color: '#C41230', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Privacy Policy
        </span>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={reject}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.55rem 1.2rem',
            background: 'transparent',
            color: 'rgba(245,240,234,0.45)',
            border: '1px solid rgba(245,240,234,0.15)',
            cursor: 'pointer',
          }}
        >
          Rifiuta
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.55rem 1.2rem',
            background: '#C41230',
            color: '#F5F0EA',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Accetta
        </button>
      </div>
    </div>
  )
}
