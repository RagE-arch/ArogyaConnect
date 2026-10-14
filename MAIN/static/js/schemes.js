/**
 * AarogyaConnect 360 - Government Schemes, ABHA & DigiLocker Hub
 * Satisfies Patient Req 5
 */

const SchemesManager = {
  schemesData: null,

  async init() {
    try {
      const res = await fetch('/api/schemes');
      this.schemesData = await res.json();
      this.renderSchemesUI();
    } catch (e) {
      console.warn("Failed to load schemes:", e);
    }
  },

  renderSchemesUI() {
    if (!this.schemesData) return;

    // 1. Ayushman Bharat PM-JAY
    const pmjayContainer = document.getElementById('pmjay-scheme-details');
    if (pmjayContainer && this.schemesData.ayushman_bharat) {
      const ab = this.schemesData.ayushman_bharat;
      pmjayContainer.innerHTML = `
        <div class="p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-md space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
              Government of India • NHA
            </span>
            <span class="badge-pill bg-emerald-400 text-emerald-950 font-bold text-xs">
              ✓ 100% Eligible
            </span>
          </div>
          <div>
            <h3 class="text-xl font-extrabold">${ab.name}</h3>
            <p class="text-sm font-semibold text-amber-100 mt-1">Universal Financial Health Protection: ${ab.coverage}</p>
          </div>
          <div class="bg-black/15 p-3 rounded-xl text-xs space-y-1 backdrop-blur-sm">
            <div class="font-bold text-amber-200">Key Benefits:</div>
            ${ab.benefits.map(b => `<div>• ${b}</div>`).join('')}
          </div>
          <div class="text-xs text-amber-100 flex items-center justify-between pt-1">
            <span>Nearby Empanelled: <strong>${ab.empanelled_nearby_hospitals.join(', ')}</strong></span>
            <button onclick="App.showToast('Ayushman PM-JAY e-Card downloaded from DigiLocker', 'success')" class="px-3 py-1 bg-white text-orange-700 font-bold rounded-lg hover:bg-amber-50 text-xs">
              Download e-Card
            </button>
          </div>
        </div>
      `;
    }

    // 2. ABHA Card
    const abhaContainer = document.getElementById('abha-card-render');
    if (abhaContainer && this.schemesData.abha_account) {
      const abha = this.schemesData.abha_account;
      abhaContainer.innerHTML = `
        <div class="max-w-md mx-auto p-5 bg-gradient-to-br from-sky-700 via-sky-800 to-indigo-900 text-white rounded-2xl shadow-xl border-2 border-sky-400/40 relative overflow-hidden">
          <div class="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">🇮🇳</span>
              <div>
                <h4 class="font-bold text-xs tracking-wider">NATIONAL HEALTH AUTHORITY</h4>
                <p class="text-[10px] text-sky-200">Ayushman Bharat Digital Mission (ABDM)</p>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald-300">ABHA Verified</span>
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <div class="text-[10px] text-sky-200 uppercase tracking-wider">ABHA Number</div>
              <div class="text-lg font-mono font-black tracking-widest text-amber-300">${abha.abha_number}</div>
              <div class="text-xs font-medium text-sky-100 mt-1">ABHA Address: <span class="font-mono">${abha.abha_address}</span></div>
              <div class="text-xs text-sky-200 mt-2">Linked Medical Records: <strong>${abha.linked_records} Hospitals/Labs</strong></div>
            </div>

            <!-- QR Code -->
            <div class="bg-white p-2 rounded-xl shadow-md flex flex-col items-center">
              <img src="/static/img/abha_qr.png" alt="ABHA QR Code" class="w-20 h-20 object-contain">
              <span class="text-[9px] font-bold text-slate-800 mt-1">SCAN FOR EHR</span>
            </div>
          </div>
        </div>
      `;
    }

    // 3. DigiLocker Synced Docs
    const digiContainer = document.getElementById('digilocker-docs-list');
    if (digiContainer && this.schemesData.digilocker) {
      const docs = this.schemesData.digilocker.documents || [];
      digiContainer.innerHTML = docs.map(doc => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:border-sky-300 transition">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
              📄
            </div>
            <div>
              <h5 class="font-bold text-slate-800 text-xs">${doc.name}</h5>
              <p class="text-[11px] text-slate-500">Issuer: ${doc.issuer} • Doc ID: ${doc.doc_id}</p>
            </div>
          </div>
          <button onclick="App.showToast('Fetching authentic verified document from DigiLocker gateway...', 'info')" class="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white rounded-lg font-semibold transition text-xs">
            View / Sync
          </button>
        </div>
      `).join('');
    }
  }
};
