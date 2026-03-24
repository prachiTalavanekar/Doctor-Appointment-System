
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaMicrophone, FaStop, FaVolumeUp, FaLanguage } from "react-icons/fa";
import { quickTranslate, getWelcomeMessage } from "../utils/offlineTranslation.js";
import { speakText, testLanguageVoiceSupport } from "../utils/voiceTestUtils.js";

// Add custom CSS for smooth animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined' && !document.getElementById('chatbot-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'chatbot-styles';
  styleSheet.type = 'text/css';
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en");
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Language configurations
  const languages = {
    en: { 
      name: "English", 
      flag: "🇬🇧", 
      speechLang: "en-US",
      welcomeMsg: "Hello! I'm MediSync AI, your medical advisor. I provide information but not diagnosis. How may I assist you today?"
    },
    hi: { 
      name: "हिंदी", 
      flag: "🇮🇳", 
      speechLang: "hi-IN",
      welcomeMsg: "नमस्ते! मैं MediSync AI हूं, आपका चिकित्सा सलाहकार। मैं जानकारी प्रदान करता हूं लेकिन निदान नहीं। आज मैं आपकी कैसे सहायता कर सकता हूं?"
    },
    mr: { 
      name: "मराठी", 
      flag: "🇮🇳", 
      speechLang: "mr-IN",
      welcomeMsg: "नमस्कार! मी MediSync AI आहे, तुमचा वैद्यकीय सल्लागार. मी माहिती देतो पण निदान करत नाही. आज मी तुम्हाला कशी मदत करू शकतो?"
    },
    es: { 
      name: "Español", 
      flag: "🇪🇸", 
      speechLang: "es-ES",
      welcomeMsg: "¡Hola! Soy MediSync AI, tu asesor médico. Proporciono información pero no diagnóstico. ¿Cómo puedo ayudarte hoy?"
    },
    fr: { 
      name: "Français", 
      flag: "🇫🇷", 
      speechLang: "fr-FR",
      welcomeMsg: "Bonjour! Je suis MediSync AI, votre conseiller médical. Je fournis des informations mais pas de diagnostic. Comment puis-je vous aider aujourd'hui?"
    }
  };

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: "assistant",
      content: getWelcomeMessage(language)
    };
    setChat([welcomeMessage]);
  }, [language]);

  // Test voice support when component mounts
  useEffect(() => {
    const testVoices = async () => {
      console.log("Testing voice support...");
      const result = await testLanguageVoiceSupport('mr-IN');
      console.log("Marathi voice support:", result);
    };
    
    // Small delay to ensure voices are loaded
    const timeout = setTimeout(testVoices, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Translation functions with timeout and offline fallback
  const translateToEnglish = async (text, sourceLang) => {
    if (sourceLang === "en") return text;
    
    try {
      const res = await axios.post("http://localhost:4000/api/translate", {
        q: text,
        source: sourceLang,
        target: "en"
      }, {
        timeout: 8000 // 8 second timeout
      });
      return res.data.translatedText;
    } catch (error) {
      console.warn("Translation to English failed, using original text:", error.message);
      return text; // Return original text if translation fails
    }
  };

  const translateFromEnglish = async (text, targetLang) => {
    if (targetLang === "en") return text;
    
    try {
      const res = await axios.post("http://localhost:4000/api/translate", {
        q: text,
        source: "en",
        target: targetLang
      }, {
        timeout: 8000 // 8 second timeout
      });
      return res.data.translatedText;
    } catch (error) {
      console.warn("Translation from English failed, using original text:", error.message);
      return text; // Return original text if translation fails
    }
  };

  // Voice recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languages[language].speechLang;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // Enhanced text to speech with better Marathi support
  const speak = (text, langCode) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }

    // Stop any ongoing speech
    synth.cancel();
    
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    
    // Enhanced voice selection with better fallbacks
    const setVoice = () => {
      const voices = synth.getVoices();
      
      // Voice selection strategy based on language
      let selectedVoice = null;
      
      if (langCode === 'mr') {
        // For Marathi, try these in order:
        // 1. Specific Marathi voice
        // 2. Hindi voice (can pronounce Marathi reasonably well)
        // 3. Any Indian language voice
        selectedVoice = voices.find(voice => voice.lang === 'mr-IN') ||
                       voices.find(voice => voice.lang === 'hi-IN') ||
                       voices.find(voice => voice.lang.includes('IN'));
      } else if (langCode === 'hi') {
        // For Hindi
        selectedVoice = voices.find(voice => voice.lang === 'hi-IN') ||
                       voices.find(voice => voice.lang.includes('IN'));
      } else {
        // For other languages
        selectedVoice = voices.find(voice => voice.lang === languages[langCode].speechLang) ||
                       voices.find(voice => voice.lang.startsWith(langCode));
      }
      
      // Set the voice if found
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Using voice: ${selectedVoice.name} (${selectedVoice.lang}) for language: ${langCode}`);
      } else {
        console.warn(`No suitable voice found for language: ${langCode}, using default voice`);
      }
      
      // Set language - important for proper pronunciation
      utterance.lang = languages[langCode].speechLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        console.log(`Finished speaking in ${langCode}`);
        setSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.warn(`Speech synthesis error for language ${langCode}:`, event);
        setSpeaking(false);
      };
      
      synth.speak(utterance);
    };
    
    // Check if voices are already loaded
    if (synth.getVoices().length > 0) {
      setVoice();
    } else {
      // Wait for voices to load
      const onVoicesChanged = () => {
        setVoice();
        synth.onvoiceschanged = null; // Remove listener
      };
      
      synth.onvoiceschanged = onVoicesChanged;
      
      // Fallback in case voices don't load quickly
      setTimeout(() => {
        if (synth.speaking === false && speaking === true) {
          setVoice();
        }
      }, 1500);
    }
  };

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      console.log("Stopped all speech");
    }
    setSpeaking(false);
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setLoading(true);

    try {
      // Send to chatbot API with raw input; backend handles multilingual
      const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
        userQuery: input,
        chatHistory: newChat.slice(0, -1), // Exclude current message
        language: language
      });

      let botReply = (res.data && res.data.response) ? res.data.response : '';
      // Basic cleanup fallback in case of bad content
      if (!botReply || botReply === 'undefined' || botReply.includes('undefined')) {
        botReply = getWelcomeMessage(language);
      }

      const assistantMessage = { role: "assistant", content: botReply };
      const updatedChat = [...newChat, assistantMessage];
      
      setChat(updatedChat);
      
      // Speak the response
      speak(botReply, language);
      
    } catch (err) {
      console.error("Chatbot error:", err);
      
      // More specific error messages
      let errorMsg;
      if (err.response?.status === 402 || err.response?.data?.error?.includes('credits')) {
        errorMsg = language === "en" 
          ? "🔋 I'm currently running on limited resources, but I can still help with basic medical questions. Please try asking about specific symptoms."
          : language === "hi"
          ? "🔋 मैं वर्तमान में सीमित संसाधनों पर चल रहा हूं, लेकिन फिर भी बुनियादी चिकित्सा प्रश्नों में मदद कर सकता हूं।"
          : "🔋 मी सध्या मर्यादित संसाधनांवर चालत आहे, परंतु तरीही मूलभूत वैद्यकीय प्रश्नांमध्ये मदत करू शकतो।";
      } else {
        errorMsg = language === "en" 
          ? "⚠️ I'm experiencing technical difficulties. Please try again in a moment."
          : language === "hi"
          ? "⚠️ मुझे तकनीकी कठिनाइयों का सामना कर रहा हूं। कृपया एक क्षण में पुनः प्रयास करें।"
          : "⚠️ मला तांत्रिक अडचणी येत आहेत. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.";
      }
      
      setChat([...newChat, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    const welcomeMessage = {
      role: "assistant",
      content: languages[language].welcomeMsg
    };
    setChat([welcomeMessage]);
  };

  // Quick suggestions based on language
  const quickSuggestions = {
    en: ["I have a headache", "I'm feeling dizzy", "I have a fever", "My stomach hurts"],
    hi: ["मुझे सिरदर्द है", "मुझे चक्कर आ रहे हैं", "मुझे बुखार है", "मेरे पेट में दर्द है"],
    mr: ["मला डोकेदुखी आहे", "मला चक्कर येत आहे", "मला ताप आहे", "माझ्या पोटात दुखत आहे"],
    es: ["Tengo dolor de cabeza", "Me siento mareado", "Tengo fiebre", "Me duele el estómago"],
    fr: ["J'ai mal à la tête", "Je me sens étourdi", "J'ai de la fièvre", "J'ai mal au ventre"]
  };

  // Diagnostic function to test voice capabilities
  const diagnoseVoiceSupport = async () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("Speech synthesis not supported");
      return { error: "Speech synthesis not supported" };
    }
    
    // Wait for voices to load
    const voices = await new Promise((resolve) => {
      if (synth.getVoices().length > 0) {
        resolve(synth.getVoices());
      } else {
        synth.onvoiceschanged = () => {
          resolve(synth.getVoices());
          synth.onvoiceschanged = null;
        };
        // Timeout fallback
        setTimeout(() => resolve(synth.getVoices()), 2000);
      }
    });
    
    // Filter voices by language
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const hindiVoices = voices.filter(v => v.lang.includes('hi'));
    const marathiVoices = voices.filter(v => v.lang.includes('mr'));
    const indianVoices = voices.filter(v => v.lang.includes('IN'));
    
    console.log("Voice Diagnostics:");
    console.log("- Total voices:", voices.length);
    console.log("- English voices:", englishVoices.length);
    console.log("- Hindi voices:", hindiVoices.length);
    console.log("- Marathi voices:", marathiVoices.length);
    console.log("- Indian voices:", indianVoices.length);
    
    if (marathiVoices.length > 0) {
      console.log("- Marathi voices details:");
      marathiVoices.forEach(v => console.log(`  * ${v.name} (${v.lang})`));
    }
    
    return {
      total: voices.length,
      english: englishVoices.length,
      hindi: hindiVoices.length,
      marathi: marathiVoices.length,
      indian: indianVoices.length,
      voices: voices.map(v => ({ name: v.name, lang: v.lang }))
    };
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header with single teal color */}
      <div className="bg-[#107869] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Brand Section */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-bold text-xl sm:text-2xl">
                  MediSync AI
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs ml-2 border border-white/30">
                    AI ASSISTANT
                  </span>
                </h1>
                <p className="text-teal-100 text-sm hidden sm:block">Your Intelligent Medical Companion</p>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex items-center gap-3">
              <button
                onClick={clearChat}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 border border-white/30"
                title="Clear Chat"
              >
                <span className="hidden sm:inline">Clear Chat</span>
                <span className="sm:hidden">🗑️</span>
              </button>
              
              <button
                onClick={diagnoseVoiceSupport}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 border border-white/30"
                title="Diagnose Voice Support"
              >
                <span className="hidden sm:inline">Diagnose</span>
                <span className="sm:hidden">🎤</span>
              </button>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30">
                <FaLanguage className="text-white" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-white border-0 text-sm font-medium focus:outline-none cursor-pointer"
                >
                  {Object.entries(languages).map(([code, lang]) => (
                    <option key={code} value={code} className="bg-[#20b2aa] text-white">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full container mx-auto px-4 py-4">
          <div className="h-full  backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-4">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 animate-fadeIn ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar with single teal color */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    msg.role === "user" 
                      ? "bg-[#20b2aa]" 
                      : "bg-[#20b2aa]"
                  }`}>
                    <span className="text-white text-sm font-bold">
                      {msg.role === "user" ? "👤" : "🤖"}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] sm:max-w-[75%] ${
                    msg.role === "user" ? "" : ""
                  }`}>
                    <div className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                      msg.role === "user"
                        ? "bg-[#20b2aa] text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                    }`}>
                      <div
                        className="text-sm sm:text-base leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        }}
                      />
                      
                      {/* Action Buttons for Assistant Messages */}
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => speak(msg.content, language)}
                            className="flex items-center gap-1 text-[#20b2aa] hover:text-[#1a9b96] transition-colors text-xs sm:text-sm font-medium hover:bg-teal-50 px-2 py-1 rounded-lg"
                            title="Listen to response"
                          >
                            <FaVolumeUp size={12} />
                            <span className="hidden sm:inline">Listen</span>
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(msg.content.replace(/<[^>]*>/g, ''))}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors text-xs sm:text-sm font-medium hover:bg-gray-50 px-2 py-1 rounded-lg"
                            title="Copy to clipboard"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="hidden sm:inline">Copy</span>
                          </button>
                        </div>
                      )}

                    </div>
                    
                    {/* Timestamp */}
                    <div className={`text-xs text-gray-500 mt-1 px-2 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator with single teal color */}
              {loading && (
                <div className="flex items-start gap-3 animate-fadeIn">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#20b2aa] flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">🏥</span>
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#20b2aa] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#20b2aa] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-[#20b2aa] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-600 text-sm font-medium">MediSync AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Quick Suggestions */}
      {chat.length === 1 && (
        <div className=" backdrop-blur-sm ">
          <div className="container mx-auto px-4 py-4">
            <div className="bg-[#dbf6f2] rounded-xl p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-[#20b2aa] rounded-full mr-2"></span>
                Quick suggestions to get started:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {quickSuggestions[language]?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-2 bg-white hover:bg-[#20b2aa] hover:text-white text-gray-700 rounded-xl text-sm border border-gray-200 transition-all duration-200 hover:scale-105 hover:shadow-md text-center"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Input Area */}
      <div className="bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row items-end gap-3">
              {/* Text Input */}
              <div className="flex-1 w-full">
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20b2aa] focus:border-[#20b2aa] resize-none transition-all duration-200 placeholder-gray-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask me about your health concerns in ${languages[language].name}...`}
                  rows={window.innerWidth < 640 ? "3" : "2"}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
                {/* Voice Button */}
                <button
                  onClick={listening ? stopListening : startListening}
                  className={`flex-1 sm:flex-none p-3 rounded-xl transition-all duration-200 ${
                    listening 
                      ? "bg-red-500 text-white animate-pulse" 
                      : "bg-gray-100 text-[#20b2aa] hover:bg-teal-50"
                  }`}
                  title={listening ? "Stop Listening" : "Voice Input"}
                >
                  {listening ? <FaStop size={18} /> : <FaMicrophone size={18} />}
                </button>

                {/* Speak Button */}
                <button
                  onClick={speaking ? stopSpeaking : () => {
                    // If there's a last assistant message, speak it
                    const lastAssistantMsg = [...chat].reverse().find(msg => msg.role === "assistant");
                    if (lastAssistantMsg) {
                      speak(lastAssistantMsg.content, language);
                    }
                  }}
                  className={`flex-1 sm:flex-none p-3 rounded-xl transition-all duration-200 ${
                    speaking 
                      ? "bg-[#20b2aa] text-white animate-pulse" 
                      : "bg-gray-100 text-[#20b2aa] hover:bg-teal-50"
                  }`}
                  title={speaking ? "Stop Speaking" : "Text-to-Speech"}
                >
                  <FaVolumeUp size={18} />
                </button>

                {/* Send Button */}
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex-1 sm:flex-none bg-[#20b2aa] hover:bg-[#1a9b96] disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed font-medium"
                  title="Send Message"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    <span className="text-lg">→</span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Voice Status Indicator */}
            {listening && (
              <div className="mt-3 text-center">
                <span className="text-sm text-red-600 animate-pulse bg-red-50 px-3 py-1 rounded-full">
                  🎤 Listening in {languages[language].name}...
                </span>
              </div>
            )}
            
            {/* Speaking Status Indicator */}
            {speaking && (
              <div className="mt-3 text-center">
                <span className="text-sm text-[#20b2aa] animate-pulse bg-teal-50 px-3 py-1 rounded-full">
                  🔊 Speaking in {languages[language].name}...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





