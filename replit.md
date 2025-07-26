# TechBot Services - Full Stack Application

## Overview

This is a full-stack web application built for TechBot Services, a technology services company offering automation solutions. The application features a modern landing page showcasing services and an admin dashboard for content management. It's built with React/TypeScript frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage

### Data Storage
- **Database**: PostgreSQL (configured for Neon serverless)
- **Connection**: @neondatabase/serverless with connection pooling
- **Migrations**: Drizzle Kit for schema management
- **Session Store**: PostgreSQL-backed sessions using connect-pg-simple

## Key Components

### Database Schema
- **Users Table**: Required for Replit Auth integration with profile data
- **Products Table**: Service offerings with features, pricing, and display options
- **Contact Messages Table**: Customer inquiries from the contact form
- **Sessions Table**: Authentication session storage

### Authentication System
- **Provider**: Replit OpenID Connect integration
- **Session Management**: Secure HTTP-only cookies with PostgreSQL storage
- **Protected Routes**: Admin dashboard requires authentication
- **User Management**: Automatic user creation/updates on login

### API Routes
- **Public Routes**: 
  - `GET /api/products` - Fetch active services
  - `POST /api/contact` - Submit contact form
- **Protected Routes**:
  - `GET /api/auth/user` - Get current user info
  - Admin endpoints for product and message management

## Data Flow

1. **Client Requests**: React app makes API calls using TanStack Query
2. **Authentication Check**: Middleware validates sessions for protected routes
3. **Database Operations**: Drizzle ORM handles type-safe database queries
4. **Response Handling**: Structured JSON responses with error handling
5. **UI Updates**: React Query manages cache invalidation and optimistic updates

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: react, react-dom, @types/react
- **Build Tools**: vite, @vitejs/plugin-react, tsx, esbuild
- **Database**: drizzle-orm, @neondatabase/serverless, drizzle-kit
- **Authentication**: openid-client, passport, express-session

### UI/UX Dependencies
- **Component Library**: @radix-ui/* components (20+ UI primitives)
- **Styling**: tailwindcss, clsx, class-variance-authority
- **Icons**: lucide-react for consistent iconography
- **Form Handling**: react-hook-form with @hookform/resolvers

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Code Quality**: Path mapping for clean imports
- **Development**: Hot reload, error overlays, source maps

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server for Node.js
3. **Database Migration**: Drizzle pushes schema changes to production DB

### Production Configuration
- **Static Assets**: Served from `dist/public` directory
- **API Server**: Express serves from single entry point
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPLIT_DOMAINS
- **Process Management**: NODE_ENV-based configuration switching

### Development Features
- **Hot Reload**: Vite middleware integrated with Express in development
- **Error Handling**: Runtime error overlays and structured error responses
- **Logging**: Request/response logging for API endpoints
- **Security**: CORS, session security, input validation with Zod

The application follows a monorepo structure with shared TypeScript types between frontend and backend, ensuring type safety across the entire stack. The architecture prioritizes developer experience with hot reload, comprehensive error handling, and modern tooling while maintaining production readiness with proper authentication, session management, and database integration.