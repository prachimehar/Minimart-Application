package com.minimart.repository;

import com.minimart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByStockQtyLessThan(Integer threshold);

    boolean existsBySku(String sku);
}