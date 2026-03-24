import React, { useState, useEffect } from "react";

export default function VoiceTest() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("नमस्कार! मी MediSync AI आहे, तुमचा वैद्यकीय सल्लागार.");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Find a Marathi voice if available
      const marathiVoice = availableVoices.find(voice => 
        voice.lang.includes('mr') || voice.name.includes('Marathi')
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

    // Load voices when they become available
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Initial load
    loadVoices();
  }, []);

  const speak = () => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.lang = selectedVoice ? selectedVoice.lang : 'mr-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Voice Test for Marathi</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Text to speak:</label>
        <textarea
          className="w-full p-3 border rounded-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
      </div>
      
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
      
      <div className="flex gap-3">
        <button
          className={`px-6 py-3 rounded-lg font-medium ${
            isSpeaking 
              ? 'bg-red-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={isSpeaking ? stop : speak}
        >
          {isSpeaking ? 'Stop Speaking' : 'Speak Text'}
        </button>
      </div>
      
      {selectedVoice && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium">Selected Voice:</h3>
          <p>Name: {selectedVoice.name}</p>
          <p>Language: {selectedVoice.lang}</p>
        </div>
      )}
    </div>
  );
}