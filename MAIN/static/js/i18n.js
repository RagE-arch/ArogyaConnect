/**
 * AarogyaConnect 360 - Multilingual Translation Engine (i18n)
 * Supports English, Hindi, Bengali, Telugu, Tamil, Marathi
 */

const I18N_DATA = {
  en: {
    brand_sub: "Universal Healthcare Platform",
    role_patient: "Patient",
    role_hospital: "Hospital & Doctor",
    role_family: "Family (View-Only)",
    btn_sos: "EMERGENCY SOS",
    btn_back: "Back",
    btn_home: "Home",
    view_all_services: "View All 11 Services",
    back_to_services: "← Back to Services Directory",
    back_to_dashboard: "← Back to Main Dashboard",
    back_to_patient_portal: "← Back to Patient Portal",
    back_to_safe: "← Back to Safe Dashboard",
    back_to_top: "↑ Back to Top",
    close_map: "❌ Close Map",

    services_dir_title: "Patient Services Directory",
    services_dir_sub: "Access all 11 patient features with seamless back-navigation.",
    features_active_badge: "All 11 Features Active",

    feat_1_title: "1. Voice AI & Slot Assistant",
    feat_1_desc: "Speak symptoms in your preferred language. Recommends doctors & speaks slots.",
    feat_1_action: "Open Voice AI",

    feat_2_title: "2. Live OPD Token Wait Queue",
    feat_2_desc: "Live token status, estimated wait time (~25 mins), and animated loading bar.",
    feat_2_action: "View Queue Progress",

    feat_3_title: "3. Doctor Map & Pricing",
    feat_3_desc: "Find nearby doctors matching your problem, compare consultation fees and book slots.",
    feat_3_action: "Explore Map",

    feat_4_title: "4. Prescription & Med Reminders",
    feat_4_desc: "Upload Rx for home delivery, hospital double-checking, dose schedules & reasons for each medicine.",
    feat_4_action: "View Pharmacy",

    feat_5_title: "5. Diet Plan & Meal Checker",
    feat_5_desc: "Clinical diet schedule tailored for diabetes & lactose allergy, plus instant food safety checker.",
    feat_5_action: "Check Diet Plan",

    feat_6_title: "6. AI Health Trajectory Charts",
    feat_6_desc: "6-Month interactive curves of blood glucose, BP and HbA1c with plain language AI explanations.",
    feat_6_action: "View Trend Graphs",

    feat_7_title: "7. Digital Health Locker & Bills",
    feat_7_desc: "Store and categorize lab reports, discharge summaries, ECG scans and hospital bills securely.",
    feat_7_action: "Open Document Locker",

    feat_8_title: "8. Govt Schemes & DigiLocker",
    feat_8_desc: "Ayushman Bharat ₹5 Lakh coverage check, ABHA Health ID with QR code, and DigiLocker sync.",
    feat_8_action: "View Schemes & ID",

    feat_9_title: "9. Insurance Claim Concierge",
    feat_9_desc: "Human agent Aakash Verma ready to help with hospital paperwork, cashless approvals & TPA.",
    feat_9_action: "Talk to Claim Agent",

    feat_10_title: "10. On-Demand Care Companion",
    feat_10_desc: "Assigned caregiver attendant for when family is away. Live vitals feed reported to hospital & family.",
    feat_10_action: "View Caregiver Feed",

    feat_11_title: "11. Emergency SOS Rapid Hub",
    feat_11_desc: "One-touch emergency ambulance dispatch, GPS beacon, and immediate trauma center readiness.",
    feat_11_action: "Open Emergency Hub",

    voice_ai_title: "Speak Your Health Problem or Book a Doctor",
    voice_ai_sub: "Speak in English, Hindi, Bengali, Telugu, Tamil, or Marathi. The AI will diagnose symptoms, recommend nearby specialists, and speak available time slots for today, tomorrow, and the next few days.",
    voice_status_ready: "Tap the microphone to speak, or type below",
    voice_status_listening: "Listening to your symptoms... Speak naturally",
    voice_placeholder: "e.g. I have severe chest pain and breathlessness",
    voice_btn_analyze: "Analyze & Speak",
    voice_btn_stop: "⏹️ Stop Voice",
    voice_welcome: "Hello! I am your Aarogya Voice Assistant. Please tell me your symptoms or which doctor you would like to consult."
  },

  hi: {
    brand_sub: "सार्वभौमिक स्वास्थ्य सेवा प्रणाली",
    role_patient: "मरीज़ (Patient)",
    role_hospital: "अस्पताल और डॉक्टर",
    role_family: "परिवार (केवल देखें)",
    btn_sos: "आपातकालीन SOS",
    btn_back: "वापस जाएं",
    btn_home: "होम",
    view_all_services: "सभी 11 सेवाएं देखें",
    back_to_services: "← सेवा निर्देशिका पर वापस जाएं",
    back_to_dashboard: "← मुख्य डैशबोर्ड पर वापस जाएं",
    back_to_patient_portal: "← मरीज़ पोर्टल पर वापस जाएं",
    back_to_safe: "← सुरक्षित डैशबोर्ड पर वापस जाएं",
    back_to_top: "↑ ऊपर जाएं",
    close_map: "❌ नक्शा बंद करें",

    services_dir_title: "मरीज़ सेवा निर्देशिका",
    services_dir_sub: "आसान नेविगेशन के साथ सभी 11 स्वास्थ्य सुविधाओं का उपयोग करें।",
    features_active_badge: "सभी 11 सेवाएं सक्रिय",

    feat_1_title: "1. वॉयस AI और स्लॉट सहायक",
    feat_1_desc: "अपनी पसंदीदा भाषा में लक्षण बताएं। डॉक्टर की सलाह और अगले दिनों के स्लॉट सुनें।",
    feat_1_action: "वॉयस AI खोलें",

    feat_2_title: "2. लाइव ओपीडी टोकन कतार",
    feat_2_desc: "लाइव टोकन स्थिति, अनुमानित समय (~25 मिनट) और एनिमेटेड लोडिंग बार।",
    feat_2_action: "कतार की स्थिति देखें",

    feat_3_title: "3. डॉक्टर का नक्शा और फीस",
    feat_3_desc: "अपनी बीमारी के अनुसार निकटतम डॉक्टर खोजें, परामर्श शुल्क देखें और स्लॉट बुक करें।",
    feat_3_action: "नक्शा देखें",

    feat_4_title: "4. पर्चे की जांच और दवा रिमाइंडर",
    feat_4_desc: "दवाओं की होम डिलीवरी हेतु पर्चा अपलोड करें, अस्पताल स्टाफ द्वारा डबल-चेक और रिमाइंडर।",
    feat_4_action: "फार्मेसी देखें",

    feat_5_title: "5. आहार योजना और भोजन विश्लेषक",
    feat_5_desc: "मधुमेह और लैक्टोज एलर्जी के लिए विशेष भोजन योजना और तुरंत भोजन सुरक्षा जांच।",
    feat_5_action: "आहार योजना देखें",

    feat_6_title: "6. AI स्वास्थ्य सुधार ग्राफ",
    feat_6_desc: "ब्लड शुगर, बीपी और HbA1c के 6 महीने के चार्ट और आसान भाषा में स्वास्थ्य विश्लेषण।",
    feat_6_action: "स्वास्थ्य ग्राफ देखें",

    feat_7_title: "7. डिजिटल हेल्थ लॉकर और बिल",
    feat_7_desc: "लैब रिपोर्ट, डिस्चार्ज समरी, ईसीजी और अस्पताल के बिल सुरक्षित रखें।",
    feat_7_action: "हेल्थ लॉकर खोलें",

    feat_8_title: "8. सरकारी योजनाएं और आभा (ABHA)",
    feat_8_desc: "आयुष्मान भारत ₹5 लाख मुफ्त इलाज, आभा कार्ड क्यूआर कोड और डिजिलॉकर समन्वय।",
    feat_8_action: "योजनाएं व कार्ड देखें",

    feat_9_title: "9. बीमा सहायता एजेंट",
    feat_9_desc: "कैशलेस क्लेम, अस्पताल की कागजी कार्रवाई के लिए समर्पित एजेंट आकाश वर्मा।",
    feat_9_action: "बीमा एजेंट से बात करें",

    feat_10_title: "10. समर्पित देखभाल सहायक (नर्स)",
    feat_10_desc: "परिवार की अनुपस्थिति में प्रमाणित नर्स सिस्टर प्रिया द्वारा बीपी, पल्स और शुगर मॉनिटरिंग।",
    feat_10_action: "देखभाल लॉग देखें",

    feat_11_title: "11. आपातकालीन एसओएस हब",
    feat_11_desc: "एक क्लिक में एम्बुलेंस बुलावा, जीपीएस लोकेशन प्रसारण और आपातकालीन अस्पताल सूचना।",
    feat_11_action: "इमरजेंसी हब खोलें",

    voice_ai_title: "अपनी स्वास्थ्य समस्या बोलें या डॉक्टर खोजें",
    voice_ai_sub: "हिन्दी, अंग्रेजी या अपनी भाषा में बोलें। AI आपकी बीमारी का विश्लेषण करेगा और अगले दिनों के उपलब्ध स्लॉट बोलकर बताएगा।",
    voice_status_ready: "बोलने के लिए माइक दबाएं, या नीचे लिखें",
    voice_status_listening: "आपके लक्षण सुने जा रहे हैं... स्वाभाविक रूप से बोलें",
    voice_placeholder: "जैसे: मुझे सीने में दर्द और सांस लेने में तकलीफ है",
    voice_btn_analyze: "विश्लेषण करें और बोलें",
    voice_btn_stop: "⏹️ बोलना बंद करें",
    voice_welcome: "नमस्ते! मैं आपका आरोग्य वॉयस असिस्टेंट हूँ। कृपया अपनी स्वास्थ्य समस्या बताएं या डॉक्टर का नाम बताएं।"
  },

  bn: {
    brand_sub: "সার্বজনীন স্বাস্থ্যসেবা প্ল্যাটফর্ম",
    role_patient: "রোগী (Patient)",
    role_hospital: "হাসপাতাল ও ডাক্তার",
    role_family: "পরিবার (শুধু দেখার জন্য)",
    btn_sos: "জরুরি SOS",
    btn_back: "ফিরে যান",
    btn_home: "হোম",
    view_all_services: "সমস্ত ১১টি পরিষেবা দেখুন",
    back_to_services: "← পরিষেবা ডিরেক্টরিতে ফিরে যান",
    back_to_dashboard: "← প্রধান ড্যাশবোর্ডে ফিরে যান",
    back_to_patient_portal: "← রোগী পোর্টালে ফিরে যান",
    back_to_safe: "← নিরাপদ ড্যাশবোর্ডে ফিরে যান",
    back_to_top: "↑ উপরে যান",
    close_map: "❌ মানচিত্র বন্ধ করুন",

    services_dir_title: "রোগী পরিষেবা ডিরেক্টরি",
    services_dir_sub: "সমস্ত ১১টি স্বাস্থ্য পরিষেবা সহজে ব্যবহার করুন।",
    features_active_badge: "সমস্ত ১১টি পরিষেবা সক্রিয়",

    feat_1_title: "১. ভয়েস এআই এবং স্লট সহকারী",
    feat_1_desc: "আপনার ভাষায় লক্ষণ বলুন। ডাক্তার পরামর্শ ও সময়সূচি শুনুন।",
    feat_1_action: "ভয়েস এআই খুলুন",

    feat_2_title: "২. লাইভ ওপিডি টোকেন কিউ",
    feat_2_desc: "লাইভ টোকেন স্ট্যাটাস, আনুমানিক সময় (~২৫ মিনিট) এবং লোডিং বার।",
    feat_2_action: "কিউ দেখুন",

    feat_3_title: "৩. ডাক্তার মানচিত্র ও ফি",
    feat_3_desc: "নিকটস্থ ডাক্তার খুঁজুন, ফি যাচাই করুন এবং স্লট বুক করুন।",
    feat_3_action: "মানচিত্র খুলুন",

    feat_4_title: "৪. প্রেসক্রিপশন ও ওষুধ ডেলিভারি",
    feat_4_desc: "প্রেসক্রিপশন আপলোড, হাসপাতাল দ্বারা ডাবল চেক এবং ওষুধ অনুস্মারক।",
    feat_4_action: "ফার্মেসি দেখুন",

    feat_5_title: "৫. খাদ্য তালিকা ও খাবার পরীক্ষক",
    feat_5_desc: "ডায়াবেটিস এবং অ্যালার্জি সচেতন খাদ্য তালিকা ও খাবার বিশ্লেষণ।",
    feat_5_action: "ডায়েট প্ল্যান দেখুন",

    feat_6_title: "৬. এআই স্বাস্থ্য উন্নতির গ্রাফ",
    feat_6_desc: "রক্তের শর্করা ও রক্তচাপের ৬ মাসের চার্ট এবং সহজ বিশ্লেষণ।",
    feat_6_action: "স্বাস্থ্য গ্রাফ দেখুন",

    feat_7_title: "৭. ডিজিটাল হেলথ লকার",
    feat_7_desc: "ল্যাব রিপোর্ট, প্রেসক্রিপশন এবং বিল সুরক্ষিত রাখুন।",
    feat_7_action: "হেলথ লকার খুলুন",

    feat_8_title: "৮. সরকারি প্রকল্প ও আভা (ABHA)",
    feat_8_desc: "আয়ুষ্মান ভারত ₹৫ লাখ কভার এবং আভা ডিজিটাল কার্ড।",
    feat_8_action: "প্রকল্প দেখুন",

    feat_9_title: "৯. বীমা সহায়তা ডেস্ক",
    feat_9_desc: "ক্যাশলেস ক্লেইম ও কাগজপত্রের জন্য মানবিক সহায়তা।",
    feat_9_action: "এজেন্টের সাথে কথা বলুন",

    feat_10_title: "১০. যত্ন সহকারী (নার্স)",
    feat_10_desc: "পরিবারের অনুপস্থিতিতে নার্স প্রিয়া দ্বারা নিয়মিত স্বাস্থ্য মনিটরিং।",
    feat_10_action: "লগ দেখুন",

    feat_11_title: "১১. জরুরি এসওএস হাব",
    feat_11_desc: "তাত্ক্ষণিক অ্যাম্বুলেন্স প্রেরণ ও ট্রমা সেন্টারে যোগাযোগ।",
    feat_11_action: "জরুরি হাব খুলুন",

    voice_ai_title: "স্বাস্থ্য সমস্যা বলুন বা ডাক্তার খুঁজুন",
    voice_ai_sub: "বাংলায় কথা বলুন। এআই লক্ষণ বিশ্লেষণ করে স্লট জানাবে।",
    voice_status_ready: "বলার জন্য মাইক্রোফোন ট্যাপ করুন",
    voice_status_listening: "শুনছি... স্বাভাবিকভাবে বলুন",
    voice_placeholder: "যেমন: আমার বুকে তীব্র ব্যথা এবং শ্বাসকষ্ট হচ্ছে",
    voice_btn_analyze: "বিশ্লেষণ করুন ও বলুন",
    voice_btn_stop: "⏹️ কথা বন্ধ করুন",
    voice_welcome: "নমস্কার! আমি আপনার আরোগ্য ভয়েস অ্যাসিস্ট্যান্ট। আপনার স্বাস্থ্য সমস্যা জানান।"
  },

  te: {
    brand_sub: "సార్వత్రిక ఆరోగ్య వేదిక",
    role_patient: "రోగి (Patient)",
    role_hospital: "ఆసుపత్రి & వైద్యులు",
    role_family: "కుటుంబం (చూడటానికి మాత్రమే)",
    btn_sos: "అత్యవసర SOS",
    btn_back: "వెనుకకు",
    btn_home: "హోమ్",
    view_all_services: "అన్ని 11 సేవలను చూడండి",
    back_to_services: "← సేవల డైరెక్టరీకి తిరిగి వెళ్లండి",
    back_to_dashboard: "← ప్రధాన డాష్‌బోర్డ్‌కు వెళ్లండి",
    back_to_patient_portal: "← రోగి పోర్టల్‌కు వెళ్లండి",
    back_to_safe: "← సురక్షిత డాష్‌బోర్డ్‌కు వెళ్లండి",
    back_to_top: "↑ పైకి వెళ్లండి",
    close_map: "❌ మ్యాప్ మూసివేయండి",

    services_dir_title: "రోగి సేవల డైరెక్టరీ",
    services_dir_sub: "అన్ని 11 ఆరోగ్య సేవలను సులభంగా యాక్సెస్ చేయండి.",
    features_active_badge: "అన్ని 11 సేవలు అందుబాటులో ఉన్నాయి",

    feat_1_title: "1. వాయిస్ AI & స్లాట్ అసిస్టెంట్",
    feat_1_desc: "మీ సమస్యను చెప్పండి. వైద్యులను సిఫార్సు చేసి స్లాట్‌లను తెలియజేస్తుంది.",
    feat_1_action: "వాయిస్ AI తెరవండి",

    feat_2_title: "2. లైవ్ OPD టోకెన్ క్యూ",
    feat_2_desc: "లైవ్ టోకెన్ స్థితి, నిరీక్షణ సమయం (~25 నిమి) & ప్రోగ్రెస్ బార్.",
    feat_2_action: "క్యూ చూడండి",

    feat_3_title: "3. వైద్యుల మ్యాప్ & ధరలు",
    feat_3_desc: "దగ్గరి వైద్యులను కనుగొనండి, ఫీజులను సరిపోల్చండి మరియు బుక్ చేయండి.",
    feat_3_action: "మ్యాప్ చూడండి",

    feat_4_title: "4. మందుల డెలివరీ & రిమైండర్లు",
    feat_4_desc: "ప్రిస్క్రిప్షన్ అప్‌లోడ్, ఆసుపత్రి డబుల్ చెక్ & రోజువారీ రిమైండర్లు.",
    feat_4_action: "ఫార్మసీ చూడండి",

    feat_5_title: "5. డైట్ ప్లాన్ & ఆహార విశ్లేషణ",
    feat_5_desc: "డయాబెటిస్ & అలెర్జీలకు అనుకూలమైన భోజన ప్రణాళిక.",
    feat_5_action: "డైట్ ప్లాన్ చూడండి",

    feat_6_title: "6. AI ఆరోగ్య మార్పుల గ్రాఫ్",
    feat_6_desc: "బ్లడ్ షుగర్, బీపీ 6 నెలల చార్టులు & సులభమైన వివరణ.",
    feat_6_action: "ఆరోగ్య గ్రాఫ్ చూడండి",

    feat_7_title: "7. డిజిటల్ హెల్త్ లాకర్",
    feat_7_desc: "ల్యాబ్ నివేదికలు, ప్రిస్క్రిప్షన్లు & బిల్లులు భద్రపరచండి.",
    feat_7_action: "లాకర్ తెరవండి",

    feat_8_title: "8. ప్రభుత్వ పథకాలు & ఆభా (ABHA)",
    feat_8_desc: "ఆయుష్మాన్ భారత్ ₹5 లక్షల కవర్ & ఆభా హెల్త్ ఐడీ.",
    feat_8_action: "పథకాలు చూడండి",

    feat_9_title: "9. బీమా సహాయ డెస్క్",
    feat_9_desc: "క్యాష్‌లెస్‌ క్లెయిమ్‌లు, పేపర్‌వర్క్‌కు సహాయం చేయడానికి ఏజెంట్ ఆకాష్ వర్మ.",
    feat_9_action: "ఏజెంట్‌తో మాట్లాడండి",

    feat_10_title: "10. సంరక్షణ సహాయకురాలు (నర్సు)",
    feat_10_desc: "కుటుంబం అందుబాటులో లేనప్పుడు నర్సింగ్ సహాయకురాలు ప్రియ ద్వారా మానిటరింగ్.",
    feat_10_action: "లాగ్ చూడండి",

    feat_11_title: "11. అత్యవసర SOS హబ్",
    feat_11_desc: "ఒక్క క్లిక్‌తో అంబులెన్స్ పిలుపు & ట్రూమా సెంటర్ అలర్ట్.",
    feat_11_action: "ఎమర్జెన్సీ హబ్ తెరవండి",

    voice_ai_title: "ఆరోగ్య సమస్యను చెప్పండి లేదా వైద్యులను బుక్ చేయండి",
    voice_ai_sub: "తెలుగు లేదా ఇంగ్లీషులో మాట్లాడండి. AI లక్షణాలను విశ్లేషించి స్లాట్‌లను చెబుతుంది.",
    voice_status_ready: "మాట్లాడటానికి మైక్ నొక్కండి లేదా టైప్ చేయండి",
    voice_status_listening: "వింటున్నాము... సహజంగా మాట్లాడండి",
    voice_placeholder: "ఉదా: నాకు ఛాతీలో నొప్పి మరియు శ్వాస తీసుకోవడంలో ఇబ్బందిగా ఉంది",
    voice_btn_analyze: "విశ్లేషించి చెప్పండి",
    voice_btn_stop: "⏹️ మాట్లాడటం ఆపండి",
    voice_welcome: "నమస్కారం! నేను మీ ఆరోగ్య వాయిస్ అసిస్టెంట్‌ని. మీ సమస్యను చెప్పండి."
  },

  ta: {
    brand_sub: "உலகளாவிய சுகாதார தளம்",
    role_patient: "நோயாளி (Patient)",
    role_hospital: "மருத்துவமனை & மருத்துவர்கள்",
    role_family: "குடும்பத்தினர் (பார்வை மட்டும்)",
    btn_sos: "அவசர SOS",
    btn_back: "பின்னால்",
    btn_home: "முகப்பு",
    view_all_services: "அனைத்து 11 சேவைகளையும் காண்க",
    back_to_services: "← சேவைகள் அடைவுக்கு திரும்புக",
    back_to_dashboard: "← முதன்மை முகப்புக்கு திரும்புக",
    back_to_patient_portal: "← நோயாளி பக்கத்திற்கு திரும்புக",
    back_to_safe: "← பாதுகாப்பான பக்கத்திற்கு திரும்புக",
    back_to_top: "↑ மேலே செல்க",
    close_map: "❌ வரைபடத்தை மூடு",

    services_dir_title: "நோயாளி சேவைகள் அடைவு",
    services_dir_sub: "அனைத்து 11 சுகாதார சேவைகளையும் எளிதாகப் பயன்படுத்துங்கள்.",
    features_active_badge: "அனைத்து 11 சேவைகளும் செயலில் உள்ளன",

    feat_1_title: "1. வாய்ஸ் AI & முன்பதிவு உதவியாளர்",
    feat_1_desc: "உங்கள் மொழியில் அறிகுறிகளைக் கூறுங்கள். மருத்துவர் & நேரங்களை அறியவும்.",
    feat_1_action: "வாய்ஸ் AI திறக்கவும்",

    feat_2_title: "2. நேரடி OPD வரிசை நிலை",
    feat_2_desc: "நேரடி டோக்கன் நிலை, காத்திருப்பு நேரம் (~25 நிமி) & லோடிங் பார்.",
    feat_2_action: "வரிசையைக் காண்க",

    feat_3_title: "3. மருத்துவர் வரைபடம் & கட்டணம்",
    feat_3_desc: "அருகிலுள்ள மருத்துவர்களைக் கண்டறிந்து, கட்டணத்தை ஒப்பிட்டு பதிவு செய்யவும்.",
    feat_3_action: "வரைபடத்தைக் காண்க",

    feat_4_title: "4. மருந்து டெலிவரி & நினைவூட்டல்",
    feat_4_desc: "மருந்து சீட்டு பதிவேற்றம், மருத்துவமனை மறுபரிசீலனை & நினைவூட்டல்கள்.",
    feat_4_action: "மருந்தகத்தைக் காண்க",

    feat_5_title: "5. உணவுத் திட்டம் & உணவு பரிசோதனை",
    feat_5_desc: "நீரிழிவு & ஒவ்வாமைக்கான உணவுத் திட்டம் மற்றும் உடனடி ஆய்வு.",
    feat_5_action: "உணவுத் திட்டத்தைக் காண்க",

    feat_6_title: "6. AI சுகாதார முன்னேற்ற வரைபடம்",
    feat_6_desc: "சர்க்கரை அளவு, இரத்த அழுத்தம் 6 மாத வரைபடங்கள் & எளிய விளக்கம்.",
    feat_6_action: "வரைபடத்தைக் காண்க",

    feat_7_title: "7. டிஜிட்டல் ஹெல்த் லாக்கர்",
    feat_7_desc: "மருத்துவ அறிக்கைகள் மற்றும் ரசீதுகளைப் பாதுகாப்பாக வைக்கவும்.",
    feat_7_action: "லாக்கரைத் திறக்கவும்",

    feat_8_title: "8. அரசு திட்டங்கள் & ஆபா (ABHA)",
    feat_8_desc: "ஆயுஷ்மான் பாரத் ₹5 லட்சம் காப்பீடு & ஆபா அடையாள அட்டை.",
    feat_8_action: "திட்டங்களைக் காண்க",

    feat_9_title: "9. காப்பீட்டு உதவி மையம்",
    feat_9_desc: "காப்பீட்டு கோரிக்கைகள் & ஆவணங்களுக்கு உதவ முகவர் ஆகாஷ் வர்மா.",
    feat_9_action: "முகவருடன் பேசுக",

    feat_10_title: "10. செவிலியர் உதவியாளர் (பிரியா)",
    feat_10_desc: "குடும்பத்தினர் இல்லாத போது நோயாளி உடல்நல கண்காணிப்பு பதிவுகள்.",
    feat_10_action: "பதிவைக் காண்க",

    feat_11_title: "11. அவசர SOS மையம்",
    feat_11_desc: "ஒரே தொடுதலில் ஆம்புலன்ஸ் அழைப்பு & மருத்துவமனை எச்சரிக்கை.",
    feat_11_action: "அவசர மையத்தைத் திறக்கவும்",

    voice_ai_title: "உடல்நலப் பிரச்சனையைக் கூறுங்கள் அல்லது மருத்துவரைத் தேடுங்கள்",
    voice_ai_sub: "தமிழில் பேசுங்கள். AI அறிகுறிகளைப் பகுப்பாய்வு செய்து நேரங்களை அறிவிக்கும்.",
    voice_status_ready: "பேச மைக்ரோஃபோனைத் தொடவும்",
    voice_status_listening: "கேட்கிறது... இயல்பாகப் பேசுங்கள்",
    voice_placeholder: "உதா: எனக்கு மார்பு வலி மற்றும் மூச்சுத் திணறல் உள்ளது",
    voice_btn_analyze: "ஆராய்ந்து பேசுக",
    voice_btn_stop: "⏹️ பேசுவதை நிறுத்துக",
    voice_welcome: "வணக்கம்! நான் உங்கள் ஆரோக்கிய குரல் உதவியாளர். உங்கள் உடல்நலப் பிரச்சனையைக் கூறுங்கள்."
  },

  mr: {
    brand_sub: "सार्वजनिक आरोग्य मंच",
    role_patient: "रुग्ण (Patient)",
    role_hospital: "रुग्णालय व डॉक्टर",
    role_family: "कुटुंब (फक्त पाहण्यासाठी)",
    btn_sos: "तातडीचा SOS",
    btn_back: "मागे जा",
    btn_home: "होम",
    view_all_services: "सर्व ११ सेवा पहा",
    back_to_services: "← सेवा सूचीवर परत जा",
    back_to_dashboard: "← मुख्य डॅशबोर्डवर परत जा",
    back_to_patient_portal: "← रुग्ण पोर्टलवर परत जा",
    back_to_safe: "← सुरक्षित डॅशबोर्डवर परत जा",
    back_to_top: "↑ वर जा",
    close_map: "❌ नकाशा बंद करा",

    services_dir_title: "रुग्ण सेवा निर्देशिका",
    services_dir_sub: "सर्व ११ आरोग्य सेवांचा सोप्या पद्धतीने लाभ घ्या.",
    features_active_badge: "सर्व ११ सेवा सक्रिय",

    feat_1_title: "१. व्हॉईस AI व स्लॉट सहाय्यक",
    feat_1_desc: "आपल्या भाषेत लक्षणे सांगा. डॉक्टरांची शिफारस आणि उपलब्ध स्लॉट्स ऐका.",
    feat_1_action: "व्हॉईस AI उघडा",

    feat_2_title: "२. थेट ओपीडी टोकन रांग",
    feat_2_desc: "थेट टोकन स्थिती, अंदाजे वेळ (~२५ मिनिटे) आणि प्रोग्रेस बार.",
    feat_2_action: "रांग तपासा",

    feat_3_title: "३. डॉक्टरांचा नकाशा व फी",
    feat_3_desc: "जवळचे डॉक्टर शोधा, फी तपासा आणि थेट स्लॉट बुक करा.",
    feat_3_action: "नकाशा पहा",

    feat_4_title: "४. औषध वितरण व रिमाइंडर",
    feat_4_desc: "प्रिस्क्रिप्शन अपलोड, रुग्णालय तपासणी आणि दररोजचे औषध रिमाइंडर.",
    feat_4_action: "फार्मसी पहा",

    feat_5_title: "५. आहार योजना व अन्न तपासणी",
    feat_5_desc: "मधुमेह आणि ॲलर्जीसाठी विशेष आहार आणि तत्काळ सुरक्षितता तपासणी.",
    feat_5_action: "आहार योजना पहा",

    feat_6_title: "६. AI आरोग्य प्रगती आलेख",
    feat_6_desc: "रक्तातील साखर आणि रक्तदाबाचे ६ महिन्यांचे चार्ट व सोपे विश्लेषण.",
    feat_6_action: "आरोग्य आलेख पहा",

    feat_7_title: "७. डिजिटल हेल्थ लॉकर",
    feat_7_desc: "लॅब रिपोर्ट्स, डिस्चार्ज समरी आणि बिलांचे सुरक्षित साठवण.",
    feat_7_action: "लॉकर उघडा",

    feat_8_title: "८. सरकारी योजना व आभा (ABHA)",
    feat_8_desc: "आयुष्मान भारत ₹५ लाख कवच आणि आभा ओळखपत्र.",
    feat_8_action: "योजना पहा",

    feat_9_title: "९. विमा सहाय्यता कक्ष",
    feat_9_desc: "कॅशलेस क्लेम आणि कागदपत्रांसाठी समर्पित सहाय्यक आकाश वर्मा.",
    feat_9_action: "विमा प्रतिनिधीशी बोला",

    feat_10_title: "१०. काळजीवाहक परिचारिका (प्रिया)",
    feat_10_desc: "कुटुंब गैरहजर असताना प्रमाणित परिचारिका द्वारे बीपी व साखर तपासणी.",
    feat_10_action: "नोंदी पहा",

    feat_11_title: "११. तातडीचा आपत्कालीन हब",
    feat_11_desc: "एका क्लिकवर रुग्णवाहिका पाचारण आणि रुग्णालय सतर्कता.",
    feat_11_action: "आपत्कालीन हब उघडा",

    voice_ai_title: "आरोग्य समस्या सांगा किंवा डॉक्टर शोधा",
    voice_ai_sub: "मराठी किंवा इंग्रजीत बोला. AI लक्षणांचे विश्लेषण करून स्लॉट सांगेल.",
    voice_status_ready: "बोलण्यासाठी माईक दाबा किंवा खाली लिहा",
    voice_status_listening: "ऐकत आहे... सहजपणे बोला",
    voice_placeholder: "उदा: मला छातीत दुखत असून श्वास घेण्यास त्रास होत आहे",
    voice_btn_analyze: "विश्लेषण करा व ऐका",
    voice_btn_stop: "⏹️ बोलणे थांबवा",
    voice_welcome: "नमस्कार! मी आपला आरोग्य व्हॉईस असिस्टंट आहे. कृपया आपली समस्या सांगा."
  }
};

