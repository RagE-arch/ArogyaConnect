/**
 * AarogyaConnect 360 - Real-Time OPD Token Queue & Wait-Time Tracker
 * Satisfies Patient Req 10 & Hospital Req 1
 */

const QueueManager = {
  pollingInterval: null,

  init() {
    this.fetchQueueStatus();
    // Poll every 3 seconds for live updates between Hospital & Patient
    if (!this.pollingInterval) {
      this.pollingInterval = setInterval(() => {
        this.fetchQueueStatus();
      }, 3000);
    }
  },

  async fetchQueueStatus() {
    try {
      const res = await fetch('/api/queue');
      const data = await res.json();
      this.renderQueueUI(data);
    } catch (err) {
      console.warn("Failed to fetch queue status:", err);
    }
  },

  renderQueueUI(q) {
    // 1. Patient Queue Card Elements
    const patientTokenEl = document.getElementById('queue-patient-token');
    const currentTokenEl = document.getElementById('queue-current-token');
    const patientsAheadEl = document.getElementById('queue-patients-ahead');
    const estWaitEl = document.getElementById('queue-est-wait');
    const progressBarEl = document.getElementById('queue-progress-bar');
    const progressPercentEl = document.getElementById('queue-progress-percent');
    const doctorRoomEl = document.getElementById('queue-doctor-room');
    const queueStatusBannerEl = document.getElementById('queue-status-banner');

    if (patientTokenEl) patientTokenEl.innerText = `#${q.patient_token}`;
    if (currentTokenEl) currentTokenEl.innerText = `#${q.current_token}`;
    
    if (patientsAheadEl) {
      if (q.patients_ahead === 0) {
        patientsAheadEl.innerHTML = `<span class="text-emerald-600 font-bold">🎉 It's your turn right now! Please enter the cabin.</span>`;
      } else if (q.patients_ahead === 1) {
        patientsAheadEl.innerHTML = `<span class="text-amber-600 font-bold">⚠️ You are NEXT! (1 patient ahead - please be ready outside the room)</span>`;
      } else {
        patientsAheadEl.innerHTML = `Your number will be after <strong>${q.patients_ahead} more patients</strong>`;
      }
    }

    if (estWaitEl) {
      estWaitEl.innerText = q.patients_ahead === 0 ? "0 mins (Enter Now)" : `~${q.est_wait_mins} mins`;
    }

    if (progressBarEl) {
      progressBarEl.style.width = `${q.progress_pct}%`;
    }

    if (progressPercentEl) {
      progressPercentEl.innerText = `${q.progress_pct}% Completed`;
    }

    if (doctorRoomEl) {
      doctorRoomEl.innerText = `${q.doctor_name} • ${q.room_no} (${q.hospital_name})`;
    }

    if (queueStatusBannerEl) {
      if (q.patients_ahead === 0) {
        queueStatusBannerEl.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-lg animate-bounce";
        queueStatusBannerEl.innerText = "🔔 TOKEN #44 CALLED: PLEASE ENTER OPD CABIN 204 NOW";
      } else {
        queueStatusBannerEl.className = "p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm font-medium flex items-center justify-between";
        queueStatusBannerEl.innerHTML = `
          <span><i data-lucide="clock" class="w-4 h-4 inline mr-1 text-sky-600"></i> Avoid Hospital Rush: Arrive at cabin in approx <strong>${Math.max(0, q.est_wait_mins - 5)} mins</strong>.</span>
          <span class="badge-pill bg-sky-100 text-sky-700">Live OPD Stream</span>
        `;
        lucide.createIcons();
      }
    }

    // 2. Hospital Desk Queue Elements
    const hospCurrentTokenEl = document.getElementById('hosp-current-token');
    const hospNextTokenEl = document.getElementById('hosp-next-token');
    if (hospCurrentTokenEl) hospCurrentTokenEl.innerText = `#${q.current_token}`;
    if (hospNextTokenEl) hospNextTokenEl.innerText = `#${q.current_token + 1}`;
  },

  async hospitalAdvanceToken() {
    try {
      const res = await fetch('/api/hospital/queue/advance', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast(`Token advanced to #${data.queue.current_token}. Patient displays updated in real-time.`, 'success');
        this.fetchQueueStatus();
      }
    } catch (e) {
      App.showToast("Failed to advance token", "error");
    }
  },

  async hospitalResetQueue() {
    try {
      const res = await fetch('/api/hospital/queue/reset?current=39&patient=44', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        App.showToast("OPD Queue reset to Token #39 (5 patients ahead of #44)", "info");
        this.fetchQueueStatus();
      }
    } catch (e) {
      App.showToast("Failed to reset queue", "error");
    }
  }
};
