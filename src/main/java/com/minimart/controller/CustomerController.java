package com.minimart.controller;

import com.minimart.dto.CustomerRequestDTO;
import com.minimart.entity.Customer;
import com.minimart.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(
            CustomerService customerService) {

        this.customerService = customerService;
    }

    @PostMapping
    public Customer createCustomer(
            @RequestBody CustomerRequestDTO dto) {

        return customerService.createCustomer(dto);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody CustomerRequestDTO dto) {

        return customerService
                .updateCustomer(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return "Customer deleted successfully";
    }
}