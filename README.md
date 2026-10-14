# 🏥 AarogyaConnect 360 - Universal Healthcare Ecosystem

A full-stack medical application built to serve three distinct types of users:
1. **Patients**
2. **Hospitals & Physicians**
3. **Patients' Immediate Family Members & Close Ones (View-Only Portal)**

---

## 🌟 Architecture & Features Overview

### 1. 👤 For Patients (All 13 Requirements Satisfied)
1. **Multilingual Voice AI Assistant (`ArogyaSarthi AI`)**:
   - Spoken input & vocal output in **English, हिन्दी (Hindi), বাংলা (Bengali), తెలుగు (Telugu), தமிழ் (Tamil), and मराठी (Marathi)**.
   - Diagnoses health complaints, recommends the nearest specialist doctor, and **speaks available consultation slots aloud for Today, Tomorrow, and the next 3 days**.
   - 1-click booking directly from voice recommendation.
2. **AI Health Symptom Triage & Geolocation Mapping**:
   - Analyzes spoken or typed symptoms (e.g. chest tightness, diabetic thirst, joint pain).
   - Identifies urgency level and maps to nearest hospitals & clinics with live distance calculations.
3. **Prescription Upload & Hospital Double-Check Delivery**:
   - Patients upload prescription files (images/PDF).
   - Status pipeline: `Pending Review` ➔ **Double-Checked & Verified by Hospital Pharmacist** ➔ Dispatched for home delivery with express rider tracking.
4. **Personalized Diet Plan & Meal Safety Analyzer**:
   - Custom meal schedule (Breakfast, Mid-morning, Lunch, Evening Snack, Dinner) tailored for **Type 2 Diabetes, Mild Hypertension, and Lactose/Penicillin allergies**.
   - **Interactive Food Safety Checker**: Input any dish (e.g., *Samosa*, *Paneer Tikka*, *Moong Dal Cheela*, *Karela Juice*) to receive an immediate clinical safety verdict, Glycemic Index, and allergen alerts.
5. **Government Medical Schemes, ABHA & DigiLocker**:
   - **Ayushman Bharat PM-JAY**: ₹5,00,000 annual family coverage eligibility details & empanelled hospitals.
   - **ABHA Card (Ayushman Bharat Health Account)**: 14-digit ABDM ID with high-resolution generated QR code.
   - **DigiLocker Integration**: Verified COVID-19 booster certificate, Aadhaar health profile, and PM-JAY golden e-Card sync.
6. **Human Agent Support for Insurance Claims & Paperwork**:
   - Dedicated concierge agent (**Aakash Verma - Senior TPA & Insurance Desk Advocate**).
   - Direct call/chat, pre-authorization document checklist, and cashless approval tracker.
7. **Care Companion (Human Care Attendant for Absent Family)**:
   - Verified on-demand nursing assistant (**Sister Priya Nair - GNM Staff Nurse**).
   - Real-time vitals monitoring logs (BP, SpO2, Pulse, Blood Glucose, Mobility).
   - Synced automatically between the Hospital desk and the Patient's immediate family.
8. **Digital Health Locker (Online Document Keeper)**:
   - Secure categorized storage for lab reports, prescriptions, ECG scans, and hospital discharge bills.
9. **AI Health Trajectory & Report Trend Analyzer**:
   - Visual 6-month Chart.js graph tracking Fasting Blood Glucose, Systolic BP, and HbA1c.
   - Plain-language AI summary explaining if health is improving or declining.
10. **Real-Time OPD Token Queue & Animated Loading Bar**:
    - Displays: Current Serving Token: `#39` | Patient Token: `#44`.
    - Explicitly informs: **"Your number will be after 5 more patients"** with estimated wait time (`~25 mins`).
    - Dynamic animated shimmer loading bar showing queue progression.
    - When the hospital calls the next patient, the screen automatically updates to 4 patients ahead, 20 mins, and advances the bar!
11. **Emergency Medical SOS Rapid Hub**:
    - High-visibility pulsating red SOS button.
    - 1-click broadcast: shares live GPS coordinates, medical profile, alerts nearest trauma center, sounds alarm, and dispatches ambulance with live vehicle number, paramedic contact, and ETA countdown.
    - Emergency first-aid guides (Chest pain Aspirin protocol, Stroke FAST protocol, CPR).
12. **Interactive Doctor Discovery Map**:
    - Leaflet OpenStreetMap with pins for hospitals and clinics.
    - Filter by medical specialty, view consultation fees (e.g., ₹600, ₹850, ₹1000), distance, ratings, and book slots directly on the map.
13. **Smart Medication Schedule & Clinical Guide**:
    - Comprehensive guide detailing **why each medicine is used** and **why it is important for the patient**.
    - "Take Dose" compliance check-off for daily adherence tracking.

---

