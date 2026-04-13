import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const S = {
  page: {
    background: '#0e0e0e',
    color: '#F5F0EA',
    minHeight: '100vh',
    fontFamily: 'Montserrat, sans-serif',
  },
  header: {
    background: '#111',
    borderBottom: '1px solid rgba(196,18,48,0.2)',
    padding: '1.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  back: {
    background: 'none',
    border: 'none',
    color: '#C41230',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    padding: 0,
  },
  container: {
    maxWidth: 860,
    margin: '0 auto',
    padding: '3rem 2rem 5rem',
  },
  h1: {
    fontSize: '1.8rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#F5F0EA',
    marginBottom: '0.5rem',
  },
  updated: {
    fontSize: '0.7rem',
    color: 'rgba(245,240,234,0.35)',
    letterSpacing: '0.1em',
    marginBottom: '3rem',
  },
  h2: {
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C41230',
    marginTop: '2.5rem',
    marginBottom: '0.85rem',
  },
  p: {
    fontSize: '0.82rem',
    fontWeight: 300,
    lineHeight: 1.9,
    color: 'rgba(245,240,234,0.65)',
    marginBottom: '0.85rem',
  },
  ul: {
    paddingLeft: '1.5rem',
    marginBottom: '0.85rem',
  },
  li: {
    fontSize: '0.82rem',
    fontWeight: 300,
    lineHeight: 1.9,
    color: 'rgba(245,240,234,0.65)',
    marginBottom: '0.3rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(196,18,48,0.12)',
    margin: '2.5rem 0',
  },
}

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div style={S.page}>
      <Helmet>
        <title>Privacy Policy — Parrucchieria Debora</title>
        <meta name="description" content="Privacy Policy e Cookie Policy di Parrucchieria Debora. Informativa sul trattamento dei dati personali ai sensi del GDPR." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div style={S.header}>
        <button style={S.back} onClick={() => navigate('/')}>← Torna al sito</button>
        <span style={{ color: 'rgba(245,240,234,0.15)', fontSize: '0.7rem' }}>|</span>
        <span style={{ fontSize: '0.7rem', color: 'rgba(245,240,234,0.35)', letterSpacing: '0.1em' }}>
          PARRUCCHIERIA DEBORA
        </span>
      </div>

      <div style={S.container}>
        <h1 style={S.h1}>Privacy Policy & Cookie Policy</h1>
        <p style={S.updated}>Ultimo aggiornamento: aprile 2026</p>

        <h2 style={S.h2}>1. Titolare del Trattamento</h2>
        <p style={S.p}>
          Il titolare del trattamento dei dati personali è:<br/>
          <strong style={{ color: '#F5F0EA' }}>Parrucchieria Debora di Debora Carboni</strong><br/>
          Via Celso Ulpiani, 15 — 63100 Ascoli Piceno (AP)<br/>
          P.IVA 01779990447<br/>
          Telefono: <a href="tel:+390736342914" style={{ color: '#C41230' }}>0736 342914</a>
        </p>

        <hr style={S.divider}/>

        <h2 style={S.h2}>2. Tipologie di Dati Raccolti</h2>
        <p style={S.p}>Durante la navigazione sul sito possono essere raccolte le seguenti categorie di dati:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: '#F5F0EA' }}>Dati di navigazione</strong>: indirizzi IP, tipo di browser, pagine visitate, durata della sessione, raccolti automaticamente dai server e dagli strumenti analitici.</li>
          <li style={S.li}><strong style={{ color: '#F5F0EA' }}>Dati forniti volontariamente</strong>: eventuali informazioni di contatto fornite tramite moduli o messaggi WhatsApp.</li>
          <li style={S.li}><strong style={{ color: '#F5F0EA' }}>Dati analitici aggregati</strong>: statistiche anonime di utilizzo del sito raccolte tramite Google Analytics 4.</li>
        </ul>

        <hr style={S.divider}/>

        <h2 style={S.h2}>3. Finalità del Trattamento</h2>
        <p style={S.p}>I dati sono trattati per le seguenti finalità:</p>
        <ul style={S.ul}>
          <li style={S.li}>Erogazione del servizio web e corretta visualizzazione del sito.</li>
          <li style={S.li}>Analisi statistica anonima del traffico per migliorare i contenuti (solo previo consenso).</li>
          <li style={S.li}>Gestione delle prenotazioni e comunicazioni tramite telefono o WhatsApp.</li>
        </ul>
        <p style={S.p}>
          La base giuridica del trattamento è il consenso dell'interessato (art. 6, lett. a GDPR) per i cookie analitici,
          e il legittimo interesse (art. 6, lett. f GDPR) per i dati tecnici di navigazione.
        </p>

        <hr style={S.divider}/>

        <h2 style={S.h2}>4. Cookie Utilizzati</h2>
        <p style={S.p}>Questo sito utilizza le seguenti categorie di cookie:</p>

        <p style={{ ...S.p, fontWeight: 600, color: '#F5F0EA', marginBottom: '0.3rem' }}>Cookie tecnici (sempre attivi)</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: '#F5F0EA' }}>cookie_consent</strong> — Memorizza la tua scelta riguardo ai cookie analitici. Durata: persistente.</li>
        </ul>

        <p style={{ ...S.p, fontWeight: 600, color: '#F5F0EA', marginBottom: '0.3rem' }}>Cookie analitici (solo previo consenso)</p>
        <ul style={S.ul}>
          <li style={S.li}><strong style={{ color: '#F5F0EA' }}>Google Analytics 4</strong> (_ga, _ga_*) — Raccoglie dati anonimi sulle visite per analisi statistiche. Gli indirizzi IP sono automaticamente anonimizzati da Google prima della memorizzazione. Terza parte: Google Ireland Ltd. Durata: 14 mesi. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#C41230' }}>Privacy Policy Google</a>.</li>
        </ul>

        <p style={S.p}>
          Puoi revocare il consenso ai cookie analitici in qualsiasi momento cancellando i dati del browser
          o utilizzando il banner presente sul sito.
        </p>

        <hr style={S.divider}/>

        <h2 style={S.h2}>5. Condivisione dei Dati</h2>
        <p style={S.p}>
          I dati non sono venduti né ceduti a terzi. Possono essere condivisi con fornitori di servizi tecnici
          (Google per Analytics, Firebase per l'autenticazione admin) esclusivamente per le finalità sopra indicate
          e nel rispetto delle rispettive privacy policy.
        </p>

        <hr style={S.divider}/>

        <h2 style={S.h2}>6. Conservazione dei Dati</h2>
        <p style={S.p}>
          I dati di navigazione sono conservati per il tempo strettamente necessario alla fornitura del servizio.
          I dati analitici sono conservati per 14 mesi secondo le impostazioni di Google Analytics, dopodiché vengono eliminati automaticamente. Data la natura e la dimensione dell'attività, non è stato designato un Responsabile della Protezione dei Dati (DPO).
        </p>

        <hr style={S.divider}/>

        <h2 style={S.h2}>7. Diritti dell'Interessato</h2>
        <p style={S.p}>Ai sensi del GDPR (Reg. UE 2016/679), hai il diritto di:</p>
        <ul style={S.ul}>
          <li style={S.li}>Accedere ai tuoi dati personali (art. 15).</li>
          <li style={S.li}>Richiedere la rettifica di dati inesatti (art. 16).</li>
          <li style={S.li}>Richiedere la cancellazione dei dati ("diritto all'oblio", art. 17).</li>
          <li style={S.li}>Opporti al trattamento (art. 21).</li>
          <li style={S.li}>Richiedere la limitazione del trattamento (art. 18).</li>
          <li style={S.li}>Revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.</li>
          <li style={S.li}>Proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" style={{ color: '#C41230' }}>www.garanteprivacy.it</a>).</li>
        </ul>

        <hr style={S.divider}/>

        <h2 style={S.h2}>8. Contatti</h2>
        <p style={S.p}>
          Per esercitare i tuoi diritti o per qualsiasi domanda relativa al trattamento dei dati personali,
          puoi contattarci telefonando al{' '}
          <a href="tel:+390736342914" style={{ color: '#C41230' }}>0736 342914</a>.
        </p>

        <hr style={S.divider}/>

        <p style={{ ...S.p, fontSize: '0.7rem', color: 'rgba(245,240,234,0.25)' }}>
          © 2026 Parrucchieria Debora di Debora Carboni — P.IVA 01779990447. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  )
}
