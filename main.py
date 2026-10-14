"""
AarogyaConnect 360 - Unified Healthcare System Server
FastAPI application serving Patients, Hospitals, and Family Members.
"""

import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from app.data_store import db
from app.ai_engine import AIEngine
from app.tts_service import generate_speech_audio

app = FastAPI(
    title="AarogyaConnect 360",
    description="Unified Smart Healthcare System for Patients, Hospitals, and Family Members",
    version="1.0.0"
)

# Ensure static directories exist
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
os.makedirs(STATIC_DIR, exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "uploads"), exist_ok=True)

# Mount static folder
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# ----------------- Root Page -----------------
@app.get("/")
async def root():
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "AarogyaConnect 360 Backend Active"}


# ----------------- General State -----------------
@app.get("/api/state")
async def get_state():
    return db.get_data()


# ----------------- Voice AI & Triage (Patient Req 1 & 2) -----------------
class VoiceTriageRequest(BaseModel):
    text: str
    lang: str = "en"

@app.post("/api/voice/triage")
async def voice_triage(req: VoiceTriageRequest):
    data = db.get_data()
    doctors = data.get("doctors", [])
    analysis = AIEngine.triage_symptoms(req.text, req.lang, doctors)
    
    # Generate MP3 audio URL
    audio_url = generate_speech_audio(analysis["voice_response"], analysis["language"])
    analysis["audio_url"] = audio_url
    return analysis


# ----------------- Appointments & Slots (Patient Req 1 & 12, Hospital Req 1) -----------------
class AppointmentBookingRequest(BaseModel):
    doctor_id: str
    date_slot: str
    time_slot: str
    reason: str

@app.post("/api/patient/appointments/book")
async def book_appointment(req: AppointmentBookingRequest):
    try:
        new_apt = db.book_appointment(req.doctor_id, req.date_slot, req.time_slot, req.reason)
        return {"status": "success", "appointment": new_apt}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ----------------- Live OPD Queue / Token Wait Time (Patient Req 10, Hospital Req 1) -----------------
@app.get("/api/queue")
async def get_queue():
    data = db.get_data()
    q = data["queue_state"]
    patients_ahead = max(0, q["patient_token"] - q["current_token"])
    est_wait_mins = patients_ahead * q["avg_consultation_mins"]
    
    # Progress calculation: e.g. token 35 to 44 represents total range
    total_window = 10
    tokens_served_in_window = max(0, min(total_window, total_window - patients_ahead))
    progress_pct = min(100, int((tokens_served_in_window / total_window) * 100))

    return {
        "current_token": q["current_token"],
        "patient_token": q["patient_token"],
        "patients_ahead": patients_ahead,
        "est_wait_mins": est_wait_mins,
        "progress_pct": progress_pct,
        "doctor_name": q["doctor_name"],
        "room_no": q["room_no"],
        "hospital_name": q["hospital_name"],
        "status": "Your turn now!" if patients_ahead == 0 else f"{patients_ahead} patients ahead in queue"
    }

@app.post("/api/hospital/queue/advance")
async def advance_queue():
    """Hospital OPD desk calls the next patient"""
    updated_q = db.advance_queue()
    return {"status": "success", "queue": updated_q}

@app.post("/api/hospital/queue/reset")
async def reset_queue(current: int = 39, patient: int = 44):
    updated_q = db.reset_queue(current, patient)
    return {"status": "success", "queue": updated_q}


# ----------------- Prescriptions & Anti-Abuse Pharmacy (Patient Req 3 & 13, Hospital Req 3) -----------------
@app.post("/api/patient/prescription/upload")
async def upload_prescription(
    file: Optional[UploadFile] = File(None),
    medications_note: str = Form("Prescribed Medicines for Home Delivery")
):
    file_name = file.filename if file else "Scanned_Prescription_Manual.pdf"
    if file:
        save_path = os.path.join(STATIC_DIR, "uploads", file_name)
        try:
            contents = await file.read()
            with open(save_path, "wb") as f:
                f.write(contents)
        except Exception:
            pass

    items = [item.strip() for item in medications_note.split(",") if item.strip()]
    if not items:
        items = ["Metformin 500mg - 30 Tabs", "Telmisartan 40mg - 30 Tabs"]

    order = db.add_prescription(file_name, items)
    return {"status": "success", "order": order}

@app.post("/api/hospital/prescription/verify")
async def verify_prescription(order_id: str):
    order = db.verify_prescription(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"status": "success", "order": order}

@app.post("/api/hospital/medicines/authorize_refill")
async def authorize_refill(med_id: str, doctor_code: str = "DOC-AUTH-77"):
    med = db.authorize_refill(med_id, doctor_code)
    if not med:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return {"status": "success", "medicine": med}

@app.post("/api/patient/medicines/take")
async def take_medicine(med_id: str, dose_index: int = 0):
    data = db.get_data()
    for med in data["medicines_active"]:
        if med["id"] == med_id and len(med.get("doses_today", [])) > dose_index:
            med["doses_today"][dose_index]["taken"] = True
            med["doses_today"][dose_index]["taken_time"] = "Just now"
            db.save()
            return {"status": "success", "medicine": med}
    raise HTTPException(status_code=404, detail="Dose not found")


