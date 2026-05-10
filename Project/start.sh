#!/bin/bash

# Script to initialize and run the Docker project

echo "🚀 Starting Next.js + NestJS + MySQL CRUD Application..."
echo ""

echo "📦 Building Docker images..."
docker compose build

echo ""
echo "🐳 Starting services..."
docker compose up

echo ""
echo "✅ Application is running!"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:3001"
echo "   MySQL:     localhost:3307"
