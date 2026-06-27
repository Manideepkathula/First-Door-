import { useState } from 'react'
import { FileText, Clock, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

const timeline = [
  { phase: 'Arrive in US', time: 'Day 1', action: 'Report to your DSO within 30 days of start date. They update SEVIS — this activates your legal status.', critical: true },
  { phase: 'Get your I-94', time: 'Day 1–3', action: 'Print your I-94 from cbp.dhs.gov/arrival-departure. This proves your legal entry. Save it.', critical: true },
  { phase: 'Full-time enrollment', time: 'By first semester', action: 'F-1 requires full-time enrollment (usually 9 credit hours for grad). Dropping below = status violation.', critical: true },
  { phase: 'On-campus work authorization', time: 'Any time', action: 'Work up to 20 hrs/week on campus with no extra paperwork. Over 20 hrs = violation.', critical: false },
  { phase: 'CPT authorization', time: 'Before any off-campus internship', action: 'Apply through your DSO. Must be integral to your program. Starts on the CPT start date — NOT before.', critical: true },
  { phase: 'Apply for OPT', time: '90 days before graduation', action: 'File with USCIS through your DSO. Processing takes 3–5 months. Apply early — missing this window is devastating.', critical: true },
  { phase: 'OPT begins', time: 'After graduation', action: '12 months of OPT to work in your field. STEM OPT extension = 24 additional months (36 total) if your employer files on time.', critical: false },
  { phase: 'H-1B filing', time: 'April of OPT year', action: 'Your employer files the lottery petition. Results in May. Cap-gap rule protects your status if you\'re in OPT during lottery.', critical: true },
]

const cptOptDiff = [
  { q: 'What is CPT?', a: 'Curricular Practical Training — work authorization for off-campus internships that are part of your degree program. Requires DSO approval BEFORE you start. Used while still in school.' },
  { q: 'What is OPT?', a: 'Optional Practical Training — 12 months of work authorization after graduation (or 24 more months with STEM extension). Must be in your field of study. Applied through USCIS.' },
  { q: 'Can I do CPT without affecting OPT?', a: 'Yes — IF you do less than 12 months of full-time CPT. If you use 12+ months of full-time CPT, you lose OPT eligibility. Part-time CPT has no limit and doesn\'t affect OPT.' },
  { q: 'When should I apply for OPT?', a: 'Up to 90 days before your graduation date. USCIS takes 3–5 months to process — apply as early as possible. Your DSO will guide the process.' },
  { q: 'What if my OPT is denied?', a: 'Immediately contact your DSO. You have limited time to fix the issue. Do NOT work without authorization — this is a serious status violation with lifetime consequences.' },
  { q: 'STEM OPT extension — how does it work?', a: 'If your degree is in a STEM field (check the official DHS list), you can apply for 24 additional months of OPT. Your employer must file a training plan (Form I-983) and must be E-Verify registered.' },
]

const redFlags = [
  'Working off-campus without CPT/OPT authorization — even unpaid',
  'Dropping below full-time enrollment without prior DSO approval',
  'Not reporting to DSO within 30 days of arriving',
  'Missing OPT application deadline (90 days before graduation)',
  'Letting your I-20 expire without renewal',
  'Changing your major or degree level without updating SEVIS',
  'Working more than 20 hrs/week on-campus during academic year',
  'Starting a CPT job before the official CPT start date on your I-20',
]

export default function Visa() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 5</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>Visa Survival</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '1.5rem', fontSize: 16 }}>
        F-1 status is simple when you follow the rules — but the consequences of getting it wrong 
        are severe. Here's exactly what you need to know, when.
      </p>

      <div style={{ background: 'rgba(240,128,128,0.08)', border: '0.5px solid rgba(240,128,128,0.25)', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '3rem', display: 'flex', gap: 10 }}>
        <AlertTriangle size={15} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }}/>
        <div style={{ fontSize: 13, color: 'rgba(232,232,240,0.75)' }}>
          <strong style={{ color: 'var(--red)' }}>Important:</strong> This is general guidance, not legal advice. 
          Always consult your DSO (international student advisor) at your university before making any decisions about your status. They are your first and most important resource.
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1.5rem' }}>F-1 Student Timeline</h2>
        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 1, background: 'var(--border)' }}/>
          {timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{ position: 'absolute', left: '-1.3rem', top: 4, width: 11, height: 11, borderRadius: '50%', background: t.critical ? 'var(--red)' : 'var(--accent)', border: '2px solid var(--bg)' }}/>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 20, background: t.critical ? 'rgba(240,128,128,0.1)' : 'var(--accent-dim)', color: t.critical ? 'var(--red)' : 'var(--accent)', border: `0.5px solid ${t.critical ? 'rgba(240,128,128,0.25)' : 'var(--accent-border)'}`, whiteSpace: 'nowrap', flexShrink: 0 }}>{t.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{t.phase}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.action}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* CPT vs OPT */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '1.5rem' }}>CPT vs OPT — The questions everyone has</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cptOptDiff.map((item, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: `0.5px solid ${expanded === i ? 'rgba(122,184,245,0.3)' : 'var(--border)'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ width: '100%', padding: '1rem 1.25rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{item.q}</div>
                {expanded === i ? <ChevronUp size={15} color="var(--text-muted)"/> : <ChevronDown size={15} color="var(--text-muted)"/>}
              </button>
              {expanded === i && (
                <div style={{ padding: '0 1.25rem 1rem', borderTop: '0.5px solid var(--border)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" style={{ marginBottom: '3rem' }}/>

      {/* Red flags */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: '0.5rem' }}>Status violations — Never do these</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: '1.25rem' }}>Any of these can result in deportation and a lifetime ban from the US</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {redFlags.map(r => (
            <div key={r} style={{ display: 'flex', gap: 10, padding: '0.875rem 1.1rem', background: 'rgba(240,128,128,0.05)', border: '0.5px solid rgba(240,128,128,0.15)', borderRadius: 9, alignItems: 'flex-start' }}>
              <AlertTriangle size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }}/>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(122,184,245,0.05)', border: '0.5px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Your most important contacts</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9 }}>
          <strong>Your DSO:</strong> Your international student office — first call for any status question<br/>
          <strong>USCIS:</strong> uscis.gov · 1-800-375-5283 (official government immigration)<br/>
          <strong>NAFSA:</strong> nafsa.org — professional resources for international students<br/>
          <strong>Immigration attorney (if needed):</strong> Many offer free 30-min consultations
        </div>
      </div>
    </div>
  )
}