# ----------------- Diet Plan & Meal Analysis (Patient Req 4) -----------------
@app.get("/api/patient/diet")
async def get_diet_plan():
    data = db.get_data()
    return data["diet_plan"]

class MealCheckRequest(BaseModel):
    food_name: str

@app.post("/api/patient/diet/check_meal")
async def check_meal(req: MealCheckRequest):
    data = db.get_data()
    patient = data["patient"]
    eval_result = AIEngine.evaluate_food_item(req.food_name, patient["conditions"], patient["allergies"])
    return eval_result


# ----------------- Government Schemes & ABHA / DigiLocker (Patient Req 5) -----------------
@app.get("/api/schemes")
async def get_schemes():
    data = db.get_data()
    return data["government_schemes"]


# ----------------- Insurance Support & Care Companion (Patient Req 6 & 7) -----------------
@app.get("/api/insurance")
async def get_insurance():
    data = db.get_data()
    return data["insurance_support"]

@app.get("/api/care_companion")
async def get_care_companion():
    data = db.get_data()
    return data["care_companion"]

class VitalsLogRequest(BaseModel):
    bp: str
    spo2: str
    pulse: str
    sugar: str
    note: str

@app.post("/api/care_companion/log_vital")
async def log_vital(req: VitalsLogRequest):
    entry = db.add_vitals_entry(req.bp, req.spo2, req.pulse, req.sugar, req.note)
    return {"status": "success", "entry": entry}


# ----------------- Digital Health Locker (Patient Req 8) -----------------
@app.get("/api/health_locker")
async def get_health_locker():
    data = db.get_data()
    return data["digital_health_locker"]

class LockerUploadRequest(BaseModel):
    title: str
    category: str
    doctor: str

@app.post("/api/health_locker/upload")
async def upload_locker_doc(req: LockerUploadRequest):
    new_doc = db.add_health_locker_doc(req.title, req.category, req.doctor, f"{req.title}.pdf")
    return {"status": "success", "document": new_doc}


# ----------------- AI Lab Report Analysis & Diff (Patient Req 9, Hospital Req 2) -----------------
@app.get("/api/reports/trends")
async def get_report_trends():
    data = db.get_data()
    return {
        "trends": data["health_trends_6_months"],
        "latest_report": data["lab_reports_history"][1],
        "summary": "AI Health Trajectory: Your glycemic control has shown continuous improvement over the last 6 months. Fasting blood glucose decreased from 195 mg/dL to 116 mg/dL, and Blood Pressure stabilized at 122/81 mmHg. All vital markers are trending positive!"
    }

@app.get("/api/hospital/reports/diff")
async def get_hospital_report_diff():
    data = db.get_data()
    reports = data.get("lab_reports_history", [])
    if len(reports) < 2:
        raise HTTPException(status_code=400, detail="Insufficient reports for comparison")
    diff = AIEngine.generate_report_differential(reports[0], reports[1])
    return diff


# ----------------- Emergency SOS Rapid Hub (Patient Req 11, Hospital Req 5) -----------------
@app.get("/api/emergency/status")
async def get_emergency_status():
    data = db.get_data()
    return data["emergency_sos"]

class EmergencyTriggerRequest(BaseModel):
    note: Optional[str] = "Cardiac chest pressure & shortness of breath"

@app.post("/api/emergency/trigger")
async def trigger_emergency(req: EmergencyTriggerRequest):
    sos = db.trigger_emergency(req.note or "Emergency Medical Assistance Required")
    return {"status": "dispatched", "sos": sos}

@app.post("/api/emergency/cancel")
async def cancel_emergency():
    sos = db.cancel_emergency()
    return {"status": "cancelled", "sos": sos}


# ----------------- Family Member View-Only Mode (Family Req 1, 2, 3, 4) -----------------
class FamilyAuthRequest(BaseModel):
    access_code: str
    phone: Optional[str] = None

@app.post("/api/family/auth")
async def family_auth(req: FamilyAuthRequest):
    data = db.get_data()
    trusted = data["patient"]["trusted_family"]
    match = next((f for f in trusted if f["access_code"] == req.access_code.strip()), None)
    
    if not match and req.access_code.strip() != data["patient"]["emergency_pin"]:
        raise HTTPException(status_code=403, detail="Invalid Family Access Code. Only patient-authorized immediate family members may view these records.")
    
    # Return secure view-only payload
    return {
        "status": "authenticated",
        "family_member": match or {"name": "Authorized Guardian", "relationship": "Family Member"},
        "patient_summary": {
            "name": data["patient"]["name"],
            "age": data["patient"]["age"],
            "blood_group": data["patient"]["blood_group"],
            "conditions": data["patient"]["conditions"],
            "allergies": data["patient"]["allergies"],
            "abha_id": data["patient"]["abha_id"]
        },
        "live_care_vitals": data["care_companion"]["live_vitals_feed"][-3:],
        "active_medicines": [
            {
                "name": m["name"],
                "timing": m["timing"],
                "why_used": m["why_used"],
                "doses_today": m.get("doses_today", [])
            }
            for m in data["medicines_active"]
        ],
        "upcoming_appointments": data["appointments"],
        "latest_lab_summary": data["lab_reports_history"][1]["metrics"],
        "emergency_status": data["emergency_sos"]["active_alert"]
    }


# ----------------- Server Runner Check -----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
