import { useState } from 'react'
import { CreditCard, Building, Heart, FileText, ChevronDown, ChevronUp, CheckCircle, AlertTriangle } from 'lucide-react'

const sections = [
  {
    id: 'credit',
    icon: CreditCard,
    color: '#c4a0f5',
    title: 'Credit Score — Start from Zero',
    subtitle: 'You have no credit history. Here\'s how to build it fast.',
    content: [
      {
        heading: 'What is a credit score?',
        text: 'A number between 300–850 that tells lenders how trustworthy you are with money. 750+ is excellent. Without one, you can\'t rent apartments, get a phone plan, or eventually get a car loan. You start at zero in the US — no matter your history in India or elsewhere.'
      },
      {
        heading: 'Step 1: Open a Secured Credit Card',
        text: 'A secured card requires a deposit (usually $200–$500) that becomes your credit limit. Best options for international students with no SSN yet: Discover it® Secured (accepts ITIN), Capital One Platinum Secured, or your own bank\'s secured card. Use it for small purchases monthly and pay the FULL balance every month. Never miss a payment.'
      },
      {
        heading: 'Step 2: Become an authorized user',
        text: 'If a friend or family member in the US has good credit, ask them to add you as an authorized user on their card. You don\'t even need to use the card — their good history starts appearing on your credit report.'
      },
      {
        heading: 'Step 3: Pay everything on time',
        text: 'Payment history = 35% of your score. One missed payment can drop your score 60–100 points. Set autopay for the minimum amount as a safety net, then pay the full balance manually.'
      },
      {
        heading: 'Timeline to expect',
        text: 'With a secured card used responsibly: 6 months to get your first score (around 650–680). 12 months of consistent use: 700+. 24 months: 740+. This is what landlords, phone companies, and future employers check.'
      }
    ],
    tip: 'Never check your credit score with a "hard inquiry" unless you\'re applying for something real. Use Credit Karma or Experian free tools — these are "soft inquiries" that don\'t affect your score.'
  },
  {
    id: 'bank',
    icon: Building,
    color: '#7ab8f5',
    title: 'Bank Accounts Without SSN',
    subtitle: 'You can open an account with just your passport and I-20.',
    content: [
      {
        heading: 'Which banks accept international students without SSN?',
        text: 'The most student-friendly banks in Boston: (1) Bank of America — accepts passport + I-20 + university letter. (2) Citizens Bank — common near BU and Northeastern. (3) DCU Credit Union — specifically friendly to F-1 students. (4) Wise (online) — best for sending money home, no SSN needed.'
      },
      {
        heading: 'What to bring to open an account',
        text: 'Passport, F-1 visa, I-20 document, university acceptance/enrollment letter, and proof of Boston address (dorm letter or utility bill with your name). Call ahead to confirm — requirements vary by branch.'
      },
      {
        heading: 'Avoid: Wells Fargo and Chase for first account',
        text: 'These banks have been inconsistent with international students and often require SSN. Once you have your SSN (usually 2–3 months after arrival), you can open accounts anywhere.'
      },
      {
        heading: 'For sending money to India',
        text: 'Wise (formerly TransferWise) gives the best exchange rates with low fees — much better than Western Union or bank wire transfers. Set it up early.'
      }
    ],
    tip: 'Get your SSN as soon as you\'re eligible (after starting your program). This unlocks everything — better bank accounts, credit cards, phone plans without a deposit.'
  },
  {
    id: 'health',
    icon: Heart,
    color: '#f08080',
    title: 'Health Insurance',
    subtitle: 'The US healthcare system is expensive and confusing. Here\'s the minimum you need to know.',
    content: [
      {
        heading: 'Do I need health insurance?',
        text: 'Yes — most universities require it for international students. Some schools auto-enroll you in their student health plan (check your tuition bill). If you\'re already enrolled in a comparable plan, you can apply for a waiver.'
      },
      {
        heading: 'University health plan vs private plan',
        text: 'University plans ($2,000–$3,500/year) are usually the safest for international students — they\'re designed for your situation and accepted at campus health centers. Private plans like ISO or UHCSR are sometimes cheaper but read the fine print on what\'s covered.'
      },
      {
        heading: 'What does insurance actually cover?',
        text: 'After you pay your deductible (usually $500–$1,500/year), insurance covers most costs. A doctor visit without insurance = $150–$400. With insurance = $20–$50 copay. An ER visit without insurance = $1,000–$10,000. This is why insurance is non-negotiable.'
      },
      {
        heading: 'Urgent Care vs Emergency Room',
        text: 'Urgent Care (like CareNow, CVS MinuteClinic) = $100–$200 with insurance, for non-life-threatening issues. Emergency Room = $1,000+ even with insurance, for actual emergencies. Always go to Urgent Care first for: fever, minor injury, infection, illness. Go to ER for: chest pain, difficulty breathing, severe injury.'
      },
      {
        heading: 'Free and low-cost options in Boston',
        text: 'Fenway Health (617-267-0900) — sliding scale fees. Harvard Street Neighborhood Health Center — income-based pricing. Boston Medical Center has a patient advocate who helps uninsured patients find options.'
      }
    ],
    tip: 'Save the number 617-534-5395 — that\'s Boston Public Health Commission. They can help connect you to low-cost care options.'
  },
  {
    id: 'ssn',
    icon: FileText,
    color: '#5dcaa5',
    title: 'SSN — Social Security Number',
    subtitle: 'The most important number in the US. Here\'s how and when to get it.',
    content: [
      {
        heading: 'What is an SSN?',
        text: 'A 9-digit number issued by the Social Security Administration. It\'s your identity for work, taxes, bank accounts, credit, phone plans, and almost everything else. Without one, you\'re severely limited. With one, most things become easy.'
      },
      {
        heading: 'When can I apply?',
        text: 'F-1 students can apply for an SSN once they have a valid job offer (on-campus employment, CPT, or OPT). You cannot get one just for arriving — you need work authorization. Apply within 48 hours of starting authorized employment.'
      },
      {
        heading: 'How to apply',
        text: 'Visit the Social Security Administration office in person (nearest Boston office: 10 Causeway St, Boston). Bring: passport, F-1 visa, I-20, I-94 (print from cbp.dhs.gov), job offer letter or employment verification, and a completed SS-5 form (available at ssa.gov).'
      },
      {
        heading: 'Timeline',
        text: 'Processing takes 2–4 weeks. You\'ll receive your card by mail. Keep it in a safe place — don\'t carry it daily. Memorize the number but don\'t share it casually.'
      },
      {
        heading: 'ITIN as an alternative',
        text: 'Individual Taxpayer Identification Number (ITIN) — not the same as SSN but allows you to file taxes, open some bank accounts, and apply for some credit cards. Apply with Form W-7 via IRS. Useful while you wait for SSN eligibility.'
      }
    ],
    tip: 'Your DSO (international student advisor) at your university can write a letter confirming your enrollment and work authorization — this is often required for your SSN application. Request it early.'
  },
]

