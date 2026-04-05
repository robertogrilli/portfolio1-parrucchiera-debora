import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { LogOut, Image, Tag, Info, Trash2, Plus, Upload, Check, X } from 'lucide-react'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/* ─── TABS ─────────────────────────────────────── */
const TABS = [
  { id: 'gallery',  label: 'Galleria',  icon: Image },
  { id: 'prezzi',   label: 'Prezzi',    icon: Tag },
  { id: 'info',     label: 'Info',      icon: Info },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('gallery')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/admin')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0e', color: '#F5F0EA' }}>
      {/* Header */}
      <div style={{ background: '#161616', borderBottom: '1px solid rgba(196,18,48,0.2)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 400, margin: 0 }}>Dashboard Admin</h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C41230', margin: '0.25rem 0 0' }}>Parrucchieria Debora</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', color: 'rgba(245,240,234,0.4)', textDecoration: 'none' }}>← Sito pubblico</a>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid rgba(196,18,48,0.3)', color: '#C41230', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <LogOut size={14} /> Esci
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', padding: '0 2rem' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.5rem', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid #C41230' : '2px solid transparent', color: tab === t.id ? '#C41230' : 'rgba(245,240,234,0.4)', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.2s', marginBottom: '-1px' }}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        {tab === 'gallery' && <GalleryTab />}
        {tab === 'prezzi'  && <PrezziTab />}
        {tab === 'info'    && <InfoTab />}
      </div>
    </div>
  )
}

