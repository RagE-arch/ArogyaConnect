/**
 * AarogyaConnect 360 - Multilingual Voice AI Assistant
 * Supports Speech Recognition, Speech Synthesis, Slot Vocalization, and Stop Controls
 */

const VoiceAI = {
  recognition: null,
  isListening: false,
  selectedLanguage: 'en',
  synth: window.speechSynthesis || null,
  currentAudio: null,
  isPlayingAudio: false,

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      
      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateVoiceUIState(true);
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Speech transcript:", transcript);
        const inputField = document.getElementById('voice-query-input');
        if (inputField) inputField.value = transcript;
        this.processVoiceQuery(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        this.updateVoiceUIState(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateVoiceUIState(false);
      };
    } else {
      console.warn("Web SpeechRecognition not supported in this browser. Falling back to text input & server audio.");
    }
  },

  setLanguage(langCode, triggerGreeting = true) {
    this.selectedLanguage = langCode || 'en';
    if (this.recognition) {
      const bcp47Map = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'mr': 'mr-IN'
      };
      this.recognition.lang = bcp47Map[this.selectedLanguage] || 'en-IN';
    }

    // Stop any ongoing speech before switching language
    this.stopAll();

    // Show localized greeting in response card
    const greetings = {
      'en': "Hello! I am your Aarogya Voice Assistant. Please tell me your symptoms or which doctor you would like to consult.",
      'hi': "नमस्ते! मैं आपका आरोग्य वॉयस असिस्टेंट हूँ। कृपया अपनी स्वास्थ्य समस्या बताएं या डॉक्टर का नाम बताएं।",
      'bn': "নমস্কার! আমি আপনার আরোগ্য ভয়েস অ্যাসিস্ট্যান্ট। আপনার স্বাস্থ্য সমস্যা জানান।",
      'te': "నమస్కారం! నేను మీ ఆరోగ్య వాయిస్ అసిస్టెంట్‌ని. మీ సమస్యను లేదా వైద్యుడి పేరును చెప్పండి.",
      'ta': "வணக்கம்! நான் உங்கள் ஆரோக்கிய குரல் உதவியாளர். உங்கள் உடல்நலப் பிரச்சனையைக் கூறுங்கள்.",
      'mr': "नमस्कार! मी आपला आरोग्य व्हॉईस असिस्टंट आहे. कृपया आपली आरोग्य समस्या सांगा."
    };

    const welcomeMsg = greetings[this.selectedLanguage] || greetings.en;

    const responseCard = document.getElementById('voice-response-card');
    const responseTextElem = document.getElementById('voice-response-spoken');
    const recBox = document.getElementById('voice-recommendations-box');

    if (responseCard && responseTextElem) {
      responseCard.classList.remove('hidden');
      responseTextElem.innerText = welcomeMsg;
      if (recBox) recBox.innerHTML = '';
      if (triggerGreeting) {
        this.speakResponse(welcomeMsg, null);
      }
    }
  },

  toggleListen() {
    if (!this.recognition) {
      App.showToast("Speech recognition is not supported in this browser. Please type your query in the box.", "info");
      document.getElementById('voice-query-input')?.focus();
      return;
    }

    if (this.isListening) {
      this.stopAll();
    } else {
      this.stopAll(); // Stop any audio playing
      this.setLanguage(this.selectedLanguage, false);
      try {
        this.recognition.start();
      } catch (e) {
        console.error("Recognition start error:", e);
      }
    }
  },

  stopAll() {
    // 1. Cancel speech synthesis immediately
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    // 2. Pause and reset HTML5 Audio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    // 3. Abort speech recognition
    if (this.recognition && this.isListening) {
      try {
        this.recognition.abort();
      } catch (e) {}
      this.isListening = false;
    }

    this.isPlayingAudio = false;
    this.updateVoiceUIState(false);
    this.showStopButton(false);
  },

  showStopButton(show) {
    const stopBtn = document.getElementById('btn-voice-stop');
    if (stopBtn) {
      if (show) stopBtn.classList.remove('hidden');
      else stopBtn.classList.add('hidden');
    }
  },

  closeVoiceResponseCard() {
    this.stopAll();
    const card = document.getElementById('voice-response-card');
    if (card) card.classList.add('hidden');
  },

  updateVoiceUIState(listening) {
    const micBtn = document.getElementById('btn-voice-mic');
    const waveIndicator = document.getElementById('voice-wave-indicator');
    const statusText = document.getElementById('voice-status-text');

    if (micBtn) {
      if (listening) {
        micBtn.classList.remove('bg-sky-600', 'hover:bg-sky-700');
        micBtn.classList.add('bg-red-600', 'animate-pulse');
        micBtn.innerHTML = `<i data-lucide="mic-off" class="w-8 h-8 text-white"></i>`;
      } else {
        micBtn.classList.remove('bg-red-600', 'animate-pulse');
        micBtn.classList.add('bg-sky-600', 'hover:bg-sky-700');
        micBtn.innerHTML = `<i data-lucide="mic" class="w-8 h-8 text-white"></i>`;
      }
      lucide.createIcons();
    }

    if (waveIndicator) {
      waveIndicator.style.display = listening ? 'flex' : 'none';
    }

    if (statusText) {
      statusText.innerText = listening ? 
        I18n.t('voice_status_listening') : 
        I18n.t('voice_status_ready');
    }
  },

  async processVoiceQuery(queryText) {
    if (!queryText || !queryText.trim()) return;

    this.stopAll(); // Stop any ongoing speech

    const responseCard = document.getElementById('voice-response-card');
    const responseTextElem = document.getElementById('voice-response-spoken');
    const recommendationsElem = document.getElementById('voice-recommendations-box');

    if (responseCard) responseCard.classList.remove('hidden');
    if (responseTextElem) responseTextElem.innerText = "Analyzing your medical query and locating doctors...";
    if (recommendationsElem) recommendationsElem.innerHTML = '';

    try {
      const res = await fetch('/api/voice/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: queryText,
          lang: this.selectedLanguage
        })
      });

      const data = await res.json();
      console.log("Voice triage response:", data);

      if (responseTextElem) {
        responseTextElem.innerText = data.voice_response;
      }

      // Vocalize response: native speech synthesis or server MP3
      this.speakResponse(data.voice_response, data.audio_url);

      // Render Doctor & Slots
      if (recommendationsElem && data.recommended_doctor) {
        const doc = data.recommended_doctor;
        recommendationsElem.innerHTML = `
          <div class="p-4 bg-white rounded-xl border border-sky-100 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${data.is_emergency ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'} mb-2">
                  ${data.urgency_level}
                </span>
                <h4 class="text-lg font-bold text-slate-800">${doc.name}</h4>
                <p class="text-sm font-medium text-sky-600">${doc.specialty}</p>
                <p class="text-xs text-slate-500 mt-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 inline"></i> ${doc.hospital_name} (${doc.distance_km} km away)</p>
                <p class="text-xs text-slate-600 mt-1 font-semibold">Consultation Fee: ₹${doc.consultation_fee}</p>
              </div>
              <div class="flex items-center gap-1">
                <button onclick="VoiceAI.reSpeakCurrent()" class="p-2 text-sky-600 hover:bg-sky-50 rounded-lg" title="Repeat Voice">
                  <i data-lucide="volume-2" class="w-5 h-5"></i>
                </button>
                <button onclick="VoiceAI.stopAll()" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Stop Audio">
                  <i data-lucide="volume-x" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <!-- Slots Breakdown for next few days -->
            <div class="mt-4 pt-3 border-t border-slate-100">
              <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Available Slots (Next Few Days)</h5>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-xs">
                  <span class="w-20 font-semibold text-slate-700">Today:</span>
                  <div class="flex flex-wrap gap-1">
                    ${(doc.available_slots.Today || []).map(s => `
                      <button onclick="VoiceAI.quickBookSlot('${doc.id}', 'Today, Oct 13', '${s}', 'Voice AI Consultation')" class="px-2 py-1 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white rounded border border-sky-200 transition text-xs font-medium">
                        ${s}
                      </button>
                    `).join('')}
                  </div>
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="w-20 font-semibold text-slate-700">Tomorrow:</span>
                  <div class="flex flex-wrap gap-1">
                    ${(doc.available_slots.Tomorrow || []).map(s => `
                      <button onclick="VoiceAI.quickBookSlot('${doc.id}', 'Tomorrow, Oct 14', '${s}', 'Voice AI Consultation')" class="px-2 py-1 bg-slate-50 text-slate-700 hover:bg-sky-600 hover:text-white rounded border border-slate-200 transition text-xs font-medium">
                        ${s}
                      </button>
                    `).join('')}
                  </div>
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <span class="w-20 font-semibold text-slate-700">Day After:</span>
                  <div class="flex flex-wrap gap-1">
                    ${(doc.available_slots['Day After'] || []).map(s => `
                      <button onclick="VoiceAI.quickBookSlot('${doc.id}', 'Day After, Oct 15', '${s}', 'Voice AI Consultation')" class="px-2 py-1 bg-slate-50 text-slate-700 hover:bg-sky-600 hover:text-white rounded border border-slate-200 transition text-xs font-medium">
                        ${s}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        lucide.createIcons();
      }

    } catch (err) {
      console.error("Error processing voice query:", err);
      if (responseTextElem) responseTextElem.innerText = "Error analyzing voice request. Please check connection.";
    }
  },

  lastSpokenText: "",
  lastAudioUrl: "",

  speakResponse(text, audioUrl) {
    this.lastSpokenText = text;
    this.lastAudioUrl = audioUrl;

    this.stopAll(); // Ensure any previous audio is killed

    this.showStopButton(true);
    this.isPlayingAudio = true;

    // Try server-generated MP3 audio first
    if (audioUrl) {
      try {
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.onended = () => {
          this.isPlayingAudio = false;
          this.showStopButton(false);
        };
        this.currentAudio.onerror = () => {
          this.nativeSpeak(text);
        };
        this.currentAudio.play().catch(e => {
          console.warn("Audio element play error, falling back to SpeechSynthesis:", e);
          this.nativeSpeak(text);
        });
        return;
      } catch (e) {
        console.warn("Audio creation failed:", e);
      }
    }

    this.nativeSpeak(text);
  },

  nativeSpeak(text) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = this.synth.getVoices();
    const langPrefix = this.selectedLanguage;
    const matchedVoice = voices.find(v => v.lang.startsWith(langPrefix));
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => {
      this.isPlayingAudio = false;
      this.showStopButton(false);
    };
    utterance.onerror = () => {
      this.isPlayingAudio = false;
      this.showStopButton(false);
    };

    this.synth.speak(utterance);
  },

  reSpeakCurrent() {
    if (this.lastSpokenText) {
      this.speakResponse(this.lastSpokenText, this.lastAudioUrl);
    }
  },

  async quickBookSlot(doctorId, dateSlot, timeSlot, reason) {
    this.stopAll();
    try {
      const res = await fetch('/api/patient/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctor_id: doctorId,
          date_slot: dateSlot,
          time_slot: timeSlot,
          reason: reason
        })
      });

      const result = await res.json();
      if (result.status === 'success') {
        const apt = result.appointment;
        App.showToast(`Appointment booked successfully with ${apt.doctor_name} for ${apt.date} at ${apt.slot}! OPD Token: #${apt.token_number}`, 'success');
        this.speakResponse(`Your appointment with ${apt.doctor_name} is confirmed for ${apt.slot}. Your OPD token is number ${apt.token_number}.`, null);
        App.refreshAllData();
      }
    } catch (e) {
      App.showToast("Failed to book appointment", "error");
    }
  }
};
