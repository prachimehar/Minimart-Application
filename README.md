# 🛒 MiniMart - Retail Store Management System

A full-stack Retail Store Management System built with **Spring Boot, React, MySQL, and JWT Authentication**.

MiniMart helps manage products, categories, customers, and orders through a modern dashboard with secure authentication and role-based access.

## 🚀 Live Demo

**Frontend:** https://minimart-application.vercel.app/

**Backend:** Deployed on **Render**

**Database:** **Aiven Cloud MySQL**

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based Authentication
* Secure Login & Registration
* Password Encryption using BCrypt
* Spring Security Integration
* Protected REST API Endpoints
* Stateless Session Management
* CORS Configuration
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
* Tailwind CSS
* Responsive UI
* Sidebar Navigation
* User Profile Dropdown
* Protected Routes
* Axios API Integration

---

## 🏗 Tech Stack

### Backend

* Java 17
* Spring Boot 3.3.5
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
* Aiven Cloud MySQL

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Aiven Cloud MySQL

---

## 🏗 Application Architecture

```text
                 ┌─────────────────────┐
                 │      React App      │
                 │   Vite + Tailwind   │
                 └──────────┬──────────┘
                            │
                            │ REST API
                            │ Axios
                            ▼
                 ┌─────────────────────┐
                 │    Spring Boot      │
                 │      Backend        │
                 │                     │
                 │ Spring Security     │
                 │ JWT Authentication  │
                 │ Spring Data JPA     │
                 └──────────┬──────────┘
                            │
                            │ JDBC
                            ▼
                 ┌─────────────────────┐
                 │   Aiven Cloud       │
                 │      MySQL          │
                 └─────────────────────┘

        Frontend → Vercel
        Backend  → Render
        Database → Aiven Cloud
```

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
├── minimart-backend
│   ├── src/main/java/com/minimart
│   │   ├── auth
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   ├── security
│   │   └── service
│   │
│   ├── src/main/resources
│   │   └── application.properties
│   │
│   ├── Dockerfile
│   └── pom.xml
```

---

## 🔑 Authentication Flow

1. User registers or logs in.
2. Spring Security validates the credentials.
3. Passwords are securely stored using BCrypt.
4. On successful login, a JWT token is generated.
5. The frontend stores the JWT token.
6. Axios sends the token with protected API requests.

```http
Authorization: Bearer <jwt-token>
```

7. `JwtFilter` validates the token before allowing access to protected endpoints.
8. The application uses stateless authentication.

---

## ⚙️ Local Installation

### Clone Repository

```bash
git clone https://github.com/prachimehar/Minimart-Application.git
cd Minimart-Application
```

---

## 🔧 Backend Setup

Navigate to the backend:

```bash
cd minimart-backend
```

The backend uses environment variables for database credentials, JWT secret, and frontend configuration.

### Environment Variables

```properties
DB_URL=jdbc:mysql://localhost:3306/minimart_db
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD

JWT_SECRET=YOUR_JWT_SECRET

FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## 🎨 Frontend Setup

Navigate to the frontend:

```bash
cd minimart-frontend
```

Install dependencies:

```bash
npm install
```

Create/configure the frontend environment variable:

```env
VITE_API_URL=http://localhost:8080
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# ☁️ Deployment

## Backend Deployment — Render

The Spring Boot backend is deployed on **Render**.

The backend uses environment variables instead of storing database credentials and JWT secrets directly in the source code.

### Render Environment Variables

```text
DB_URL=<Aiven MySQL JDBC URL>
DB_USER=<Aiven MySQL username>
DB_PASSWORD=<Aiven MySQL password>
JWT_SECRET=<secure JWT secret>
FRONTEND_URL=https://minimart-application.vercel.app
```

The application port is configured dynamically using:

```properties
server.port=${PORT:8080}
```

This allows Render to provide the required port.

### Backend Build

```bash
mvn clean package -DskipTests
```

The Spring Boot application is packaged as an executable JAR and can be started with:

```bash
java -jar target/minimart-0.0.1-SNAPSHOT.jar
```

The project also includes a `Dockerfile` for container-based deployment.

---

## 🗄️ Database — Aiven Cloud MySQL

MiniMart uses **Aiven Cloud MySQL** as its production database.

The backend connects to Aiven through environment variables:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
```

Hibernate automatically manages the database schema using:

```properties
spring.jpa.hibernate.ddl-auto=update
```

This allows the application to create/update required tables when the backend starts.

> ⚠️ Database credentials are not committed to GitHub. They are configured as environment variables in Render.

---

## 🌐 Frontend Deployment — Vercel

The React frontend is deployed on **Vercel**.

For production, configure:

```env
VITE_API_URL=https://YOUR-RENDER-BACKEND-URL
```

The frontend then sends API requests to the deployed Spring Boot backend instead of `localhost`.

For local development:

```env
VITE_API_URL=http://localhost:8080
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

### Products

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/products`           |
| POST   | `/api/products`           |
| PUT    | `/api/products/{id}`      |
| DELETE | `/api/products/{id}`      |
| GET    | `/api/products/low-stock` |

### Orders

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/orders`             |
| POST   | `/api/orders`             |
| GET    | `/api/orders/dashboard`   |
| PUT    | `/api/orders/{id}/cancel` |

### Customers

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/customers` |
| POST   | `/api/customers` |

---

## 📸 Application Screenshots

### 🏠 Home Page

<img width="1920" height="1080" alt="Home Page" src="https://github.com/user-attachments/assets/c650124b-cdd8-497b-bd7a-0d3a3eeb4596" />

---

### 🔐 Login Page

<img width="1920" height="1080" alt="Login Page" src="https://github.com/user-attachments/assets/a3b724cd-3349-405a-802e-7d71792898da" />

---

### 📊 Dashboard

<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/73c6abe4-c645-4c12-8b96-74f96bf0a0c1" />

---

### 📦 Products Management

<img width="1920" height="1080" alt="Products Management" src="https://github.com/user-attachments/assets/c6c296b1-c283-4dd1-865f-09ddeccd2ecb" />

---

### 🛒 Orders Management

<img width="1920" height="1080" alt="Orders Management" src="https://github.com/user-attachments/assets/81c54d1b-d83b-4ff2-aa33-1a340e76145a" />

---

### ➕ Create Order

<img width="1920" height="1080" alt="Create Order" src="https://github.com/user-attachments/assets/4c61c9bd-c9ed-4f5d-82c9-ebed053c80e1" />

---

### 🧾 Invoice

<img width="1920" height="1080" alt="Invoice Page" src="https://github.com/user-attachments/assets/bf532c8a-4d31-4c42-9646-d57bd44da4f2" />

---

### 👥 Customer Management

<img width="1920" height="1080" alt="Customer Management" src="https://github.com/user-attachments/assets/9417bc41-0b2f-4673-a971-99b8a9d40d95" />

---

## 🔒 Security Features

* JWT Token Authentication
* BCrypt Password Encryption
* Stateless Session Management
* CORS Configuration
* Spring Security Filters
* Protected REST APIs
* Environment-based Secrets
* Database credentials excluded from Git

---

## 🎯 Future Enhancements

* Admin/User Roles
* Sales Reports
* Email Notifications
* Docker-based Deployment
* Advanced Analytics
* Unit & Integration Test Coverage

