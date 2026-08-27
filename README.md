# 🛒 MiniMart - Retail Store Management System

A full-stack Retail Store Management System built with Spring Boot, MySQL, React, and JWT Authentication.

MiniMart helps manage products, categories, customers, and orders through a modern dashboard with secure authentication and role-based access.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based Authentication
* Secure Login System
* Password Encryption using BCrypt
* Spring Security Integration
* Protected API Endpoints
* Role-Based Access Support

### 📦 Product Management

* Add Products
* Update Products
* Delete Products
* View Product Inventory
* Low Stock Monitoring
* Product Categorization

### 🗂 Category Management

* Create Categories
* View Categories
* Organize Products by Category

### 👥 Customer Management

* Add Customers
* View Customer Details
* Customer Order Tracking

### 🧾 Order Management

* Create Orders
* View Orders
* Cancel Orders
* Generate Order Invoices
* Order History Tracking

### 📊 Dashboard Analytics

* Total Orders
* Total Revenue
* Product Statistics
* Low Stock Alerts

### 🎨 Modern Frontend

* React + Vite
* Responsive UI
* Sidebar Navigation
* User Profile Dropdown
* Protected Routes

---

## 🏗 Tech Stack

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Maven

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Database

* MySQL

---

## 📁 Project Structure

```text
MiniMart
│
├── minimart-frontend
│   ├── src
│   ├── pages
│   ├── components
│   └── services
│
├── src/main/java/com/minimart
│   ├── auth
│   ├── config
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   ├── security
│   └── service
│
└── src/main/resources
```

---

## 🔑 Authentication Flow

1. User logs in.
2. Spring Security validates credentials.
3. JWT token is generated.
4. Token is stored in localStorage.
5. Frontend sends token in Authorization header.

```http
Authorization: Bearer <jwt-token>
```

6. JwtFilter validates token on every request.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/prachimehar/Minimart-Application.git
cd Minimart-Application
```

---

### Backend Setup

Configure MySQL in:

```properties
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/minimart_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

Run Backend:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### Frontend Setup

Navigate to frontend:

```bash
cd minimart-frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /api/auth/login |

### Products

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/products           |
| POST   | /api/products           |
| PUT    | /api/products/{id}      |
| DELETE | /api/products/{id}      |
| GET    | /api/products/low-stock |

### Orders

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/orders             |
| POST   | /api/orders             |
| GET    | /api/orders/dashboard   |
| PUT    | /api/orders/{id}/cancel |

### Customers

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/customers |
| POST   | /api/customers |

---
## 📸 Application Screenshots

### 🏠 Home Page

 <img width="1920" height="1080" alt="Screenshot (45)" src="https://github.com/user-attachments/assets/c650124b-cdd8-497b-bd7a-0d3a3eeb4596" />


---

### 🔐 Login Page
<img width="1920" height="1080" alt="Screenshot (46)" src="https://github.com/user-attachments/assets/a3b724cd-3349-405a-802e-7d71792898da" />


---

### 📊 Dashboard

<img width="1920" height="1080" alt="Screenshot (48)" src="https://github.com/user-attachments/assets/73c6abe4-c645-4c12-8b96-74f96bf0a0c1" />



---

### 📦 Products Management
<img width="1920" height="1080" alt="Screenshot (47)" src="https://github.com/user-attachments/assets/c6c296b1-c283-4dd1-865f-09ddeccd2ecb" />


---

### 🛒 Orders Management

<img width="1920" height="1080" alt="Screenshot (49)" src="https://github.com/user-attachments/assets/81c54d1b-d83b-4ff7-aa33-1a340e76145a" />


---

### ➕ Create Order

<img width="1920" height="1080" alt="Screenshot (50)" src="https://github.com/user-attachments/assets/4c61c9bd-c9ed-4f5d-82c9-ebed053c80e1" />


---

### 🎤 InVoice Page

<img width="1920" height="1080" alt="Screenshot (52)" src="https://github.com/user-attachments/assets/bf532c8a-4d31-4c42-9646-d57bd44da4f2" />


---

### 👥 Customer Management
<img width="1920" height="1080" alt="Screenshot (51)" src="https://github.com/user-attachments/assets/9417bc41-0b2f-4673-a971-99b8a9d40d95" />



---

## 🔒 Security Features

* JWT Token Authentication
* BCrypt Password Encryption
* Stateless Session Management
* CORS Configuration
* Spring Security Filters
* Protected REST APIs

---

## 🎯 Future Enhancements

* Admin/User Roles
* Sales Reports
* Email Notifications
* Docker Deployment
