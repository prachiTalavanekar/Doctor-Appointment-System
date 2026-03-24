// Google Cloud Translation service using service account authentication
import { TranslationServiceClient } from '@google-cloud/translate';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Translation service client
let translationClient = null;
let isInitialized = false;

const initializeTranslationClient = () => {
  if (isInitialized) return translationClient;
  
  try {
    // Check if new environment variables are set
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn('Google Cloud credentials not fully configured in environment variables.');
      
      // Fallback for GOOGLE_APPLICATION_CREDENTIALS for backward compatibility if needed
      const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      if (credentialsPath) {
        const fullPath = path.resolve(__dirname, '..', credentialsPath);
        translationClient = new TranslationServiceClient({
          keyFilename: fullPath,
        });
        isInitialized = true;
        return translationClient;
      }
      
      return null;
    }
    
    // Initialize the client with credentials from environment variables
    translationClient = new TranslationServiceClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      projectId: projectId,
    });
    
    isInitialized = true;
    console.log('✅ Google Cloud Translation client initialized successfully with environment variables');
    return translationClient;
  } catch (error) {
    console.error('❌ Failed to initialize Google Cloud Translation client:', error.message);
    return null;
  }
};

// Translate text using Google Cloud Translation API
export const translateTextWithGoogle = async (text, sourceLanguage, targetLanguage) => {
  // Initialize client if not already done
  const client = initializeTranslationClient();
  if (!client) {
    throw new Error('Google Cloud Translation client not initialized');
  }
  
  try {
    const projectId = await client.getProjectId();
    
    const request = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    };
    
    // Run request
    const [response] = await client.translateText(request);
    
    // Extract translated text
    const translatedText = response.translations[0].translatedText;
    
    return {
      translatedText,
      detectedLanguage: response.translations[0].detectedLanguageCode || sourceLanguage,
      quality: 100, // Google Translate is considered high quality
      method: 'google_cloud_api',
      service: 'Google Cloud Translation API'
    };
  } catch (error) {
    console.error('Google Cloud Translation error:', error.message);
    throw error;
  }
};

// Health check for Google Cloud Translation service
export const checkGoogleTranslationHealth = async () => {
  try {
    const client = initializeTranslationClient();
    if (!client) {
      return {
        enabled: false,
        configured: false,
        message: 'Google Cloud credentials not configured'
      };
    }
    
    // Try to get supported languages as a health check
    const projectId = await client.getProjectId();
    const request = {
      parent: `projects/${projectId}/locations/global`,
      displayLanguageCode: 'en',
    };
    
    await client.getSupportedLanguages(request);
    
    return {
      enabled: true,
      configured: true,
      message: 'Google Cloud Translation service is working properly'
    };
  } catch (error) {
    return {
      enabled: false,
      configured: true,
      message: `Google Cloud Translation service error: ${error.message}`
    };
  }
};