package com.example.medicineredistribution.services;


import org.opencv.core.Mat;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class MedicineService {

    public void processAndSaveImage(String imagePath) {
        Mat image = ImageProcessor.readImage(imagePath);
        if (image.empty()) {
            throw new RuntimeException("Failed to read image: " + imagePath);
        }

        // Convert to grayscale
        Mat grayImage = ImageProcessor.convertToGrayscale(image);

        // Resize image (adjust dimensions as needed)
        Mat resizedImage = ImageProcessor.resizeImage(grayImage, 200, 200);

        // Save processed image
        ImageProcessor.saveImage(imagePath, resizedImage);
        System.out.println("Image processed and saved: " + imagePath);
    }
}
