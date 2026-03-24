// backend/routes/translateRoute.js
import express from "express";
import axios from "axios";
import { translateTextWithGoogle, checkGoogleTranslationHealth } from "../utils/googleTranslate.js";

const router = express.Router();

// Translation service configuration
const TRANSLATION_CONFIG = {
  PRIMARY: {
    name: "Google Translate",

    enabled: (process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_APPLICATION_CREDENTIALS) ? true : false,

    url: "https://translation.googleapis.com/language/translate/v2",
    timeout: 8000
  },
  SECONDARY: {
    name: "MyMemory", 
    enabled: true,
    url: "https://api.mymemory.translated.net/get",
    timeout: 5000
  },
  TERTIARY: {
    name: "LibreTranslate",
    enabled: true,
    url: "https://libretranslate.de/translate",
    timeout: 5000
  }
};

// Quality assessment function
const assessTranslationQuality = (originalText, translatedText, sourceLang, targetLang) => {
  if (!translatedText || translatedText.trim().length === 0) return 0;
  if (translatedText === originalText) return 0;
  if (translatedText.includes('undefined') || translatedText === 'undefined') return 0;
  
  // Basic quality checks
  const lengthRatio = translatedText.length / originalText.length;
  if (lengthRatio < 0.3 || lengthRatio > 3) return 30; // Suspicious length ratio
  
  // Check for repeated words (indicates poor translation)
  const words = translatedText.toLowerCase().split(' ');
  const uniqueWords = new Set(words);
  if (words.length > 3 && uniqueWords.size / words.length < 0.5) return 40;
  
  // Language script validation
  if (targetLang === 'hi' || targetLang === 'mr') {
    const devanagariRegex = /[\u0900-\u097F]/;
    if (!devanagariRegex.test(translatedText)) return 20;
  }
  
  return 100; // Good quality
};

// Fast offline translation dictionary for common medical terms
const medicalTranslations = {
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
    "hospital": "अस्पताल"
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
    "hospital": "रुग्णालय"
  },
  // Hindi to English
  "hi-en": {
    "सिरदर्द": "headache",
    "बुखार": "fever",
    "खांसी": "cough", 
    "पेट दर्द": "stomach pain",
    "सीने में दर्द": "chest pain",
    "सांस लेने में कठिनाई": "difficulty breathing",
    "मतली": "nausea",
    "चक्कर आना": "dizziness",
    "थकान": "fatigue",
    "दर्द": "pain",
    "नमस्ते": "hello",
    "धन्यवाद": "thank you",
    "मुझे है": "I have",
    "मुझे लगता है": "I feel",
    "डॉक्टर": "doctor",
    "दवा": "medicine",
    "अस्पताल": "hospital"
  },
  // Marathi to English
  "mr-en": {
    "डोकेदुखी": "headache",
    "ताप": "fever",
    "खोकला": "cough",
    "पोटदुखी": "stomach pain", 
    "छातीत दुखणे": "chest pain",
    "श्वास घेण्यात अडचण": "difficulty breathing",
    "मळमळ": "nausea",
    "चक्कर येणे": "dizziness",
    "थकवा": "fatigue",
    "वेदना": "pain",
    "नमस्कार": "hello",
    "धन्यवाद": "thank you",
    "मला आहे": "I have",
    "मला वाटते": "I feel",
    "डॉक्टर": "doctor",
    "औषध": "medicine",
    "रुग्णालय": "hospital"
  }
};


