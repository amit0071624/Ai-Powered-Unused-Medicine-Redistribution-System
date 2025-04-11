package com.example.medicineredistribution.controllers;


import com.example.medicineredistribution.models.Admin;
import com.example.medicineredistribution.models.User;
import com.example.medicineredistribution.repositories.AdminRepository;
import com.example.medicineredistribution.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend URL
@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> credentials) {
        boolean isAuthenticated = authService.login(credentials.get("email"), credentials.get("password"));
        return isAuthenticated ? "Login successful" : "Invalid credentials";
    }

        @Autowired
        private AdminRepository adminRepository;

        @Autowired
        private PasswordEncoder passwordEncoder; // If using hashed passwords

        @PostMapping("/admin/login")
        public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
            Admin admin = adminRepository.findByUsername(request.getUsername());
            if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
            return ResponseEntity.ok("Admin login successful");


        }
}
