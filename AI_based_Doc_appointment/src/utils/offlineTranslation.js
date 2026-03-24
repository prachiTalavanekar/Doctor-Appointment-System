// Offline translation helper for common medical terms
export const medicalDictionary = {
  // English to Hindi
  "en-hi": {
    "headache": "सिरदर्द",
    "fever": "बुखार", 
    "cough": "खांसी",
    "stomach pain": "पेट दर्द",
    "chest pain": "सीने में दर्द",
    "difficulty breathing": "सांस लेने में कठिनाई",
    "nausea": "मतली",
    "dizziness": "चक्कर आना",
    "fatigue": "थकान",
    "pain": "दर्द",
    "hello": "नमस्ते",
    "how are you": "आप कैसे हैं",
    "thank you": "धन्यवाद",
    "I have": "मुझे है",
    "I feel": "मुझे लगता है",
    "doctor": "डॉक्टर",
    "medicine": "दवा",
    "hospital": "अस्पताल",
    "emergency": "आपातकाल",
    "help": "मदद",
    "please": "कृपया"
  },
  // English to Marathi  
  "en-mr": {
    "headache": "डोकेदुखी",
    "fever": "ताप",
    "cough": "खोकला", 
    "stomach pain": "पोटदुखी",
    "chest pain": "छातीत दुखणे",
    "difficulty breathing": "श्वास घेण्यात अडचण",
    "nausea": "मळमळ",
    "dizziness": "चक्कर येणे",
    "fatigue": "थकवा",
    "pain": "वेदना",
    "hello": "नमस्कार",
    "how are you": "तुम्ही कसे आहात",
    "thank you": "धन्यवाद",
    "I have": "मला आहे",
    "I feel": "मला वाटते",
    "doctor": "डॉक्टर",
    "medicine": "औषध",
    "hospital": "रुग्णालय",
    "emergency": "आणीबाणी",
    "help": "मदत",
    "please": "कृपया"
  }
};

// Quick offline translation for common terms
export const quickTranslate = (text, sourceLang, targetLang) => {
  if (sourceLang === targetLang) return text;
  
  const key = `${sourceLang}-${targetLang}`;
  const dictionary = medicalDictionary[key];
  
  if (!dictionary) {
    console.warn(`No offline dictionary available for ${sourceLang} -> ${targetLang}`);
    return text;
  }
  
  let translatedText = text;
  let hasTranslations = false;
  
  // Replace known terms with word boundaries for better accuracy
  for (const [original, translation] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const newText = translatedText.replace(regex, translation);
    if (newText !== translatedText) {
      translatedText = newText;
      hasTranslations = true;
    }
  }
  
  // Only return translated text if we actually made some translations
  return hasTranslations ? translatedText : text;
};

// Get welcome message in different languages
export const getWelcomeMessage = (language) => {
  const welcomeMessages = {
    en: "Hello! I'm MediSync AI, your medical advisor. I provide information but not diagnosis. How may I assist you today?",
    hi: "नमस्ते! मैं MediSync AI हूं, आपका चिकित्सा सलाहकार। मैं जानकारी प्रदान करता हूं लेकिन निदान नहीं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    mr: "नमस्कार! मी MediSync AI आहे, तुमचा वैद्यकीय सल्लागार. मी माहिती देतो पण निदान करत नाही. आज मी तुम्हाला कशी मदत करू शकतो?",
    es: "¡Hola! Soy MediSync AI, tu asesor médico. Proporciono información pero no diagnóstico. ¿Cómo puedo ayudarte hoy?",
    fr: "Bonjour! Je suis MediSync AI, votre conseiller médical. Je fournis des informations mais pas de diagnostic. Comment puis-je vous aider aujourd'hui?"
  };
  
  return welcomeMessages[language] || welcomeMessages.en;
};

// Voice detection utility
export const detectVoices = () => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      resolve([]);
      return;
    }
    
    const voices = synth.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    
    // If voices aren't loaded yet, wait for them
    synth.onvoiceschanged = () => {
      const loadedVoices = synth.getVoices();
      synth.onvoiceschanged = null;
      resolve(loadedVoices);
    };
    
    // Fallback timeout
    setTimeout(() => {
      resolve(synth.getVoices());
    }, 3000);
  });
};

// Test if a specific language is supported
export const testLanguageSupport = async (languageCode) => {
  const voices = await detectVoices();
  const supported = voices.some(voice => 
    voice.lang === languageCode || 
    voice.lang.startsWith(languageCode) ||
    voice.lang.includes(languageCode)
  );
  
  return {
    supported,
    voices: voices.filter(voice => 
      voice.lang === languageCode || 
      voice.lang.startsWith(languageCode) ||
      voice.lang.includes(languageCode)
    )
  };
};