### 2. 🏥 For Hospitals & Physicians (All 5 Requirements Satisfied)
1. **OPD Appointments & Queue Control Desk**:
    - Real-time overview of today's appointment roster.
    - **"Call Next Patient"** control: advances current token (e.g. from #39 to #40), instantly updating the patient's queue screen in real time.
2. **AI Multi-Report Comparative Diff Generator (Doctor Time Saver)**:
    - Compares patient's report from 10 days ago (03-Oct-2026) vs Today (13-Oct-2026).
    - Generates an **Executive Clinical Briefing** highlighting glycemic normalization, BP stabilization, CRP drop (-82%), and normalized renal clearance so the doctor doesn't have to read through 10 separate historical entries.
    - Comparative side-by-side Chart.js delta bar chart.
3. **Controlled Substance Anti-Abuse Dispensation Counter**:
    - Strict 10-day counter for sedative/narcotic medications (e.g., *Zolpidem Tartrate 10mg Sleeping Pill*).
    - Once 10 days are dispensed, status changes to **LOCKED**.
    - Prevents patients from claiming incomplete courses or re-purchasing controlled drugs to feed addiction.
    - Doctor authorization override required for refilling.
4. **Patient Health Reports & Caregiver Vitals Hub**:
    - Clinical viewing of caregiver logs, lab tests, and flagged abnormalities.
5. **Emergency Fleet & Ambulance Dispatch Command**:
    - Live incoming Code Red alert feed from patients triggering SOS.
    - Paramedic allocation, vehicle tracking, siren dispatch status, and direct two-way emergency call.

---

### 3. 👨‍👩‍👧 For Immediate Family Members (All 4 Requirements Satisfied)
1. **Dedicated View-Only Interface**:
    - Clean, read-only guardian interface preventing accidental data alteration.
2. **Live Patient Status & Reports**:
    - Real-time stream of caregiver vitals (BP, SpO2, Pulse, Blood Glucose) logged by Sister Priya.
    - Latest lab test results and AI health trend summaries.
3. **Synchronized Medicine & Appointment Reminders**:
    - Badges showing taken vs upcoming doses (e.g. *"Metformin taken at 08:40 AM"* vs *"Atorvastatin due at 10:00 PM"*).
    - Upcoming appointment tokens so family can follow up with their loved one.
4. **Trusted Contact Security & KYC Authorization Gate**:
    - Protected by patient-configured **Guardian PIN (`CARE2026`)**.
    - Access is strictly restricted so confidential medical reports cannot reach unauthorized hands.

### 4. 🧭 Universal Back-Navigation System (Added)
- **Universal Breadcrumb & Back Bar**: Appears whenever you enter any sub-feature, showing `[ ← Back ]`, `[ 🏠 Home ]`, and clickable breadcrumbs.
- **Top & Bottom "← Back to Dashboard" buttons**: Placed on every single feature page (Voice AI, OPD Queue, Doctor Map, Prescriptions, Diet Plan, Health Trends, Health Locker, Govt Schemes, Insurance Desk, Care Companion, Emergency SOS).
- **History Tracking (`App.goBack()`)**: Remembers where you were and takes you back to the exact previous view.
- **Browser Native Back / Forward & Keyboard Esc**: Fully supports your browser's Back button and pressing `Esc` on the keyboard to return to the home overview.

---

## 🚀 How to Run the Application

The server is already running on your machine at:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

To run or restart the server manually at any time:
```powershell
python run.py
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in any modern web browser (Google Chrome, Microsoft Edge, Brave, Firefox).

---

## 🧪 Quick Test / Walkthrough Guide

1. **Role Switcher**: Click between **Patient**, **Hospital & Doctor**, and **Family (View-Only)** in the top navigation bar.
2. **Voice AI Assistant**:
   - In Patient view, click the microphone or click quick chips like *"I have chest tightness and pain in left arm"* or type in Hindi *"मुझे सीने में भारीपन है"*.
   - Listen to the spoken voice output and see doctor recommendation with slots for Today, Tomorrow, and Day After!
3. **Real-time Queue Sync**:
   - Open the **Live OPD Queue** tab on the Patient screen (showing Token `#44`, `#39` in cabin, `5 more patients`, `~25 mins`, `50%` loading bar).
   - Switch to the **Hospital & Doctor** role ➔ Click **"Call Next Patient"** (advances to `#40`).
   - Switch back to Patient ➔ Token now reflects `4 more patients`, `~20 mins`, and the loading bar advances!
4. **Doctor Multi-Report Diff**:
   - In Hospital view, click **"AI 10-Day Report Diff"** to view the comparative delta bar chart and executive summary between 03-Oct and 13-Oct.
5. **Anti-Abuse Dispensation Counter**:
   - Check the **Controlled Substance Counter** card showing 10/10 days dispensed for Zolpidem with Refill Locked.
6. **Emergency SOS**:
   - Click the red **EMERGENCY SOS** button in the header or in the tab to trigger ambulance dispatch with live vehicle number, paramedic phone, and countdown ETA.
7. **Family View-Only Mode**:
   - Switch to Family role ➔ Enter PIN `CARE2026` ➔ View live caregiver vitals, medicine adherence badges, and appointment reminders.
