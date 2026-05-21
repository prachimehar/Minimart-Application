package com.minimart.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequestDTO {

    private Long customerId;

    private List<OrderItemRequestDTO> items;
}