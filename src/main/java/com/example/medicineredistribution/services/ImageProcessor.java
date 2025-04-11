package com.example.medicineredistribution.services;
import org.opencv.core.Mat;
import org.opencv.core.CvType;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.core.Core;

public class ImageProcessor {

    // Load OpenCV library
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    // Method to read an image
    public static Mat readImage(String filePath) {
        Mat image = Imgcodecs.imread(filePath);
        if (image.empty()) {
            System.out.println("Error: Could not load image at " + filePath);
        } else {
            System.out.println("Image loaded successfully: " + filePath);
        }
        return image;
    }

    // Method to convert an image to grayscale
    public static Mat convertToGrayscale(Mat image) {
        Mat grayImage = new Mat();
        Imgproc.cvtColor(image, grayImage, Imgproc.COLOR_BGR2GRAY);
        return grayImage;
    }

    // Method to resize an image
    public static Mat resizeImage(Mat image, int width, int height) {
        Mat resizedImage = new Mat();
        Imgproc.resize(image, resizedImage, new Size(width, height));
        return resizedImage;
    }

    // Method to save an image
    public static void saveImage(String filePath, Mat image) {
        boolean saved = Imgcodecs.imwrite(filePath, image);
        if (saved) {
            System.out.println("Image saved successfully: " + filePath);
        } else {
            System.out.println("Error: Could not save image at " + filePath);
        }
    }

    // Main method for testing
    public static void main(String[] args) {
        String inputPath = "C:\\path\\to\\input.jpg";  // Change this to your image path
        String outputPath = "C:\\path\\to\\output.jpg";

        // Read image
        Mat image = readImage(inputPath);
        if (!image.empty()) {
            // Convert to grayscale
            Mat grayImage = convertToGrayscale(image);

            // Resize the image
            Mat resizedImage = resizeImage(grayImage, 300, 300);

            // Save processed image
            saveImage(outputPath, resizedImage);
        }
    }
}

