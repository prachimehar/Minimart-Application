package com.minimart.service;

import com.minimart.dto.*;
import com.minimart.entity.*;
import com.minimart.exception.InsufficientStockException;
import com.minimart.exception.ResourceNotFoundException;
import com.minimart.repository.CustomerOrderRepository;
import com.minimart.repository.CustomerRepository;
import com.minimart.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final CustomerOrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public OrderService(CustomerOrderRepository orderRepository,
                        CustomerRepository customerRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    // ---------------- CREATE ORDER ----------------
    @Transactional
    public CustomerOrder createOrder(CreateOrderRequestDTO dto) {

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.CONFIRMED);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDTO : dto.getItems()) {

            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            if (product.getStockQty() < itemDTO.getQuantity()) {
                throw new InsufficientStockException(
                        "Insufficient stock for product: " + product.getName());
            }

            // stock deduction
            product.setStockQty(product.getStockQty() - itemDTO.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setUnitPrice(product.getPrice());

            orderItems.add(orderItem);

            BigDecimal itemTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemDTO.getQuantity()));

            totalAmount = totalAmount.add(itemTotal);
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    // ---------------- GET ALL ORDERS ----------------
    public List<CustomerOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    // ---------------- GET ORDER (INVOICE FIX) ----------------
    public OrderResponseDTO getOrderById(Long id) {

        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setStatus(order.getStatus().name());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderDate(order.getOrderDate().toString());

        // CUSTOMER
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(order.getCustomer().getId());
        customerDTO.setName(order.getCustomer().getName());
        customerDTO.setEmail(order.getCustomer().getEmail());
        customerDTO.setPhone(order.getCustomer().getPhone());

        dto.setCustomer(customerDTO);

        // ITEMS (FIXED)
        List<OrderItemDTO> items = order.getItems().stream().map(item -> {

            OrderItemDTO i = new OrderItemDTO();

            i.setProductId(item.getProduct().getId());        // ✅ FIX
            i.setProductName(item.getProduct().getName());    // ✅ FIX
            i.setQuantity(item.getQuantity());
            i.setUnitPrice(item.getUnitPrice());

            return i;

        }).toList();

        dto.setItems(items);

        return dto;
    }

    // ---------------- CANCEL ORDER ----------------
    @Transactional
    public CustomerOrder cancelOrder(Long id) {

        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order already cancelled");
        }

        for (OrderItem item : order.getItems()) {

            Product product = item.getProduct();
            product.setStockQty(product.getStockQty() + item.getQuantity());

            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    // ---------------- DASHBOARD ----------------
    public DashboardDTO getDashboard() {

        List<CustomerOrder> orders = orderRepository.findAll();

        // ✅ Removed today filter — counts ALL orders lifetime
        long totalOrders = orders.stream()
                .count();

        BigDecimal totalRevenue = orders.stream()
                .filter(o -> o.getStatus() == OrderStatus.CONFIRMED)
                .map(CustomerOrder::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardDTO(totalOrders, totalRevenue);  // ✅ updated field
    }


}