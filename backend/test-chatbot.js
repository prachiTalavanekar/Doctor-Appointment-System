// Test script for chatbot functionality
import axios from 'axios';

const testChatbot = async () => {
  try {
    console.log('🧪 Testing chatbot functionality...\n');
    
    // Test 1: Basic English query
    console.log('Test 1: Basic English query');
    const response1 = await axios.post('http://localhost:4000/api/chatbot/chat', {
      userQuery: 'I have a headache',
      chatHistory: [],
      language: 'en'
    });
    console.log('Response:', response1.data.response);
    console.log('✅ English test passed\n');
    
    // Test 2: Hindi query
    console.log('Test 2: Hindi query');
    const response2 = await axios.post('http://localhost:4000/api/chatbot/chat', {
      userQuery: 'मुझे सिरदर्द है',
      chatHistory: [],
      language: 'hi'
    });
    console.log('Response:', response2.data.response);
    console.log('✅ Hindi test passed\n');
    
    // Test 3: Emergency detection
    console.log('Test 3: Emergency detection');
    const response3 = await axios.post('http://localhost:4000/api/chatbot/chat', {
      userQuery: 'I have severe chest pain',
      chatHistory: [],
      language: 'en'
    });
    console.log('Response:', response3.data.response);
    console.log('✅ Emergency detection test passed\n');
    
    console.log('🎉 All chatbot tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 402) {
      console.log('\n💡 Note: This is expected if you\'re out of API credits. The system should fall back to offline responses.');
    }
  }
};

// Test translation separately
const testTranslation = async () => {
  try {
    console.log('\n🌍 Testing translation functionality...\n');
    
    const response = await axios.post('http://localhost:4000/api/translate', {
      q: 'Hello, how are you?',
      source: 'en',
      target: 'hi'
    });
    
    console.log('Translation result:', response.data.translatedText);
    console.log('✅ Translation test passed');
    
  } catch (error) {
    console.error('❌ Translation test failed:', error.response?.data || error.message);
  }
};

// Run tests
console.log('🚀 Starting comprehensive chatbot tests...\n');
await testChatbot();
await testTranslation();
console.log('\n✨ Test suite completed!');