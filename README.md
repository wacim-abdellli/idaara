<div align="center">

# 🏛️ Idaara.tn · إدارة.تونس

**Tunisia's First AI Bureaucracy Copilot, Scanner & Smart Document Studio**  
*Fasserli, 3abbi w a3tini l'awra9 — Conquer administrative red tape in seconds.*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/AI-Groq_GPT--OSS--120B-F55036?style=for-the-badge&logo=openai&logoColor=white)](https://groq.com/)
[![Whisper Audio](https://img.shields.io/badge/Audio-Whisper_Large_v3_Turbo-10B981?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/research/whisper)
[![Locales](https://img.shields.io/badge/Languages-Derja_%7C_FR_%7C_AR_(RTL)_%7C_EN-EA580C?style=for-the-badge&logo=translate&logoColor=white)](#-multilingual-support)

</div>

---

## 📖 Table of Contents

- [The Vision & Problem Statement](#-the-vision--problem-statement)
- [Core Features & Modules](#-core-features--modules)
  - [1. Derja-Native AI Copilot (`/copilot`)](#1-derja-native-ai-copilot-copilot)
  - [2. "Fasserli Hal War9a" Scanner & Legal Decoder (`/fasserli`)](#2-fasserli-hal-war9a-scanner--legal-decoder-fasserli)
  - [3. Public Concours & Recruitment Hub (`/concours`)](#3-public-concours--recruitment-hub-concours)
  - [4. Auto-Filled Official PDF Form Generator (`/documents`)](#4-auto-filled-official-pdf-form-generator-documents)
  - [5. "Timbre & Awra9" Budget & Checklist Calculator (`/calculator`)](#5-timbre--awra9-budget--checklist-calculator-calculator)
  - [6. Interactive Municipal & Public Office Locator (`/locator`)](#6-interactive-municipal--public-office-locator-locator)
  - [7. Freelancer & Entrepreneur Launchpad (`/launchpad`)](#7-freelancer--entrepreneur-launchpad-launchpad)
  - [8. Complete Civic Procedures Directory (`/procedures`)](#8-complete-civic-procedures-directory-procedures)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Environment Setup](#installation--environment-setup)
- [Security, Privacy & Compliance](#-security-privacy--compliance)
- [License](#-license)

---

## 🎯 The Vision & Problem Statement

Dealing with public administration in Tunisia (*l'Idara*, *Baladiya*, *Recette des Finances*, *CNSS*, *Douane*, *Ministères*) is universally recognized as one of the most time-consuming and fragmented experiences for citizens, students, entrepreneurs, and diaspora expats:

- **Missing Paperwork & Turnarounds**: Citizens wait hours in line only to be turned away because they lacked a *5 DT timbre fiscal*, a *copie conforme*, or a specific civil document.
- **Dense Statutory Jargon**: Tax adjustment notices, court summons, and administrative decrees are written in complex legal phrasing that is difficult to parse.
- **Fragmented Information**: Requirements differ between municipalities, opening hours shift during summer and Ramadan, and official portals are scattered.

### 💡 The Idaara.tn Solution
**Idaara.tn** unifies Tunisian administrative procedures, laws (*JORT*), and municipal knowledge into a modern, voice-first intelligent assistant. Speak naturally in **Tunisian Derja**, snap a photo of any official notice for instant plain-language decoding, estimate exact costs, and generate certified, ready-to-print legal PDF documents.

---

## ✨ Core Features & Modules

### 1. Derja-Native AI Copilot (`/copilot`)
- **Dialect Understanding**: Understands conversational Tunisian Derja (Arabizi and Arabic script), French, and standard Arabic.
- **Deep Think Mode (`[ 🧠 Think ]`)**: Toggle deep legal reasoning mode for complex statutory questions cross-checked against official Tunisian legal codes.
- **Document Attachment (`[ 📷 OCR ]`)**: Upload and attach notices or letters directly within the conversation.
- **Whisper Speech-to-Text**: High-accuracy voice transcription powered by `whisper-large-v3-turbo`.
- **Actionable Formatting**: Interactive checklist pills, bold step badges, external government portal links, and copy-to-clipboard support.

### 2. "Fasserli Hal War9a" Scanner & Legal Decoder (`/fasserli`)
- **Instant Document Decoding**: Upload or snap a photo of any official administrative letter (Tax notice, CNSS demand, Police summons, Court order, CIN, STEG/SONEDE).
- **3-Point Plain Language Summary**: Breaks down the document in Tunisian Derja, French, and Arabic.
- **Statutory Deadlines & Penalty Radar**: Identifies strict appeal windows, due dates, and late payment penalties.
- **Action Checklist & Guichet**: Identifies the exact municipal or tax desk to visit with the required supporting papers.
- **1-Click Copilot Deep Consultation**: Seamlessly transition from a decoded document into an AI conversation.

### 3. Public Concours & Recruitment Hub (`/concours`)
- **Live Recruitment Notices**: Verified openings across Tunisian ministries, state companies, municipalities, and agencies (*Concours Nationaux*).
- **Multi-Filter Discovery**: Filter by educational level (Bac, Licence, Master, Ingénieur), sector, closing date, and required papers.
- **Statutory Directives**: Instant checklist of application documents (B3, Extrait de naissance, Copies certifiées).

### 4. Auto-Filled Official PDF Form Generator (`/documents`)
- **Ready-to-Print Legal Templates**: Generates vector-sharp PDF documents ready for municipal legalization (*Signature Légalisée* at the *Baladiya*):
  - 📝 **Standardized Rental Agreements** (*Contrat de Location certifié*)
  - 📝 **Official Power of Attorney** (*Tawkîl / Procuration*)
  - 📝 **Sworn Statements** (*Déclaration sur l'honneur / Tasrîh bi charaf*)
  - 📝 **Car Sales Contract** (*Contrat de Vente Véhicule*)
- **Cryptographic QR Verification**: Includes QR verification codes, fiscal stamp margin guidelines, and bilingual formatting.

### 5. "Timbre & Awra9" Budget & Checklist Calculator (`/calculator`)
- **Real-Time Cost Estimator**: Calculates exact total expenses for administrative procedures:
  - Exact fiscal stamp requirements (*Timbres fiscaux: 5 DT, 15 DT, 25 DT, 80 DT, 100 DT*).
  - Standardized ID photo counts (*format officiel*).
  - Number of certified copies (*Copies conformes*).
- **Persistent Local Checklist**: Track items as you prepare them before visiting the counter.

### 6. Interactive Municipal & Public Office Locator (`/locator`)
- **350+ Public Offices**: Comprehensive directory covering Municipalities (*Baladiyas*), Post Offices, Tax Receipts (*Recettes des Finances*), and CNSS centers across all 24 governorates.
- **Dynamic Schedules**: Opening hours adjusted for **Ramadan** and summer single-shift schedules (*Séance Unique*).
- **One-Tap GPS Directions**: Integrated Google Maps and Waze routing.

### 7. Freelancer & Entrepreneur Launchpad (`/launchpad`)
- **Auto-Entrepreneur Status**: Step-by-step roadmap for tax exemptions (0.5% - 1%), CNSS registration, and status declarations.
- **Patente & RNE**: Registry filing guide, corporate tax structure, and legal compliance.
- **Export & Freelance Contracts**: Legally compliant bilingual contracts in EUR/USD with Central Bank of Tunisia (BCT) clauses.

### 8. Complete Civic Procedures Directory (`/procedures`)
- **Detailed Step-by-Step Guides**: Passports, CIN issuance/renewal, Driver's Licenses, Carte Grise transfers, B3 criminal records, marriage certificates, and customs declarations.

---

## 💻 Tech Stack & Architecture

```
Frontend:          Next.js 16 (App Router, Server Components, Turbopack), React 19, TypeScript
Styling & UI:      Tailwind CSS 4, Framer Motion, Lucide Icons, Custom Bento Grid System
AI Intelligence:   Groq API (openai/gpt-oss-120b, qwen/qwen3.6-27b, openai/gpt-oss-20b, allam-2-7b)
Speech Engine:     Whisper Large v3 Turbo (Derja & Arabic phonetic STT)
Document Engine:   jsPDF, html2canvas-pro (High-DPI Vector Legal PDF Generator)
Data Architecture: Structured Civic Graph (25+ Procedures, 350+ Offices across 24 Governorates)
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

   # Groq Cloud API Key (Free high-speed AI & Whisper STT)
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

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security, Privacy & Compliance

- **Zero-Storage Privacy Protocol**: Uploaded identity cards and personal notices are processed ephemerally in RAM and are never stored on persistent disks or shared with third parties.
- **Client-Side Redaction**: Sensitive personal identifiers (CIN numbers, bank RIBs) can be masked before document processing.
- **Statutory Alignment**: Information and procedures are continuously updated in accordance with the *Journal Officiel de la République Tunisienne* (JORT) and relevant ministerial decrees.

---

## 📄 License

Proprietary Software · © 2026 Idaara.tn Team. All rights reserved.  
*Built with ❤️ in Tunisia to give citizens their time and peace of mind back.*
