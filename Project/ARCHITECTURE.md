# 🏗️ System Architecture Diagram

## Complete System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DOCKER NETWORK (app-network)                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐         ┌──────────────────────┐            │
│  │   FRONTEND SERVICE   │         │  BACKEND SERVICE     │            │
│  │   (port 3000)        │         │  (port 3001)         │            │
│  │                      │         │                      │            │
│  │  ┌────────────────┐  │         │  ┌────────────────┐  │            │
│  │  │  Next.js App   │  │◄────────┼─►│  NestJS API    │  │            │
│  │  │  (React UI)    │  │ HTTP    │  │  (Controllers) │  │            │
│  │  └────────────────┘  │         │  └────────────────┘  │            │
│  │         │            │         │         │            │            │
│  │         │ axios      │         │         │ TypeORM    │            │
│  │         │            │         │         │            │            │
│  │  ┌────────────────┐  │         │  ┌────────────────┐  │            │
│  │  │  Pages/        │  │         │  │  Services &    │  │            │
│  │  │  Components    │  │         │  │  Repositories  │  │            │
│  │  └────────────────┘  │         │  └────────────────┘  │            │
│  │                      │         │                      │            │
│  └──────────────────────┘         │  ┌────────────────┐  │            │
│                                   │  │  Database      │  │            │
│                                   │  │  Entities      │  │            │
│                                   │  └────────────────┘  │            │
│                                   │         │            │            │
│                                   │         │ SQL        │            │
│                                   │         │            │            │
│                                   └────────────────────────┘            │
│                                          │                             │
│  ┌────────────────────────────────────────────────────────────┐       │
│  │              MySQL DATABASE SERVICE (port 3306)            │       │
│  │                                                            │       │
│  │  ┌─────────────────────────────────────────────────────┐  │       │
│  │  │           Products Table                           │  │       │
│  │  ├─────────────────────────────────────────────────────┤  │       │
│  │  │ id | name | price | description | createdAt | ...  │  │       │
│  │  │ 1  | Laptop | 999.99 | ... | 2026-05-10 | ...     │  │       │
│  │  │ 2  | Mouse  | 25.99  | ... | 2026-05-10 | ...     │  │       │
│  │  └─────────────────────────────────────────────────────┘  │       │
│  │                                                            │       │
│  │  Volume: mysql_data (persistent storage)                 │       │
│  └────────────────────────────────────────────────────────────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

