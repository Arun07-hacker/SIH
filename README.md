# PersonnelShield AI
> **An AI-powered predictive personnel stress and welfare monitoring system for uniformed defense forces.**
> 
> *"Data-driven insights. Human-centered care."*  
> **"Stronger Forces • Healthier Minds • Safer Nation"**

---

## 🛡️ Executive Overview

**PersonnelShield AI** transforms reactive stress management into proactive, early-stage welfare support for uniformed personnel. Operating on the principle of **"WELFARE SUPPORT — NOT SURVEILLANCE"**, the system exclusively utilizes authorized duty rosters and voluntary check-in signals to flag early indicators of fatigue and burnout before critical operational incidents occur.

---

## 🔄 The 6-Stage Closed-Loop Welfare Workflow

The system is architected around a continuous 6-stage closed-loop decision support lifecycle:

```
DETECT ➔ EXPLAIN ➔ PREDICT ➔ RECOMMEND ➔ HUMAN INTERVENTION ➔ MEASURE OUTCOME
```

1. **DETECT**: Non-intrusive early identification of workload surges, deployment duration anomalies, and sleep fragmentation patterns.
2. **EXPLAIN**: Transparent Explainable AI (XAI) multi-variate attribution displaying exact contribution percentages (e.g., +32% Duty Hours, +24% Sleep Disruption).
3. **PREDICT**: 14-day forward risk trajectories with confidence bands, modeling trajectories *with* vs. *without* officer intervention.
4. **RECOMMEND**: Personalized, non-punitive welfare options (confidential 1-on-1 check-ins, duty shifts, recovery passes).
5. **HUMAN INTERVENTION**: Dedicated **Officer Review** interface enforcing **"AI supports. Humans decide."** Officers maintain absolute authority to Accept, Modify, or Reject proposals.
6. **MEASURE OUTCOME**: Closes the loop by evaluating post-intervention risk metrics and verifying measured improvement over time.

---

## 🔒 Core Privacy & Ethical Principles

- **Welfare Support — NOT Surveillance**: Zero private communications tracking, zero civilian browsing telemetry, zero GPS/location surveillance.
- **Strict Data Boundaries**:
  1. *Authorized Organizational Data* (Official duty hours, deployment days, deferred leave).
  2. *Voluntary Wellness Data* (Self-reported mood, sleep quality, and stress).
  3. *Optional Biometric Data* (Requires explicit consent and medical authority approval).
- **Multi-Tenant Role-Based Access Control (RBAC)**:
  - **Welfare Officer**: Unit triage, AI risk attribution, and intervention authority.
  - **Administrator**: Force-wide macro analytics, system config, and audit trail oversight.
  - **Personnel**: Voluntary self-assessment portal, personalized tips, and privacy controls.
- **Cryptographic Audit Trail**: Immutable logging of every personnel view, recommendation modification, and officer decision.

---

## 💻 Tech Stack

- **Frontend Core**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts (Pie/Donut, Stacked Bar, Multi-line, Composed Area)
- **Icons**: Lucide React
- **Build Tool**: Vite 6

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/Arun07-hacker/SIH.git
cd SIH

# Install dependencies
npm install

# Run development server
npm run dev

# Or build and run production preview
npm run build
npm run preview
```

Open [http://localhost:4173/](http://localhost:4173/) or [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🎯 Hackathon Presentation Guide

Click the **"Demo Guide"** button in the top navigation bar or **"Demo Mode"** on the sign-in screen to launch the 21-step interactive presentation flow.
