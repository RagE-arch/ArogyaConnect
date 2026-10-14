/**
 * AarogyaConnect 360 - Emergency SOS Hub & Trauma Vehicle Dispatch System
 * Satisfies Patient Req 11 & Hospital Req 5
 */

const EmergencyHub = {
  sosActive: false,
  etaCountdownTimer: null,
  currentEtaMinutes: 8,

  init(state) {
    if (state && state.emergency_sos) {
      this.sosActive = state.emergency_sos.active_alert;
      this.renderEmergencyUI(state.emergency_sos);
    }
  },

  async triggerEmergencySOS() {
    try {
      const res = await fetch('/api/emergency/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: "Patient pressed Emergency SOS - Immediate cardiac/trauma response required" })
      });
      const data = await res.json();
      if (data.status === 'dispatched') {
        this.sosActive = true;
        this.currentEtaMinutes = data.sos.eta_minutes || 8;
        this.startEtaCountdown();
        this.playEmergencyBeep();
        App.showToast("🚨 EMERGENCY SOS BROADCASTED! Ambulance dispatched and hospital trauma team alerted.", "error");
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Failed to trigger SOS", "error");
    }
  },

  async cancelEmergencySOS() {
    try {
      const res = await fetch('/api/emergency/cancel', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'cancelled') {
        this.sosActive = false;
        clearInterval(this.etaCountdownTimer);
        App.showToast("Emergency SOS has been resolved and cancelled.", "info");
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Failed to cancel SOS", "error");
    }
  },

  renderEmergencyUI(sos) {
    const banner = document.getElementById('emergency-live-dispatch-banner');
    const hospitalSosCard = document.getElementById('hospital-emergency-trauma-card');

    if (banner) {
      if (sos.active_alert) {
        banner.classList.remove('hidden');
        banner.innerHTML = `
          <div class="p-5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl shadow-xl border-2 border-red-300 animate-pulse space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 rounded-full bg-white animate-ping"></span>
                <span class="font-black text-sm uppercase tracking-wider">AMBULANCE DISPATCHED & EN ROUTE</span>
              </div>
              <button onclick="EmergencyHub.cancelEmergencySOS()" class="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold backdrop-blur-sm">
                Cancel Alert
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black/20 p-3 rounded-xl text-xs backdrop-blur-sm">
              <div>
                <span class="text-red-200">Vehicle Assigned:</span>
                <div class="font-bold text-sm text-white">${sos.ambulance_vehicle_no} (ICU Mobile)</div>
              </div>
              <div>
                <span class="text-red-200">Paramedic In-Charge:</span>
                <div class="font-bold text-sm text-white">${sos.paramedic_name} (<a href="tel:${sos.paramedic_phone}" class="underline">${sos.paramedic_phone}</a>)</div>
              </div>
              <div>
                <span class="text-red-200">Estimated Arrival (ETA):</span>
                <div class="font-black text-lg text-amber-300" id="ambulance-eta-display">${this.currentEtaMinutes} Minutes</div>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs text-red-100 pt-1">
              <span>Destination: <strong>${sos.nearest_er_hospital}</strong></span>
              <span>GPS Location: <strong>${sos.patient_location.address}</strong></span>
            </div>
          </div>
        `;
      } else {
        banner.classList.add('hidden');
      }
    }

    if (hospitalSosCard) {
      if (sos.active_alert) {
        hospitalSosCard.innerHTML = `
          <div class="p-5 bg-red-50 border-2 border-red-500 rounded-2xl shadow-md space-y-3">
            <div class="flex items-center justify-between">
              <span class="badge-pill bg-red-600 text-white text-xs font-bold animate-pulse">
                🚨 CODE RED: ACTIVE PATIENT SOS
              </span>
              <span class="text-xs font-mono font-bold text-red-800">${sos.last_sos_time}</span>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-base">Patient: Rahul Verma (Age 48, B+)</h4>
              <p class="text-xs text-red-700 font-semibold">Location: ${sos.patient_location.address}</p>
            </div>
            <div class="bg-white p-3 rounded-xl border border-red-200 text-xs space-y-1">
              <div>• Dispatched Vehicle: <strong>${sos.ambulance_vehicle_no}</strong></div>
              <div>• Paramedic: <strong>${sos.paramedic_name}</strong> (${sos.paramedic_phone})</div>
              <div>• ETA to Destination: <strong>${this.currentEtaMinutes} mins</strong></div>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <a href="tel:${sos.paramedic_phone}" class="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg text-xs font-bold transition">
                📞 Call Paramedic
              </a>
              <button onclick="EmergencyHub.cancelEmergencySOS()" class="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                Clear SOS
              </button>
            </div>
          </div>
        `;
      } else {
        hospitalSosCard.innerHTML = `
          <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
            <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 class="font-bold text-slate-800 text-sm">Emergency Fleet On Standby</h4>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">No active emergency calls right now. 4 Advanced Cardiac Life Support (ACLS) ambulances are stationed ready for dispatch.</p>
          </div>
        `;
      }
    }
  },

  startEtaCountdown() {
    clearInterval(this.etaCountdownTimer);
    this.etaCountdownTimer = setInterval(() => {
      if (this.currentEtaMinutes > 1) {
        this.currentEtaMinutes -= 1;
        const el = document.getElementById('ambulance-eta-display');
        if (el) el.innerText = `${this.currentEtaMinutes} Minutes`;
      }
    }, 60000);
  },

  playEmergencyBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
      }, 700);
    } catch (e) {
      console.warn("AudioContext tone error:", e);
    }
  }
};
