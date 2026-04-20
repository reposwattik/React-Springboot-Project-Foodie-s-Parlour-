package com.ecomm.SpringBootEcomm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "custom_order")
public class CustomOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("itemName")
    @Column(name = "item_name")
    private String itemName;

    @JsonProperty("category")
    private String category;

    @JsonProperty("price")
    private double price;

    @JsonProperty("customDescription")
    @Column(name = "custom_description", columnDefinition = "TEXT")
    private String customDescription;

    @JsonProperty("quantity")
    private int quantity = 1;

    // Simple string format that old MySQL 5.1 can handle
    @JsonProperty("orderDate")
    @Column(name = "order_date", columnDefinition = "DATETIME")
    private String orderDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCustomDescription() { return customDescription; }
    public void setCustomDescription(String customDescription) { this.customDescription = customDescription; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
}