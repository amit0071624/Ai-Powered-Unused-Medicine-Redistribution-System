package com.example.medicineredistribution.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access backend
@RestController
@RequestMapping("/api")
public class DeliveryController {

    @GetMapping("/delivery-time")
    public String getDeliveryTime(@RequestParam String pincode) {
        try {
            // Mock API Call (Replace with real API if needed)
            String apiUrl = "https://api.postalpincode.in/pincode/" + pincode;
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(apiUrl, String.class);

            // Parse JSON (if needed)
            JSONObject jsonResponse = new JSONObject(response);
            String deliveryTime = "Estimated delivery time: 2-4 days"; // Mock Data

            return deliveryTime;
        } catch (Exception e) {
            return "Error fetching delivery time";
        }
    }
}

