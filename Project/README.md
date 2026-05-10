# 🐳 Next.js + NestJS + MySQL CRUD Application

A full-stack CRUD application with Docker containerization, featuring a modern Next.js frontend, scalable NestJS backend, and MySQL database.

## 🎯 Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete products  
✅ **Responsive UI** - Next.js with modern CSS styling  
✅ **REST API** - NestJS with TypeORM integration  
✅ **Type Safety** - TypeScript for both frontend and backend  
✅ **Docker Containerized** - Easy deployment and scaling  
✅ **Database Persistence** - MySQL with data volume  
✅ **Real-time Updates** - Instant UI refresh after operations  

## 📁 Project Structure

```
Project/
├── frontend/          # Next.js React Application
├── backend/           # NestJS REST API
├── docker-compose.yml # Multi-container orchestration
├── SETUP_GUIDE.md     # Detailed step-by-step explanation
└── start.sh          # Quick start script
```

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Navigate to project directory
cd Project

# Build and start all services
docker compose up --build

# Application URLs
Frontend:  http://localhost:3000
Backend:   http://localhost:3001/api
MySQL:     localhost:3307 (user: root, password: root@123)
```

### Using Script

```bash
chmod +x start.sh
./start.sh
```

## 📋 Available Endpoints

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/products` | Create a new product |
| **GET** | `/api/products` | Get all products |
| **GET** | `/api/products/:id` | Get a specific product |
| **PUT** | `/api/products/:id` | Update a product |
| **DELETE** | `/api/products/:id` | Delete a product |

### Example Request

```javascript
// Create Product
POST http://localhost:3001/api/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop"
}
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS Modules** - Component scoped styling

### Backend
- **NestJS 10** - Framework for scalable APIs
- **TypeORM** - Object-relational mapper
- **MySQL2** - MySQL database driver
- **TypeScript** - Programming language

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MySQL 8** - Relational database

## 📚 Documentation

For detailed step-by-step explanation of the entire architecture, please see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

Topics covered:
- Project structure breakdown
- CRUD operations flow
- Database schema
- Communication between services
- Data flow diagram
- Docker build process

## 💻 Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev        # Start development server on port 3000
npm run build      # Build for production
```

### Backend Development

```bash
cd backend
npm install
npm run dev        # Start with watch mode
npm run build      # Compile TypeScript
npm run start      # Run compiled application
```

## 🐳 Docker Commands

```bash
# Build images
docker compose build

# Start services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Remove volumes (WARNING: deletes database)
docker compose down -v
```

## 🔍 Database Connection

**Host:** localhost  
**Port:** 3307 (or 3306 inside Docker)  
**User:** root  
**Password:** root@123  
**Database:** docker_learn

### Sample Product Query

```sql
SELECT * FROM products;
```

## 📊 Database Schema

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

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues
- Ensure MySQL container is running: `docker compose logs mysql`
- Check database credentials in `docker-compose.yml`
- Verify health check: `docker compose ps`

### Frontend Can't Connect to Backend
- Ensure `CORS_ORIGIN` is set correctly in backend `.env`
- Check network connectivity: `docker compose exec frontend ping backend`

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root@123
DB_DATABASE=docker_learn
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 🎓 Learning Resources

This project demonstrates:
- **Frontend Framework**: Next.js SSR, client-side state management
- **Backend Framework**: NestJS modular architecture
- **Database**: TypeORM relationships, migrations
- **DevOps**: Docker, containerization best practices
- **API Design**: RESTful principles, CORS handling
- **Type Safety**: TypeScript interfaces and types

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements!

## 📞 Support

For issues and questions, please open an issue or refer to the [SETUP_GUIDE.md](./SETUP_GUIDE.md).

---

**Happy Coding! 🎉**

Built with ❤️ using Next.js, NestJS, and Docker
