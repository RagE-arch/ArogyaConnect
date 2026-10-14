"""
AarogyaConnect 360 - Central Data Store & Models
Provides persistent state and realistic Indian healthcare fixture data.
"""

import json
import os
import datetime
from typing import Dict, List, Any, Optional

DATA_FILE = os.path.join(os.path.dirname(__file__), "database_state.json")

# Default seed data
INITIAL_DATA: Dict[str, Any] = {
    "patient": {
        "id": "pat_101",
        "name": "Rahul Verma",
        "age": 48,
        "gender": "Male",
        "blood_group": "B+",
        "phone": "+91 98765 43210",
        "email": "rahul.verma@example.com",
        "address": "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
        "abha_id": "91-4521-8890-1234",
        "abha_address": "rahul.verma@abdm",
        "emergency_pin": "CARE2026",
        "conditions": ["Type 2 Diabetes", "Mild Hypertension"],
        "allergies": ["Penicillin", "Lactose (Dairy)"],
        "trusted_family": [
            {
                "id": "fam_1",
                "name": "Sunita Verma",
                "relationship": "Spouse / Wife",
                "phone": "+91 98765 43211",
                "access_code": "CARE2026",
                "notifications_enabled": True
            },
            {
                "id": "fam_2",
                "name": "Rohan Verma",
                "relationship": "Son",
                "phone": "+91 98765 43212",
                "access_code": "CARE2026",
                "notifications_enabled": True
            }
        ]
    },
    "hospitals": [
        {
            "id": "hosp_1",
            "name": "Apollo Multispeciality Hospital",
            "city": "Bengaluru",
            "address": "154/11, Bannerghatta Main Rd, Opposite IIMB",
            "lat": 12.8988,
            "lng": 77.5998,
            "emergency_phone": "1066 / +91 80 2630 4050",
            "rating": 4.8,
            "departments": ["Cardiology", "Neurology", "Orthopedics", "General Medicine", "Emergency & Trauma"],
            "ambulance_available": 4
        },
        {
            "id": "hosp_2",
            "name": "Fortis Hospital - Cunningham",
            "city": "Bengaluru",
            "address": "14, Cunningham Rd, Vasanth Nagar",
            "lat": 12.9866,
            "lng": 77.5929,
            "emergency_phone": "105010 / +91 80 4015 6666",
            "rating": 4.7,
            "departments": ["Cardiology", "Pulmonology", "Diabetology", "General Medicine"],
            "ambulance_available": 3
        },
        {
            "id": "hosp_3",
            "name": "Manipal Hospital HAL",
            "city": "Bengaluru",
            "address": "98, HAL Old Airport Rd, Kodihalli",
            "lat": 12.9592,
            "lng": 77.6496,
            "emergency_phone": "+91 80 2502 4444",
            "rating": 4.9,
            "departments": ["Cardiology", "Orthopedics", "Emergency Trauma", "Gastroenterology"],
            "ambulance_available": 5
        },
        {
            "id": "hosp_4",
            "name": "Narayana Institute of Cardiac Sciences",
            "city": "Bengaluru",
            "address": "258/A, Bommasandra Industrial Area, Anekal Taluk",
            "lat": 12.8122,
            "lng": 77.6952,
            "emergency_phone": "+91 80 7122 2222",
            "rating": 4.9,
            "departments": ["Cardiology", "Cardiothoracic Surgery", "Vascular Care"],
            "ambulance_available": 6
        }
    ],
    "doctors": [
        {
            "id": "doc_1",
            "name": "Dr. Rajesh Sharma",
            "specialty": "Cardiologist",
            "qualification": "MD, DM (Cardiology), FACC",
            "experience_years": 16,
            "hospital_id": "hosp_1",
            "hospital_name": "Apollo Multispeciality Hospital",
            "consultation_fee": 850,
            "lat": 12.8988,
            "lng": 77.5998,
            "distance_km": 2.4,
            "rating": 4.9,
            "available_slots": {
                "Today": ["10:30 AM", "12:15 PM", "04:30 PM", "06:00 PM"],
                "Tomorrow": ["09:00 AM", "11:00 AM", "03:30 PM", "05:15 PM"],
                "Day After": ["10:00 AM", "01:00 PM", "04:00 PM"],
                "In 3 Days": ["09:30 AM", "11:45 AM", "05:00 PM"]
            }
        },
        {
            "id": "doc_2",
            "name": "Dr. Ananya Iyer",
            "specialty": "General Physician & Diabetologist",
            "qualification": "MBBS, MD (Internal Medicine)",
            "experience_years": 12,
            "hospital_id": "hosp_2",
            "hospital_name": "Fortis Hospital - Cunningham",
            "consultation_fee": 600,
            "lat": 12.9866,
            "lng": 77.5929,
            "distance_km": 3.8,
            "rating": 4.8,
            "available_slots": {
                "Today": ["11:00 AM", "02:30 PM", "05:00 PM"],
                "Tomorrow": ["10:00 AM", "12:30 PM", "04:15 PM", "06:30 PM"],
                "Day After": ["09:00 AM", "11:30 AM", "03:00 PM"],
                "In 3 Days": ["10:15 AM", "02:00 PM", "05:30 PM"]
            }
        },
        {
            "id": "doc_3",
            "name": "Dr. Vikram Malhotra",
            "specialty": "Orthopedic Surgeon",
            "qualification": "MS (Ortho), MCh (Joint Replacement)",
            "experience_years": 19,
            "hospital_id": "hosp_3",
            "hospital_name": "Manipal Hospital HAL",
            "consultation_fee": 1000,
            "lat": 12.9592,
            "lng": 77.6496,
            "distance_km": 4.1,
            "rating": 4.9,
            "available_slots": {
                "Today": ["03:00 PM", "05:30 PM"],
                "Tomorrow": ["10:30 AM", "01:00 PM", "04:30 PM"],
                "Day After": ["11:00 AM", "03:30 PM"],
                "In 3 Days": ["09:00 AM", "12:00 PM", "04:00 PM"]
            }
        },
        {
            "id": "doc_4",
            "name": "Dr. Sneha Patel",
            "specialty": "Neurologist",
            "qualification": "DM (Neurology), NIMHANS Fellow",
            "experience_years": 14,
            "hospital_id": "hosp_1",
            "hospital_name": "Apollo Multispeciality Hospital",
            "consultation_fee": 950,
            "lat": 12.8988,
            "lng": 77.5998,
            "distance_km": 2.4,
            "rating": 4.8,
            "available_slots": {
                "Today": ["01:30 PM", "04:00 PM"],
                "Tomorrow": ["10:00 AM", "02:00 PM", "05:00 PM"],
                "Day After": ["09:30 AM", "12:15 PM"],
                "In 3 Days": ["11:00 AM", "03:45 PM"]
            }
        },
        {
            "id": "doc_5",
            "name": "Dr. Arvind Sen",
            "specialty": "Pulmonologist & Chest Specialist",
            "qualification": "MD (Chest & TB), FCCP",
            "experience_years": 15,
            "hospital_id": "hosp_2",
            "hospital_name": "Fortis Hospital - Cunningham",
            "consultation_fee": 750,
            "lat": 12.9866,
            "lng": 77.5929,
            "distance_km": 3.8,
            "rating": 4.7,
            "available_slots": {
                "Today": ["12:00 PM", "04:45 PM"],
                "Tomorrow": ["09:30 AM", "01:15 PM", "06:00 PM"],
                "Day After": ["10:45 AM", "02:30 PM"],
                "In 3 Days": ["11:30 AM", "04:30 PM"]
            }
        }
    ],
    "queue_state": {
        "current_token": 39,
        "patient_token": 44,
        "doctor_name": "Dr. Rajesh Sharma",
        "doctor_specialty": "Cardiology OPD",
        "room_no": "OPD Cabin 204, 2nd Floor",
        "avg_consultation_mins": 5,
        "hospital_name": "Apollo Multispeciality Hospital",
        "status": "In Progress",
        "last_updated": "2026-10-13T19:05:00"
    },
    "appointments": [
        {
            "id": "apt_1001",
            "patient_id": "pat_101",
            "patient_name": "Rahul Verma",
            "doctor_id": "doc_1",
            "doctor_name": "Dr. Rajesh Sharma",
            "specialty": "Cardiology",
            "hospital_name": "Apollo Multispeciality Hospital",
            "date": "Today, Oct 13",
            "slot": "04:30 PM",
            "token_number": 44,
            "status": "Waiting in OPD Queue",
            "reason": "Cardiac follow-up & Blood Pressure evaluation",
            "fee": 850,
            "payment_status": "Paid (Online)"
        },
        {
            "id": "apt_1002",
            "patient_id": "pat_101",
            "patient_name": "Rahul Verma",
            "doctor_id": "doc_2",
            "doctor_name": "Dr. Ananya Iyer",
            "specialty": "Diabetology",
            "hospital_name": "Fortis Hospital",
            "date": "Oct 18, 2026",
            "slot": "10:00 AM",
            "token_number": 12,
            "status": "Scheduled",
            "reason": "Quarterly HbA1c review & Diet plan tuning",
            "fee": 600,
            "payment_status": "Confirmed"
        }
    ],
    "medicines_active": [
        {
            "id": "med_1",
            "name": "Metformin 500mg",
            "type": "Tablet",
            "dosage": "1 tablet twice daily",
            "timing": "Morning & Night (After Meals)",
            "why_used": "Controls high blood glucose levels by decreasing glucose production in the liver and improving insulin sensitivity.",
            "why_important": "Crucial to prevent severe long-term complications of Diabetes like kidney damage, nerve neuropathy, and diabetic retinopathy.",
            "stock_remaining_days": 18,
            "is_controlled": False,
            "status": "Active",
            "doses_today": [
                {"slot": "08:30 AM", "taken": True, "taken_time": "08:40 AM"},
                {"slot": "08:30 PM", "taken": False, "taken_time": None}
            ]
        },
        {
            "id": "med_2",
            "name": "Telmisartan 40mg",
            "type": "Tablet",
            "dosage": "1 tablet once daily",
            "timing": "Morning (After Breakfast)",
            "why_used": "Angiotensin II receptor blocker that relaxes blood vessels to lower elevated blood pressure.",
            "why_important": "Protects against heart attacks, stroke, and preserves renal function by keeping systemic vascular resistance in safe limits.",
            "stock_remaining_days": 14,
            "is_controlled": False,
            "status": "Active",
            "doses_today": [
                {"slot": "09:00 AM", "taken": True, "taken_time": "09:05 AM"}
            ]
        },
        {
            "id": "med_3",
            "name": "Atorvastatin 10mg",
            "type": "Tablet",
            "dosage": "1 tablet once daily at bedtime",
            "timing": "Night (Bedtime)",
            "why_used": "Statin lipid-lowering agent that inhibits HMG-CoA reductase to reduce LDL (bad cholesterol) and triglycerides.",
            "why_important": "Stabilizes arterial plaques, preventing cardiac blockage and acute coronary events.",
            "stock_remaining_days": 21,
            "is_controlled": False,
            "status": "Active",
            "doses_today": [
                {"slot": "10:00 PM", "taken": False, "taken_time": None}
            ]
        },
        {
            "id": "med_4_controlled",
            "name": "Zolpidem Tartrate 10mg (Sedative/Sleeping Aid)",
            "type": "Controlled Substance - Schedule H1",
            "dosage": "1 tablet at bedtime only as SOS for severe insomnia",
            "timing": "Night (Only as prescribed)",
            "why_used": "Short-acting non-benzodiazepine hypnotic for acute temporary relief of severe sleep disturbance.",
            "why_important": "Prescribed strictly for acute 10-day post-stress therapy. High addiction & dependence risk if misused.",
            "is_controlled": True,
            "course_prescribed_days": 10,
            "course_dispensed_days": 10,
            "dispensation_counter": 10,
            "counter_max": 10,
            "refill_locked": True,
            "lock_reason": "Anti-Abuse Lock: Full 10-day quota has been purchased. Further refills require direct treating physician re-authorization to prevent drug dependence.",
            "authorized_by": "Dr. Rajesh Sharma (Reg: KMC-49210)",
            "first_dispensed_date": "2026-10-03",
            "last_dispensed_date": "2026-10-03",
            "status": "Completed Course - Refill Locked",
            "doses_today": []
        }
    ],
    "prescriptions_orders": [
        {
            "id": "rx_ord_901",
            "patient_name": "Rahul Verma",
            "doctor_name": "Dr. Rajesh Sharma",
            "hospital_name": "Apollo Multispeciality Hospital",
            "upload_date": "2026-10-13 14:20",
            "file_name": "Prescription_Rahul_Oct2026.pdf",
            "items": [
                "Metformin 500mg - 30 Tabs",
                "Telmisartan 40mg - 30 Tabs",
                "Vitamin B12 / Methylcobalamin - 15 Tabs"
            ],
            "hospital_verification_status": "Double Checked & Verified by Apollo Chief Pharmacist (Mr. S. Rao, Reg #KA-3819)",
            "verification_badge": "VERIFIED_SAFE",
            "delivery_status": "Out for Delivery",
            "delivery_address": "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
            "rider_name": "Karthik (Apollo Express Delivery)",
            "eta": "45 mins"
        },
        {
            "id": "rx_ord_902",
            "patient_name": "Rahul Verma",
            "doctor_name": "Dr. Arvind Sen",
            "hospital_name": "Fortis Hospital",
            "upload_date": "2026-10-13 18:30",
            "file_name": "Inhaler_Prescription_Oct13.jpg",
            "items": [
                "Budesonide 200mcg Inhaler - 1 Canister",
                "Levocetirizine 5mg - 10 Tabs"
            ],
            "hospital_verification_status": "Under Dual-Check by Hospital Pharmacy Staff",
            "verification_badge": "PENDING_VERIFICATION",
            "delivery_status": "Pharmacist Review in Progress",
            "delivery_address": "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
            "rider_name": "Unassigned",
            "eta": "Pending Approval"
        }
    ],
    "lab_reports_history": [
        {
            "id": "rep_10_days_ago",
            "title": "Comprehensive Metabolic & Lipid Panel",
            "date": "2026-10-03",
            "days_ago": 10,
            "lab_name": "Apollo Diagnostic Labs Central",
            "metrics": {
                "fasting_blood_sugar": {"value": 174, "unit": "mg/dL", "normal_range": "70 - 100", "status": "High"},
                "post_prandial_sugar": {"value": 242, "unit": "mg/dL", "normal_range": "< 140", "status": "High"},
                "hba1c": {"value": 8.4, "unit": "%", "normal_range": "< 5.7", "status": "High"},
                "blood_pressure_systolic": {"value": 146, "unit": "mmHg", "normal_range": "< 120", "status": "High"},
                "blood_pressure_diastolic": {"value": 94, "unit": "mmHg", "normal_range": "< 80", "status": "High"},
                "wbc_count": {"value": 11400, "unit": "/uL", "normal_range": "4000 - 10000", "status": "Elevated"},
                "crp_inflammatory": {"value": 18.5, "unit": "mg/L", "normal_range": "< 5.0", "status": "High"},
                "serum_creatinine": {"value": 1.25, "unit": "mg/dL", "normal_range": "0.7 - 1.2", "status": "Borderline"},
                "cholesterol_ldl": {"value": 158, "unit": "mg/dL", "normal_range": "< 100", "status": "High"}
            }
        },
        {
            "id": "rep_today",
            "title": "Follow-up Glycemic, Inflammatory & Lipid Panel",
            "date": "2026-10-13",
            "days_ago": 0,
            "lab_name": "Apollo Diagnostic Labs Central",
            "metrics": {
                "fasting_blood_sugar": {"value": 116, "unit": "mg/dL", "normal_range": "70 - 100", "status": "Significantly Improved"},
                "post_prandial_sugar": {"value": 148, "unit": "mg/dL", "normal_range": "< 140", "status": "Near Normal"},
                "hba1c": {"value": 7.1, "unit": "%", "normal_range": "< 5.7", "status": "Improving (Down by 1.3%)"},
                "blood_pressure_systolic": {"value": 122, "unit": "mmHg", "normal_range": "< 120", "status": "Normalized"},
                "blood_pressure_diastolic": {"value": 81, "unit": "mmHg", "normal_range": "< 80", "status": "Normalized"},
                "wbc_count": {"value": 6800, "unit": "/uL", "normal_range": "4000 - 10000", "status": "Normal"},
                "crp_inflammatory": {"value": 3.2, "unit": "mg/L", "normal_range": "< 5.0", "status": "Normal (Inflammation Resolved)"},
                "serum_creatinine": {"value": 0.94, "unit": "mg/dL", "normal_range": "0.7 - 1.2", "status": "Healthy Renal Function"},
                "cholesterol_ldl": {"value": 112, "unit": "mg/dL", "normal_range": "< 100", "status": "Improved by 29%"}
            }
        }
    ],
    "health_trends_6_months": {
        "dates": ["May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026 (Now)"],
        "hba1c": [8.9, 8.7, 8.6, 8.4, 7.8, 7.1],
        "fasting_sugar": [195, 188, 180, 174, 142, 116],
        "systolic_bp": [152, 148, 144, 146, 132, 122],
        "diastolic_bp": [98, 96, 92, 94, 86, 81],
        "wbc": [9800, 10200, 10600, 11400, 8100, 6800]
    },
    "diet_plan": {
        "condition_target": "Type 2 Diabetes & Mild Hypertension Management (Lactose-Free & Low Sodium)",
        "daily_target_calories": 1850,
        "macros": {"carbs": "45%", "protein": "25%", "healthy_fats": "30%"},
        "meals": [
            {
                "time": "08:00 AM",
                "meal": "Breakfast",
                "title": "Moong Dal Cheela with Mint Chutney & Boiled Eggs / Tofu",
                "nutrients": "High Protein, Zero Dairy, Low Glycemic Index (GI: 38)",
                "benefits": "Provides sustained morning energy without glucose spike; rich in dietary fiber and B-complex vitamins."
            },
            {
                "time": "11:30 AM",
                "meal": "Mid-Morning Refreshment",
                "title": "Tender Coconut Water or Sprouted Fenugreek (Methi) Salad with Lime",
                "nutrients": "Rich in Potassium & Magnesium",
                "benefits": "Naturally aids blood pressure regulation and lowers post-meal insulin resistance."
            },
            {
                "time": "01:30 PM",
                "meal": "Lunch",
                "title": "Multigrain Roti (Jowar & Bajra) + Palak Daal + Roasted Bittergourd (Karela) + Cucumber Salad",
                "nutrients": "Low Glycemic, High Soluble Fiber, Low Sodium",
                "benefits": "Karela contains polypeptide-p which acts like natural insulin; spinach replenishes iron and potassium."
            },
            {
                "time": "05:00 PM",
                "meal": "Evening Snack",
                "title": "Roasted Makhana (Foxnuts) with Turmeric & Roasted Chana + Green Tea",
                "nutrients": "Zero Cholesterol, Low Calorie, Anti-inflammatory",
                "benefits": "Curbs evening hunger without disturbing blood pressure."
            },
            {
                "time": "08:00 PM",
                "meal": "Dinner (Light)",
                "title": "Clear Vegetable Soup with Grilled Chicken / Soya Chunks & Steamed Broccoli",
                "nutrients": "High Protein, Low Carbohydrates, Easily Digestible",
                "benefits": "Promotes cellular repair during sleep, eliminates nighttime acid reflux and nocturnal hypoglycemia."
            }
        ],
        "strict_restrictions": [
            "No Dairy Milk, Paneer or Curd (Patient has diagnosed Lactose Allergy). Use Almond milk or Soya milk only.",
            "Limit Table Salt to under 3 grams/day (DASH diet for Hypertension).",
            "Strictly avoid Deep Fried snacks, Samosas, sugary sweets and refined maida.",
            "Avoid Penicillin derivatives (Penicillin allergy on file)."
        ]
    },
    "government_schemes": {
        "ayushman_bharat": {
            "name": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
            "coverage": "₹5,00,000 per family per year for secondary & tertiary hospitalization",
            "eligibility_status": "Eligible (SECC Family Code: KA-BLR-8921)",
            "benefits": [
                "100% Cashless treatments in 27,000+ empanelled public & private hospitals",
                "Covers 1,949 medical procedures including cardiac stenting, bypass, oncology, joint replacement",
                "Pre & Post hospitalization expenses covered for 3 and 15 days respectively"
            ],
            "empanelled_nearby_hospitals": ["Apollo Bannerghatta", "Manipal HAL", "Victoria Government Hospital"]
        },
        "abha_account": {
            "name": "Ayushman Bharat Health Account (ABHA)",
            "abha_number": "91-4521-8890-1234",
            "abha_address": "rahul.verma@abdm",
            "qr_code_content": "ABHA:91-4521-8890-1234|NAME:Rahul Verma|DOB:1978-05-14|GENDER:M|B+:BLR",
            "status": "Active & Verified via Aadhaar",
            "linked_records": 12,
            "consent_manager": "ABDM National Health Authority"
        },
        "digilocker": {
            "status": "Connected & Synced",
            "last_synced": "2026-10-13 18:00",
            "documents": [
                {"name": "COVID-19 Booster Vaccination Certificate", "issuer": "CoWIN / Ministry of Health", "doc_id": "COV-99281-KA"},
                {"name": "Aadhaar Health Profile Card", "issuer": "UIDAI", "doc_id": "UIDAI-XXXX-1234"},
                {"name": "Ayushman PM-JAY Golden e-Card", "issuer": "National Health Authority", "doc_id": "PMJAY-KA-991204"}
            ]
        }
    },
    "insurance_support": {
        "policy_number": "STAR-HLTH-FLOATER-992182",
        "provider": "Star Health & Allied Insurance",
        "sum_insured": "₹15,00,000",
        "claim_status": "Pre-Authorization Approved (Cashless ₹1,50,000)",
        "human_agent": {
            "name": "Aakash Verma",
            "designation": "Senior TPA & Insurance Desk Advocate",
            "agent_id": "TPA-AGNT-440",
            "phone": "+91 80 4910 8820",
            "photo": "/static/img/agent_aakash.jpg",
            "availability": "Online Now - Ready to assist with Hospital Desk & Discharge billing",
            "status": "Active Session"
        },
        "paperwork_checklist": [
            {"item": "Doctor's Consultation & Admission Note", "status": "Verified & Uploaded"},
            {"item": "Detailed Itemized Pharmacy Bills", "status": "Verified & Uploaded"},
            {"item": "Diagnostic Reports (Blood & ECG)", "status": "Verified & Uploaded"},
            {"item": "KYC & Aadhaar Verification", "status": "Complete via DigiLocker"}
        ]
    },
    "care_companion": {
        "status": "Assigned & Active On-Duty",
        "agent_name": "Sister Priya Nair",
        "qualification": "Certified Clinical Caregiver & GNM Staff Nurse",
        "agent_id": "CARE-NURSE-708",
        "phone": "+91 94470 12890",
        "rating": 4.9,
        "avatar": "/static/img/nurse_priya.jpg",
        "shift_hours": "08:00 AM - 08:00 PM",
        "notes": "Accompanying patient at home while spouse is out of town. Assisted in morning medication adherence and low-GI breakfast.",
        "live_vitals_feed": [
            {"time": "08:30 AM", "bp": "122/80 mmHg", "spo2": "99%", "pulse": "74 bpm", "sugar": "116 mg/dL", "condition": "Stable & Alert"},
            {"time": "12:30 PM", "bp": "120/78 mmHg", "spo2": "98%", "pulse": "72 bpm", "sugar": "138 mg/dL (Post-lunch)", "condition": "Normal, Patient rested"},
            {"time": "05:15 PM", "bp": "124/82 mmHg", "spo2": "99%", "pulse": "76 bpm", "sugar": "N/A", "condition": "Active, 20-min evening garden stroll"}
        ],
        "reporting_recipients": ["Apollo Multispeciality OPD Desk", "Sunita Verma (Wife)", "Rohan Verma (Son)"]
    },
    "digital_health_locker": [
        {
            "id": "doc_101",
            "title": "Discharge Summary - Cardiac Stent Observation",
            "category": "Discharge Summary",
            "doctor": "Dr. Rajesh Sharma",
            "hospital": "Apollo Multispeciality Hospital",
            "date": "2026-08-22",
            "file_size": "2.4 MB",
            "type": "PDF",
            "verified": True
        },
        {
            "id": "doc_102",
            "title": "Comprehensive Blood & Lipid Profile (Oct 13)",
            "category": "Lab Report",
            "doctor": "Apollo Diagnostic Pathology",
            "hospital": "Apollo Labs",
            "date": "2026-10-13",
            "file_size": "1.1 MB",
            "type": "PDF",
            "verified": True
        },
        {
            "id": "doc_103",
            "title": "Baseline 12-Lead Resting ECG Report",
            "category": "Diagnostic Scan",
            "doctor": "Dr. Rajesh Sharma",
            "hospital": "Apollo Multispeciality",
            "date": "2026-10-03",
            "file_size": "850 KB",
            "type": "PDF",
            "verified": True
        },
        {
            "id": "doc_104",
            "title": "Hospital IPD Cashless Settlement Bill",
            "category": "Hospital Bill",
            "doctor": "Billing & TPA Operations",
            "hospital": "Apollo Multispeciality",
            "date": "2026-08-24",
            "file_size": "1.8 MB",
            "type": "PDF",
            "verified": True
        }
    ],
    "emergency_sos": {
        "active_alert": False,
        "last_sos_time": None,
        "patient_location": {"lat": 12.9250, "lng": 77.6838, "address": "Bellandur Outer Ring Rd, Bengaluru"},
        "nearest_er_hospital": "Apollo Multispeciality Hospital (Bannerghatta)",
        "ambulance_status": "Standby Ready",
        "ambulance_vehicle_no": "KA-01-GA-1088",
        "paramedic_name": "Suresh Gowda",
        "paramedic_phone": "+91 99001 23456",
        "dispatched": False,
        "eta_minutes": 8
    }
}


