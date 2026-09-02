<div align="center">

# 🏛️ Idaara.tn · إدارة.تونس

**Tunisia's First AI Civic Copilot, Legal Scanner & Administrative Intelligence Platform**  
*Awra9ek w 9adhyeitek fi D9i9a — Conquer administrative red tape in seconds.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Groq AI](https://img.shields.io/badge/AI-Groq_Llama_3.3_70B-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![Gemini Vision](https://img.shields.io/badge/Vision-Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Whisper Audio](https://img.shields.io/badge/Audio-Whisper_Large_v3_Turbo-10B981?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/research/whisper)
[![Vitest](https://img.shields.io/badge/Vitest-48_Tests_Passing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Locales](https://img.shields.io/badge/Languages-Derja_%7C_FR_%7C_AR_(RTL)_%7C_EN-EA580C?style=for-the-badge&logo=translate&logoColor=white)](#-multilingual-support)

</div>

---

## 📖 Table of Contents

- [The Problem: The "Arja3 Ghodwa" Dilemma](#-the-problem-the-arja3-ghodwa-dilemma)
- [The Solution](#-the-solution)
- [Core Features & Modules](#-core-features--modules)
  - [1. Universal Derja AI Copilot (`/copilot`)](#1-universal-derja-ai-copilot-copilot)
  - [2. "Fasserli Hal War9a" Document Scanner & OCR Decoder (`/fasserli`)](#2-fasserli-hal-war9a-document-scanner--ocr-decoder-fasserli)
  - [3. National Concours & Public Recruitment Hub (`/concours`)](#3-national-concours--public-recruitment-hub-concours)
  - [4. Auto-Filled Official PDF Studio (`/documents`)](#4-auto-filled-official-pdf-studio-documents)
  - [5. "Timbre & Awra9" Statutory Cost Calculator (`/calculator`)](#5-timbre--awra9-statutory-cost-calculator-calculator)
  - [6. Territorial Atlas of Public Offices (`/locator`)](#6-territorial-atlas-of-public-offices-locator)
  - [7. E-Government Portals Directory (`/portails`)](#7-e-government-portals-directory-portails)
  - [8. Emergency Contacts & National Directory (`/contacts`)](#8-emergency-contacts--national-directory-contacts)
  - [9. Freelancer & Entrepreneur Launchpad (`/launchpad`)](#9-freelancer--entrepreneur-launchpad-launchpad)
  - [10. Complete Civic Procedures Directory (`/procedures`)](#10-complete-civic-procedures-directory-procedures)
- [Deep Tunisian Infrastructure Grounding (38 Legal Frameworks)](#-deep-tunisian-infrastructure-grounding-38-legal-frameworks)
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
- **Dual-Model Cascade Inference**: Powered by `llama-3.3-70b-versatile` running on Groq LPU hardware with automatic fallback to `llama-3.1-8b-instant` and local heuristic reasoning.
- **Cloud Session Sync & Auth**: Save, rename, and synchronize full conversation histories across devices using Supabase SSR Auth with seamless offline fallback to `localStorage`.
- **Deep Think Mode (`[ 🧠 Think ]`)**: Exhaustive statutory breakdown cross-referenced with exact JORT decrees and official tariffs.
- **Whisper Speech-to-Text**: High-precision voice input powered by `whisper-large-v3-turbo`.
- **Real-Time Dynamic Browser Tab Text**: Tab titles dynamically adapt to the active language (`AR`, `FR`, `EN`, `TN`) in real-time.

### 2. "Fasserli Hal War9a" Document Scanner & OCR Decoder (`/fasserli`)
- **Multimodal Document Decoding**: Upload or snap a photo of any official administrative letter (Tax adjustment, CNSS demand, Police summons, Court order, Utility bill) powered by Google Gemini 2.5 Flash Vision & Groq OCR.
- **Automatic PII Redaction**: Sensitive Tunisian identifiers (CIN, RIB, phone numbers) are masked using regex before being processed by any LLM.
- **3-Point Plain Language Summary**: Breaks down the document in Tunisian Derja, French, and Arabic.
- **Statutory Deadlines & Penalty Radar**: Identifies strict appeal windows, payment deadlines, and late penalty rates.
- **Magic-Byte MIME Validation**: Inspects binary headers (`ffd8ff` for JPEG, `89504e47` for PNG, `25504446` for PDF) to reject spoofed executable payloads.

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
- **Cryptographic QR Verification**: Embeds verification hashes and municipal fiscal stamp guidelines.

### 5. "Timbre & Awra9" Statutory Cost Calculator (`/calculator`)
- **Real-Time Cost Breakdown**: Calculates exact expenses for administrative procedures:
  - Statutory fiscal stamps (*Timbres fiscaux: 3 DT, 10 DT, 25 DT, 80 DT, 150 DT*).
  - Standardized ID photo counts (*format officiel fond blanc*).
  - Certified copy fees (*Copies conformes à la Baladiya*).
- **Persistent Local Checklist**: Check off requirements as you prepare your dossier.

### 6. Territorial Atlas of Public Offices (`/locator`)
- **All 24 Governorates**: Directory covering 130+ Municipalities (*Baladiyas*), Post Offices, Tax Receipts (*Recettes des Finances*), ATTT, and CNSS centers.
- **Sleek Minimalist Segment Filter**: Responsive flex-wrapped region selectors with live office counters.
- **Seasonal Working Hours**: Live schedules adjusted for **Ramadan** and summer single-shift (*Séance Unique*).
- **GPS Integration**: One-tap direct navigation via Google Maps and Waze.

### 7. E-Government Portals Directory (`/portails`)
- **Direct Access to 15+ Portals**: Verified official government platforms:
  - 🪪 **Mobile-ID / e-Houwiya** (`e-houwiya.tn`)
  - 📋 **Bulletin N°3 en ligne** (`b3.interieur.gov.tn`)
  - 💼 **Auto-Entrepreneur** (`auto-entrepreneur.tn`)
  - 🏢 **Registre National des Entreprises (RNE)** (`rne.tn`)
  - 📜 **Législation Tunisienne (JORT)** (`legislation.tn`)
  - 🏆 **Concours Fonction Publique** (`concours.gov.tn`)

### 8. Emergency Contacts & National Directory (`/contacts`)
- **Emergency Hotlines**: Police (197), SAMU (190), Protection Civile (198), Garde Nationale, SOS Violence (1899).
- **Ministry Directory**: Direct contact numbers, addresses, and official web portals for all state ministries.

### 9. Freelancer & Entrepreneur Launchpad (`/launchpad`)
- **Auto-Entrepreneur Status**: 1% flat tax rate (services) / 0.5% (commerce), 0% TVA (Art. 13 Code TVA), and CNSS Regime 14.
- **Dynamic Fiscal Rates Endpoint (`/api/fiscal-rates`)**: Cached statutory rate API route connected to PostgreSQL with automatic statutory fallback.
- **FX & BCT Invoicing**: Export invoice generator compliant with Central Bank of Tunisia (BCT) Circular 2017-06.
- **Legal Status Comparator**: Instant comparison between Auto-Entrepreneur, Patente Personne Physique, and SUARL.

### 10. Complete Civic Procedures Directory (`/procedures`)
- **38 Detailed Step-by-Step Guides**: Passports, CIN, Driver's Licenses, Carte Grise transfers, B3 criminal records, marriage contracts, and customs clearances.

---

## 🏛️ Deep Tunisian Infrastructure Grounding (38 Legal Frameworks)

Idaara AI is grounded with verified legislation, decrees, and administrative protocols across 38 domains:

| Infrastructure Pillar | Procedures & Legal Frameworks Covered |
| :--- | :--- |
| **⚖️ Courts & Family Law** | • **Divorce & Alimony**: All 3 forms under Art. 31 CSP (Consent, Caprice, Fault), 3 mandatory conciliation sessions, CNSS Alimony Guarantee Fund (*صندوق ضمان النفقة*).<br>• **Powers of Attorney (التوكيل)**: Bank, real estate, and vehicle sale mandates.<br>• **Hojjet Wafet & Estate Distribution**: Notary acts (*عدول إشهاد*), cantonal judge validation, and land registry inscription. |
| **💼 Labor & Public Retirement** | • **Labor Law & Unfair Dismissal**: Notice periods, severance indemnities, abusive dismissal compensation (1–2 months salary per year, capped at 36 months), and Labour Inspection (*تفقدية الشغل*) filings.<br>• **CNRPS Public Sector Retirement**: Law 2019-37 retirement age (62/65), 15-year threshold, and pension formula. |
| **🏢 Real Estate & Land Title (CPF)** | • **Daftat Khana (دفتر خانة)**: Official Title Deed extraction on `cpf.gov.tn` (20 DT), non-hypothecation certs, and 1% CPF purchase inscriptions. |
| **🏥 Healthcare & CNAM** | • **APET 100% Coverage**: Unlimited coverage with 0 DT copay for the 25 official Long-Term Affections (Diabetes, Cancer, Hypertension, Renal failure). |
| **🛃 Customs & Expatriates** | • **FCR & TRE Privileges**: 2-year foreign residency, 120-day annual stay limit, 5-year vehicle age, and regularization from `RS / ن.ت` to `TU` under Finance Laws 2024/2026.<br>• **Foreign Resident Permits**: Student, work, and investment dossiers with the Foreigners Police Bureau. |
| **⚡ Public Utilities** | • **STEG**: Connection dossiers, Baladiya conformity certificates, and certified electrician compliance.<br>• **SONEDE**: Property titles, municipal excavation permits (*ترخيص حفر الطرقات*), and standard meter housing. |
| **🚀 Business Incorporation** | • **SARL / SUARL via RNE & APII**: Articles of association, 150 DT fixed tax registration, and automated electronic JORT publication. |

---

## 💻 Tech Stack & Architecture

```
Frontend:          Next.js 16.3 (App Router, Turbopack), React 19, TypeScript 5.7
Styling & UI:      Tailwind CSS 4.0, Framer Motion, Lucide Icons, Glassmorphism Design
AI Engine:         Groq API (Llama 3.3 70B Versatile, Llama 3.1 8B Instant)
Vision Engine:     Google Gemini 2.5 Flash Vision + Tesseract.js (Node.js runtime guarded)
Speech Engine:     Whisper Large v3 Turbo (Phonetic Derja & Arabic Speech-to-Text)
Auth & Database:   Supabase SSR Auth (Google OAuth + Magic Link) & PostgreSQL Sessions Table
Caching & Rate:    Upstash Redis + Serverless-Safe Lazy In-Memory Sliding Window
Document Engine:   jsPDF, html2canvas-pro (High-DPI Vector Legal PDF Studio)
Testing:           Vitest 4.1 (40 automated tests across 9 suites)
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

   # 1. Google Gemini API Key (Vision & Multimodal OCR)
   # Get key: https://aistudio.google.com/app/apikey
   GEMINI_API_KEY="your_gemini_api_key_here"

   # 2. Groq Cloud API Key (Llama 3.3 70B & Whisper STT)
   # Get key: https://console.groq.com/keys
   GROQ_API_KEY="your_groq_api_key_here"

   # 3. Supabase Cloud Auth & Database (Optional - falls back to local mode)
   # Get keys: https://supabase.com/dashboard/project/_/settings/api
   NEXT_PUBLIC_SUPABASE_URL="https://your_project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
   SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

5. **Run automated test suite**:
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

- **Zero-Storage Privacy Protocol**: Uploaded documents and personal identity scans are processed ephemerally in RAM and are never persisted or shared.
- **Automated PII Sanitization**: Regex masking intercepts CIN, RIB, and phone numbers before any third-party AI processing.
- **Magic-Byte Binary Verification**: Inspects file headers to prevent MIME spoofing attacks on `/api/ocr`.
- **Serverless-Safe Rate Limiting**: In-memory sliding window rate limiter with lazy GC fallback prevents abuse across serverless lambda instances.
- **Hardened HTTP Headers**: Strict `Content-Security-Policy`, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff` configured in `next.config.ts`.
- **Statutory Alignment**: All fiscal stamps and procedures cross-referenced with the 2026 Tunisian Finance Law and official JORT decrees.

---

## 📄 License

Proprietary Software · © 2026 Idaara.tn Team. All rights reserved.  
*Built with ❤️ in Tunisia to give citizens their time and peace of mind back.*
