package com.example.medicineredistribution.models;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long medicineId;
    private int quantity;
    private BigDecimal totalPrice;
    private String status = "pending";
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}
