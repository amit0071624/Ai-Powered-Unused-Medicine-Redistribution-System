package com.example.medicineredistribution.controllers;


import com.example.medicineredistribution.models.Order;
import com.example.medicineredistribution.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public String placeOrder(@RequestBody Order order) {
        try {
            orderRepository.save(order);
            return "Order placed successfully!";
        } catch (Exception e) {
            return "Failed to place order.";
        }
    }
}

