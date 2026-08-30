<div align="center">

# 🏛️ Idaara.tn · إدارة.تونس

**Tunisia's First AI Civic Copilot, Legal Scanner & Administrative Intelligence Platform**  
*Awra9ek w 9adhyeitek fi D9i9a — Conquer administrative red tape in seconds.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/AI-Groq_Llama_3.3_70B-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![Gemini Vision](https://img.shields.io/badge/Vision-Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Whisper Audio](https://img.shields.io/badge/Audio-Whisper_Large_v3_Turbo-10B981?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/research/whisper)
[![Locales](https://img.shields.io/badge/Languages-Derja_%7C_FR_%7C_AR_(RTL)_%7C_EN-EA580C?style=for-the-badge&logo=translate&logoColor=white)](#-multilingual-support)

</div>

---

## 📖 Table of Contents

- [The Problem: The "Arja3 Ghodwa" Dilemma](#-the-problem-the-arja3-ghodwa-dilemma)
- [The Solution](#-the-solution)
- [Core Features & Modules](#-core-features--modules)
  - [1. Universal Derja AI Copilot (`/copilot`)](#1-universal-derja-ai-copilot-copilot)
  - [2. "Fasserli Hal War9a" Scanner & OCR Decoder (`/fasserli`)](#2-fasserli-hal-war9a-scanner--ocr-decoder-fasserli)
  - [3. National Concours & Public Recruitment Hub (`/concours`)](#3-national-concours--public-recruitment-hub-concours)
  - [4. Auto-Filled Official PDF Studio (`/documents`)](#4-auto-filled-official-pdf-studio-documents)
  - [5. "Timbre & Awra9" Statutory Cost Calculator (`/calculator`)](#5-timbre--awra9-statutory-cost-calculator-calculator)
  - [6. Atlas of 350+ Municipalities & Public Offices (`/locator`)](#6-atlas-of-350-municipalities--public-offices-locator)
  - [7. E-Government Portals Directory (`/portails`)](#7-e-government-portals-directory-portails)
  - [8. Emergency Contacts & National Directory (`/contacts`)](#8-emergency-contacts--national-directory-contacts)
  - [9. Freelancer & Entrepreneur Launchpad (`/launchpad`)](#9-freelancer--entrepreneur-launchpad-launchpad)
  - [10. Complete Civic Procedures Directory (`/procedures`)](#10-complete-civic-procedures-directory-procedures)
- [Deep Tunisian Infrastructure Grounding](#-deep-tunisian-infrastructure-grounding)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Environment Setup](#installation--environment-setup)
- [Security, Privacy & Compliance](#-security-privacy--compliance)
- [License](#-license)

---

## 🎯 The Problem: The "Arja3 Ghodwa" Dilemma

Navigating public administration in Tunisia (*l'Idara*, *Baladiya*, *Recette des Finances*, *CNSS*, *Douane*, *Ministères*) has long been plagued by:

- **The Missing Paperwork Trap**: Citizens wait in queue for hours only to be sent home (*"أرجع غدوة"*) over a missing 3 DT fiscal stamp, an expired birth certificate, or an uncertified copy.
- **Complex Statutory Jargon**: Tax notices, court summons, and JORT decrees are written in dense legal terminology that is difficult for citizens to interpret.
- **Scattered Information**: Requirements differ by municipality, opening hours change during summer (*Séance Unique*) and Ramadan, and official government portals are fragmented.

### 💡 The Solution
**Idaara.tn** consolidates Tunisian administrative procedures, laws (*JORT*), and municipal knowledge into a unified, AI-powered civic copilot. Citizens can speak naturally in **Tunisian Derja**, upload letters for instant plain-language decoding, calculate exact statutory stamp costs, and generate certified, ready-to-print legal documents.

---

## ✨ Core Features & Modules

### 1. Universal Derja AI Copilot (`/copilot`)
- **100% Tunisian Derja in Arabic Script**: Formulates all responses strictly in warm, natural Tunisian Arabic Derja (الدارجة التونسية بالحروف العربية), regardless of whether the user types in English, French, Latin Arabizi, or Arabic.
- **Sub-Second Groq Inference**: Powered by `llama-3.3-70b-versatile` running on Groq LPU hardware with progressive token streaming (~500ms latency).
- **Deep Think Mode (`[ 🧠 Think ]`)**: Exhaustive statutory breakdown cross-referenced with exact JORT decrees and official tariffs.
- **Document OCR Attachment (`[ 📷 OCR ]`)**: Upload and decipher official administrative letters directly within the conversation.
- **Whisper Speech-to-Text**: Voice input powered by `whisper-large-v3-turbo`.
- **Hover Timestamps & Minimal UI**: Timestamps (e.g. `7:22`) and copy buttons appear smoothly on hover, keeping the chat clean and distraction-free.
- **Civic Domain Guardrails**: In-character handling of off-topic requests, guiding citizens back to civic procedures.

### 2. "Fasserli Hal War9a" Scanner & OCR Decoder (`/fasserli`)
- **Instant Document Decoding**: Upload or snap a photo of any official administrative letter (Tax adjustment, CNSS demand, Police summons, Court order, Utility bill) powered by Google Gemini 2.5 Flash Vision & Groq OCR.
- **3-Point Plain Language Summary**: Breaks down the document in Tunisian Derja, French, and Arabic.
- **Statutory Deadlines & Penalty Radar**: Identifies strict appeal windows, payment deadlines, and late penalty rates.
- **Action Checklist & Desk Locator**: Identifies the exact municipal, court, or tax desk to visit with required papers.
- **Ephemeral In-Memory Processing**: Documents are processed in volatile memory and never stored in a persistent database.

### 3. National Concours & Public Recruitment Hub (`/concours`)
- **Live Recruitment Feed**: Openings across Tunisian ministries, public enterprises (STEG, SONEDE), and agencies (*Concours Nationaux*).
- **Multi-Filter Discovery**: Filter by educational level (Bac, Licence, Master, Ingénieur), sector, closing date, and required papers.
- **Statutory Checklists**: Pre-submission dossier checklists (B3 < 3 months, medical certificates, certified diplomas).

### 4. Auto-Filled Official PDF Studio (`/documents`)
- **Ready-to-Print Legal Templates**: Generates vector-sharp PDF documents formatted for municipal signature legalization (*التعريف بالإمضاء في البلدية*):
  - 📝 **Standardized Rental Agreements** (*Contrat de Location certifié / عقد كراء*)
  - 📝 **Official Power of Attorney** (*Tawkîl / Procuration / توكيل رسمي*)
  - 📝 **Sworn Statements** (*Déclaration sur l'honneur / تصريح بالشرف*)
  - 📝 **Vehicle Sales Contract** (*Contrat de Vente Véhicule / عقد بيع سيارة*)
- **Cryptographic QR Verification**: Embeds verification hashes and fiscal stamp margins.

### 5. "Timbre & Awra9" Statutory Cost Calculator (`/calculator`)
- **Real-Time Cost Breakdown**: Calculates exact expenses for administrative procedures:
  - Statutory fiscal stamps (*Timbres fiscaux: 3 DT, 10 DT, 25 DT, 80 DT, 150 DT*).
  - Standardized ID photo counts (*format officiel fond blanc*).
  - Certified copy fees (*Copies conformes à la Baladiya*).
- **Persistent Local Checklist**: Check off requirements as you prepare your dossier.

### 6. Atlas of 350+ Municipalities & Public Offices (`/locator`)
- **All 24 Governorates**: Directory covering Municipalities (*Baladiyas*), Post Offices, Tax Receipts (*Recettes des Finances*), ATTT, and CNSS centers.
- **Seasonal Working Hours**: Live schedules adjusted for **Ramadan** and summer single-shift (*Séance Unique*).
- **GPS Integration**: One-tap navigation via Google Maps and Waze.

### 7. E-Government Portals Directory (`/portails`)
- **Direct Access to 15+ Portals**: Verified official government platforms:
  - 🪪 **Mobile-ID / e-Houwiya** (`mobile-id.tn`)
  - 📋 **Bulletin N°3 en ligne** (`b3.interieur.gov.tn`)
  - 💼 **Auto-Entrepreneur** (`autoentrepreneur.tn`)
  - 🏢 **Registre National des Entreprises (RNE)** (`rne.tn`)
  - 📜 **Conservation de la Propriété Foncière (CPF)** (`cpf.gov.tn`)
  - 🏆 **Concours Fonction Publique** (`concours.gov.tn`)

### 8. Emergency Contacts & National Directory (`/contacts`)
- **Emergency Hotlines**: Police (197), SAMU (190), Protection Civile (198), Garde Nationale (71 327 200), SOS Violence (1899).
- **Ministry Directory**: Direct contact numbers, addresses, and official web portals for all state ministries.

### 9. Freelancer & Entrepreneur Launchpad (`/launchpad`)
- **Auto-Entrepreneur Status**: 1% flat tax rate (services) / 0.5% (commerce), 0% TVA (Art. 13 Code TVA), and CNSS Regime 14.
- **FX & BCT Invoicing**: Compliance guidelines for foreign currency bank accounts under Central Bank of Tunisia (BCT) Circular 2017-06.
- **SUARL / SARL Incorporation**: Step-by-step registration with the RNE and Recette des Finances.

### 10. Complete Civic Procedures Directory (`/procedures`)
- **38 Detailed Step-by-Step Guides**: Passports, CIN, Driver's Licenses, Carte Grise transfers, B3 criminal records, marriage contracts, and customs clearances.

---

## 🏛️ Deep Tunisian Infrastructure Grounding (38 Domains)

Idaara AI is grounded with verified legislation, decrees, and administrative protocols across 38 domains:

| Infrastructure Pillar | Procedures & Legal Frameworks Covered |
| :--- | :--- |
| **⚖️ Courts & Family Law** | • **Divorce & Alimony**: All 3 forms under Art. 31 CSP (Consent, Caprice, Fault), 3 mandatory conciliation sessions, CNSS Alimony Guarantee Fund (*صندوق ضمان النفقة*).<br>• **Powers of Attorney (التوكيل)**: Bank, real estate, and vehicle sale mandates.<br>• **Hojjet Wafet & Estate Distribution**: Notary acts (*عدول إشهاد*), cantonal judge validation, and land registry inscription. |
| **💼 Labor & Public Retirement** | • **Labor Law & Unfair Dismissal**: Notice periods, severance indemnities, abusive dismissal compensation (1–2 months salary per year, capped at 36 months), and Labour Inspection (*تفقدية الشغل*) filings.<br>• **CNRPS Public Sector Retirement**: Law 2019-37 retirement age (62/65), 15-year threshold, and pension formula. |
| **🏢 Real Estate & Land Title (CPF)** | • **Daftat Khana (دفتر خانة)**: Official Title Deed extraction on `cpf.gov.tn` (20 DT), non-hypothecation certs, and 1% CPF purchase inscriptions. |
| **🏥 Healthcare & CNAM** | • **APET 100% Coverage**: Unlimited coverage with 0 DT copay for the 25 official Long-Term Affections (Diabetes, Cancer, Hypertension, Renal failure). |
| **🛃 Customs & Expatriates** | • **FCR & TRE Privileges**: 2-year foreign residency, 120-day annual stay limit, 5-year vehicle age, and regularization from `RS / ن.ت` to `TU` under Finance Laws 2024/2025.<br>• **Foreign Resident Permits**: Student, work, and investment dossiers with the Foreigners Police Bureau. |
| **⚡ Public Utilities** | • **STEG**: Connection dossiers, Baladiya conformity certificates, and certified electrician compliance.<br>• **SONEDE**: Property titles, municipal excavation permits (*ترخيص حفر الطرقات*), and standard meter housing. |
| **🚀 Business Incorporation** | • **SARL / SUARL via RNE & APII**: Articles of association, 150 DT fixed tax registration, and automated electronic JORT publication. |

---

## 💻 Tech Stack & Architecture

```
Frontend:          Next.js 16.3 (App Router, Turbopack), React 19, TypeScript
Styling & UI:      Tailwind CSS 4, Framer Motion, Lucide Icons, Custom Bento Grid System
AI Engine:         Groq API (openai/gpt-oss-120b, qwen/qwen3.6-27b, allam-2-7b)
Speech Engine:     Whisper Large v3 Turbo (Phonetic Derja & Arabic Speech-to-Text)
Document Engine:   jsPDF, html2canvas-pro (High-DPI Vector Legal PDF Studio)
Grounding Engine:  Structured Civic Knowledge Graph (38 Core Domains, 350+ Offices across 24 Governorates)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `20.x` or higher
- **npm**: `10.x` or higher

### Installation & Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wacim-abdellli/idaara.git
   cd idaara
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Idaara.tn Environment Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Groq Cloud API Key (High-speed 120B AI & Whisper STT)
   # Get key: https://console.groq.com/keys
   GROQ_API_KEY="your_groq_api_key_here"

   # Google Gemini API Key (Optional fallback)
   GEMINI_API_KEY=""
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

5. **Run test suite**:
   ```bash
   npm test
   ```

6. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security, Privacy & Compliance

- **Zero-Storage Privacy Protocol**: Uploaded identity cards and personal notices are processed ephemerally in RAM and are never stored on persistent storage or shared with third parties.
- **Client-Side Redaction**: Sensitive personal identifiers (CIN numbers, bank RIBs) can be masked before document processing.
- **Rate-Limiting Protection**: Sliding-window rate limiting on all API routes to protect platform availability.
- **Statutory Alignment**: Procedures and statutory amounts are verified against the *Journal Officiel de la République Tunisienne* (JORT) and relevant ministerial decrees.

---

## 📄 License

Proprietary Software · © 2026 Idaara.tn Team. All rights reserved.  
*Built with ❤️ in Tunisia to give citizens their time and peace of mind back.*