export default function Systems() {
  const [expanded, setExpanded] = useState('credit')

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
      <div className="section-label">Module 3</div>
      <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>American Systems 101</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 580, marginBottom: '3rem', fontSize: 16 }}>
        Nobody explains this stuff when you arrive. Credit scores, bank accounts, health insurance, SSN — 
        explained like your senior friend who figured it out is sitting next to you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sections.map(s => (
          <div key={s.id} style={{
            background: 'var(--bg-card)',
            border: `0.5px solid ${expanded === s.id ? s.color + '40' : 'var(--border)'}`,
            borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s'
          }}>
            <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} style={{
              width: '100%', padding: '1.25rem 1.5rem', background: 'none', border: 'none',
              display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={18} color={s.color}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{s.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.subtitle}</div>
              </div>
              {expanded === s.id ? <ChevronUp size={16} color="var(--text-muted)"/> : <ChevronDown size={16} color="var(--text-muted)"/>}
            </button>

            {expanded === s.id && (
              <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '0.5px solid var(--border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
                  {s.content.map(c => (
                    <div key={c.heading}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: s.color, marginBottom: 5, letterSpacing: '0.02em' }}>{c.heading}</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{c.text}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: '1.5rem', padding: '1rem 1.1rem',
                  background: `${s.color}0f`, border: `0.5px solid ${s.color}30`,
                  borderRadius: 9, fontSize: 13, color: 'rgba(232,232,240,0.7)', lineHeight: 1.65
                }}>
                  <strong style={{ color: s.color }}>💡 Tip: </strong>{s.tip}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', background: 'rgba(93,202,165,0.06)', border: '0.5px solid rgba(93,202,165,0.2)', borderRadius: 12, padding: '1.5rem' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, color: 'var(--green)' }}>Still confused? Ask the FirstDoor AI</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Type your exact situation — "I have no SSN and need to open a bank account at DCU" — and get a step-by-step answer specific to your case. No generic advice.
        </div>
      </div>
    </div>
  )
}
