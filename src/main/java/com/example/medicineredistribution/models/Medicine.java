package com.example.medicineredistribution.models;


import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String expiryDate;
    private int quantity;

    public Medicine() {}

    public Medicine(String name, String expiryDate, int quantity) {
        this.name = name;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
