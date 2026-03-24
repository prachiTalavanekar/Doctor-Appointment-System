// Voice testing utilities for the chatbot

/**
 * Test if the browser can speak in a specific language
 * @param {string} languageCode - Language code (e.g., 'mr-IN', 'hi-IN')
 * @returns {Promise<Object>} - Object with support information
 */
export const testLanguageVoiceSupport = async (languageCode) => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      resolve({ supported: false, error: "Speech synthesis not supported" });
      return;
    }
    
    const checkVoices = () => {
      const voices = synth.getVoices();
      const supportedVoices = voices.filter(voice => 
        voice.lang === languageCode || 
        voice.lang.startsWith(languageCode) ||
        voice.lang.includes(languageCode)
      );
      
      resolve({
        supported: supportedVoices.length > 0,
        voices: supportedVoices,
        allVoices: voices.length
      });
    };
    
    // Check if voices are already loaded
    if (synth.getVoices().length > 0) {
      checkVoices();
    } else {
      // Wait for voices to load
      synth.onvoiceschanged = () => {
        checkVoices();
        synth.onvoiceschanged = null;
      };
      
      // Timeout fallback
      setTimeout(checkVoices, 3000);
    }
  });
};

/**
 * Speak text with specific language settings
 * @param {string} text - Text to speak
 * @param {string} languageCode - Language code
 * @param {Object} options - Speech options
 */
export const speakText = (text, languageCode, options = {}) => {
  const synth = window.speechSynthesis;
  if (!synth) {
    console.warn("Speech synthesis not supported");
    return;
  }
  
  synth.cancel(); // Stop any ongoing speech
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode;
  utterance.rate = options.rate || 0.9;
  utterance.pitch = options.pitch || 1;
  
  // Try to find a specific voice
  const voices = synth.getVoices();
  const voice = voices.find(v => 
    v.lang === languageCode || 
    v.lang.startsWith(languageCode) ||
    v.lang.includes(languageCode)
  );
  
  if (voice) {
    utterance.voice = voice;
  }
  
  utterance.onend = () => {
    console.log(`Finished speaking in ${languageCode}`);
    if (options.onEnd) options.onEnd();
  };
  
  utterance.onerror = (event) => {
    console.warn(`Speech error for ${languageCode}:`, event);
    if (options.onError) options.onError(event);
  };
  
  synth.speak(utterance);
  return utterance;
};

/**
 * Comprehensive voice test
 */
export const runVoiceTest = async () => {
  console.log("=== Voice Support Test ===");
  
  // Test languages
  const testLanguages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'mr-IN', name: 'Marathi (India)' }
  ];
  
  for (const lang of testLanguages) {
    console.log(`\nTesting ${lang.name} (${lang.code})...`);
    const result = await testLanguageVoiceSupport(lang.code);
    console.log(`  Supported: ${result.supported}`);
    console.log(`  Available voices: ${result.voices?.length || 0}`);
    if (result.voices && result.voices.length > 0) {
      result.voices.forEach(voice => {
        console.log(`    - ${voice.name} (${voice.lang})`);
      });
    }
  }
  
  console.log("\n=== Test Complete ===");
};

// Export for global access in browser console
if (typeof window !== 'undefined') {
  window.voiceTestUtils = {
    testLanguageVoiceSupport,
    speakText,
    runVoiceTest
  };
}