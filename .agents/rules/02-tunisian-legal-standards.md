# Rule 02: Tunisian Legal & Statutory Standards

All administrative and legal data in Idaara.tn must adhere strictly to the **Official Gazette of the Republic of Tunisia (الرائد الرسمي للجمهورية التونسية - JORT)** and current Finance Laws (Lois de Finances 2024–2026).

---

## 1. Single Source of Truth: `src/data/fiscal-rates.ts`

Any component or route displaying fees or calculating fiscal stamps MUST import from `src/data/fiscal-rates.ts`. Never hardcode raw currency amounts in UI components.

### Official Civic Stamp Constants (`CIVIC_STAMP_RATES`):
| Document / Act | Official Fee (TND) | Statutory Breakdown | Legal Reference |
| :--- | :---: | :--- | :--- |
| **Carte d'Identité Nationale (CIN)** | `3.000 DT` | Timbre fiscal guichet | Loi n° 93-7 modifiée |
| **CIN en cas de perte / vol** | `25.000 DT` | Timbre pénal de remplacement | Article 52 Loi de Finances |
| **Passeport Adulte (18+ ans)** | `80.000 DT` | Timbre fiscal Recette des Finances | Loi n° 75-40 du 14 mai 1975 |
| **Passeport Élève / Étudiant / Mineur** | `25.000 DT` | Timbre tarif réduit (sur justificatif) | Loi de Finances |
| **Bulletin N°3 (Casier Judiciaire B3)** | `7.500 DT` | **3.000 DT** timbre fiscal + **4.500 DT** Rapide Poste | Décret ministériel Intérieur / Poste |
| **Droit de Timbre sur Factures & Quittances** | `1.000 DT` | Droit de timbre général obligatoire | Article 40 Loi de Finances n° 2021-21 |
| **Légalisation de Signature (Baladiya)** | `3.000 DT` | Par signature municipale | Loi n° 94-103 & Code Fiscalité Locale |
| **Copie Conforme (Baladiya)** | `3.000 DT` | Par document légalisé | Tarification municipale |
| **Extrait de Naissance (مضمون ولادة)** | `0.500 DT` | Droit d'état civil au guichet | Loi n° 57-3 sur l'état civil |

---

## 2. Auto-Entrepreneur Regime (`AUTO_ENTREPRENEUR_RATES`)

Governed by **Décret-loi n° 2020-33** and operational guidelines:
- **Tax Rate (Services & Tech Freelance):** Exactly **1.0%** of annual revenue (`0.01`).
- **Tax Rate (Commerce & Artisanat):** Exactly **0.5%** of annual revenue (`0.005`).
- **Revenue Ceiling:** `75,000 DT` per calendar year for services.
- **TVA on Export:** Exactly **0%** (Exonération totale selon l'Article 13 du Code de la TVA pour les devises rapatriées).
- **CNSS Social Contribution:** Forfaitaire simplifié de **50 DT / trimestre** (`200 DT / an`).
- **Platform Registration:** 100% gratuit sur `auto-entrepreneur.tn`.

---

## 3. Real Estate Lease Contracts (عقد كراء)
- **Minimum Enregistrement Recette des Finances:** `30.000 DT` ou 1% du montant annuel du loyer.
- **Municipal Légalisation:** `6.000 DT` au total (deux signatures : bailleur et locataire à 3 DT chacune).
- **Délai légal d'enregistrement :** 60 jours calendaires sous peine de pénalité de retard.

---

## 4. Vehicle Transfer & ATTT (البطاقة الرمادية)
- **Frais d'enregistrement Recette :** `100.000 DT` (base de perception).
- **Droits de dossier ATTT :** `40.000 DT` - `50.000 DT`.
- **Documents obligatoires :** Certificat de visite technique valide, certificat de non-gage (عدم إثقال), contrat de vente légalisé et enregistré.
