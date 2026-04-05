import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return unsub
  }, [])

  if (user === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: '#0e0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(196,18,48,0.2)', borderTopColor: '#C41230', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin" replace />

  return children
}
