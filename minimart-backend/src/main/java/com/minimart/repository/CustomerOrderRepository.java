package com.minimart.repository;

import com.minimart.entity.CustomerOrder;
import com.minimart.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomerOrderRepository
        extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByStatus(OrderStatus status);

    List<CustomerOrder> findByOrderDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}