const LOCALIZED_QUICK_PROMPTS = {
  en: [
    { text: "Chest pain & left arm", query: "I have chest tightness and pain in left arm" },
    { text: "High blood sugar", query: "Fasting blood sugar is 190 and feeling thirsty" },
    { text: "Knee joint pain", query: "Severe knee joint pain while walking" },
    { text: "Breathing difficulty", query: "Severe shortness of breath and wheezing" }
  ],
  hi: [
    { text: "सीने में दर्द और भारीपन", query: "मुझे सीने में दर्द और सांस लेने में दिक्कत है" },
    { text: "हाई ब्लड शुगर (मधुमेह)", query: "मेरी शुगर 190 है और बार-बार प्यास लग रही है" },
    { text: "घुटनों व जोड़ों का दर्द", query: "चलने में घुटनों और जोड़ों में तेज दर्द होता है" },
    { text: "सांस फूलना व दमा", query: "मुझे सांस लेने में भारीपन और खांसी है" }
  ],
  bn: [
    { text: "বুকে ব্যথা ও অস্বস্তি", query: "আমার বুকে তীব্র ব্যথা এবং শ্বাসকষ্ট হচ্ছে" },
    { text: "উচ্চ রক্তে শর্করা", query: "আমার সুগার ১৯০ এবং খুব তৃষ্ণা পাচ্ছে" },
    { text: "হাঁটু ও গাঁটের ব্যথা", query: "হাঁটার সময় হাঁটুতে খুব ব্যথা করে" }
  ],
  te: [
    { text: "ఛాతీ నొప్పి & శ్వాస ఇబ్బంది", query: "నాకు ఛాతీలో నొప్పి మరియు శ్వాస తీసుకోవడంలో ఇబ్బందిగా ఉంది" },
    { text: "ఎక్కువ బ్లడ్ షుగర్", query: "నా షుగర్ 190 ఉంది మరియు దాహం ఎక్కువగా వేస్తుంది" },
    { text: "కీళ్ల & మోకాళ్ల నొప్పులు", query: "నడిచేటప్పుడు మోకాళ్లలో తీవ్రమైన నొప్పి వస్తుంది" }
  ],
  ta: [
    { text: "மார்பு வலி & மூச்சுத்திணறல்", query: "எனக்கு மார்பு வலி மற்றும் மூச்சுத் திணறல் உள்ளது" },
    { text: "அதிக சர்க்கரை அளவு", query: "எனது சர்க்கரை அளவு 190 மற்றும் தாகம் அதிகமாக உள்ளது" },
    { text: "மூட்டு & முழங்கால் வலி", query: "நடக்கும்போது முழங்காலில் கடுமையான வலி ஏற்படுகிறது" }
  ],
  mr: [
    { text: "छातीत दुखणे व धाप लागणे", query: "मला छातीत दुखत असून श्वास घेण्यास त्रास होत आहे" },
    { text: "उच्च रक्त शर्करा", query: "माझी शुगर १९० आहे आणि वारंवार तहान लागत आहे" },
    { text: "गुडघे व सांधेदुखी", query: "चालताना गुडघ्यात आणि सांध्यात तीव्र वेदना होतात" }
  ]
};