// Primary API: Google Translate (Paid, High Quality) with Service Account
const translateWithGoogleTranslate = async (text, source, target) => {
  if (!TRANSLATION_CONFIG.PRIMARY.enabled) {
    throw new Error('Google Translate service account not configured');
  }
  
  try {
    // Try to use Google Cloud Translation API with service account
    const result = await translateTextWithGoogle(text, source, target);
    return result;
  } catch (error) {
    console.warn(`${TRANSLATION_CONFIG.PRIMARY.name} failed:`, error.message);
    
    // Fallback to API key method if service account fails
    try {
      const response = await axios.post(
        TRANSLATION_CONFIG.PRIMARY.url,
        {
          q: text,
          source: source,
          target: target,
          format: 'text'
        },
        {
          params: {
            key: process.env.GOOGLE_TRANSLATE_API_KEY
          },
          timeout: TRANSLATION_CONFIG.PRIMARY.timeout,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const translatedText = response.data?.data?.translations?.[0]?.translatedText;
      if (!translatedText) throw new Error('Invalid response format');
      
      const quality = assessTranslationQuality(text, translatedText, source, target);
      
      return {
        translatedText,
        quality,
        method: 'google_translate_api_key',
        service: TRANSLATION_CONFIG.PRIMARY.name
      };
    } catch (fallbackError) {
      console.warn(`Google Translate API key fallback also failed:`, fallbackError.message);
      throw error;
    }

  }
};

// Secondary API: MyMemory (Free, Good Quality)
const translateWithMyMemory = async (text, source, target) => {
  try {
    const response = await axios.get(TRANSLATION_CONFIG.SECONDARY.url, {
      params: {
        q: text.trim(),
        langpair: `${source}|${target}`
      },
      timeout: TRANSLATION_CONFIG.SECONDARY.timeout
    });
    
    const translatedText = response.data?.responseData?.translatedText;
    if (!translatedText) throw new Error('Invalid response format');
    
    const quality = assessTranslationQuality(text, translatedText, source, target);
    
    return {
      translatedText,
      quality,
      method: 'mymemory',
      service: TRANSLATION_CONFIG.SECONDARY.name
    };
  } catch (error) {
    console.warn(`${TRANSLATION_CONFIG.SECONDARY.name} failed:`, error.message);
    throw error;
  }
};

// Tertiary API: LibreTranslate (Free, Backup)
const translateWithLibreTranslate = async (text, source, target) => {
  try {
    const response = await axios.post(
      TRANSLATION_CONFIG.TERTIARY.url,
      {
        q: text.trim(),
        source: source,
        target: target,
        format: 'text'
      },
      {
        timeout: TRANSLATION_CONFIG.TERTIARY.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const translatedText = response.data?.translatedText;
    if (!translatedText) throw new Error('Invalid response format');
    
    const quality = assessTranslationQuality(text, translatedText, source, target);
    
    return {
      translatedText,
      quality,
      method: 'libretranslate',
      service: TRANSLATION_CONFIG.TERTIARY.name
    };
  } catch (error) {
    console.warn(`${TRANSLATION_CONFIG.TERTIARY.name} failed:`, error.message);
    throw error;
  }
};



// Local Fallback: Enhanced offline translation
const translateOffline = (text, source, target) => {
  const key = `${source}-${target}`;
  const dictionary = medicalTranslations[key];
  
  if (!dictionary) return null;
  
  let translatedText = text;
  let hasTranslations = false;
  
  // Replace known terms with word boundaries for better accuracy
  for (const [original, translation] of Object.entries(dictionary)) {
    const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedOriginal}\\b`, 'gi');
    const newText = translatedText.replace(regex, translation);
    if (newText !== translatedText) {
      translatedText = newText;
      hasTranslations = true;
    }
  }
  
  // Return result with quality assessment
  if (hasTranslations) {
    const quality = assessTranslationQuality(text, translatedText, source, target);
    return {
      translatedText,
      quality: Math.max(quality, 60), // Offline gets minimum 60 quality
      method: 'offline',
      service: 'Local Dictionary'
    };
  }
  
  return null;
};

// Main translation function with cascading fallback
const translateText = async (text, source, target) => {
  const results = [];
  

  // Step 1: Try Primary API (Google Translate with Service Account)

  if (TRANSLATION_CONFIG.PRIMARY.enabled) {
    try {
      const result = await translateWithGoogleTranslate(text, source, target);
      results.push(result);
      if (result.quality >= 80) {
        return result; // High quality, use immediately
      }
    } catch (error) {
      console.log('Primary translation service unavailable, trying secondary...');
    }
  }
  
  // Step 2: Try Secondary API (MyMemory)
  try {
    const result = await translateWithMyMemory(text, source, target);
    results.push(result);
    if (result.quality >= 70) {
      return result; // Good quality, use if no better option
    }
  } catch (error) {
    console.log('Secondary translation service failed, trying tertiary...');
  }
  
  // Step 3: Try Tertiary API (LibreTranslate)
  try {
    const result = await translateWithLibreTranslate(text, source, target);
    results.push(result);
    if (result.quality >= 60) {
      return result; // Acceptable quality
    }
  } catch (error) {
    console.log('Tertiary translation service failed, using offline fallback...');
  }
  
  // Step 4: Local Fallback
  const offlineResult = translateOffline(text, source, target);
  if (offlineResult) {
    results.push(offlineResult);
  }
  
  // Return best available result or null
  if (results.length > 0) {
    // Sort by quality and return the best one
    results.sort((a, b) => b.quality - a.quality);
    return results[0];
  }
  
  return null;
};

// Language code mapping for different services
const languageMapping = {
  en: "en",
  hi: "hi", 
  mr: "mr",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  pt: "pt",
  ru: "ru",
  ja: "ja",
  ko: "ko",
  zh: "zh",
  ar: "ar"
};

router.post("/translate", async (req, res) => {
  try {
    const { q, source, target } = req.body;

    // Validate input
    if (!q || !source || !target) {
      return res.status(400).json({ error: "Missing required parameters: q, source, target" });
    }

    // If source and target are the same, return original text
    if (source === target) {
      return res.json({ 
        translatedText: q,
        method: "no_translation_needed",
        service: "System",
        quality: 100
      });
    }

    // Map language codes for online services
    const mappedSource = languageMapping[source] || source;
    const mappedTarget = languageMapping[target] || target;

    // Attempt translation with cascading fallback
    const result = await translateText(q, mappedSource, mappedTarget);
    
    if (result) {
      // Clean up the translated text
      const cleanedText = result.translatedText
        .replace(/\s+/g, ' ')
        .trim();

      return res.json({
        translatedText: cleanedText,
        method: result.method,
        service: result.service,
        quality: result.quality,
        timestamp: new Date().toISOString()
      });
    }

    // All translation methods failed
    console.error("All translation methods failed for:", { q, source, target });
    return res.json({ 
      translatedText: q, 
      warning: "Translation unavailable, returning original text",
      method: "fallback",
      service: "System",
      quality: 0
    });

  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ 
      error: "Translation failed",
      translatedText: req.body.q, // Return original text as fallback
      method: "error_fallback",
      service: "System",
      quality: 0
    });
  }
});

// Enhanced health check endpoint

router.get("/health", async (req, res) => {

  const serviceStatus = {
    primary: {
      name: TRANSLATION_CONFIG.PRIMARY.name,
      enabled: TRANSLATION_CONFIG.PRIMARY.enabled,

      configured: !!(process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_APPLICATION_CREDENTIALS),
      ...(await checkGoogleTranslationHealth())

    },
    secondary: {
      name: TRANSLATION_CONFIG.SECONDARY.name,
      enabled: TRANSLATION_CONFIG.SECONDARY.enabled,
      configured: true
    },
    tertiary: {
      name: TRANSLATION_CONFIG.TERTIARY.name,
      enabled: TRANSLATION_CONFIG.TERTIARY.enabled,
      configured: true
    },
    offline: {
      name: "Local Dictionary",
      enabled: true,
      configured: true,
      supportedLanguagePairs: Object.keys(medicalTranslations)
    }
  };
  
  res.json({ 
    status: "OK", 
    service: "Enhanced Translation API",
    supportedLanguages: Object.keys(languageMapping),
    services: serviceStatus,
    timestamp: new Date().toISOString()
  });
});

export default router;
