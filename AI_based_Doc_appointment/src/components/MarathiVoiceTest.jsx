import React, { useState, useEffect } from "react";
import { detectVoices, testLanguageSupport } from "../utils/offlineTranslation";

export default function MarathiVoiceTest() {
  const [voices, setVoices] = useState([]);
  const [marathiSupport, setMarathiSupport] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testText, setTestText] = useState("नमस्कार! मी MediSync AI आहे, तुमचा वैद्यकीय सल्लागार.");

  useEffect(() => {
    const loadVoices = async () => {
      const availableVoices = await detectVoices();
      setVoices(availableVoices);
      
      // Test Marathi support
      const support = await testLanguageSupport('mr-IN');
      setMarathiSupport(support);
      
      // Find a Marathi voice if available
      const marathiVoice = availableVoices.find(voice => 
        voice.lang === 'mr-IN' || voice.lang.includes('mr')
      );
      
      if (marathiVoice) {
        setSelectedVoice(marathiVoice);
      } else {
        // Find any Indian language voice as fallback
        const indianVoice = availableVoices.find(voice => 
          voice.lang.includes('IN')
        );
        setSelectedVoice(indianVoice || availableVoices[0]);
      }
    };

    loadVoices();
  }, []);

  const speak = () => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any ongoing speech
    
    const utterance = new SpeechSynthesisUtterance(testText);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.lang = selectedVoice ? selectedVoice.lang : 'mr-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      console.error("Speech synthesis error");
      setIsSpeaking(false);
    };
    
    synth.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Marathi Voice Test</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Voice Support Information</h2>
        
        {marathiSupport && (
          <div className="mb-4">
            <p className="mb-2">
              <span className="font-medium">Marathi Language Support:</span> 
              <span className={`ml-2 px-2 py-1 rounded ${marathiSupport.supported ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {marathiSupport.supported ? 'Supported' : 'Not Directly Supported'}
              </span>
            </p>
            
            {marathiSupport.voices.length > 0 ? (
              <div>
                <p className="font-medium">Available Marathi Voices:</p>
                <ul className="list-disc pl-5 mt-2">
                  {marathiSupport.voices.map((voice, index) => (
                    <li key={index} className="mb-1">
                      {voice.name} ({voice.lang})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">No specific Marathi voices found. Will use fallback voice.</p>
            )}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Available Voices ({voices.length}):</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test Text-to-Speech</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text to speak (Marathi):</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={4}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            className={`px-6 py-3 rounded-lg font-medium ${
              isSpeaking 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={isSpeaking ? stop : speak}
          >
            {isSpeaking ? '⏹️ Stop Speaking' : '🔊 Speak Text'}
          </button>
          
          <button
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
            onClick={stop}
          >
            🛑 Stop All
          </button>
        </div>
        
        {selectedVoice && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">Selected Voice:</h3>
            <p><span className="font-medium">Name:</span> {selectedVoice.name}</p>
            <p><span className="font-medium">Language:</span> {selectedVoice.lang}</p>
            <p><span className="font-medium">Default:</span> {selectedVoice.default ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Common Marathi Test Phrases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button 
            className="p-3 bg-teal-100 hover:bg-teal-200 rounded-lg text-left"
            onClick={() => setTestText("नमस्कार! मी MediSync AI आहे.")}
          >
            नमस्कार! मी MediSync AI आहे.
          </button>
          <button 
            className="p-3 bg-teal-100 hover:bg-teal-200 rounded-lg text-left"
            onClick={() => setTestText("मला डोकेदुखी आहे.")}
          >
            मला डोकेदुखी आहे.
          </button>
          <button 
            className="p-3 bg-teal-100 hover:bg-teal-200 rounded-lg text-left"
            onClick={() => setTestText("तुम्ही कशी मदत करू शकता?")}
          >
            तुम्ही कशी मदत करू शकता?
          </button>
          <button 
            className="p-3 bg-teal-100 hover:bg-teal-200 rounded-lg text-left"
            onClick={() => setTestText("धन्यवाद! ही माहिती उपयुक्त आहे.")}
          >
            धन्यवाद! ही माहिती उपयुक्त आहे.
          </button>
        </div>
      </div>
    </div>
  );
}