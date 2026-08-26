package com.minimart.service;

import com.minimart.dto.ProductRequestDTO;
import com.minimart.entity.Category;
import com.minimart.entity.Product;
import com.minimart.exception.ResourceNotFoundException;
import com.minimart.repository.CategoryRepository;
import com.minimart.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Product createProduct(ProductRequestDTO dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        Product product = new Product();

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStockQty(dto.getStockQty());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product updateProduct(Long id,
                                 ProductRequestDTO dto) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStockQty(dto.getStockQty());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }

    public List<Product> getLowStockProducts(Integer threshold) {
        return productRepository
                .findByStockQtyLessThan(threshold);
    }
}