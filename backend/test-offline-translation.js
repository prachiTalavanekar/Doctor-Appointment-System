// Test offline translation functionality
import axios from 'axios';

const testOfflineTranslation = async () => {
  console.log('🧪 Testing offline translation functionality...\n');
  
  const testCases = [
    { text: "I have a headache", source: "en", target: "hi" },
    { text: "मुझे बुखार है", source: "hi", target: "en" },
    { text: "chest pain", source: "en", target: "mr" },
    { text: "डोकेदुखी", source: "mr", target: "en" },
    { text: "hello doctor", source: "en", target: "hi" },
    { text: "नमस्ते डॉक्टर", source: "hi", target: "en" }
  ];
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: "${testCase.text}" (${testCase.source} -> ${testCase.target})`);
      
      const response = await axios.post('http://localhost:4000/api/translate', {
        q: testCase.text,
        source: testCase.source,
        target: testCase.target
      });
      
      console.log(`Result: "${response.data.translatedText}"`);
      console.log(`Method: ${response.data.method || 'unknown'}`);
      console.log('✅ Success\n');
      
    } catch (error) {
      console.error(`❌ Failed: ${error.message}\n`);
    }
  }
  
  console.log('🎉 Offline translation tests completed!');
};

// Test with timeout scenarios
const testTimeoutHandling = async () => {
  console.log('\n⏱️ Testing timeout handling...\n');
  
  try {
    // This should use offline translation for common medical terms
    const response = await axios.post('http://localhost:4000/api/translate', {
      q: "I have severe headache and fever",
      source: "en", 
      target: "hi"
    });
    
    console.log('Translation result:', response.data.translatedText);
    console.log('Method used:', response.data.method);
    console.log('✅ Timeout handling test passed');
    
  } catch (error) {
    console.error('❌ Timeout test failed:', error.message);
  }
};

// Run tests
console.log('🚀 Starting offline translation tests...\n');
await testOfflineTranslation();
await testTimeoutHandling();
console.log('\n✨ All tests completed!');