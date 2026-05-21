package com.minimart.controller;

import com.minimart.dto.CreateOrderRequestDTO;
import com.minimart.dto.DashboardDTO;
import com.minimart.dto.OrderResponseDTO;
import com.minimart.entity.CustomerOrder;
import com.minimart.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }

    @PostMapping
    public CustomerOrder createOrder(
            @RequestBody CreateOrderRequestDTO dto) {

        return orderService.createOrder(dto);
    }

    @GetMapping
    public List<CustomerOrder> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(
            @PathVariable Long id) {

        return orderService.getOrderById(id);
    }

    @PutMapping("/{id}/cancel")
    public CustomerOrder cancelOrder(
            @PathVariable Long id) {

        return orderService.cancelOrder(id);
    }

    @GetMapping("/dashboard")
    public DashboardDTO getDashboard() {
        return orderService.getDashboard();
    }
}