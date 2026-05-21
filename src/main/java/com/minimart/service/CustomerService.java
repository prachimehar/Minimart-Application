package com.minimart.service;

import com.minimart.dto.CustomerRequestDTO;
import com.minimart.entity.Customer;
import com.minimart.exception.ResourceNotFoundException;
import com.minimart.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(
            CustomerRepository customerRepository) {

        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(
            CustomerRequestDTO dto) {

        Customer customer = new Customer();

        customer.setName(dto.getName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());

        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer updateCustomer(
            Long id,
            CustomerRequestDTO dto) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customer.setName(dto.getName());
        customer.setPhone(dto.getPhone());
        customer.setEmail(dto.getEmail());

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        try {

            customerRepository.delete(customer);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Cannot delete customer because orders exist for this customer"
            );
        }
    }
}