package com.ecomm.SpringBootEcomm.repository;

import com.ecomm.SpringBootEcomm.entity.CustomOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {
}