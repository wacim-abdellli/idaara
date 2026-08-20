<div align="center">

# 🏛️ Idaara.tn · إدارة.تونس

**Tunisia's First Voice-Native AI Bureaucracy Copilot & Smart Document Generator**  
*Fasserli, 3abbi w a3tini l'awra9 — Conquer administrative red tape in seconds.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Whisper AI](https://img.shields.io/badge/Audio-Whisper_Derja_STT-10B981?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/research/whisper)
[![Design](https://img.shields.io/badge/Design-Linear%2FVercel_Dark_Mode-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](#-uiux-design-system)
[![Locales](https://img.shields.io/badge/Languages-Derja_%7C_FR_%7C_AR_(RTL)-EA580C?style=for-the-badge&logo=translate&logoColor=white)](#-trilingual-derja--french--arabic-rtl)

</div>

---

## 📖 Table of Contents

- [The Vision & Problem Statement](#-the-vision--problem-statement)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Core Features](#-core-features)
  - [1. Derja-Native Voice Copilot](#1-derja-native-voice-copilot)
  - [2. "Fasserli Hal War9a" (Smart OCR Explainer)](#2-fasserli-hal-war9a-smart-ocr-explainer)
  - [3. Auto-Filled Official PDF Form Generator](#3-auto-filled-official-pdf-form-generator)
  - [4. "Timbre & Awra9" Budget & Checklist Calculator](#4-timbre--awra9-budget--checklist-calculator)
  - [5. Interactive Municipal & Public Office Locator](#5-interactive-municipal--public-office-locator)
  - [6. Freelancer & Entrepreneur Launchpad](#6-freelancer--entrepreneur-launchpad)
- [UI/UX Design System](#-uiux-design-system)
- [Supported Administrative Procedures (V1 Catalog)](#-supported-administrative-procedures-v1-catalog)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Security & Privacy Standards](#-security--privacy-standards)
- [License](#-license)

---

## 🎯 The Vision & Problem Statement

Dealing with public administration in Tunisia (*l'Idara*, *Baladiya*, *Recette des Finances*, *CNSS*, *Douane*, *Ministères*) is universally recognized as one of the most frustrating, time-consuming experiences for citizens, students, business founders, and diaspora expats:

- **Missing Paperwork Nightmare**: Citizens wait 3 hours in line only to be turned away because they lacked a *5 DT timbre fiscal*, an extra *copie conforme*, or a certified translation.
- **Obscure Legal Jargon**: Circulars, tax notices, and decree forms are written in dense legal phrasing that ordinary people cannot understand.
- **No Unified Knowledge Base**: Requirements differ between municipalities, opening hours change during summer and Ramadan, and online information is fragmented across obsolete Facebook posts.

### 💡 The Idaara.tn Solution
**Idaara.tn** turns the entire Tunisian administrative legal code into an instant, voice-first personal assistant. Speak naturally in **Tunisian Derja**, snap a photo of any official letter, and get instant audio explanations, exact checklist costs, and pre-filled, ready-to-print official PDF forms.

---

## ✨ Core Features

### 1. Derja-Native Voice Copilot (`/copilot`)
- Citizens do not need to know complex French legal terms or formal Arabic vocabulary.
- Speak naturally: *“Chnouwa lezemni bech n'badal el carte grise ba3d ma chrit karhba?”*
- Understands phonetically written Derja (Arabizi), Arabic script, and spoken dialect, returning instant conversational voice and text instructions with audio playback.

### 2. "Fasserli Hal War9a" Smart OCR Explainer (`/fasserli`)
- Upload or snap a photo of any official document (tax reassessment notice, court notification, bank seizure letter, customs declaration).
- Within 2 seconds, the AI provides:
  1. **Plain-Language Summary**: What this paper actually means in 3 simple sentences.
  2. **Deadlines & Urgency**: Exact response window and penalties for delay.
  3. **Action Items**: The exact office to visit and papers to bring.

### 3. Auto-Filled Official PDF Form Generator (`/documents`)
- Generates compliant, vector-sharp PDF documents ready for printing and legalization (*Signature Légalisée* at the *Baladiya*):
  - 📝 **Standardized Rental Agreements** (*Contrat de Location certifié*)
  - 📝 **Official Power of Attorney** (*Tawkîl / Procuration*)
  - 📝 **Sworn Statements** (*Déclaration sur l'honneur / Tasrîh bi charaf*)
  - 📝 **Car Sales Contract** (*Contrat de Vente Véhicule*)
- Includes cryptographic verification QR codes and margin guidelines for tax stamps.

### 4. "Timbre & Awra9" Budget & Checklist Calculator (`/calculator`)
- Real-time cost estimator for every procedure:
  - Exact fiscal stamp amounts (*Timbres fiscaux: 5 DT, 15 DT, 80 DT, 100 DT*).
  - Number of standardized ID photos required (*fond blanc / format officiel*).
  - Exact copies requiring certification (*Copies conformes*).
- Persistent swipeable checklist saved in local storage.

### 5. Interactive Municipal & Public Office Locator (`/locator`)
- Smart directory covering **350+ Municipalities, Post Offices, Tax Receipts (*Recettes*), and CNSS centers across all 24 governorates**.
- Real-time opening hours adjusted for **Ramadan schedules** and summer single-shift (*Séance Unique*).
- One-tap GPS navigation via Google Maps / Waze.

### 6. Freelancer & Entrepreneur Launchpad (`/launchpad`)
- Step-by-step guidance for modern economic status:
  - **Statut Auto-Entrepreneur**: Registration, tax exemptions (0.5% - 1%), and platform declaration.
  - **Patente & RNE**: Commercial registry filing, corporate tax code, and CNSS freelance schemes.
  - **International Invoicing & Freelance Contracts**: Legally compliant bilingual export contracts in EUR/USD with BCT clauses.

---

## 💻 Tech Stack

```
Frontend:          Next.js 15 (App Router, Server Components), TypeScript, React 19
Styling & UI:      Tailwind CSS 4, Lucide Icons, Framer Motion, Canvas Visualizer
AI & Audio:        Whisper Speech-to-Text, Administrative Reasoner, Web Speech Synthesizer
Database & Data:   JSON Graph of 25+ Procedures & 350+ Offices across 24 Governorates
Document Engine:   jsPDF / HTML2Canvas (High-DPI Multilingual Vector PDF Generator)
Hosting:           Vercel Edge Network / Docker + Node.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Privacy Standards

- **Zero-Storage Privacy Protocol**: Uploaded identity cards and personal notices are processed ephemerally in RAM for OCR parsing and immediately deleted from server memory.
- **Client-Side Redaction**: Sensitive personal numbers (CIN, bank accounts) can be masked in the browser before OCR processing.
- **No Government Dependency**: Idaara.tn operates as an independent citizen intelligence tool, referencing public laws, official decrees (*JORT*), and municipal circulars.

---

## 📄 License

Proprietary Software · © 2026 Idaara.tn Team. All rights reserved.  
*Built with ❤️ in Tunisia to give citizens their time and peace of mind back.*
