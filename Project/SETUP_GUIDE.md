# Next.js + NestJS + MySQL CRUD Application - Step-by-Step Explanation

## 📋 Project Structure Overview

```
Project/
├── frontend/                 # Next.js Frontend Application
│   ├── pages/
│   │   ├── index.js         # Main CRUD UI page
│   │   └── _document.js     # Next.js document wrapper
│   ├── styles/
│   │   └── home.module.css  # Styling
│   ├── package.json         # Frontend dependencies
│   ├── next.config.js       # Next.js configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── Dockerfile           # Frontend Docker image
│
├── backend/                  # NestJS Backend API
│   ├── src/
│   │   ├── main.ts          # Application entry point
│   │   ├── app.module.ts    # Root module with TypeORM setup
│   │   └── products/
│   │       ├── entities/    # Database entities
│   │       │   └── product.entity.ts
│   │       ├── dtos/        # Data transfer objects
│   │       │   ├── create-product.dto.ts
│   │       │   └── update-product.dto.ts
│   │       ├── products.service.ts    # Business logic
│   │       ├── products.controller.ts # API endpoints
│   │       └── products.module.ts     # Feature module
│   ├── dist/                # Compiled output
│   ├── package.json         # Backend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   └── Dockerfile           # Backend Docker image
│
└── docker-compose.yml       # Multi-container orchestration
```

---

## 🎯 Step-by-Step Explanation

### **Step 1: Frontend - Next.js Setup**

**What is Next.js?**
- React framework for building production-ready web applications
- Provides SSR (Server-Side Rendering), Static Generation, and API Routes
- Built-in routing, optimization, and deployment features

**Frontend Components:**

1. **package.json** - Frontend Dependencies
   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "next": "^14.0.0",
       "axios": "^1.6.0"  // HTTP client for API calls
     }
   }
   ```

2. **pages/index.js** - Main CRUD Interface
   - Displays a form to add/edit products
   - Shows list of all products in a grid
   - Handles CREATE, READ, UPDATE, DELETE operations
   - Uses `axios` to communicate with backend API

3. **Styling** - CSS Modules (home.module.css)
   - Modern, responsive design
   - Grid layout for product cards
   - Gradient background

---

### **Step 2: Backend - NestJS Setup**

**What is NestJS?**
- TypeScript-based framework for building scalable server-side applications
- Built on Express.js
- Provides dependency injection, modular architecture, decorators
- Excellent for REST APIs and real-time applications

**Backend Components:**

1. **Database Entity - Product**
   ```typescript
   @Entity('products')
   export class Product {
     @PrimaryGeneratedColumn() id: number;
     @Column() name: string;
     @Column() price: decimal;
     @Column() description: string;
     @Column() createdAt: Date;
     @Column() updatedAt: Date;
   }
   ```
   - Maps to MySQL `products` table
   - Auto-generated ID (Primary Key)
   - Timestamps for created and updated dates

2. **DTOs (Data Transfer Objects)**
   - `CreateProductDto`: Validates input for creating products
   - `UpdateProductDto`: Partial DTO for updating products
   - Uses `class-validator` for validation

3. **Service Layer - ProductsService**
   - Contains business logic
   - Methods: create, findAll, findOne, update, remove
   - Interacts with TypeORM repository

4. **Controller Layer - ProductsController**
   - REST API endpoints:
     - `POST /api/products` - Create product
     - `GET /api/products` - Get all products
     - `GET /api/products/:id` - Get single product
     - `PUT /api/products/:id` - Update product
     - `DELETE /api/products/:id` - Delete product

---

### **Step 3: Database - MySQL Setup**

**What is MySQL?**
- Relational database management system
- Stores product data persistently
- Accessible via port 3306

**Database Connection Flow:**
```
NestJS Application
    ↓
TypeORM (ORM - Object-Relational Mapping)
    ↓
MySQL Driver (mysql2)
    ↓
