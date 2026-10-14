/**
 * AarogyaConnect 360 - Patient Immediate Family Member (View-Only Portal)
 * Satisfies Family Reqs 1, 2, 3, 4
 */

const FamilyManager = {
  authenticatedData: null,

  async authenticate(accessCode) {
    const code = accessCode || document.getElementById('family-pin-input')?.value;
    if (!code) {
      App.showToast("Please enter your Family Access PIN", "warning");
      return;
    }

    try {
      const res = await fetch('/api/family/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_code: code.trim() })
      });

      if (!res.ok) {
        const err = await res.json();
        App.showToast(err.detail || "Access Denied: Unrecognized Family Access Code.", "error");
        return;
      }

      this.authenticatedData = await res.json();
      App.showToast(`Welcome ${this.authenticatedData.family_member.name}! Secure View-Only mode unlocked.`, "success");
      this.renderGuardianDashboard();
    } catch (e) {
      App.showToast("Authentication server error", "error");
    }
  },

  renderGuardianDashboard() {
    const gateCard = document.getElementById('family-auth-gate');
    const dashboard = document.getElementById('family-view-dashboard');

    if (gateCard) gateCard.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');

    const data = this.authenticatedData;
    if (!data) return;

    // Family member greeting
    const greetingEl = document.getElementById('family-guardian-name');
    if (greetingEl) {
      greetingEl.innerText = `${data.family_member.name} (${data.family_member.relationship})`;
    }

    // Patient profile badge
    const profileEl = document.getElementById('family-patient-badge');
    if (profileEl && data.patient_summary) {
      const p = data.patient_summary;
      profileEl.innerHTML = `
        <div class="p-4 bg-sky-50 rounded-xl border border-sky-200">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-slate-900 text-base">${p.name}</h4>
              <p class="text-xs text-slate-500">Age: ${p.age} • Blood: ${p.blood_group} • ABHA: ${p.abha_id}</p>
            </div>
            <span class="badge-pill bg-sky-100 text-sky-800 text-xs">View-Only Mode</span>
          </div>
          <div class="mt-2 text-xs text-slate-600 flex flex-wrap gap-2">
            <span class="px-2 py-0.5 rounded bg-white border border-slate-200">Conditions: ${p.conditions.join(', ')}</span>
            <span class="px-2 py-0.5 rounded bg-white border border-slate-200 text-red-600 font-semibold">Allergies: ${p.allergies.join(', ')}</span>
          </div>
        </div>
      `;
    }

    // Live Caregiver Vitals Feed
    const vitalsFeedEl = document.getElementById('family-vitals-feed');
    if (vitalsFeedEl && data.live_care_vitals) {
      vitalsFeedEl.innerHTML = data.live_care_vitals.map(v => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-700">${v.time} Log by Sister Priya</span>
            <span class="badge-pill bg-emerald-100 text-emerald-800 text-[10px]">Normal & Stable</span>
          </div>
          <div class="grid grid-cols-4 gap-2 pt-1 font-mono text-slate-800">
            <div>BP: <strong class="text-slate-900">${v.bp}</strong></div>
            <div>SpO2: <strong class="text-emerald-700">${v.spo2}</strong></div>
            <div>Pulse: <strong class="text-sky-700">${v.pulse}</strong></div>
            <div>Sugar: <strong class="text-slate-900">${v.sugar}</strong></div>
          </div>
          <p class="text-slate-500 text-[11px] pt-0.5">Note: ${v.condition}</p>
        </div>
      `).join('');
    }

    // Medicine Reminders for Family
    const medsListEl = document.getElementById('family-meds-reminders-list');
    if (medsListEl && data.active_medicines) {
      medsListEl.innerHTML = data.active_medicines.map(m => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <div>
            <h5 class="font-bold text-slate-900">${m.name}</h5>
            <p class="text-[11px] text-slate-500">${m.timing}</p>
          </div>
          <div class="flex items-center gap-1.5">
            ${(m.doses_today || []).map(d => `
              <span class="px-2 py-0.5 rounded font-bold text-[10px] ${d.taken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                ${d.taken ? `✓ Taken (${d.taken_time})` : `⏳ Due at ${d.slot}`}
              </span>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // Appointments for Family
    const aptsListEl = document.getElementById('family-appointments-list');
    if (aptsListEl && data.upcoming_appointments) {
      aptsListEl.innerHTML = data.upcoming_appointments.map(a => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-slate-900">${a.doctor_name} (${a.specialty})</h5>
            <span class="font-bold text-sky-700">Token #${a.token_number}</span>
          </div>
          <p class="text-[11px] text-slate-500">${a.hospital_name} • ${a.date} at ${a.slot}</p>
          <span class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">${a.status}</span>
        </div>
      `).join('');
    }

    // Latest lab metrics summary
    const labEl = document.getElementById('family-lab-summary');
    if (labEl && data.latest_lab_summary) {
      const l = data.latest_lab_summary;
      labEl.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-slate-500 block text-[11px]">Fasting Sugar</span>
            <strong class="text-emerald-700 text-sm">${l.fasting_blood_sugar.value} mg/dL</strong>
          </div>
          <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-slate-500 block text-[11px]">HbA1c Level</span>
            <strong class="text-emerald-700 text-sm">${l.hba1c.value}%</strong>
          </div>
          <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-slate-500 block text-[11px]">Blood Pressure</span>
            <strong class="text-emerald-700 text-sm">${l.blood_pressure_systolic.value}/${l.blood_pressure_diastolic.value}</strong>
          </div>
          <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-slate-500 block text-[11px]">CRP (Inflammation)</span>
            <strong class="text-emerald-700 text-sm">${l.crp_inflammatory.value} mg/L</strong>
          </div>
        </div>
      `;
    }
  },

  lockBack() {
    this.authenticatedData = null;
    const gateCard = document.getElementById('family-auth-gate');
    const dashboard = document.getElementById('family-view-dashboard');
    if (gateCard) gateCard.classList.remove('hidden');
    if (dashboard) dashboard.classList.add('hidden');
  }
};
