# 📋 Step-by-Step Explanation Reference Card

## 🎯 Project Overview

This is a **Full-Stack CRUD Application** that manages products in a database with a web interface.

### The Three Layers

```
┌─────────────────────────────────┐
│  FRONTEND (What Users See)      │  Next.js + React
│  Port: 3000                     │
└─────────────────────────────────┘
           ↓ (HTTP)
┌─────────────────────────────────┐
│  BACKEND (Business Logic)        │  NestJS + TypeORM
│  Port: 3001                     │
└─────────────────────────────────┘
           ↓ (SQL)
┌─────────────────────────────────┐
│  DATABASE (Data Storage)         │  MySQL
│  Port: 3306 (3307 external)     │
└─────────────────────────────────┘
```

---

## 📱 STEP 1: FRONTEND - What You See

### Location: `/frontend/pages/index.js`

```
┌─────────────────────────────────────────┐
│        PRODUCT CRUD MANAGEMENT          │
├─────────────────────────────────────────┤
│                                         │
│  ADD/EDIT PRODUCT FORM                  │
│  ┌────────────────────────────────────┐ │
│  │ Product Name: ________ [input]     │ │
│  │ Price: ________ [input]            │ │
│  │ Description: ________ [textarea]   │ │
│  │ [Add Product] [Cancel]             │ │
│  └────────────────────────────────────┘ │
│                                         │
│  PRODUCTS LIST                          │
│  ┌────────────────────────────────────┐ │
│  │ Product 1: $999.99  │ Edit | Delete│ │
│  │ Product 2: $25.99   │ Edit | Delete│ │
│  │ Product 3: $79.99   │ Edit | Delete│ │
│  └────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### Frontend Technologies
- **React**: Creates interactive UI components
- **Next.js**: Framework that builds the website
- **Axios**: Sends requests to backend
- **CSS Modules**: Styles the components

---

## 🔄 STEP 2: HOW FRONTEND WORKS

### The Component Lifecycle

```
1. PAGE LOADS
   ↓
2. useEffect Hook Runs
   └─ Calls: fetchProducts()
   ↓
3. axios.get('/api/products')
   └─ Sends HTTP GET request to backend
   ↓
4. Backend Returns: [{id:1, name:...}, {id:2, name:...}, ...]
   ↓
5. setProducts(response.data)
   └─ Updates React state
   ↓
6. Component Re-renders
   └─ Displays products in grid
```

### User Actions

```
USER ACTION          →  HANDLER FUNCTION    →  BACKEND REQUEST
─────────────────────────────────────────────────────────────
Add Product          →  handleSubmit()      →  POST /api/products
View Products        →  useEffect()         →  GET /api/products
Edit Product         →  handleEdit()        →  PUT /api/products/:id
Delete Product       →  handleDelete()      →  DELETE /api/products/:id
```

---

## 🖥️ STEP 3: BACKEND - The API

### Location: `/backend/src/products/`

### What Backend Does
1. **Receives** HTTP requests from frontend
2. **Validates** the data
3. **Queries** the database
4. **Sends back** JSON responses

### Backend Structure

```
REQUEST FROM FRONTEND
        ↓
    CONTROLLER (productsController.ts)
    └─ Routes the request
        ↓
    SERVICE (productsService.ts)
    └─ Contains business logic
        ↓
    REPOSITORY (TypeORM)
    └─ Queries the database
        ↓
    DATABASE (MySQL)
    └─ Stores/retrieves data
        ↓
    RESPONSE SENT BACK
```

### The 5 API Endpoints

| # | Method | Endpoint | What It Does |
|---|--------|----------|-------------|
| 1 | POST | `/api/products` | **Create** - Add new product |
| 2 | GET | `/api/products` | **Read All** - Get all products |
| 3 | GET | `/api/products/:id` | **Read One** - Get single product |
| 4 | PUT | `/api/products/:id` | **Update** - Modify product |
| 5 | DELETE | `/api/products/:id` | **Delete** - Remove product |

---

## 📊 STEP 4: DATABASE - Data Storage

### Location: MySQL Service

### The Products Table

```
PRODUCTS TABLE
┌────┬────────────┬────────┬─────────────────────────┬──────────────┬──────────────┐
│ id │ name       │ price  │ description             │ createdAt    │ updatedAt    │
├────┼────────────┼────────┼─────────────────────────┼──────────────┼──────────────┤
│ 1  │ Laptop     │ 999.99 │ High-performance device │ 2026-05-10.. │ 2026-05-10.. │
│ 2  │ Mouse      │ 25.99  │ Wireless mouse          │ 2026-05-10.. │ 2026-05-10.. │
│ 3  │ Keyboard   │ 79.99  │ Mechanical keyboard     │ 2026-05-10.. │ 2026-05-10.. │
└────┴────────────┴────────┴─────────────────────────┴──────────────┴──────────────┘
```

### Key Concepts

- **id**: Unique identifier (Auto-generated)
- **name**: Product name (required)
- **price**: Product price (decimal format)
- **description**: Product details (optional)
- **createdAt**: When created (automatic)
- **updatedAt**: When last modified (automatic)

---

## 🔗 STEP 5: COMPLETE CRUD FLOW

### CREATE - Adding a Product

```
┌─ USER ENTERS DATA ─┐
│ Name: Laptop      │
│ Price: 999.99     │
│ Description: ...  │
└───────┬───────────┘
        │ Clicks "Add Product"
        ▼
   FRONTEND
   handleSubmit()
        ▼
   axios.post('/api/products', {
     name, price, description
   })
        │ HTTP POST
        ▼
   BACKEND
   @Post() create(@Body() dto)
        ▼
   SERVICE
   create(dto)
        ▼
   TypeORM INSERT
   INSERT INTO products (name, price, ...)
        │ SQL
        ▼
   MYSQL
   Row Added
        │ Row ID: 4
        ▼
   RESPONSE {id: 4, name: 'Laptop', ...}
        │ JSON
        ▼
   FRONTEND
   setProducts([...products, newProduct])
        ▼
   UI UPDATES
   New product appears in list ✓
