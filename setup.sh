#!/bin/bash

echo "🚀 Setting up Event App with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Laravel is already installed
if [ ! -f "artisan" ]; then
    echo "📦 Installing Laravel..."
    docker run --rm -v $(pwd):/app composer create-project laravel/laravel /app --prefer-dist
    echo "✅ Laravel installed"
else
    echo "✅ Laravel already installed"
fi

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
docker-compose exec -T app composer install

# Install Node dependencies
echo "📦 Installing Node dependencies..."
docker-compose exec -T node npm install

# Copy .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    docker-compose exec -T app php artisan key:generate
fi

# Run migrations and seeders
echo "🗄️  Running migrations and seeders..."
docker-compose exec -T app php artisan migrate --seed

# Build frontend assets
echo "🎨 Building frontend assets..."
docker-compose exec -T node npm run build

echo "✅ Setup complete!"
echo ""
echo "🌐 Application should be available at: http://localhost:8000"
echo ""
echo "To start development server:"
echo "  docker-compose exec node npm run dev"
echo ""
echo "To run Laravel commands:"
echo "  docker-compose exec app php artisan [command]"

