import axios from 'axios';

const testEnhancedTranslation = async () => {
  console.log('🔍 Testing Enhanced Translation Service Hierarchy\n');
  
  const testCases = [
    {
      name: 'English to Marathi Medical Term',
      text: 'I have a headache',
      source: 'en',
      target: 'mr'
    },
    {
      name: 'Marathi to English Medical Term',
      text: 'मला डोकेदुखी आहे',
      source: 'mr',
      target: 'en'
    },
    {
      name: 'English to Hindi Medical Term',
      text: 'fever and cough',
      source: 'en',
      target: 'hi'
    }
  ];

  // Test health endpoint first
  try {
    console.log('📊 Checking Translation Service Health...');
    const healthResponse = await axios.get('http://localhost:4000/api/health');
    console.log('✅ Health Check Response:');
    console.log(JSON.stringify(healthResponse.data, null, 2));
    console.log('\n' + '─'.repeat(80) + '\n');
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test translation cases
  for (const testCase of testCases) {
    console.log(`🧪 Testing: ${testCase.name}`);
    console.log(`📝 Input: "${testCase.text}" (${testCase.source} → ${testCase.target})`);
    
    try {
      const response = await axios.post('http://localhost:4000/api/translate', {
        q: testCase.text,
        source: testCase.source,
        target: testCase.target
      });
      
      console.log('✅ SUCCESS:');
      console.log(`📝 Translated: "${response.data.translatedText}"`);
      console.log(`🔧 Method: ${response.data.method}`);
      console.log(`🏢 Service: ${response.data.service}`);
      console.log(`⭐ Quality: ${response.data.quality}/100`);
      
      if (response.data.warning) {
        console.log(`⚠️ Warning: ${response.data.warning}`);
      }
      
    } catch (error) {
      console.log('❌ FAILED:');
      console.log(`🚨 Error: ${error.response?.data?.error || error.message}`);
    }
    
    console.log('\n' + '─'.repeat(80) + '\n');
  }
  
  console.log('🎯 Translation Hierarchy Summary:');
  console.log('1. 🥇 Primary: Google Translate (High Quality, Paid)');
  console.log('2. 🥈 Secondary: MyMemory (Good Quality, Free)');
  console.log('3. 🥉 Tertiary: LibreTranslate (Backup, Free)');
  console.log('4. 🏠 Local: Offline Dictionary (Always Available)');
};

// Run the test
testEnhancedTranslation().catch(console.error);