const I18n = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('aarogya_lang');
    if (saved && I18N_DATA[saved]) {
      this.currentLang = saved;
    }
    this.applyLanguage(this.currentLang);
  },

  setLanguage(langCode) {
    if (!I18N_DATA[langCode]) langCode = 'en';
    this.currentLang = langCode;
    localStorage.setItem('aarogya_lang', langCode);
    this.applyLanguage(langCode);

    // Sync header select
    const sel = document.getElementById('global-language-selector');
    if (sel && sel.value !== langCode) {
      sel.value = langCode;
    }

    // Update Voice AI
    if (window.VoiceAI) {
      VoiceAI.setLanguage(langCode);
    }
  },

  applyLanguage(lang) {
    const dict = I18N_DATA[lang] || I18N_DATA.en;

    // 1. Text content elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerText = dict[key];
      }
    });

    // 2. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // 3. Update quick prompt chips in Voice AI
    this.renderLocalizedQuickPrompts(lang);

    console.log(`Language applied: ${lang}`);
  },

  renderLocalizedQuickPrompts(lang) {
    const container = document.getElementById('voice-quick-prompts-container');
    if (!container) return;

    const prompts = LOCALIZED_QUICK_PROMPTS[lang] || LOCALIZED_QUICK_PROMPTS.en;
    container.innerHTML = `
      <span class="text-slate-400 font-medium" data-i18n="quick_prompts">Quick Prompts:</span>
      ${prompts.map(p => `
        <button onclick="VoiceAI.processVoiceQuery('${p.query.replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-full border border-slate-200 transition text-xs font-medium">
          "${p.text}"
        </button>
      `).join('')}
    `;
  },

  t(key) {
    const dict = I18N_DATA[this.currentLang] || I18N_DATA.en;
    return dict[key] || key;
  }
};