MySQL Database
```

**Environment Variables:**
```
DB_HOST=mysql          # Docker service name
DB_PORT=3306           # MySQL default port
DB_USERNAME=root       # Root user
DB_PASSWORD=root@123   # Root password
DB_DATABASE=docker_learn
```

---

### **Step 4: Docker Configuration**

**What is Docker?**
- Containerization platform
- Each service runs in isolated container
- Services communicate via Docker network

**docker-compose.yml Setup:**

1. **Frontend Service**
   - Port: 3000
   - Depends on: backend
   - Volume: None (production build)

2. **Backend Service**
   - Port: 3001
   - Depends on: mysql (with health check)
   - Environment: Database credentials

3. **MySQL Service**
   - Port: 3306 (mapped to 3307)
   - Health check: Ensures database is ready
   - Persistent volume: Saves data

**Network:**
- All services connected via `app-network`
- Services can communicate by name (e.g., `mysql`, `backend`)

---

### **Step 5: CRUD Operations Flow**

#### **CREATE - Add New Product**
```
User inputs product data (name, price, description)
    ↓
Next.js sends POST request to /api/products
    ↓
NestJS Controller receives request
    ↓
ProductsService.create() validates and saves to database
    ↓
TypeORM executes INSERT query to MySQL
    ↓
Response returned to frontend
    ↓
UI refreshes, new product appears in list
```

#### **READ - Display Products**
```
Frontend loads (useEffect hook)
    ↓
Next.js sends GET request to /api/products
    ↓
NestJS Controller receives request
    ↓
ProductsService.findAll() retrieves from database
    ↓
TypeORM executes SELECT query
    ↓
Array of products returned
    ↓
Frontend renders product grid
```

#### **UPDATE - Modify Existing Product**
```
User clicks Edit button
    ↓
Form populates with current data
    ↓
User modifies and submits
    ↓
Next.js sends PUT request to /api/products/:id
    ↓
NestJS Controller receives request
    ↓
ProductsService.update() validates and updates database
    ↓
TypeORM executes UPDATE query
    ↓
Updated product returned
    ↓
UI refreshes with new data
```

#### **DELETE - Remove Product**
```
User clicks Delete button
    ↓
Confirmation dialog shown
    ↓
Confirmed: Next.js sends DELETE request to /api/products/:id
    ↓
NestJS Controller receives request
    ↓
ProductsService.remove() deletes from database
    ↓
TypeORM executes DELETE query
    ↓
UI refreshes, product removed from list
```

---

### **Step 6: Communication Between Services**

**Frontend → Backend:**
```
Next.js (port 3000)
    ↓
Axios HTTP Client
    ↓
API_URL: http://localhost:3001/api
    ↓
NestJS Backend (port 3001)
```

**Backend → Database:**
```
NestJS Application
    ↓
TypeORM Connection Pool
    ↓
Environment Variables (connection config)
    ↓
MySQL Container (mysql service)
```

---

### **Step 7: Docker Build & Run Process**

**Frontend Build:**
1. Install dependencies (npm install)
2. Build Next.js application (next build)
3. Output to `.next` directory

**Backend Build:**
1. Install dependencies (npm install)
2. Compile TypeScript to JavaScript (npm run build)
3. Output to `dist` directory

**Runtime:**
- Multi-stage builds keep image size small
- Production dependencies only
- No development dependencies in final image

---

## 🚀 How to Run

```bash
# Build and start all services
docker compose up --build

# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# MySQL: localhost:3307 (or 3306 inside Docker)
```

---

## 📝 Key Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js** | Frontend framework with React |
| **NestJS** | Backend framework for REST API |
| **TypeORM** | ORM for database operations |
| **MySQL** | Relational database |
| **Docker** | Containerization |
| **TypeScript** | Type-safe JavaScript |
| **Axios** | HTTP client for API calls |

---

## 🔄 Data Flow Summary

```
┌─────────────────────────────────────────────────────┐
│              Next.js Frontend                       │
│         (React Components, Forms)                   │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ HTTP Requests (Axios)
                    │ JSON Data
                    ▼
┌─────────────────────────────────────────────────────┐
│          NestJS Backend API                         │
│  (Controllers, Services, Validation)               │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ TypeORM
                    │ SQL Queries
                    ▼
┌─────────────────────────────────────────────────────┐
│          MySQL Database                            │
│   (Tables, Relationships, Persistence)             │
└─────────────────────────────────────────────────────┘
```

---

## ✅ API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create new product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## 📦 Database Schema

**Products Table:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

This application demonstrates a complete full-stack CRUD implementation with modern technologies and Docker containerization!