/* ─── GALLERY TAB ───────────────────────────────── */
function GalleryTab() {
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newSub, setNewSub] = useState('')
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => { loadGallery() }, [])

  const loadGallery = async () => {
    const snap = await getDocs(collection(db, 'gallery'))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !newLabel) return
    setUploading(true)
    setMsg('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder', 'parrucchiera-debora/gallery')

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)

      await addDoc(collection(db, 'gallery'), {
        label: newLabel,
        sub: newSub || 'Lavoro',
        url: data.secure_url,
        publicId: data.public_id,
        createdAt: new Date().toISOString(),
      })
      setNewLabel('')
      setNewSub('')
      setFile(null)
      e.target.reset()
      setMsg('Foto caricata con successo!')
      loadGallery()
    } catch (err) {
      setMsg('Errore: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminare questa foto?')) return
    await deleteDoc(doc(db, 'gallery', id))
    loadGallery()
  }

  return (
    <div>
      <h2 style={sectionTitle}>Gestione Galleria</h2>

      {/* Upload form */}
      <form onSubmit={handleUpload} style={{ background: '#161616', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(196,18,48,0.1)' }}>
        <h3 style={subTitle}>Aggiungi nuova foto</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Titolo *</label>
            <input value={newLabel} onChange={e => setNewLabel(e.target.value)} required placeholder="es. Balayage Naturale" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Categoria</label>
            <input value={newSub} onChange={e => setNewSub(e.target.value)} placeholder="es. Colore, Taglio, Piega" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Immagine *</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required style={{ ...inputStyle, padding: '0.5rem' }} />
          </div>
        </div>
        {msg && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: msg.startsWith('Errore') ? '#C41230' : '#4caf50', marginBottom: '1rem' }}>{msg}</p>}
        <button type="submit" disabled={uploading} style={btnPrimary}>
          <Upload size={14} /> {uploading ? 'Caricamento...' : 'Carica foto'}
        </button>
      </form>

      {/* Gallery grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ position: 'relative', background: '#161616', border: '1px solid rgba(255,255,255,0.05)' }}>
            <img src={item.url} alt={item.label} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', fontWeight: 600, color: '#F5F0EA', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', color: '#C41230', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.sub}</div>
            </div>
            <button onClick={() => handleDelete(item.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(196,18,48,0.85)', border: 'none', color: '#fff', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 2 }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p style={{ color: 'rgba(245,240,234,0.3)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', gridColumn: '1/-1' }}>Nessuna foto in galleria. Carica la prima!</p>
        )}
      </div>
    </div>
  )
}

/* ─── PREZZI TAB ────────────────────────────────── */
function PrezziTab() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [newItem, setNewItem] = useState({ cat: '', name: '', desc: '', price: '' })
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadPrezzi() }, [])

  const loadPrezzi = async () => {
    const snap = await getDocs(collection(db, 'prezzi'))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  const handleSaveEdit = async (item) => {
    setSaving(true)
    await updateDoc(doc(db, 'prezzi', item.id), {
      cat: item.cat, name: item.name, desc: item.desc, price: item.price,
    })
    setEditing(null)
    setSaving(false)
    loadPrezzi()
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    await addDoc(collection(db, 'prezzi'), { ...newItem })
    setNewItem({ cat: '', name: '', desc: '', price: '' })
    setShowForm(false)
    setSaving(false)
    loadPrezzi()
  }

  const handleDelete = async (id) => {
    if (!confirm('Eliminare questo servizio?')) return
    await deleteDoc(doc(db, 'prezzi', id))
    loadPrezzi()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ ...sectionTitle, marginBottom: 0 }}>Prezzi Servizi</h2>
        <button onClick={() => setShowForm(s => !s)} style={btnPrimary}>
          <Plus size={14} /> Aggiungi servizio
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{ background: '#161616', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(196,18,48,0.2)' }}>
          <h3 style={subTitle}>Nuovo servizio</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {[['Categoria', 'cat', 'Taglio, Piega…'], ['Nome', 'name', 'Taglio donna'], ['Prezzo', 'price', 'da €25']].map(([label, key, ph]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input value={newItem[key]} onChange={e => setNewItem(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} required style={inputStyle} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Descrizione</label>
            <textarea value={newItem.desc} onChange={e => setNewItem(p => ({ ...p, desc: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" disabled={saving} style={btnPrimary}><Check size={14} /> Salva</button>
            <button type="button" onClick={() => setShowForm(false)} style={btnSecondary}><X size={14} /> Annulla</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#161616', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            {editing === item.id ? (
              <EditServiceRow item={item} onSave={handleSaveEdit} onCancel={() => setEditing(null)} saving={saving} />
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C41230' }}>{item.cat}</span>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#F5F0EA' }}>{item.name}</span>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem', color: '#C41230', fontWeight: 700, marginLeft: 'auto' }}>{item.price}</span>
                  </div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.73rem', color: 'rgba(245,240,234,0.4)', margin: 0 }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button onClick={() => setEditing(item.id)} style={btnSecondary}>Modifica</button>
                  <button onClick={() => handleDelete(item.id)} style={{ ...btnSecondary, borderColor: 'rgba(196,18,48,0.3)', color: '#C41230' }}><Trash2 size={13} /></button>
                </div>
              </>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p style={{ color: 'rgba(245,240,234,0.3)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.8rem' }}>Nessun servizio. Aggiungine uno!</p>
        )}
      </div>
    </div>
  )
}

function EditServiceRow({ item, onSave, onCancel, saving }) {
  const [data, setData] = useState({ ...item })
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {[['Categoria', 'cat'], ['Nome', 'name'], ['Prezzo', 'price']].map(([label, key]) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <input value={data[key]} onChange={e => setData(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label style={labelStyle}>Descrizione</label>
        <textarea value={data.desc} onChange={e => setData(p => ({ ...p, desc: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onSave(data)} disabled={saving} style={btnPrimary}><Check size={13} /> Salva</button>
        <button onClick={onCancel} style={btnSecondary}><X size={13} /> Annulla</button>
      </div>
    </div>
  )
}

/* ─── INFO TAB ──────────────────────────────────── */
function InfoTab() {
  const INFO_ID = 'principale'
  const [info, setInfo] = useState({ indirizzo: '', telefono: '', orari: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'info')).then(snap => {
      const d = snap.docs.find(d => d.id === INFO_ID)
      if (d) setInfo(d.data())
      setLoading(false)
    })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    await setDoc(doc(db, 'info', INFO_ID), info)
    setMsg('Informazioni salvate!')
    setSaving(false)
  }

  if (loading) return <p style={{ color: 'rgba(245,240,234,0.4)', fontFamily: 'Montserrat, sans-serif' }}>Caricamento...</p>

  return (
    <div>
      <h2 style={sectionTitle}>Informazioni Salone</h2>
      <form onSubmit={handleSave} style={{ background: '#161616', padding: '1.5rem', border: '1px solid rgba(196,18,48,0.1)', maxWidth: 600 }}>
        {[
          ['Indirizzo', 'indirizzo', 'Via Celso Ulpiani, 15 – Ascoli Piceno', false],
          ['Telefono', 'telefono', '0736 342914', false],
          ['Email', 'email', 'info@parrucchieradebora.it', false],
          ['Orari (una riga per fascia)', 'orari', 'Lun – Ven: 9:00 – 18:30', true],
        ].map(([label, key, ph, multi]) => (
          <div key={key} style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>{label}</label>
            {multi ? (
              <textarea value={info[key]} onChange={e => setInfo(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            ) : (
              <input value={info[key]} onChange={e => setInfo(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} style={inputStyle} />
            )}
          </div>
        ))}
        {msg && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', color: '#4caf50', marginBottom: '1rem' }}>{msg}</p>}
        <button type="submit" disabled={saving} style={btnPrimary}>
          <Check size={14} /> {saving ? 'Salvataggio...' : 'Salva modifiche'}
        </button>
      </form>
    </div>
  )
}

/* ─── SHARED STYLES ─────────────────────────────── */
const sectionTitle = {
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: '1.75rem',
  fontWeight: 400,
  color: '#F5F0EA',
  marginBottom: '1.5rem',
  marginTop: 0,
}

const subTitle = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#C41230',
  marginTop: 0,
  marginBottom: '1rem',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.58rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,234,0.4)',
  marginBottom: '0.4rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  background: '#0e0e0e',
  border: '1px solid rgba(196,18,48,0.2)',
  color: '#F5F0EA',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.82rem',
  outline: 'none',
  boxSizing: 'border-box',
}

const btnPrimary = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: '#C41230',
  color: '#F5F0EA',
  border: 'none',
  padding: '0.6rem 1.25rem',
  cursor: 'pointer',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.62rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
}

const btnSecondary = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: 'transparent',
  color: 'rgba(245,240,234,0.6)',
  border: '1px solid rgba(255,255,255,0.12)',
  padding: '0.6rem 1rem',
  cursor: 'pointer',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.62rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}
