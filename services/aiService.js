import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

const AI_BASE_URL = 'http://localhost:8080/api/ai';

// Preloaded FAQ questions and answers
const FAQ_QUESTIONS = [
  {
    question: 'How do I donate medicines?',
    answer: 'You can donate medicines by registering on our platform and following the medicine donation guidelines. All medicines must be unexpired and in their original packaging.'
  },
  {
    question: 'What types of medicines can be donated?',
    answer: 'We accept prescription medications, over-the-counter medicines, and medical supplies that are unexpired, sealed, and in their original packaging. Controlled substances cannot be accepted.'
  },
  {
    question: 'How do I request medicines?',
    answer: 'To request medicines, you need to register as a recipient, provide necessary documentation, and submit a request through our platform. Our team will review and process your request.'
  },
  {
    question: 'Is medicine redistribution legal?',
    answer: 'Yes, our platform operates within legal frameworks and guidelines for medicine redistribution. We ensure compliance with all relevant regulations and maintain proper documentation.'
  },
  {
    question: 'How is medicine quality ensured?',
    answer: 'All donated medicines undergo a thorough verification process. We check expiration dates, packaging integrity, and storage conditions. Only medicines meeting our quality standards are accepted.'
  },
  {
    question: 'What is the process for medicine verification?',
    answer: 'Our verification process includes checking expiration dates, validating authenticity, inspecting packaging condition, and verifying storage requirements. Licensed pharmacists review all donations.'
  },
  {
    question: 'How long does the donation process take?',
    answer: 'The donation process typically takes 2-3 business days, including verification and documentation. Urgent donations may be processed faster based on need.'
  },
  {
    question: 'Can I track my donation?',
    answer: 'Yes, you can track your donation through your account dashboard. You\'ll receive updates on verification status, recipient matching, and final distribution.'
  },
  {
    question: 'What happens to expired medicines?',
    answer: 'We cannot accept expired medicines. Please dispose of expired medications properly through local medication disposal programs or pharmacies.'
  },
  {
    question: 'How are medicines stored?',
    answer: 'Medicines are stored in temperature-controlled facilities following pharmaceutical storage guidelines. We monitor conditions 24/7 to maintain medicine quality.'
  },
  {
    question: 'Can I donate medical equipment?',
    answer: 'Yes, we accept medical equipment donations. Equipment must be in working condition and meet our quality standards. Please contact us for specific requirements.'
  },
  {
    question: 'How do you match donors with recipients?',
    answer: 'We use an AI-powered matching system that considers medication type, urgency of need, location, and quantity to optimize distribution efficiency.'
  }
];

// Smart medicine recommendations based on user history and health concerns
export const getSmartRecommendations = async (userId, healthConcerns) => {
  try {
    const response = await axios.get(`${AI_BASE_URL}/recommendations`, {
      params: { userId, healthConcerns }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get recommendations', error);
    return [];
  }
};

// Image recognition for prescription processing
export const processPrescriptionImage = async (imageFile) => {
  try {
    const model = await tf.loadLayersModel('/models/prescription-model/model.json');
    const imageData = await createImageBitmap(imageFile);
    const tensor = tf.browser.fromPixels(imageData)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();
    
    const predictions = await model.predict(tensor).data();
    return processPredictions(predictions);
  } catch (error) {
    console.error('Failed to process prescription image', error);
    return null;
  }
};

// Chatbot for medicine queries
export const getChatbotResponse = async (query) => {
  try {
    // Normalize the query
    const normalizedQuery = query.toLowerCase().trim();

    // Check for exact matches first
    const exactMatch = FAQ_QUESTIONS.find(faq =>
      faq.question.toLowerCase() === normalizedQuery
    );

    if (exactMatch) {
      return { message: exactMatch.answer, isFaq: true, confidence: 1.0 };
    }

    // Check for partial matches using keyword analysis
    const partialMatches = FAQ_QUESTIONS.map(faq => {
      const questionWords = faq.question.toLowerCase().split(' ');
      const queryWords = normalizedQuery.split(' ');
      const matchingWords = questionWords.filter(word => queryWords.includes(word));
      return {
        faq,
        confidence: matchingWords.length / Math.max(questionWords.length, queryWords.length)
      };
    });

    // Find the best partial match
    const bestMatch = partialMatches.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    , { confidence: 0 });

    if (bestMatch.confidence > 0.5) {
      return { message: bestMatch.faq.answer, isFaq: true, confidence: bestMatch.confidence };
    }

    // If no good match, proceed with AI response
    const response = await axios.post(`${AI_BASE_URL}/chatbot`, { 
      query,
      context: {
        previousQuestions: FAQ_QUESTIONS.map(faq => faq.question),
        confidence: bestMatch.confidence
      }
    });

    return { 
      message: response.data.message || 'I apologize, but I need more information to help you better. Could you please rephrase your question?', 
      isFaq: false,
      confidence: response.data.confidence || 0
    };
  } catch (error) {
    console.error('Failed to get chatbot response', error);
    return { 
      message: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.', 
      isFaq: false,
      confidence: 0
    };
  }
};

// Get all FAQ questions
export const getFaqQuestions = () => {
  return FAQ_QUESTIONS.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
};

// Predictive analytics for inventory
export const getPredictiveInventory = async () => {
  try {
    const response = await axios.get(`${AI_BASE_URL}/inventory/predictions`);
    return response.data;
  } catch (error) {
    console.error('Failed to get inventory predictions', error);
    return [];
  }
};

// Health insights based on medicine patterns
export const getUserHealthInsights = async (userId) => {
  try {
    const response = await axios.get(`${AI_BASE_URL}/insights/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get health insights', error);
    return [];
  }
};

// Helper function to process model predictions
const processPredictions = (predictions) => {
  // Process and format the model's output
  return {
    medicines: predictions.medicines,
    dosage: predictions.dosage,
    frequency: predictions.frequency,
    confidence: predictions.confidence
  };
};