import React, { useState, useEffect } from "react";

export default function ChatbotVoiceTest() {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      if (synth) {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
      }
    };

    loadVoices();

    if (window.speechSynthesis?.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const testMarathiSpeech = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      alert("Speech synthesis not supported");
      return;
    }

    synth.cancel();
    setIsSpeaking(true);

    const testText = "नमस्कार! मी MediSync AI आहे. मी तुम्हाला वैद्यकीय माहिती देऊ शकतो.";
    const utterance = new SpeechSynthesisUtterance(testText);

    // Try to find a Marathi or Hindi voice
    const marathiVoice = voices.find(voice => voice.lang === 'mr-IN' || voice.lang.includes('mr'));
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang.includes('hi'));
    
    if (marathiVoice) {
      utterance.voice = marathiVoice;
      console.log("Using Marathi voice:", marathiVoice.name);
    } else if (hindiVoice) {
      utterance.voice = hindiVoice;
      console.log("Using Hindi voice as fallback:", hindiVoice.name);
    }

    utterance.lang = 'mr-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
      setTestResults({
        success: true,
        message: "Successfully spoke in Marathi/Hindi",
        voice: marathiVoice?.name || hindiVoice?.name || "Default"
      });
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      setTestResults({
        success: false,
        message: "Error speaking text",
        error: event.error
      });
    };

    synth.speak(utterance);
  };

  const stopSpeech = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
    }
    setIsSpeaking(false);
  };

  const runComprehensiveTest = () => {
    const results = {
      totalVoices: voices.length,
      marathiVoices: voices.filter(v => v.lang.includes('mr')).length,
      hindiVoices: voices.filter(v => v.lang.includes('hi')).length,
      indianVoices: voices.filter(v => v.lang.includes('IN')).length,
      englishVoices: voices.filter(v => v.lang.startsWith('en')).length
    };

    setTestResults({
      success: true,
      message: "Voice support analysis complete",
      details: results,
      voices: voices.map(v => ({ name: v.name, lang: v.lang }))
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Chatbot Voice Test</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Voice Testing</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Test Marathi Text-to-Speech</h3>
          <p className="text-gray-600 mb-4">
            This test will attempt to speak Marathi text using available browser voices.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button
              className={`px-6 py-3 rounded-lg font-medium ${
                isSpeaking 
                  ? 'bg-red-500 text-white' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onClick={isSpeaking ? stopSpeech : testMarathiSpeech}
              disabled={voices.length === 0}
            >
              {isSpeaking ? '⏹️ Stop Speaking' : '🔊 Test Marathi Speech'}
            </button>
            
            <button
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
              onClick={stopSpeech}
            >
              🛑 Stop All
            </button>
            
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
              onClick={runComprehensiveTest}
            >
              📊 Analyze Voice Support
            </button>
          </div>
        </div>
        
        {testResults && (
          <div className={`p-4 rounded-lg mt-4 ${
            testResults.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <h3 className="font-medium mb-2">Test Results</h3>
            <p className="mb-2">{testResults.message}</p>
            
            {testResults.details && (
              <div className="mt-3">
                <p><span className="font-medium">Total Voices:</span> {testResults.details.totalVoices}</p>
                <p><span className="font-medium">Marathi Voices:</span> {testResults.details.marathiVoices}</p>
                <p><span className="font-medium">Hindi Voices:</span> {testResults.details.hindiVoices}</p>
                <p><span className="font-medium">Indian Voices:</span> {testResults.details.indianVoices}</p>
                <p><span className="font-medium">English Voices:</span> {testResults.details.englishVoices}</p>
              </div>
            )}
            
            {testResults.voice && (
              <p className="mt-2"><span className="font-medium">Voice Used:</span> {testResults.voice}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Voices ({voices.length})</h2>
        
        {voices.length === 0 ? (
          <p className="text-gray-500">No voices detected. Try clicking the "Analyze Voice Support" button.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {voices.map((voice, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <p className="font-medium">{voice.name}</p>
                <p className="text-sm text-gray-600">{voice.lang}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Default: {voice.default ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Test Text Samples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Marathi</h3>
            <p className="mb-3">नमस्कार! मी MediSync AI आहे.</p>
            <button 
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utterance = new SpeechSynthesisUtterance("नमस्कार! मी MediSync AI आहे.");
                  utterance.lang = 'mr-IN';
                  synth.speak(utterance);
                }
              }}
            >
              Speak
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium mb-2">Hindi</h3>
            <p className="mb-3">नमस्ते! मैं MediSync AI हूं।</p>
            <button 
              className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utterance = new SpeechSynthesisUtterance("नमस्ते! मैं MediSync AI हूं।");
                  utterance.lang = 'hi-IN';
                  synth.speak(utterance);
                }
              }}
            >
              Speak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}