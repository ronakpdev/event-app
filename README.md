# Event App - Laravel + Inertia + React

A full-stack event management application built with Laravel, Inertia.js, and React.

**Application Name**: Event App

## Features

- ✅ User authentication and registration (Laravel Breeze)
- ✅ CRUD operations for Events (belongs to user and venue)
- ✅ CRUD operations for Venues (global, accessible to all users)
- ✅ Event filtering (by venue, date range, tag, capacity, accessibility)
- ✅ Eloquent relationships with eager-loading
- ✅ Server-side validation using FormRequests
- ✅ Seeder for 10k venues
- ✅ Clean UI with Tailwind CSS

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL 8.0
- **Containerization**: Docker

## Prerequisites

- Docker and Docker Compose (or Docker Desktop)
- Git

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd event-app
```

### 2. Start Docker containers

```bash
docker compose up -d --build
```

### 3. Install PHP dependencies

```bash
docker compose exec app composer install
```

### 4. Install Node dependencies

```bash
docker compose exec node npm install
```

### 5. Configure environment

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=event_app
DB_USERNAME=root
DB_PASSWORD=root
```

### 6. Generate application key

```bash
docker compose exec app php artisan key:generate
```

### 7. Run migrations and seeders

```bash
docker compose exec app php artisan migrate --seed
```

This will:
- Create the database tables
- Create a test user (email: `test@example.com`, password: `password`)
- Seed 10,000 venues

### 8. Build frontend assets

For production:
```bash
docker compose exec node npm run build
```

For development with hot reload:
```bash
docker compose exec node npm run dev
```

**Note**: If you make changes to configuration files (like `.env`), you may need to clear the config cache:
```bash
docker compose exec app php artisan config:clear
```

### 9. Access the application

- **Application**: http://localhost:8000
- **Database**: localhost:3306
  - Database: `event_app`
  - Username: `root`
  - Password: `root`

## Test User Credentials

- **Email**: test@example.com
- **Password**: password

## Running Commands

All Laravel commands should be run inside the Docker container:

```bash
docker compose exec app php artisan [command]
```

For Node commands:
```bash
docker compose exec node npm [command]
```

**Note**: If you're using an older version of Docker that requires `docker-compose` (with hyphen), you can use that instead of `docker compose` (with space).

## Project Structure

### Models

- **User**: Has many events
- **Event**: Belongs to user and venue
- **Venue**: Has many events

### Controllers

- `EventController`: Handles CRUD operations for events with filtering
- `VenueController`: Handles CRUD operations for venues

### Form Requests

- `StoreEventRequest`: Validation for creating events
- `UpdateEventRequest`: Validation for updating events
- `StoreVenueRequest`: Validation for creating venues
- `UpdateVenueRequest`: Validation for updating venues

### Policies

- `EventPolicy`: Authorization for event operations (users can only manage their own events)

### Constants

- `VenueConstants`: Contains accessibility and layout options

## Features Overview

### Events

- List all events belonging to the logged-in user
- Filter by:
  - Venue
  - Date range (start date, end date)
  - Tag
  - Minimum capacity
  - Accessibility features
- Create, read, update, and delete events
- Events must belong to a user and a venue

### Venues

- List all venues (global, accessible to all users)
- Create, read, update, and delete venues
- Venue fields include:
  - Name, city, state
  - Capacity
  - Accessibility options (JSON array)
  - Tags (JSON array)
  - Layout options (JSON array)
  - Average ratings
  - Latitude and longitude

## Development

The application uses:
- Laravel 12+
- Inertia.js
- React
- Tailwind CSS
- MySQL 8.0

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
