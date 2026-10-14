/**
 * AarogyaConnect 360 - Main Orchestrator v2.0
 * Sidebar-based navigation, global search, dashboard mini charts & mini map.
 */

const App = {
  currentRole: 'patient',
  currentPage: 'home',          // The active page panel ID within patient role
  currentHospitalTab: 'queue',
  state: null,
  navHistory: [],

  // Page → sidebar nav ID map
  PAGE_NAV_MAP: {
    'home':        'nav-home',
    'voice':       'nav-voice',
    'appointments':'nav-appointments',
    'medicines':   'nav-medicines',
    'reports':     'nav-reports',
    'nearbycare':  'nav-nearbycare',
    'healthlocker':'nav-healthlocker',
    'myhealth':    'nav-myhealth',
    'diet':        'nav-diet',
    'schemes':     'nav-schemes',
    'insurance':   'nav-insurance',
    'companion':   'nav-companion',
    'emergency':   'nav-emergency'
  },

  HOSP_TAB_NAMES: {
    'queue': 'OPD Queue & Appointments',
    'diff': 'AI 10-Day Report Diff',
    'pharmacy': 'Anti-Abuse Rx Tracker',
    'emergency': 'Emergency Fleet & Trauma'
  },

  // ── SEARCH DATA ──────────────────────────────────────────────
  SEARCH_INDEX: [
    { label: 'Home Dashboard', icon: 'home', color: '#0ea5e9', bg: '#e0f2fe', page: 'home', role: 'patient', desc: 'Your health overview & widgets' },
    { label: 'Voice AI Assistant', icon: 'mic', color: '#6366f1', bg: '#eef2ff', page: 'voice', role: 'patient', desc: 'Speak symptoms in your language, book slots' },
    { label: 'OPD Queue & Appointments', icon: 'calendar-check', color: '#f59e0b', bg: '#fef3c7', page: 'appointments', role: 'patient', desc: 'Token #44 • Dr. Rajesh Sharma • 4:30 PM' },
    { label: 'Medicines & Prescriptions', icon: 'pill', color: '#10b981', bg: '#dcfce7', page: 'medicines', role: 'patient', desc: 'Upload prescriptions, medication reminders' },
    { label: 'Diet Plan & Meal Checker', icon: 'salad', color: '#16a34a', bg: '#f0fdf4', page: 'diet', role: 'patient', desc: 'Clinical diet for Diabetes & Hypertension' },
    { label: 'My Health Trends', icon: 'trending-up', color: '#0d9488', bg: '#ccfbf1', page: 'myhealth', role: 'patient', desc: '6-month AI trajectory charts' },
    { label: 'Lab Reports', icon: 'file-text', color: '#7c3aed', bg: '#f5f3ff', page: 'reports', role: 'patient', desc: 'View all lab reports and documents' },
    { label: 'Nearby Care Map', icon: 'map-pin', color: '#0284c7', bg: '#e0f2fe', page: 'nearbycare', role: 'patient', desc: 'Find nearby doctors matching your problem' },
    { label: 'Health Locker', icon: 'folder-lock', color: '#0369a1', bg: '#e0f2fe', page: 'healthlocker', role: 'patient', desc: 'Store discharge summaries, bills & ECGs' },
    { label: 'Govt Schemes & ABHA', icon: 'landmark', color: '#ca8a04', bg: '#fefce8', page: 'schemes', role: 'patient', desc: 'Ayushman PM-JAY, ABHA ID, DigiLocker' },
    { label: 'Insurance Concierge', icon: 'shield-check', color: '#059669', bg: '#ecfdf5', page: 'insurance', role: 'patient', desc: 'Human agent for claim paperwork & TPA' },
    { label: 'Care Companion', icon: 'heart-handshake', color: '#db2777', bg: '#fdf2f8', page: 'companion', role: 'patient', desc: 'On-demand nurse attendant & vitals feed' },
    { label: 'Emergency SOS Hub', icon: 'siren', color: '#dc2626', bg: '#fff1f2', page: 'emergency', role: 'patient', desc: 'Dispatch ambulance & first aid protocols' },
    { label: 'Hospital Portal', icon: 'hospital', color: '#2563eb', bg: '#eff6ff', page: null, role: 'hospital', desc: 'OPD roster, AI report diff, fleet control' },
    { label: 'Family Guardian Portal', icon: 'users', color: '#7c3aed', bg: '#f5f3ff', page: null, role: 'family', desc: 'View-only access for trusted family members' },
    // Medicines
    { label: 'Metformin 500mg', icon: 'pill', color: '#f59e0b', bg: '#fef3c7', page: 'medicines', role: 'patient', desc: 'Blood glucose control • Twice daily' },
    { label: 'Telmisartan 40mg', icon: 'pill', color: '#f59e0b', bg: '#fef3c7', page: 'medicines', role: 'patient', desc: 'Blood pressure control • Once daily' },
    { label: 'Atorvastatin 10mg', icon: 'pill', color: '#f59e0b', bg: '#fef3c7', page: 'medicines', role: 'patient', desc: 'Cholesterol control • Bedtime' },
    // Doctors
    { label: 'Dr. Rajesh Sharma – Cardiologist', icon: 'user', color: '#0284c7', bg: '#e0f2fe', page: 'nearbycare', role: 'patient', desc: 'Apollo Multispeciality • ₹850 • 2.4 km' },
    { label: 'Dr. Ananya Iyer – Diabetologist', icon: 'user', color: '#0284c7', bg: '#e0f2fe', page: 'nearbycare', role: 'patient', desc: 'Fortis Hospital • ₹600 • 3.8 km' },
    { label: 'Dr. Vikram Malhotra – Orthopedic', icon: 'user', color: '#0284c7', bg: '#e0f2fe', page: 'nearbycare', role: 'patient', desc: 'Manipal Hospital • ₹1000 • 4.1 km' },
    { label: 'Dr. Sneha Patel – Neurologist', icon: 'user', color: '#0284c7', bg: '#e0f2fe', page: 'nearbycare', role: 'patient', desc: 'Apollo Multispeciality • ₹950 • 2.4 km' },
  ],

  // ── INIT ─────────────────────────────────────────────────────
  async init() {
    await this.fetchState();

    if (window.I18n) I18n.init();
    VoiceAI.init();
    QueueManager.init();
    DietAgent.init();
    SchemesManager.init();

    this.setupEventListeners();

    // Show patient role with home page
    this.switchRole('patient', false);
    this.goToPage('home', false);

    lucide.createIcons();
  },

  async fetchState() {
    try {
      const res = await fetch('/api/state');
      this.state = await res.json();
      this.renderStateDependentComponents();
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  },

  async refreshAllData() {
    await this.fetchState();
    QueueManager.fetchQueueStatus();
    if (this.currentPage === 'myhealth') HealthCharts.initPatientTrends();
  },

  renderStateDependentComponents() {
    if (!this.state) return;
    MapLocator.init(this.state.doctors);
    PharmacyManager.init(this.state);
    EmergencyHub.init(this.state);
    this.renderHealthLocker();
    this.renderInsuranceDesk();
    this.renderCareCompanion();
    this.renderHospitalAppointments();
    this.renderPatientAppointments();
    lucide.createIcons();
  },

  renderPatientAppointments() {
    const listEl = document.getElementById('patient-appointments-list');
    if (!listEl || !this.state?.appointments) return;
    listEl.innerHTML = this.state.appointments.map(a => `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
            <i data-lucide="user" class="w-4 h-4 text-sky-600"></i>
          </div>
          <div>
            <div class="text-sm font-bold text-slate-900">${a.doctor_name}</div>
            <div class="text-xs text-slate-500">${a.specialty} • ${a.hospital_name}</div>
            <div class="text-xs text-slate-400 mt-0.5">${a.date} @ ${a.slot} • Token #${a.token_number}</div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <span class="badge-pill bg-sky-100 text-sky-800 text-[10px]">${a.status}</span>
          <span class="text-xs font-bold text-slate-700">₹${a.fee}</span>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  },

  // ── SIDEBAR PAGE NAVIGATION ──────────────────────────────────
  goToPage(pageId, recordHistory = true) {
    if (window.VoiceAI) VoiceAI.stopAll();

    // Make sure we're in patient role
    if (this.currentRole !== 'patient') {
      this.switchRole('patient', false);
    }

    // Hide all patient page panels
    document.querySelectorAll('#panel-patient-role .page-panel').forEach(el => {
      el.classList.remove('active');
    });

    // Show target panel
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
      target.classList.add('active');
      this.currentPage = pageId;
    }

    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navId = this.PAGE_NAV_MAP[pageId];
    if (navId) {
      const navEl = document.getElementById(navId);
      if (navEl) navEl.classList.add('active');
    }

    // Close mobile sidebar
    this.closeMobileSidebar();

    // Page-specific init
    if (pageId === 'home') {
      this.initDashboardMiniMap();
      this.initDashboardCharts();
    }
    if (pageId === 'nearbycare' && MapLocator.map) {
      setTimeout(() => MapLocator.map.invalidateSize(), 300);
    }
    if (pageId === 'myhealth') {
      setTimeout(() => HealthCharts.initPatientTrends(), 100);
    }

    const mainArea = document.getElementById('main-page-area');
    if (mainArea) mainArea.scrollTop = 0;
  },

  goHome() {
    this.goToPage('home');
  },

  // ── LEGACY COMPAT ALIASES (used by other JS modules) ─────────
  goToPatientOverview() { this.goHome(); },
  switchPatientTab(tabId) {
    const tabToPage = {
      'overview': 'home', 'voice': 'voice', 'queue': 'appointments',
      'map': 'nearbycare', 'pharmacy': 'medicines', 'diet': 'diet',
      'trends': 'myhealth', 'locker': 'healthlocker', 'schemes': 'schemes',
      'insurance': 'insurance', 'companion': 'companion', 'emergency': 'emergency'
    };
    this.goToPage(tabToPage[tabId] || 'home');
  },

  // ── ROLE SWITCHER ────────────────────────────────────────────
  switchRole(role, recordHistory = true) {
    if (window.VoiceAI) VoiceAI.stopAll();

    this.currentRole = role;

    // Update role buttons
    document.querySelectorAll('.role-nav-btn').forEach(btn => {
      btn.classList.remove('bg-sky-600', 'text-white', 'shadow-md');
      btn.classList.add('bg-transparent', 'text-slate-600');
    });
    const activeBtn = document.getElementById(`btn-role-${role}`);
    if (activeBtn) {
      activeBtn.classList.remove('bg-transparent', 'text-slate-600');
      activeBtn.classList.add('bg-sky-600', 'text-white', 'shadow-md');
    }

    // Show/hide role panels
    document.getElementById('panel-patient-role')?.classList.add('hidden');
    document.getElementById('panel-hospital-role')?.classList.add('hidden');
    document.getElementById('panel-family-role')?.classList.add('hidden');

    const targetPanel = document.getElementById(`panel-${role}-role`);
    if (targetPanel) targetPanel.classList.remove('hidden');

    // Show/hide sidebar (hide for hospital/family since they have their own nav)
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.display = role === 'patient' ? '' : 'none';
    }

    if (role === 'patient') {
      this.goToPage(this.currentPage || 'home', false);
    } else if (role === 'hospital') {
      this.switchHospitalTab(this.currentHospitalTab, false);
    } else if (role === 'family') {
      if (FamilyManager.authenticatedData) FamilyManager.renderGuardianDashboard();
    }

    lucide.createIcons();
  },

  switchHospitalTab(tabId, recordHistory = true) {
    if (window.VoiceAI) VoiceAI.stopAll();
    this.currentHospitalTab = tabId;

    document.querySelectorAll('.hospital-tab-content').forEach(el => el.classList.remove('active-htab'));
    document.querySelectorAll('.hospital-subnav-btn').forEach(el => {
      el.classList.remove('border-sky-600', 'text-sky-600', 'font-bold');
      el.classList.add('border-transparent', 'text-slate-500', 'font-medium');
    });

    const content = document.getElementById(`hosp-tab-content-${tabId}`);
    if (content) content.classList.add('active-htab');

    const navBtn = document.getElementById(`hosp-tab-btn-${tabId}`);
    if (navBtn) {
      navBtn.classList.remove('border-transparent', 'text-slate-500', 'font-medium');
      navBtn.classList.add('border-sky-600', 'text-sky-600', 'font-bold');
    }

    if (tabId === 'diff') HealthCharts.initHospitalReportDiff();
    lucide.createIcons();
    const mainArea = document.getElementById('main-page-area');
    if (mainArea) mainArea.scrollTop = 0;
  },

  goBack() {
    if (window.VoiceAI) VoiceAI.stopAll();
    const modal = document.getElementById('booking-modal');
    if (modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      return;
    }
    if (this.currentRole !== 'patient') {
      this.switchRole('patient', false);
      return;
    }
    if (this.currentPage !== 'home') {
      this.goHome();
      return;
    }
    if (this.currentPage === 'nearbycare') {
      MapLocator.closeMap();
    }
  },

  // ── EVENT LISTENERS ──────────────────────────────────────────
  setupEventListeners() {
    const langSelect = document.getElementById('global-language-selector');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        if (window.I18n) I18n.setLanguage(e.target.value);
        else VoiceAI.setLanguage(e.target.value);
        this.showToast(`Language switched to: ${e.target.options[e.target.selectedIndex].text}`, 'info');
      });
    }

    const rxForm = document.getElementById('form-rx-upload');
    if (rxForm) rxForm.addEventListener('submit', (e) => PharmacyManager.uploadPrescriptionForm(e));

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleGlobalSearch();
      }
      if (e.key === 'Escape') {
        const overlay = document.getElementById('global-search-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
          this.toggleGlobalSearch();
          return;
        }
        const modal = document.getElementById('booking-modal');
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          return;
        }
        this.goBack();
      }
    });

    const modal = document.getElementById('booking-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    }

    window.addEventListener('popstate', (e) => {
      if (window.VoiceAI) VoiceAI.stopAll();
    });
  },

  // ── MOBILE SIDEBAR ───────────────────────────────────────────
  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (sidebar) sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('show');
  },

  closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('show');
  },

  // ── GLOBAL SEARCH ─────────────────────────────────────────────
  toggleGlobalSearch() {
    const overlay = document.getElementById('global-search-overlay');
    if (!overlay) return;
    overlay.classList.toggle('hidden');
    if (!overlay.classList.contains('hidden')) {
      const input = document.getElementById('global-search-input');
      if (input) { input.value = ''; input.focus(); }
      this.runGlobalSearch('');
    }
  },

  runGlobalSearch(query) {
    const resultsEl = document.getElementById('global-search-results');
    if (!resultsEl) return;

    query = (query || '').toLowerCase().trim();

    if (!query) {
      resultsEl.innerHTML = `
        <div class="py-8 text-center text-slate-400 text-sm">
          <i data-lucide="search" class="w-8 h-8 mx-auto mb-2 opacity-30"></i>
          <p class="font-medium">Type to search features, doctors, medicines…</p>
          <p class="text-xs mt-1 text-slate-300">Tip: Press <kbd class="border border-slate-200 rounded px-1 font-mono text-slate-400">Ctrl+K</kbd> to open anytime</p>
        </div>`;
      lucide.createIcons();
      return;
    }

    const results = this.SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    ).slice(0, 8);

    if (results.length === 0) {
      resultsEl.innerHTML = `<div class="py-8 text-center text-slate-400 text-sm"><p class="font-medium">No results for "<strong>${query}</strong>"</p><p class="text-xs mt-1">Try searching for a feature, doctor, or medicine name.</p></div>`;
      return;
    }

    resultsEl.innerHTML = results.map((item, idx) => `
      <div class="search-result-item" onclick="App.searchNavigate('${item.page}', '${item.role}')" data-idx="${idx}">
        <div class="search-result-icon" style="background:${item.bg}">
          <i data-lucide="${item.icon}" style="width:16px;height:16px;color:${item.color}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-slate-900">${item.label}</div>
          <div class="text-xs text-slate-500 truncate">${item.desc}</div>
        </div>
        <i data-lucide="arrow-right" style="width:14px;height:14px;color:#94a3b8;flex-shrink:0"></i>
      </div>
    `).join('');
    lucide.createIcons();
  },

  searchNavigate(pageId, role) {
    this.toggleGlobalSearch();
    if (role === 'hospital') { this.switchRole('hospital'); return; }
    if (role === 'family') { this.switchRole('family'); return; }
    if (pageId) this.goToPage(pageId);
  },

  handleSearchKey(event) {
    if (event.key === 'Enter') {
      const firstResult = document.querySelector('.search-result-item');
      if (firstResult) firstResult.click();
    }
  },

  // ── DASHBOARD MINI MAP ────────────────────────────────────────
  _miniMap: null,
  initDashboardMiniMap() {
    const container = document.getElementById('mini-map-container');
    if (!container) return;
    if (this._miniMap) {
      try { this._miniMap.invalidateSize(); } catch(e) {}
      return;
    }
    try {
      this._miniMap = L.map('mini-map-container', {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        attributionControl: false
      }).setView([12.9250, 77.6838], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(this._miniMap);

      // User marker
      L.circleMarker([12.9250, 77.6838], {
        radius: 7, color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 1, weight: 2
      }).addTo(this._miniMap).bindPopup('You are here');

      // Doctor markers
      const doctors = this.state?.doctors || [];
      doctors.forEach(doc => {
        L.circleMarker([doc.lat, doc.lng], {
          radius: 5, color: '#10b981', fillColor: '#10b981', fillOpacity: 1, weight: 1.5
        }).addTo(this._miniMap).bindPopup(`${doc.name}`);
      });

      setTimeout(() => this._miniMap.invalidateSize(), 300);
    } catch(e) {
      console.warn('Mini map init failed:', e);
      if (container) {
        container.innerHTML = `<div style="height:155px;background:linear-gradient(135deg,#e0f2fe,#bae6fd);border-radius:10px;display:flex;align-items:center;justify-content:center;"><div style="text-align:center;color:#0284c7;font-size:12px;font-weight:700;">📍 Bellandur, Bengaluru<br><span style="font-weight:400;font-size:11px;color:#64748b">5 doctors found nearby</span></div></div>`;
      }
    }
  },

  // ── DASHBOARD CHARTS ──────────────────────────────────────────
  _dashGlucoseChart: null,
  _dashBpChart: null,
  initDashboardCharts() {
    const labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const glucoseData = [195, 188, 180, 174, 142, 116];
    const bpData = [152, 148, 144, 146, 132, 122];

    // Blood Glucose Line Chart
    const glucoseCanvas = document.getElementById('dashboard-glucose-chart');
    if (glucoseCanvas) {
      if (this._dashGlucoseChart) { this._dashGlucoseChart.destroy(); }
      this._dashGlucoseChart = new Chart(glucoseCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: glucoseData,
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13,148,136,0.08)',
            borderWidth: 2.5,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#0d9488',
            pointRadius: 4,
            pointHoverRadius: 6,
            datalabels: { display: true }
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: ctx => `${ctx.parsed.y} mg/dL` }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#94a3b8' } },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 }, color: '#94a3b8' },
              min: 80, max: 220
            }
          }
        }
      });
    }

    // Blood Pressure Bar Chart
    const bpCanvas = document.getElementById('dashboard-bp-chart');
    if (bpCanvas) {
      if (this._dashBpChart) { this._dashBpChart.destroy(); }
      this._dashBpChart = new Chart(bpCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: bpData,
            backgroundColor: bpData.map((v, i) =>
              i < bpData.length - 1
                ? `rgba(99,102,241,${0.35 + i*0.09})`
                : 'rgba(99,102,241,0.85)'
            ),
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: ctx => `${ctx.parsed.y} mmHg` }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#94a3b8' } },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 }, color: '#94a3b8' },
              min: 100, max: 170
            }
          }
        }
      });
    }
  },

  // ── HEALTH LOCKER ─────────────────────────────────────────────
  renderHealthLocker() {
    const docTemplate = (doc) => `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-sky-300 transition space-y-2">
        <div class="flex items-start justify-between">
          <div class="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <i data-lucide="file-text" class="w-5 h-5"></i>
          </div>
          <span class="badge-pill bg-sky-100 text-sky-800 text-[10px]">${doc.category}</span>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm truncate" title="${doc.title}">${doc.title}</h4>
          <p class="text-xs text-slate-500">${doc.hospital} • ${doc.date}</p>
        </div>
        <div class="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
          <span class="text-slate-400 font-mono">${doc.file_size}</span>
          <button onclick="App.showToast('Secure medical document download initiated.', 'info')" class="text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Download
          </button>
        </div>
      </div>`;

    if (!this.state?.digital_health_locker) return;
    const html = this.state.digital_health_locker.map(doc => docTemplate(doc)).join('');

    const grid1 = document.getElementById('health-locker-docs-grid');
    if (grid1) grid1.innerHTML = html;

    const grid2 = document.getElementById('health-locker-docs-grid-reports');
    if (grid2) grid2.innerHTML = html;
  },

  async uploadLockerDocument() {
    const title = prompt('Enter Document Title (e.g. Echo Cardiogram Oct 2026):', 'Echo Cardiogram Scan');
    if (!title) return;
    const category = prompt('Enter Category (Lab Report / Scan / Discharge Summary / Hospital Bill):', 'Lab Report');
    try {
      const res = await fetch('/api/health_locker/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category: category || 'Medical Report', doctor: 'Apollo Diagnostics Central' })
      });
      const data = await res.json();
      if (data.status === 'success') {
        this.showToast('Document saved to your Digital Health Locker!', 'success');
        this.refreshAllData();
      }
    } catch (e) {
      this.showToast('Failed to upload document', 'error');
    }
  },

  renderInsuranceDesk() {
    const insContainer = document.getElementById('insurance-desk-card');
    if (!insContainer || !this.state?.insurance_support) return;
    const ins = this.state.insurance_support;
    insContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-5 bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl shadow-sm text-center space-y-3">
          <div class="w-20 h-20 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center mx-auto text-2xl shadow-md border-2 border-white">AV</div>
          <div>
            <h4 class="font-extrabold text-slate-900 text-base">${ins.human_agent.name}</h4>
            <p class="text-xs font-semibold text-sky-700">${ins.human_agent.designation}</p>
            <span class="inline-block mt-2 badge-pill bg-emerald-100 text-emerald-800 text-xs font-bold">● ${ins.human_agent.availability}</span>
          </div>
          <p class="text-xs text-slate-500">Dedicated concierge assisting you with hospital paperwork, cashless claim approvals, and TPA documentation.</p>
          <div class="pt-2 flex flex-col gap-2">
            <a href="tel:${ins.human_agent.phone}" class="py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-sm transition block text-center">📞 Direct Call (${ins.human_agent.phone})</a>
            <button onclick="App.showToast('Connecting you to Claims Desk chat with Aakash Verma...', 'info')" class="py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs transition">💬 Start Claim Chat</button>
          </div>
        </div>
        <div class="md:col-span-2 space-y-4">
          <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-400 font-mono">Policy #${ins.policy_number}</span>
              <h4 class="font-bold text-slate-900 text-base">${ins.provider}</h4>
              <p class="text-xs text-emerald-700 font-semibold mt-0.5">${ins.claim_status}</p>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400">Sum Insured</span>
              <div class="text-lg font-black text-sky-700">${ins.sum_insured}</div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500">Pre-Authorization &amp; Paperwork Checklist</h5>
            <div class="space-y-1.5">
              ${ins.paperwork_checklist.map(c => `
                <div class="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                  <span class="text-slate-800 font-medium">• ${c.item}</span>
                  <span class="font-bold text-emerald-700">✓ ${c.status}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  renderCareCompanion() {
    const careContainer = document.getElementById('care-companion-card');
    if (!careContainer || !this.state?.care_companion) return;
    const care = this.state.care_companion;
    careContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-sm text-center space-y-3">
          <div class="w-20 h-20 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-2xl shadow-md border-2 border-white">PN</div>
          <div>
            <h4 class="font-extrabold text-slate-900 text-base">${care.agent_name}</h4>
            <p class="text-xs font-semibold text-emerald-800">${care.qualification}</p>
            <span class="inline-block mt-2 badge-pill bg-emerald-100 text-emerald-800 text-xs font-bold">● ${care.status}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${care.notes}</p>
          <div class="pt-2 flex flex-col gap-2">
            <a href="tel:${care.phone}" class="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition block text-center">📞 Call Caregiver (${care.phone})</a>
            <button onclick="App.simulateLogVital()" class="py-2 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl text-xs transition">+ Log Instant Vitals Reading</button>
          </div>
        </div>
        <div class="md:col-span-2 space-y-4">
          <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div class="flex items-center justify-between">
              <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500">Live Health Monitoring Log (Synced with Hospital &amp; Family)</h5>
              <span class="badge-pill bg-sky-100 text-sky-800 text-[10px]">Real-time Sync</span>
            </div>
            <div class="space-y-2">
              ${care.live_vitals_feed.map(feed => `
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div class="flex items-center justify-between font-bold text-slate-700">
                    <span>${feed.time}</span>
                    <span class="text-emerald-700 font-semibold">${feed.condition}</span>
                  </div>
                  <div class="grid grid-cols-4 gap-2 text-slate-800 font-mono pt-1">
                    <div>BP: <strong>${feed.bp}</strong></div>
                    <div>SpO2: <strong class="text-emerald-700">${feed.spo2}</strong></div>
                    <div>Pulse: <strong class="text-sky-700">${feed.pulse}</strong></div>
                    <div>Sugar: <strong>${feed.sugar}</strong></div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  async simulateLogVital() {
    const bp = prompt('Enter Blood Pressure (e.g. 121/79 mmHg):', '121/79 mmHg');
    if (!bp) return;
    const pulse = prompt('Enter Pulse (bpm):', '75 bpm');
    const spo2 = prompt('Enter SpO2 (%):', '99%');
    const sugar = prompt('Enter Blood Glucose (mg/dL):', '118 mg/dL');
    const note = prompt('Enter Caregiver observation note:', 'Patient alert and comfortable after dinner');
    try {
      const res = await fetch('/api/care_companion/log_vital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bp, spo2: spo2 || '99%', pulse: pulse || '75 bpm', sugar: sugar || '118 mg/dL', note: note || 'Routine checkup' })
      });
      const data = await res.json();
      if (data.status === 'success') {
        this.showToast('Vital reading logged! Synced to Hospital & Family portal.', 'success');
        this.refreshAllData();
      }
    } catch (e) {
      this.showToast('Failed to log vital', 'error');
    }
  },

  renderHospitalAppointments() {
    const rosterEl = document.getElementById('hospital-roster-list');
    if (!rosterEl || !this.state?.appointments) return;
    rosterEl.innerHTML = this.state.appointments.map(a => `
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-3">
          <span class="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-black flex items-center justify-center text-sm">#${a.token_number}</span>
          <div>
            <div class="font-bold text-slate-900">${a.patient_name}</div>
            <div class="text-slate-500">${a.reason}</div>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="font-semibold text-slate-700">${a.slot}</div>
          <span class="badge-pill bg-sky-100 text-sky-800 text-[10px]">${a.status}</span>
        </div>
      </div>`).join('');
    lucide.createIcons();
  },

  updateBreadcrumb() {
    // no-op in new layout (sidebar replaces breadcrumb)
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    let bg = 'bg-slate-900 text-white';
    if (type === 'success') bg = 'bg-emerald-600 text-white';
    if (type === 'error') bg = 'bg-red-600 text-white';
    if (type === 'warning') bg = 'bg-amber-600 text-white';
    toast.className = `${bg} px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 transition-all transform duration-300 translate-y-2 opacity-0 pointer-events-auto`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 50);
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// ── MAP CLOSE OVERRIDE (to navigate home instead of old tab) ──
if (typeof MapLocator !== 'undefined') {
  const _origCloseMap = MapLocator.closeMap;
  MapLocator.closeMap = function () {
    try { if (this.map) this.map.closePopup(); } catch(e) {}
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('hidden');
    App.goHome();
  };
}

// ── BOOT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
