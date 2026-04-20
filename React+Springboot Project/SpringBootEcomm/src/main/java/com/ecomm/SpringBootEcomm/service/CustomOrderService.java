package com.ecomm.SpringBootEcomm.service;

import com.ecomm.SpringBootEcomm.entity.CustomOrder;
import com.ecomm.SpringBootEcomm.repository.CustomOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomOrderService {

    @Autowired
    private CustomOrderRepository repository;

    public CustomOrder addOrder(CustomOrder order) {
        return repository.save(order);
    }

    public List<CustomOrder> getAllOrders() {
        return repository.findAll();
    }

    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }
    
    public void clearAllOrders() {
        repository.deleteAll();   // Deletes all records from custom_order table
    }
}