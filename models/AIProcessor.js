// AIProcessor class for handling image classification and medicine verification
import * as tf from '@tensorflow/tfjs';
import cv from '@techstark/opencv-js';

class AIProcessor {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/models/medicine-classifier/model.json');
      this.isModelLoaded = true;
    } catch (error) {
      console.error('Failed to load AI model:', error);
      throw error;
    }
  }

  async classifyImage(imageFile) {
    if (!this.isModelLoaded) {
      await this.loadModel();
    }

    let img = null;
    let processedImg = null;
    let tensor = null;

    try {
      // Convert image to OpenCV format
      img = await this.fileToMat(imageFile);
      
      // Preprocess image
      processedImg = this.preprocessImage(img);
      
      // Convert to tensor and classify
      tensor = tf.tidy(() => {
        return tf.browser.fromPixels(processedImg)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims();
      });

      const predictions = await this.model.predict(tensor).data();
      return this.processPredictions(predictions);
    } catch (error) {
      console.error('Image classification error:', error);
      throw error;
    } finally {
      // Cleanup resources
      if (img) img.delete();
      if (processedImg) processedImg.delete();
      if (tensor) tensor.dispose();
      tf.disposeVariables();
    }
  }

  async fileToMat(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = () => {
          const mat = cv.imread(img);
          resolve(mat);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  preprocessImage(mat) {
    // Apply OpenCV preprocessing
    const processed = new cv.Mat();
    
    // Convert to grayscale
    cv.cvtColor(mat, processed, cv.COLOR_RGBA2GRAY);
    
    // Apply Gaussian blur
    cv.GaussianBlur(processed, processed, new cv.Size(5, 5), 0);
    
    // Apply adaptive threshold
    cv.adaptiveThreshold(
      processed,
      processed,
      255,
      cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      cv.THRESH_BINARY,
      11,
      2
    );

    return processed;
  }

  processPredictions(predictions) {
    // Process model predictions
    const medicineClasses = [
      'tablet',
      'capsule',
      'liquid',
      'cream',
      'powder',
      'injection'
    ];

    const results = predictions.map((prob, idx) => ({
      class: medicineClasses[idx],
      probability: prob
    }));

    return {
      topPrediction: results.reduce((prev, current) => 
        prev.probability > current.probability ? prev : current
      ),
      allPredictions: results.sort((a, b) => b.probability - a.probability)
    };
  }

  async verifyMedicineImage(imageFile, expectedType) {
    const classification = await this.classifyImage(imageFile);
    const { topPrediction } = classification;

    return {
      isVerified: topPrediction.class === expectedType,
      confidence: topPrediction.probability,
      classification: classification.allPredictions,
      message: this.generateVerificationMessage(topPrediction, expectedType)
    };
  }

  generateVerificationMessage(prediction, expectedType) {
    if (prediction.class === expectedType) {
      return `Verified: Image matches expected medicine type (${expectedType}) with ${(prediction.probability * 100).toFixed(2)}% confidence`;
    } else {
      return `Verification failed: Expected ${expectedType}, but image appears to be ${prediction.class} (${(prediction.probability * 100).toFixed(2)}% confidence)`;
    }
  }

  async extractText(imageFile) {
    try {
      const img = await this.fileToMat(imageFile);
      const processed = this.preprocessImage(img);
      
      // TODO: Implement OCR functionality
      // This would require integration with a text recognition library
      // such as Tesseract.js for browser-based OCR
      
      return {
        success: true,
        text: 'OCR functionality to be implemented'
      };
    } catch (error) {
      console.error('Text extraction error:', error);
      throw error;
    }
  }
}

export default AIProcessor;