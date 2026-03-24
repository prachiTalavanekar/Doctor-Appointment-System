// Simple medical knowledge base for offline responses
export const medicalKnowledge = {
    symptoms: {
        headache: {
            en: "Headaches can be caused by stress, dehydration, lack of sleep, or tension. Try resting in a quiet, dark room, staying hydrated, and applying a cold or warm compress. If headaches are severe, frequent, or accompanied by other symptoms, please consult a healthcare provider.",
            hi: "सिरदर्द तनाव, निर्जलीकरण, नींद की कमी या तनाव के कारण हो सकता है। शांत, अंधेरे कमरे में आराम करने, हाइड्रेटेड रहने और ठंडी या गर्म सिकाई करने की कोशिश करें।",
            mr: "डोकेदुखी तणाव, निर्जलीकरण, झोपेची कमतरता किंवा ताणामुळे होऊ शकते. शांत, अंधाऱ्या खोलीत आराम करा, पाणी प्या आणि थंड किंवा उबदार पट्टी लावा."
        },
        fever: {
            en: "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated with water and clear fluids, and consider over-the-counter fever reducers if appropriate. Seek medical attention if fever is high (over 103°F/39.4°C) or persists for more than 3 days.",
            hi: "बुखार अक्सर इस बात का संकेत है कि आपका शरीर संक्रमण से लड़ रहा है। आराम करें, पानी और साफ तरल पदार्थों से हाइड्रेटेड रहें। यदि बुखार तेज है या 3 दिन से अधिक रहता है तो चिकित्सा सहायता लें।",
            mr: "ताप हे सहसा तुमचे शरीर संसर्गाशी लढत आहे याचे लक्षण आहे. आराम करा, पाणी आणि स्वच्छ द्रवपदार्थ घ्या. जर ताप जास्त असेल किंवा 3 दिवसांपेक्षा जास्त राहिल्यास वैद्यकीय मदत घ्या."
        },
        cough: {
            en: "Coughs can be due to viral infections, allergies, or irritants. Stay hydrated, use honey (for adults), and consider a humidifier. Seek medical care if cough persists for more than 2 weeks, produces blood, or is accompanied by high fever or difficulty breathing.",
            hi: "खांसी वायरल संक्रमण, एलर्जी या जलन के कारण हो सकती है। हाइड्रेटेड रहें, शहद का उपयोग करें। यदि खांसी 2 सप्ताह से अधिक रहती है, खून आता है, या सांस लेने में कठिनाई होती है तो चिकित्सा सहायता लें।",
            mr: "खोकला विषाणूजन्य संसर्ग, ऍलर्जी किंवा चिडचिडामुळे होऊ शकतो. पाणी प्या, मध वापरा. जर खोकला 2 आठवड्यांपेक्षा जास्त राहिल्यास किंवा रक्त येत असेल तर वैद्यकीय मदत घ्या."
        },
        "stomach pain": {
            en: "Stomach pain can have many causes including indigestion, gas, or stress. Try eating bland foods, staying hydrated, and avoiding spicy or fatty foods. Seek immediate medical attention if pain is severe, persistent, or accompanied by vomiting, fever, or blood.",
            hi: "पेट दर्द के कई कारण हो सकते हैं जैसे अपच, गैस या तनाव। सादा भोजन खाने, हाइड्रेटेड रहने और मसालेदार या चिकना भोजन से बचने की कोशिश करें। यदि दर्द गंभीर है तो तुरंत चिकित्सा सहायता लें।",
            mr: "पोटदुखीची अनेक कारणे असू शकतात जसे अपचन, वायू किंवा तणाव. सोपे अन्न खा, पाणी प्या आणि तिखट किंवा चरबीयुक्त अन्न टाळा. जर वेदना तीव्र असेल तर तातडीने वैद्यकीय मदत घ्या."
        }
    },

    general: {
        en: "I understand you're looking for medical guidance. While I can provide general health information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Please describe your specific symptoms so I can offer more targeted advice.",
        hi: "मैं समझता हूं कि आप चिकित्सा मार्गदर्शन की तलाश कर रहे हैं। जबकि मैं सामान्य स्वास्थ्य जानकारी प्रदान कर सकता हूं, उचित निदान और उपचार के लिए स्वास्थ्य सेवा पेशेवर से सलाह लेना महत्वपूर्ण है।",
        mr: "मला समजते की तुम्ही वैद्यकीय मार्गदर्शन शोधत आहात. मी सामान्य आरोग्य माहिती देऊ शकतो, परंतु योग्य निदान आणि उपचारासाठी आरोग्य सेवा व्यावसायिकाचा सल्ला घेणे महत्वाचे आहे."
    }
};

export const getOfflineResponse = (userQuery, language = "en") => {
    const query = userQuery.toLowerCase();

    // Check for specific symptoms
    for (const [symptom, responses] of Object.entries(medicalKnowledge.symptoms)) {
        if (query.includes(symptom) ||
            (symptom === "headache" && (query.includes("सिरदर्द") || query.includes("डोकेदुखी"))) ||
            (symptom === "fever" && (query.includes("बुखार") || query.includes("ताप"))) ||
            (symptom === "cough" && (query.includes("खांसी") || query.includes("खोकला"))) ||
            (symptom === "stomach pain" && (query.includes("पेट") || query.includes("पोट")))) {

            return responses[language] || responses.en;
        }
    }

    // Return general response
    return medicalKnowledge.general[language] || medicalKnowledge.general.en;
};