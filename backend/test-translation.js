// Test script for translation API
import axios from 'axios';

const testTranslation = async () => {
    try {
        console.log('Testing translation API...');

        // Test English to Hindi
        const response1 = await axios.post('http://localhost:4000/api/translate', {
            q: 'Hello, how are you feeling today?',
            source: 'en',
            target: 'hi'
        });

        console.log('EN -> HI:', response1.data.translatedText);

        // Test Hindi to English
        const response2 = await axios.post('http://localhost:4000/api/translate', {
            q: 'मुझे सिरदर्द है',
            source: 'hi',
            target: 'en'
        });

        console.log('HI -> EN:', response2.data.translatedText);

        // Test English to Marathi
        const response3 = await axios.post('http://localhost:4000/api/translate', {
            q: 'I have a fever',
            source: 'en',
            target: 'mr'
        });

        console.log('EN -> MR:', response3.data.translatedText);

        console.log('All tests passed! ✅');

    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
};

// Run the test
testTranslation();