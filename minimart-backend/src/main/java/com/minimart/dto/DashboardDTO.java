package com.minimart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardDTO {
    private long totalOrders;
    private BigDecimal totalRevenue;
}