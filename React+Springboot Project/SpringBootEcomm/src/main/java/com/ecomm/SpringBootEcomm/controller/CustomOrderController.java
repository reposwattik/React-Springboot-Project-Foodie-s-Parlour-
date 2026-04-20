package com.ecomm.SpringBootEcomm.controller;

import com.ecomm.SpringBootEcomm.entity.CustomOrder;
import com.ecomm.SpringBootEcomm.service.CustomOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5174")
public class CustomOrderController {

    @Autowired
    private CustomOrderService service;

    // FIXED: Must return the saved object with generated ID
    @PostMapping("/add")
    public ResponseEntity<CustomOrder> addOrder(@RequestBody CustomOrder order) {
        CustomOrder saved = service.addOrder(order);
        
        System.out.println("✅ SAVED TO DB WITH ID: " + saved.getId());  // Debugging line
        
        return ResponseEntity.ok(saved);   // This is critical
    }

    @GetMapping("/all")
    public List<CustomOrder> getAllOrders() {
        return service.getAllOrders();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        try {
            service.deleteOrder(id);
            System.out.println("✅ DELETED FROM DB: " + id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            System.out.println("❌ DELETE FAILED for ID: " + id);
            return ResponseEntity.badRequest().body("Delete failed");
        }
    }
    
    // Add this method inside the class
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearAllOrders() {
        try {
            service.clearAllOrders();
            return ResponseEntity.ok("All orders cleared successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to clear orders");
        }
    }
}