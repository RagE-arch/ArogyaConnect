# ArogyaConnect — Universal Healthcare Ecosystem

ArogyaConnect is a full-stack healthcare application prototype designed around three user roles: **Patients**, **Hospitals & Physicians**, and **Immediate Family Members** with view-only access. It brings appointment management, health records, care coordination, AI-assisted guidance, and emergency workflows into one interface.

> **Project note:** Features such as AI-generated health summaries, live location, ambulance dispatch, voice assistance, government-service integrations, and real-time synchronization depend on the implementation and connected services. Treat this project as a prototype unless those integrations have been independently configured and verified. It is not a substitute for professional medical advice or emergency services.

---

## Table of Contents

- [User Roles](#user-roles)
- [Features](#features)
  - [Patient Portal](#1-patient-portal)
  - [Hospital & Physician Portal](#2-hospital--physician-portal)
  - [Family View-Only Portal](#3-family-view-only-portal)
  - [Navigation](#4-universal-back-navigation)
- [Technology & Architecture](#technology--architecture)
- [Getting Started](#getting-started)
- [Demo Walkthrough](#demo-walkthrough)
- [Safety, Privacy & Security Notes](#safety-privacy--security-notes)
- [Future Improvements](#future-improvements)

---

## User Roles

| Role | Purpose |
|---|---|
| **Patient** | Access healthcare tools, appointments, prescriptions, health records, and care reminders. |
| **Hospital & Physician** | Manage OPD queues, review patient reports, coordinate care, and monitor emergency requests. |
| **Family (View-Only)** | Follow a patient's care status, recorded vitals, medicine reminders, and appointments without editing clinical information. |

## Features

### 1. Patient Portal

1. **ArogyaSarthi AI — Multilingual Voice Assistant**
   - Designed for spoken input and audio responses in English, Hindi, Bengali, Telugu, Tamil, and Marathi.
   - Helps users describe symptoms, find relevant specialists, review consultation slots, and begin booking.
   - Supports quick prompts and typed symptom descriptions.

2. **AI-Assisted Symptom Triage & Nearby Care**
   - Accepts typed or spoken symptoms.
   - Presents urgency guidance and nearby hospitals or clinics on a map with distance information.
   - Triage suggestions are informational and must not be treated as a diagnosis.

3. **Prescription Upload & Delivery Workflow**
   - Upload prescription images or PDFs.
   - Tracks a proposed workflow: `Pending Review` → `Verified by Hospital Pharmacist` → `Dispatched`.
   - Includes a concept for delivery tracking.

4. **Personalized Diet Plan & Food Safety Checker**
   - Meal-planning interface for breakfast, mid-morning, lunch, evening snack, and dinner.
   - Includes example dietary considerations such as Type 2 diabetes, mild hypertension, and lactose or penicillin allergies.
   - Food checker examples include samosa, paneer tikka, moong dal cheela, and karela juice.
   - Food safety and glycemic information should be validated against reliable clinical sources before real-world use.

5. **Government Health Schemes, ABHA & DigiLocker**
   - Information interface for Ayushman Bharat PM-JAY eligibility and empanelled hospitals.
   - ABHA card concept with a 14-digit identifier and QR code.
   - DigiLocker-related document integration concept.
   - Actual eligibility checks, identity verification, and document synchronization require authorized official integrations.

6. **Insurance Claims & Paperwork Support**
   - Concierge-style insurance support interface.
   - Pre-authorization checklist, contact options, and cashless-approval tracking concept.

7. **Care Companion**
   - Care-attendant workflow for recording blood pressure, SpO₂, pulse, blood glucose, and mobility.
   - Designed to make caregiver logs available to the hospital and authorized family members.

8. **Digital Health Locker**
   - Categorized storage concept for lab reports, prescriptions, ECG scans, and discharge bills.

9. **Health Trajectory & Report Trends**
   - Six-month Chart.js visualizations for fasting blood glucose, systolic blood pressure, and HbA1c.
   - Plain-language summaries intended to help users understand trends over time.

10. **OPD Token Queue**
    - Displays the patient's token and currently served token.
    - Example: patient token `#44`, current token `#39`, five patients ahead, and an estimated wait of about 25 minutes.
    - Includes a progress indicator intended to update when the hospital calls the next patient.

11. **Emergency SOS Hub**
    - Prominent SOS interface designed around sharing location and relevant medical information with emergency responders.
    - Includes concepts for nearby trauma-centre alerts, ambulance dispatch details, paramedic contact, and ETA.
    - Includes educational first-aid references such as stroke FAST and CPR. Emergency guidance must be medically reviewed before deployment.

12. **Interactive Doctor Discovery Map**
    - Leaflet/OpenStreetMap-based map concept for hospitals and clinics.
    - Filters for specialty, consultation fee, distance, and ratings.
    - Supports viewing appointment slots and starting a booking workflow.

13. **Medication Schedule & Clinical Guide**
    - Medication information and reminders explaining the intended purpose of each medicine.
    - Daily “Take Dose” check-off for adherence tracking.
    - Medication decisions must always be confirmed with a qualified clinician or pharmacist.

### 2. Hospital & Physician Portal

1. **OPD Appointment & Queue Control**
   - View the day's appointment roster.
   - “Call Next Patient” control intended to advance the token and update the patient's queue view.

2. **AI-Assisted Multi-Report Comparison**
   - Side-by-side comparison of historical and current reports.
   - Example demo dates: **03 October 2026** and **13 October 2026**.
   - Executive clinical-summary concept and Chart.js comparison visualization for selected indicators.
   - Any generated clinical summary must be checked by a qualified clinician.

3. **Controlled-Medication Dispensation Counter**
   - Demonstrates a 10-day dispensation counter for a sample medication.
   - A `LOCKED` state can indicate that clinician authorization is required before a refill workflow proceeds.
   - This prototype counter is not a replacement for prescribing rules, pharmacy controls, or applicable law.

4. **Patient Reports & Caregiver Vitals**
   - Clinical viewing interface for caregiver logs, laboratory results, and flagged values.

5. **Emergency Fleet & Ambulance Dispatch**
   - Incoming emergency-alert feed concept.
   - Interface for responder allocation, vehicle status, and two-way emergency communication.

### 3. Family View-Only Portal

1. **Read-Only Guardian Interface**
   - Separate family view intended to reduce accidental changes to patient data.

2. **Patient Status & Reports**
   - View recorded caregiver vitals, recent lab results, and health-trend summaries.

3. **Medicine & Appointment Reminders**
   - Example status labels for completed and upcoming doses.
   - Displays upcoming appointments and OPD token information.

4. **Trusted Contact Access Gate**
   - Demonstration PIN: `CARE2026`.
   - **This PIN is a demo credential, not production-grade authentication.** Replace it with secure authentication and explicit patient consent before any real patient data is used.

### 4. Universal Back Navigation

- **Back bar and breadcrumbs** for navigating between feature pages.
- **Back to Dashboard** controls at the top and bottom of feature pages.
- **History tracking** through the app's `App.goBack()` navigation concept.
- Browser Back/Forward and `Esc` keyboard navigation support.

---

## Technology & Architecture

Technologies and integrations referenced by the project include:

- **Python** — application runtime
- **Chart.js** — health trends and report comparisons
- **Leaflet + OpenStreetMap** — interactive healthcare map
- **Browser speech capabilities** — voice input/output, where supported
- **Local web server** — development access at `http://127.0.0.1:8000`

The exact backend framework, dependency versions, database, and external API setup should be documented from the repository's actual source files and dependency manifest.

## Getting Started

### Prerequisites

- Python installed on your system
- A modern browser such as Chrome, Edge, Brave, or Firefox
- Project dependencies installed as specified by the repository

### Run locally

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install dependencies if a `requirements.txt` file is provided:

   ```powershell
   python -m pip install -r requirements.txt
   ```

4. Start the application:

   ```powershell
   python run.py
   ```

5. Open the local application in your browser:

   **http://127.0.0.1:8000**

If the application does not start, confirm that you are in the directory containing `run.py`, that the required packages are installed, and that port `8000` is available.

## Demo Walkthrough

1. **Switch roles:** Use the top navigation to move between Patient, Hospital & Doctor, and Family (View-Only).
2. **Try the voice assistant:** In Patient view, use the microphone control or a quick prompt. Test browser microphone permissions and speech support if voice features are unavailable.
3. **Test OPD queue updates:** Note the patient token and current token, switch to Hospital & Doctor, and use **Call Next Patient**. Return to Patient view to check whether the queue display changes.
4. **Review report comparison:** In the hospital portal, open **AI 10-Day Report Diff** to inspect the sample comparison and chart.
5. **Check the medication counter:** Find the Controlled Substance Counter demo card and inspect its dispensation and refill status.
6. **Explore Emergency SOS:** Open the SOS interface to review the proposed dispatch workflow. Do not assume a real ambulance or emergency service has been contacted unless an actual, verified integration confirms it.
7. **Open the family portal:** Switch to Family and enter the demo PIN `CARE2026` to inspect the view-only interface.

> **Demo data:** Sample tokens, dates, vitals, medication statuses, contacts, and dispatch details may be illustrative. Verify which data is simulated before presenting the application as a live service.

## Safety, Privacy & Security Notes

ArogyaConnect handles concepts involving highly sensitive medical and identity information. Before production use:

- Never commit real patient records, prescriptions, identity documents, access tokens, API keys, or passwords to GitHub.
- Replace demonstration PINs with secure authentication, authorization, and patient-controlled consent.
- Use encryption in transit and at rest, secure session handling, audit logs, and least-privilege access.
- Validate uploads, limit file types and sizes, and scan uploaded files.
- Obtain explicit permission before accessing or sharing location and health information.
- Use verified healthcare, government, pharmacy, mapping, and emergency-service integrations.
- Have medical professionals review triage, food-safety, medication, and first-aid content.
- Clearly label simulated features and avoid presenting generated summaries as medical diagnoses.
- Follow applicable privacy, data-protection, and healthcare regulations before handling real patient data.

## Future Improvements

- Connect verified authentication and role-based access controls.
- Integrate approved health-record and government-service APIs.
- Add automated tests for role switching, queue synchronization, uploads, and navigation.
- Add robust validation, error handling, accessibility support, and responsive-layout testing.
- Document environment variables and deployment steps without exposing secrets.
- Add monitoring and audit trails for sensitive actions.

---

**ArogyaConnect — bringing patients, healthcare professionals, and trusted family members into one coordinated care experience.**
