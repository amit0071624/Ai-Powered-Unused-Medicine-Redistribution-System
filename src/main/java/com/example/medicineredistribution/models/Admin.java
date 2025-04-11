package com.example.medicineredistribution.models;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String role = "ADMIN";

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    // Default constructor
    public Admin() {}

    // Constructor with parameters (optional)
    public Admin(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = "ADMIN";
    }

    // **GETTERS**
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    // **SETTERS** (Optional, if you need them)
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
