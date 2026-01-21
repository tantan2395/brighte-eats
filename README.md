# Brighte Eats Backend API

A GraphQL API for managing leads interested in Brighte Eats services.

## Features

- GraphQL API with TypeScript
- PostgreSQL database with Knex.js migrations
- Express.js server
- Type-safe development
- Docker support for database
- Unit tests with Jest
- ESLint & Prettier for code quality

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Knex.js
- **API:** GraphQL
- **Testing:** Jest
- **Containerization:** Docker & Docker Compose

## Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (for database)
- npm or yarn

## Setup Instructions

1. **Clone the repository**
    ```bash
   git clone https://github.com/tantan2395/brighte-eats.git
   cd brighte-eats/backend
2. **Install dependencies**
    ```bash
   npm install
3. **Set up environment variables**
    ```bash
    cp .env.example .env
    ```
    Edit .env if needed (defaults should work with Docker setup).
4. **Start the database**
    ```bash
    docker-compose up -d
5. **Run migrations**
    ```bash
    npm run migrate
6. **Start the development server**
    ```bash
    npm run dev
    ```
    The server will start at http://localhost:3000

## Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code with ESLint
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback last migration

## GraphQL API

### Endpoint
- GraphQL: `http://localhost:3000/graphql`
- Health Check: `http://localhost:3000`

### Queries
**Get all leads:**
```graphql
query {
  leads {
    id
    name
    email
    mobile
    postcode
    interests
    createdAt
  }
}
```
**Get a single lead:**
```graphql
query {
  lead(id: "1") {
    id
    name
    email
    mobile
    postcode
    interests
    createdAt
  }
}
```

### Mutations
**Register a new lead:**
```graphql
mutation {
  registerLead(input: {
    name: "John Doe"
    email: "john@example.com"
    mobile: "0412345678"
    postcode: "2000"
    interests: ["delivery", "payment"]
  }) {
    id
    name
    email
    createdAt
  }
}
```

Valid interests: `delivery`, `pick-up`, `payment`

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Project Structure
```text
brighte-eats
├── backend/
│   ├── src/
│   ├── server.ts          # Express server setup
│   ├── types/            # TypeScript types
│   ├── graphql/          # GraphQL schema & resolvers
│   ├── services/         # Business logic
│   └── db/              # Database configuration & migrations
├── tests/               # Unit tests
├── knexfile.js          # Knex configuration
├── docker-compose.yml   # Docker setup for PostgreSQL
└── README.md           # This file
```

## Database Schema

### leads table
 - `id` - Primary key, auto-increment
 - `name` - String, not null
 - `email` - String, not null, unique
 - `mobile` - String, not null
 - `postcode` - String, not null
 - `interests` - Text array, not null
 - `created_at` - Timestamp, defaults to now