```
┌─────────────────────────────────────────────┐
│        NEXT.JS FRONTEND APPLICATION         │
│            (port 3000)                      │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐    │
│  │    pages/index.js (React)          │    │
│  │                                    │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │  Product CRUD UI Component   │  │    │
│  │  │  - Form Input Section        │  │    │
│  │  │  - Product Grid Display      │  │    │
│  │  └──────────────────────────────┘  │    │
│  │           │                        │    │
│  │           ▼                        │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │  State Management (useState)  │  │    │
│  │  │  - products[]                │  │    │
│  │  │  - formData{}                │  │    │
│  │  │  - loading, error            │  │    │
│  │  └──────────────────────────────┘  │    │
│  │           │                        │    │
│  │           ▼                        │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │  Axios HTTP Client           │  │    │
│  │  │  POST/GET/PUT/DELETE         │  │    │
│  │  └──────────────────────────────┘  │    │
│  │           │                        │    │
│  └───────────┼────────────────────────┘    │
│              │                             │
│              ▼                             │
│     API_URL: http://backend:3001/api      │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │    styles/home.module.css          │    │
│  │  - Component scoped styles         │    │
│  │  - Responsive grid layout          │    │
│  │  - Modern styling                  │    │
│  └────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Backend Architecture

```
┌──────────────────────────────────────────────────────┐
│    NESTJS BACKEND API                                │
│    (port 3001)                                       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  HTTP Requests from Frontend                   │ │
│  └────────────────┬───────────────────────────────┘ │
│                   │                                 │
│                   ▼                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │  ProductsController                            │ │
│  │  - POST /products                              │ │
│  │  - GET /products                               │ │
│  │  - GET /products/:id                           │ │
│  │  - PUT /products/:id                           │ │
│  │  - DELETE /products/:id                        │ │
│  └────────────────┬───────────────────────────────┘ │
│                   │                                 │
│                   ▼                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │  ProductsService                               │ │
│  │  - create(dto)                                 │ │
│  │  - findAll()                                   │ │
│  │  - findOne(id)                                 │ │
│  │  - update(id, dto)                             │ │
│  │  - remove(id)                                  │ │
│  │                                                │ │
│  │  Business Logic Layer                          │ │
│  └────────────────┬───────────────────────────────┘ │
│                   │                                 │
│                   ▼                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │  TypeORM Repository                            │ │
│  │  @InjectRepository(Product)                    │ │
│  │  - Database Query Operations                   │ │
│  │  - Connection Pooling                          │ │
│  └────────────────┬───────────────────────────────┘ │
│                   │                                 │
│                   ▼                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │  Product Entity (TypeORM)                      │ │
│  │  @Entity('products')                           │ │
│  │  - id (PrimaryGeneratedColumn)                 │ │
│  │  - name (Column)                               │ │
│  │  - price (Column Decimal)                      │ │
│  │  - description (Column Text)                   │ │
│  │  - createdAt/updatedAt (Timestamp)             │ │
│  └────────────────┬───────────────────────────────┘ │
│                   │                                 │
│                   ▼                                 │
│     SQL Queries to MySQL Database                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Data Flow: CREATE Operation

```
┌──────────────┐
│  User Input  │
│  (Form Data) │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Frontend: handleSubmit()             │
│  - Validate form data                │
│  - axios.post('/api/products', data) │
└──────┬───────────────────────────────┘
       │
       │ HTTP POST Request
       │ JSON Payload
       │
       ▼
┌──────────────────────────────────────┐
│  Backend: ProductsController          │
│  @Post()                              │
│  create(@Body() createProductDto)    │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Service: ProductsService             │
│  create(createProductDto)            │
│  - productRepository.create(dto)     │
│  - productRepository.save(product)   │
└──────┬───────────────────────────────┘
       │
       │ SQL INSERT
       │
       ▼
┌──────────────────────────────────────┐
│  MySQL: INSERT INTO products         │
│  (name, price, description)          │
│  VALUES (?, ?, ?)                    │
└──────┬───────────────────────────────┘
       │
       │ Product ID Generated
       │ Row Inserted
       │
       ▼
┌──────────────────────────────────────┐
│  Response: { id, name, price, ...}   │
│  HTTP 201 Created                    │
└──────┬───────────────────────────────┘
       │
       │ JSON Response
       │
       ▼
┌──────────────────────────────────────┐
│  Frontend: Update State               │
│  - setProducts([...products, new])   │
│  - Clear form                         │
│  - UI refreshes automatically        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Browser: Render New UI              │
│  - New product appears in grid       │
│  - User sees confirmation            │
└──────────────────────────────────────┘
```

---

## Data Flow: READ Operation

```
┌──────────────────────────┐
│  useEffect Hook          │
│  (Component Mount)       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  fetchProducts()                     │
│  axios.get('/api/products')          │
└──────┬───────────────────────────────┘
       │
       │ HTTP GET Request
       │
       ▼
┌──────────────────────────────────────┐
│  Backend: ProductsController         │
│  @Get()                              │
│  findAll()                           │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Service: ProductsService            │
│  findAll()                           │
│  productRepository.find()            │
└──────┬───────────────────────────────┘
       │
       │ SQL SELECT
       │
       ▼
┌──────────────────────────────────────┐
│  MySQL: SELECT * FROM products       │
│  ORDER BY createdAt DESC             │
└──────┬───────────────────────────────┘
       │
       │ Products Array
       │
       ▼
┌──────────────────────────────────────┐
│  Response: Product[]                 │
│  HTTP 200 OK                         │
└──────┬───────────────────────────────┘
       │
       │ JSON Array
       │
       ▼
┌──────────────────────────────────────┐
│  Frontend: setProducts(data)         │
│  Update state with results           │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Browser: Render Product Grid        │
│  - Map through products array        │
│  - Display each product card         │
│  - Show price, description, actions  │
└──────────────────────────────────────┘
```

