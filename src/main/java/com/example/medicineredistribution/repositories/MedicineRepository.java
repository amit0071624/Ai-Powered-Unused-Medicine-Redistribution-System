package com.example.medicineredistribution.repositories;


import com.example.medicineredistribution.models.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> { }