```

### READ - Viewing Products

```
FRONTEND LOADS
        ↓
useEffect() runs
        ▼
GET /api/products
        │
        ▼
BACKEND findAll()
        │
        ▼
TypeORM find()
        │
        ▼
SELECT * FROM products
        │
        ▼
MYSQL Returns: [Product1, Product2, ...]
        │
        ▼
RESPONSE with products array
        ▼
FRONTEND
setProducts(data)
        ▼
UI RENDERS
Grid of product cards
```

### UPDATE - Editing a Product

```
CLICK EDIT BUTTON
        ▼
Form populates with current data
        ▼
User modifies values
        ▼
SUBMIT
        ▼
PUT /api/products/:id
        │
        ▼
BACKEND update(id, dto)
        │
        ▼
UPDATE products SET ... WHERE id = ?
        │
        ▼
MYSQL Updates row
        ▼
RESPONSE {id, ...updated fields}
        ▼
FRONTEND
setProducts() refreshes list
        ▼
UI SHOWS updated values
```

### DELETE - Removing a Product

```
CLICK DELETE BUTTON
        ▼
Confirmation dialog
        ▼
User confirms
        ▼
DELETE /api/products/:id
        │
        ▼
BACKEND remove(id)
        │
        ▼
DELETE FROM products WHERE id = ?
        │
        ▼
MYSQL Deletes row
        ▼
RESPONSE 204 No Content
        ▼
FRONTEND
setProducts() removes from list
        ▼
UI REFRESHES
Product is gone
```

---

## 🐳 STEP 6: DOCKER - Running Everything

### What is Docker?

Docker packages applications in **containers** (like boxes).

Each box runs independently:
- **Frontend box**: Runs on port 3000
- **Backend box**: Runs on port 3001  
- **Database box**: Runs on port 3306

They communicate over a Docker network.

### Starting the Application

```bash
docker compose up --build
```

This command:
1. Builds frontend Docker image
2. Builds backend Docker image
3. Starts MySQL container
4. Starts frontend container
5. Starts backend container
6. Connects them all via network

### What Happens When Services Start

```
1. MySQL starts first
   └─ Database is ready
   
2. Backend starts
   └─ Connects to MySQL
   └─ Listen on port 3001
   
3. Frontend starts
   └─ Listen on port 3000
   └─ Can call backend API
   
4. Application is ready!
   └─ http://localhost:3000
```

---

## 🔀 STEP 7: HOW COMPONENTS COMMUNICATE

### Frontend to Backend

```
FRONTEND (Port 3000)
    │
    │ axios.post('http://localhost:3001/api/products', data)
    │
    ▼
BACKEND (Port 3001)
    │
    │ Receives JSON
    │ Processes request
    │ Sends JSON response
    │
    ▼
FRONTEND receives response
    │
    └─ Update state
    └─ Re-render UI
```

### Backend to Database

```
BACKEND (Port 3001)
    │
    │ TypeORM creates SQL query
    │ INSERT/SELECT/UPDATE/DELETE
    │
    ▼
MYSQL (Port 3306)
    │
    │ Executes SQL
    │ Returns result
    │
    ▼
BACKEND receives result
    │
    └─ Convert to JSON
    └─ Send to frontend
```

---

## 📝 Key Files Explained

### Frontend
- **pages/index.js**: Main React component with all CRUD UI
- **styles/home.module.css**: Styling for the UI

### Backend
- **src/main.ts**: Starts the app
- **src/app.module.ts**: Connects to database
- **src/products/products.controller.ts**: Routes (endpoints)
- **src/products/products.service.ts**: Business logic
- **src/products/entities/product.entity.ts**: Database table definition

### Configuration
- **docker-compose.yml**: Defines all 3 services
- **Dockerfile (frontend & backend)**: Build instructions

---

## 💡 Key Concepts

### REST API (Backend)
- **REST** = Representational State Transfer
- Uses HTTP methods: GET, POST, PUT, DELETE
- Returns JSON data

### TypeORM (Backend)
- Maps JavaScript objects to database tables
- Automatically generates SQL queries
- Handles connections

### React Hooks (Frontend)
- **useState**: Store data
- **useEffect**: Run code when component loads
- **axios**: Make HTTP requests

### Docker
- Containerizes applications
- Makes deployment easy
- Ensures consistency across environments

---

## 🚀 Ready to Run!

```bash
# Navigate to project
cd /home/sharathsaji/Desktop/Learning/Docker/Project

# Start everything
docker compose up --build

# Open in browser
http://localhost:3000

# Try:
✓ Add a product
✓ View all products
✓ Edit a product
✓ Delete a product
```

---

## 📚 For More Details

- **Complete guide**: See `SETUP_GUIDE.md`
- **Visual diagrams**: See `ARCHITECTURE.md`
- **Quick reference**: See `README.md`
- **Project summary**: See `COMPLETION_SUMMARY.md`

---

**You now understand the complete architecture!** 🎉

Each layer has a specific job:
- **Frontend**: Shows UI and gets user input
- **Backend**: Processes data and enforces rules
- **Database**: Stores data permanently
- **Docker**: Makes it all run together