---

## Database Schema Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                   PRODUCTS TABLE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┬──────────────┬────────┬──────────────────┐   │
│  │   id    │    name      │ price  │  description     │   │
│  │  (PK)   │   (String)   │(Decimal) │   (Text)       │   │
│  ├─────────┼──────────────┼────────┼──────────────────┤   │
│  │    1    │   Laptop     │999.99  │ High-performance │   │
│  │    2    │   Mouse      │ 25.99  │ Wireless mouse   │   │
│  │    3    │  Keyboard    │ 79.99  │ Mechanical keys  │   │
│  └─────────┴──────────────┴────────┴──────────────────┘   │
│                                                             │
│  ┌─────────────────────────┬──────────────────────────┐   │
│  │     createdAt           │      updatedAt          │   │
│  │  (TIMESTAMP)            │   (TIMESTAMP)           │   │
│  ├─────────────────────────┼──────────────────────────┤   │
│  │  2026-05-10 11:20:00    │ 2026-05-10 11:20:00     │   │
│  │  2026-05-10 11:21:30    │ 2026-05-10 11:21:30     │   │
│  │  2026-05-10 11:22:45    │ 2026-05-10 11:22:45     │   │
│  └─────────────────────────┴──────────────────────────┘   │
│                                                             │
│  Indexes:                                                  │
│  - PRIMARY KEY: id                                         │
│  - TIMESTAMP: Automatic timestamps                         │
│  - AUTO_INCREMENT: id field                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Request/Response Examples

### CREATE Request
```http
POST http://localhost:3001/api/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop for development"
}
```

### CREATE Response
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop for development",
  "createdAt": "2026-05-10T11:20:00.000Z",
  "updatedAt": "2026-05-10T11:20:00.000Z"
}
```

### READ All Request
```http
GET http://localhost:3001/api/products
```

### READ All Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 25.99,
    "description": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

## Docker Container Network

```
┌──────────────────────────────────────────────────────┐
│            Docker Network: app-network               │
│            (Bridge Network)                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────────────┐  ┌─────────────────────────┐   │
│  │   frontend      │  │      backend            │   │
│  │   172.x.x.2     │  │      172.x.x.3          │   │
│  │   :3000         │  │      :3001              │   │
│  │   Service       │  │      Service            │   │
│  └────────┬────────┘  └────────┬────────────────┘   │
│           │                    │                    │
│           │ http://backend:3001│                    │
│           └────────────┬───────┘                    │
│                        │                            │
│           ┌────────────▼──────────────┐            │
│           │  mysql                    │            │
│           │  172.x.x.4                │            │
│           │  :3306                    │            │
│           │  Service                  │            │
│           └───────────────────────────┘            │
│                                                      │
│  All containers can communicate via service names   │
│  (DNS resolution within the network)               │
│                                                      │
└──────────────────────────────────────────────────────┘

External Access:
│
├─► localhost:3000  ──► frontend container (:3000)
├─► localhost:3001  ──► backend container  (:3001)
└─► localhost:3307  ──► mysql container    (:3306)
```

---

This architecture provides:
- **Scalability**: Each component can be scaled independently
- **Isolation**: Services run in isolated containers
- **Persistence**: MySQL volume stores data permanently
- **Networking**: Docker bridge network for service communication
- **Health Checks**: Ensures database readiness
