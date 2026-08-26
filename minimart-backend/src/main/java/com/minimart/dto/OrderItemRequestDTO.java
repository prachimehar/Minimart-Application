package com.minimart.dto;

import lombok.Data;

@Data
public class OrderItemRequestDTO {

    private Long productId;

    private Integer quantity;
}