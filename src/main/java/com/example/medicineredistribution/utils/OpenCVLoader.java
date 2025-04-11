package com.example.medicineredistribution.utils;


import org.opencv.core.Core;

public class OpenCVLoader {
    static {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
    }

    public static void checkOpenCV() {
        System.out.println("OpenCV version: " + Core.VERSION);
    }
}

