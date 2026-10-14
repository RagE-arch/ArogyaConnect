/**
 * AarogyaConnect 360 - Interactive Doctor & Hospital Discovery Map
 * Satisfies Patient Req 2 & 12
 */

const MapLocator = {
  map: null,
  userMarker: null,
  markersLayer: null,
  doctorsData: [],
  userLocation: [12.9250, 77.6838], // Default to Bengaluru

  closeMap() {
    if (this.map) {
      try {
        this.map.closePopup();
      } catch (e) {}
    }
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('hidden');
    if (window.App) App.goHome();
  },

  init(doctors) {
    this.doctorsData = doctors || [];
    const mapContainer = document.getElementById('map-view-container');
    if (!mapContainer || this.map) return;

    try {
      this.map = L.map('map-view-container').setView(this.userLocation, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(this.map);

      // User location marker
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="w-8 h-8 rounded-full bg-sky-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      this.userMarker = L.marker(this.userLocation, { icon: userIcon })
        .addTo(this.map)
        .bindPopup("<strong>You are here</strong><br>Bellandur, Bengaluru");

      this.markersLayer = L.layerGroup().addTo(this.map);
      this.renderDoctorMarkers(this.doctorsData);
      this.renderDoctorCards(this.doctorsData);

      // Fix leaflet tile rendering when tab becomes visible
      setTimeout(() => {
        this.map.invalidateSize();
      }, 400);

    } catch (e) {
      console.warn("Leaflet map initialization error:", e);
    }
  },

  renderDoctorMarkers(doctors) {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    doctors.forEach(doc => {
      const docIcon = L.divIcon({
        className: 'custom-doc-marker',
        html: `
          <div class="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">
            🏥
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const popupContent = `
        <div class="p-1 font-sans text-xs">
          <strong class="text-sm text-slate-800">${doc.name}</strong><br>
          <span class="text-emerald-700 font-semibold">${doc.specialty}</span><br>
          <span class="text-slate-600">${doc.hospital_name}</span><br>
          <span class="text-slate-500">📍 ${doc.distance_km} km away</span><br>
          <div class="mt-2 font-bold text-sky-700">Fee: ₹${doc.consultation_fee}</div>
          <button onclick="MapLocator.openBookingModal('${doc.id}')" class="mt-2 w-full py-1 bg-sky-600 text-white rounded font-medium hover:bg-sky-700">
            Book Slot
          </button>
        </div>
      `;

      L.marker([doc.lat, doc.lng], { icon: docIcon })
        .addTo(this.markersLayer)
        .bindPopup(popupContent);
    });
  },

  renderDoctorCards(doctors) {
    const listContainer = document.getElementById('map-doctors-list');
    if (!listContainer) return;

    if (doctors.length === 0) {
      listContainer.innerHTML = `<div class="p-4 text-center text-slate-400">No doctors found for this specialty filter.</div>`;
      return;
    }

    listContainer.innerHTML = doctors.map(doc => `
      <div class="p-4 bg-white rounded-xl border border-slate-200 hover:border-sky-300 shadow-sm transition space-y-2">
        <div class="flex items-start justify-between">
          <div>
            <h4 class="font-bold text-slate-900">${doc.name}</h4>
            <p class="text-xs font-semibold text-sky-600">${doc.specialty}</p>
            <p class="text-xs text-slate-500">${doc.qualification} • ${doc.experience_years} yrs exp</p>
          </div>
          <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-xs">
            ★ ${doc.rating}
          </span>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
          <div>
            <i data-lucide="map-pin" class="w-3.5 h-3.5 inline text-slate-400"></i> ${doc.hospital_name}
            <span class="font-bold text-slate-700 ml-1">(${doc.distance_km} km)</span>
          </div>
          <div class="font-extrabold text-sky-700 text-sm">
            ₹${doc.consultation_fee}
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <span class="text-xs text-slate-500">
            Next: <strong class="text-slate-700">${(doc.available_slots.Today || [])[0] || 'Tomorrow 09:30 AM'}</strong>
          </span>
          <button onclick="MapLocator.openBookingModal('${doc.id}')" class="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-sm transition">
            Book Appointment
          </button>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  },

  filterBySpecialty(specialty) {
    if (!specialty || specialty === 'all') {
      this.renderDoctorMarkers(this.doctorsData);
      this.renderDoctorCards(this.doctorsData);
    } else {
      const filtered = this.doctorsData.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
      this.renderDoctorMarkers(filtered);
      this.renderDoctorCards(filtered);
    }
  },

  filterBySearch(query) {
    if (!query) {
      this.renderDoctorMarkers(this.doctorsData);
      this.renderDoctorCards(this.doctorsData);
      return;
    }
    const q = query.toLowerCase();
    const filtered = this.doctorsData.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.specialty.toLowerCase().includes(q) || 
      d.hospital_name.toLowerCase().includes(q)
    );
    this.renderDoctorMarkers(filtered);
    this.renderDoctorCards(filtered);
  },

  openBookingModal(doctorId) {
    const doc = this.doctorsData.find(d => d.id === doctorId);
    if (!doc) return;

    const modal = document.getElementById('booking-modal');
    const modalContent = document.getElementById('booking-modal-body');

    modalContent.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center gap-3 p-3 bg-sky-50 rounded-xl">
          <div class="w-12 h-12 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-lg">
            ${doc.name.split(' ')[1] ? doc.name.split(' ')[1][0] : 'Dr'}
          </div>
          <div>
            <h4 class="font-bold text-slate-900">${doc.name}</h4>
            <p class="text-xs text-sky-700 font-semibold">${doc.specialty} • ${doc.hospital_name}</p>
            <p class="text-xs font-bold text-slate-700 mt-0.5">Consultation Fee: ₹${doc.consultation_fee}</p>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Select Consultation Day</label>
          <select id="modal-select-day" class="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white" onchange="MapLocator.updateModalSlots('${doc.id}')">
            <option value="Today">Today (Oct 13)</option>
            <option value="Tomorrow">Tomorrow (Oct 14)</option>
            <option value="Day After">Day After (Oct 15)</option>
            <option value="In 3 Days">In 3 Days (Oct 16)</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Select Available Time Slot</label>
          <div id="modal-slots-container" class="flex flex-wrap gap-2">
            <!-- Populated dynamically -->
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Reason for Visit / Symptoms</label>
          <input type="text" id="modal-booking-reason" placeholder="e.g. Chest tightness or Diabetes check-up" class="w-full p-2 border border-slate-300 rounded-lg text-sm" value="Cardiology consultation & follow-up">
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button onclick="document.getElementById('booking-modal').classList.add('hidden')" class="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button id="btn-confirm-modal-booking" class="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-bold shadow-md transition">
            Confirm & Generate Token
          </button>
        </div>
      </div>
    `;

    this.updateModalSlots(doc.id);
    modal.classList.remove('hidden');
    lucide.createIcons();
  },

  selectedSlot: "",

  updateModalSlots(doctorId) {
    const doc = this.doctorsData.find(d => d.id === doctorId);
    if (!doc) return;

    const daySelect = document.getElementById('modal-select-day');
    const day = daySelect ? daySelect.value : 'Today';
    const slots = doc.available_slots[day] || ["11:00 AM", "03:00 PM"];
    const container = document.getElementById('modal-slots-container');

    this.selectedSlot = slots[0] || "10:00 AM";

    container.innerHTML = slots.map((s, idx) => `
      <button type="button" onclick="MapLocator.selectSlotBtn(this, '${s}')" class="slot-pill px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${idx === 0 ? 'bg-sky-600 text-white border-sky-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'}">
        ${s}
      </button>
    `).join('');

    const confirmBtn = document.getElementById('btn-confirm-modal-booking');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const reason = document.getElementById('modal-booking-reason').value || "Doctor Consultation";
        VoiceAI.quickBookSlot(doc.id, `${day}, Oct 2026`, this.selectedSlot, reason);
        document.getElementById('booking-modal').classList.add('hidden');
      };
    }
  },

  selectSlotBtn(btn, slot) {
    this.selectedSlot = slot;
    document.querySelectorAll('.slot-pill').forEach(b => {
      b.className = 'slot-pill px-3 py-1.5 rounded-lg border text-xs font-semibold transition bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400';
    });
    btn.className = 'slot-pill px-3 py-1.5 rounded-lg border text-xs font-semibold transition bg-sky-600 text-white border-sky-600';
  }
};
