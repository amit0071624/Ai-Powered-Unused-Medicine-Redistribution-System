package com.example.medicineredistribution;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.medicineredistribution.utils.OpenCVLoader;

@SpringBootApplication

public class MedicineRedistributionApplication {
	public static void main(String[] args) {
		SpringApplication.run(MedicineRedistributionApplication.class, args);
		OpenCVLoader.checkOpenCV();
	}
}

