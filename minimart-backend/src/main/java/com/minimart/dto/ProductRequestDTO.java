package com.minimart.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequestDTO {

    private String name;

    private String sku;

    private BigDecimal price;

    private Integer stockQty;

    private Long categoryId;
}