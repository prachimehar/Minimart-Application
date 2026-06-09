package com.minimart.controller;

import com.minimart.dto.ProductRequestDTO;
import com.minimart.entity.Product;
import com.minimart.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @PostMapping
    public Product createProduct(
            @RequestBody ProductRequestDTO dto) {

        return productService.createProduct(dto);
    }

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false)
            Long categoryId) {

        if (categoryId != null) {
            return productService
                    .getProductsByCategory(categoryId);
        }

        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequestDTO dto) {

        return productService.updateProduct(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts(
            @RequestParam(defaultValue = "10")
            Integer threshold) {

        return productService
                .getLowStockProducts(threshold);
    }
}