class DataStore:
    def __init__(self):
        self.data: Dict[str, Any] = {}
        self.load()

    def load(self):
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    self.data = json.load(f)
                    return
            except Exception as e:
                print(f"Error loading state file: {e}. Reverting to seed data.")
        self.data = json.loads(json.dumps(INITIAL_DATA))
        self.save()

    def save(self):
        try:
            with open(DATA_FILE, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Failed to persist state: {e}")

    def get_data(self) -> Dict[str, Any]:
        return self.data

    # Helper getters & mutations
    def advance_queue(self) -> Dict[str, Any]:
        """Hospital advances OPD Token (e.g. from 39 to 40)"""
        q = self.data["queue_state"]
        q["current_token"] += 1
        q["last_updated"] = datetime.datetime.now().isoformat()
        self.save()
        return q

    def reset_queue(self, current: int = 39, patient: int = 44) -> Dict[str, Any]:
        q = self.data["queue_state"]
        q["current_token"] = current
        q["patient_token"] = patient
        q["last_updated"] = datetime.datetime.now().isoformat()
        self.save()
        return q

    def trigger_emergency(self, note: str = "Severe Chest Pain & Shortness of Breath") -> Dict[str, Any]:
        sos = self.data["emergency_sos"]
        sos["active_alert"] = True
        sos["dispatched"] = True
        sos["last_sos_time"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        sos["ambulance_status"] = "Dispatched - En Route with Sirens Active"
        sos["alert_note"] = note
        self.save()
        return sos

    def cancel_emergency(self) -> Dict[str, Any]:
        sos = self.data["emergency_sos"]
        sos["active_alert"] = False
        sos["dispatched"] = False
        sos["ambulance_status"] = "Standby Ready"
        self.save()
        return sos

    def verify_prescription(self, order_id: str) -> Optional[Dict[str, Any]]:
        for ord in self.data["prescriptions_orders"]:
            if ord["id"] == order_id:
                ord["hospital_verification_status"] = "Double Checked & Verified by Apollo Chief Pharmacist (Mr. S. Rao, Reg #KA-3819)"
                ord["verification_badge"] = "VERIFIED_SAFE"
                ord["delivery_status"] = "Dispatched for Home Delivery"
                ord["rider_name"] = "Karthik (Apollo Express Delivery)"
                ord["eta"] = "35 mins"
                self.save()
                return ord
        return None

    def add_prescription(self, file_name: str, items: List[str]) -> Dict[str, Any]:
        new_id = f"rx_ord_{len(self.data['prescriptions_orders']) + 901}"
        new_order = {
            "id": new_id,
            "patient_name": self.data["patient"]["name"],
            "doctor_name": "Attending Physician / Uploaded Rx",
            "hospital_name": "Apollo Multispeciality Hospital",
            "upload_date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "file_name": file_name,
            "items": items,
            "hospital_verification_status": "Under Dual-Check by Hospital Pharmacy Staff",
            "verification_badge": "PENDING_VERIFICATION",
            "delivery_status": "Pharmacist Review in Progress",
            "delivery_address": self.data["patient"]["address"],
            "rider_name": "Unassigned",
            "eta": "Awaiting Verification"
        }
        self.data["prescriptions_orders"].insert(0, new_order)
        self.save()
        return new_order

    def authorize_refill(self, med_id: str, doctor_code: str = "DOC-AUTH-77") -> Optional[Dict[str, Any]]:
        for med in self.data["medicines_active"]:
            if med["id"] == med_id:
                med["refill_locked"] = False
                med["dispensation_counter"] = 0
                med["status"] = "Refill Authorized by Physician"
                med["authorization_code"] = doctor_code
                self.save()
                return med
        return None

    def book_appointment(self, doctor_id: str, date_slot: str, time_slot: str, reason: str) -> Dict[str, Any]:
        doc = next((d for d in self.data["doctors"] if d["id"] == doctor_id), None)
        if not doc:
            raise ValueError("Doctor not found")
        new_token = self.data["queue_state"]["patient_token"] + 1
        new_apt = {
            "id": f"apt_{len(self.data['appointments']) + 1001}",
            "patient_id": self.data["patient"]["id"],
            "patient_name": self.data["patient"]["name"],
            "doctor_id": doc["id"],
            "doctor_name": doc["name"],
            "specialty": doc["specialty"],
            "hospital_name": doc["hospital_name"],
            "date": date_slot,
            "slot": time_slot,
            "token_number": new_token,
            "status": "Confirmed & Queued",
            "reason": reason,
            "fee": doc["consultation_fee"],
            "payment_status": "Confirmed"
        }
        self.data["appointments"].append(new_apt)
        self.save()
        return new_apt

    def add_vitals_entry(self, bp: str, spo2: str, pulse: str, sugar: str, note: str) -> Dict[str, Any]:
        entry = {
            "time": datetime.datetime.now().strftime("%I:%M %p"),
            "bp": bp,
            "spo2": spo2,
            "pulse": pulse,
            "sugar": sugar,
            "condition": note
        }
        self.data["care_companion"]["live_vitals_feed"].append(entry)
        self.save()
        return entry

    def add_health_locker_doc(self, title: str, category: str, doctor: str, file_name: str) -> Dict[str, Any]:
        new_doc = {
            "id": f"doc_{len(self.data['digital_health_locker']) + 101}",
            "title": title,
            "category": category,
            "doctor": doctor,
            "hospital": "Verified Medical Center",
            "date": datetime.datetime.now().strftime("%Y-%m-%d"),
            "file_size": "1.4 MB",
            "type": "PDF",
            "verified": True
        }
        self.data["digital_health_locker"].append(new_doc)
        self.save()
        return new_doc


db = DataStore()
