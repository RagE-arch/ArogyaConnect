/**
 * AarogyaConnect 360 - Pharmacy, Prescriptions & Anti-Abuse Counter System
 * Satisfies Patient Req 3 & 13, Hospital Req 3
 */

const PharmacyManager = {
  prescriptions: [],
  medicines: [],

  init(state) {
    if (state) {
      this.prescriptions = state.prescriptions_orders || [];
      this.medicines = state.medicines_active || [];
      this.renderPrescriptionOrders();
      this.renderMedicineReminders();
      this.renderControlledMedTracker();
      this.renderHospitalPrescriptionVerificationList();
    }
  },

  renderPrescriptionOrders() {
    const listEl = document.getElementById('patient-prescriptions-list');
    if (!listEl) return;

    if (this.prescriptions.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-slate-400">No prescriptions uploaded yet.</div>`;
      return;
    }

    listEl.innerHTML = this.prescriptions.map(order => {
      const isVerified = order.verification_badge === 'VERIFIED_SAFE';
      return `
        <div class="p-4 bg-white rounded-xl border ${isVerified ? 'border-emerald-200 shadow-sm' : 'border-amber-200'} space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-xs font-mono text-slate-400">#${order.id} • ${order.upload_date}</span>
              <h4 class="font-bold text-slate-800 text-sm mt-0.5">${order.file_name}</h4>
              <p class="text-xs text-slate-500">${order.hospital_name}</p>
            </div>
            <span class="badge-pill ${isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} text-xs">
              ${isVerified ? '✓ Verified Safe by Staff' : '⏳ Dual-Check Pending'}
            </span>
          </div>

          <!-- Items in Rx -->
          <div class="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
            <div class="font-bold text-slate-600 mb-1">Prescribed Medicines:</div>
            ${order.items.map(item => `<div class="text-slate-700 font-medium">• ${item}</div>`).join('')}
          </div>

          <!-- Hospital Staff Double-Check Status -->
          <div class="p-2.5 rounded-lg text-xs ${isVerified ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-amber-50 text-amber-800 border border-amber-100'}">
            <div class="font-bold mb-0.5">Hospital Staff Review:</div>
            <p>${order.hospital_verification_status}</p>
          </div>

          <!-- Delivery Status -->
          <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span class="text-slate-600 font-medium">
              Delivery: <strong class="text-slate-800">${order.delivery_status}</strong> (${order.eta})
            </span>
            <span class="text-slate-500">Rider: ${order.rider_name}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  renderMedicineReminders() {
    const listEl = document.getElementById('patient-medicines-reminders-list');
    if (!listEl) return;

    listEl.innerHTML = this.medicines.map((med, medIdx) => {
      const isControlled = med.is_controlled;
      return `
        <div class="p-5 bg-white rounded-xl border ${isControlled ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'} shadow-sm space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-900 text-base">${med.name}</h4>
                ${isControlled ? `<span class="badge-pill bg-red-100 text-red-800 text-[10px]">Controlled Sub.</span>` : ''}
              </div>
              <p class="text-xs font-semibold text-sky-600 mt-0.5">${med.dosage} • ${med.timing}</p>
            </div>
            <span class="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Stock: ${med.stock_remaining_days || med.course_dispensed_days} Days
            </span>
          </div>

          <!-- Why it is used & Why it is important (Requirement 13) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div class="p-3 bg-sky-50/60 rounded-lg border border-sky-100">
              <strong class="text-sky-900 block mb-1">💡 Why it is used:</strong>
              <p class="text-slate-700 leading-relaxed">${med.why_used}</p>
            </div>
            <div class="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
              <strong class="text-emerald-900 block mb-1">⭐ Why it is important for you:</strong>
              <p class="text-slate-700 leading-relaxed">${med.why_important}</p>
            </div>
          </div>

          <!-- Today's Dose Compliance -->
          ${(med.doses_today || []).length > 0 ? `
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Today's Schedule:</span>
              <div class="flex items-center gap-2">
                ${med.doses_today.map((dose, dIdx) => `
                  <button onclick="PharmacyManager.takeDose('${med.id}', ${dIdx})" class="px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${dose.taken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 hover:bg-emerald-600 hover:text-white'}">
                    ${dose.taken ? '✓ Taken' : '💊 Take Dose'} (${dose.slot})
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  },

  renderControlledMedTracker() {
    const controlledMed = this.medicines.find(m => m.is_controlled);
    const container = document.getElementById('anti-abuse-controlled-card');
    if (!container || !controlledMed) return;

    container.innerHTML = `
      <div class="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="p-2 rounded-lg bg-amber-500 text-white font-bold text-sm">🔒</span>
            <div>
              <h4 class="font-extrabold text-slate-900 text-base">${controlledMed.name}</h4>
              <p class="text-xs font-semibold text-amber-800">Anti-Addiction Dispensation Safeguard Counter</p>
            </div>
          </div>
          <span class="badge-pill ${controlledMed.refill_locked ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-emerald-100 text-emerald-800'} text-xs font-bold">
            ${controlledMed.refill_locked ? '⛔ REFILL LOCKED' : '✓ REFILL AUTHORIZED'}
          </span>
        </div>

        <div class="bg-white p-4 rounded-xl border border-amber-200 space-y-3">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Prescribed Course: ${controlledMed.course_prescribed_days} Days</span>
            <span class="text-amber-700">Dispensed Counter: ${controlledMed.dispensation_counter} / ${controlledMed.counter_max} Days</span>
          </div>

          <!-- Counter Progress -->
          <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div class="bg-red-500 h-full rounded-full transition-all" style="width: ${(controlledMed.dispensation_counter / controlledMed.counter_max) * 100}%"></div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed font-medium">
            <strong>Clinical Safety Protocol:</strong> ${controlledMed.lock_reason}
          </p>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500">
          <span>Authorized by: <strong>${controlledMed.authorized_by}</strong></span>
          <span>Last Dispensed: <strong>${controlledMed.last_dispensed_date}</strong></span>
        </div>
      </div>
    `;
  },

  renderHospitalPrescriptionVerificationList() {
    const hospList = document.getElementById('hosp-prescriptions-verify-list');
    if (!hospList) return;

    hospList.innerHTML = this.prescriptions.map(order => {
      const isVerified = order.verification_badge === 'VERIFIED_SAFE';
      return `
        <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-bold text-slate-900 text-sm">${order.patient_name}</h5>
              <p class="text-xs text-slate-500">${order.file_name} • Uploaded at ${order.upload_date}</p>
            </div>
            <span class="badge-pill ${isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} text-xs">
              ${order.verification_badge}
            </span>
          </div>

          <div class="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
            <span class="font-semibold text-slate-600">Prescribed Items:</span>
            ${order.items.map(i => `<div class="text-slate-800 font-medium">• ${i}</div>`).join('')}
          </div>

          <div class="pt-2 flex items-center justify-between">
            <span class="text-xs text-slate-600">Destination: ${order.delivery_address}</span>
            ${!isVerified ? `
              <button onclick="PharmacyManager.verifyPrescriptionByHospital('${order.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition">
                ✓ Double-Check & Approve Delivery
              </button>
            ` : `
              <span class="text-xs font-bold text-emerald-700">✓ Staff Verified & Dispatched</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  async uploadPrescriptionForm(event) {
    event.preventDefault();
    const fileInput = document.getElementById('rx-file-upload');
    const medsInput = document.getElementById('rx-medications-text');

    const formData = new FormData();
    if (fileInput && fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
    }
    formData.append('medications_note', medsInput ? medsInput.value : 'Prescription meds');

    try {
      const res = await fetch('/api/patient/prescription/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast("Prescription uploaded! Sent to hospital staff for double-checking.", "success");
        if (medsInput) medsInput.value = '';
        if (fileInput) fileInput.value = '';
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Failed to upload prescription", "error");
    }
  },

  async verifyPrescriptionByHospital(orderId) {
    try {
      const res = await fetch(`/api/hospital/prescription/verify?order_id=${orderId}`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast(`Prescription #${orderId} verified by hospital pharmacist and dispatched for home delivery.`, 'success');
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Verification failed", "error");
    }
  },

  async takeDose(medId, doseIndex) {
    try {
      const res = await fetch(`/api/patient/medicines/take?med_id=${medId}&dose_index=${doseIndex}`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast("Dose marked as taken! Updated on family & hospital monitors.", "success");
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Failed to update dose status", "error");
    }
  },

  async hospitalAuthorizeRefill() {
    const code = prompt("Enter Treating Doctor Authorization Code (e.g. DOC-AUTH-77):", "DOC-AUTH-77");
    if (!code) return;

    try {
      const res = await fetch(`/api/hospital/medicines/authorize_refill?med_id=med_4_controlled&doctor_code=${encodeURIComponent(code)}`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast("Controlled medicine refill authorized by physician.", "success");
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Authorization failed", "error");
    }
  }
};
