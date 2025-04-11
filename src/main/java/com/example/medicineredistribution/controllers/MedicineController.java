package com.example.medicineredistribution.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.medicineredistribution.models.Medicine;
import com.example.medicineredistribution.repositories.MedicineRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access this API
@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    @Autowired
    private MedicineRepository medicineRepository;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }
}
