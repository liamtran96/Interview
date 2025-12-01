---
name: docker-fullstack
type: plugin
category: infrastructure
description: Complete Docker setup with multi-stage builds and Docker Compose
estimated_tokens: ~20k
---

# Plugin: Docker Fullstack

## Overview

Complete Docker setup for production applications using multi-stage builds, Docker Compose orchestration, and best practices for security and optimization.

**Use this plugin when you need to:** Containerize a full-stack application (frontend + backend + database).

## What This Plugin Does

- ✅ Creates optimized multi-stage Dockerfiles
- ✅ Sets up Docker Compose for multi-container apps
- ✅ Configures networking and volumes
- ✅ Implements production best practices
- ✅ Optimizes image sizes (60-80% reduction)
- ✅ Sets up development and production configs

## Architecture

**Micro-Skills Used:**
- `docker-core/dockerfile-multistage` - Optimize image sizes
- `docker-core/docker-compose-setup` - Multi-container orchestration
- `docker-core/docker-networking` - Service communication (assumed exists)
- `docker-core/docker-security` - Production hardening (assumed exists)

**Agents Coordinated:**
- `code-reviewer` - Review Dockerfile and docker-compose.yml
- `debugger` - If issues arise during setup

**Estimated Context Usage:** ~20k tokens (vs ~40k for all Docker skills)

## Workflow

### Phase 1: Dockerfile Creation (10 min)
**Goal:** Create optimized Dockerfiles for each service

1. **Create Frontend Dockerfile**
   - Load skill: `docker-core/dockerfile-multistage`
   - Action: Create multi-stage Dockerfile for React/Vue app
   - Code:
     ```dockerfile
     # frontend/Dockerfile
     FROM node:20-alpine AS build
     WORKDIR /app
     COPY package*.json ./
     RUN npm ci
     COPY . .
     RUN npm run build

     FROM nginx:alpine
     COPY --from=build /app/dist /usr/share/nginx/html
     COPY nginx.conf /etc/nginx/nginx.conf
     EXPOSE 80
     CMD ["nginx", "-g", "daemon off;"]
     ```
   - Output: ~30MB image (vs ~900MB single-stage)

2. **Create Backend Dockerfile**
   - Load skill: `docker-core/dockerfile-multistage`
   - Action: Create multi-stage Dockerfile for Node.js API
   - Code:
     ```dockerfile
     # backend/Dockerfile
     FROM node:20-alpine AS build
     WORKDIR /app
     COPY package*.json ./
     RUN npm ci
     COPY . .
     RUN npm run build && npm prune --production

     FROM node:20-alpine
     WORKDIR /app
     COPY --from=build /app/dist ./dist
     COPY --from=build /app/node_modules ./node_modules
     RUN addgroup -g 1001 -S nodejs && \
         adduser -S nodejs -u 1001
     USER nodejs
     EXPOSE 4000
     CMD ["node", "dist/server.js"]
     ```
   - Output: ~150MB image (vs ~600MB single-stage)

3. **Create .dockerignore**
   - Action: Exclude unnecessary files
   - Code:
     ```
     node_modules
     .git
     .env
     .env.local
     *.log
     dist
     coverage
     .vscode
     README.md
     ```

### Phase 2: Docker Compose Setup (10 min)
**Goal:** Orchestrate all services together

4. **Create docker-compose.yml**
   - Load skill: `docker-core/docker-compose-setup`
   - Action: Define all services, networks, volumes
   - Code:
     ```yaml
     version: '3.8'

     services:
       frontend:
         build: ./frontend
         ports:
           - "3000:80"
         environment:
           - VITE_API_URL=http://localhost:4000
         depends_on:
           - backend

       backend:
         build: ./backend
         ports:
           - "4000:4000"
         environment:
           - DATABASE_URL=postgresql://user:pass@db:5432/app
           - REDIS_URL=redis://redis:6379
           - NODE_ENV=production
         depends_on:
           db:
             condition: service_healthy
           redis:
             condition: service_started

       db:
         image: postgres:15-alpine
         environment:
           POSTGRES_USER: user
           POSTGRES_PASSWORD: pass
           POSTGRES_DB: app
         volumes:
           - postgres_data:/var/lib/postgresql/data
         healthcheck:
           test: ["CMD-SHELL", "pg_isready -U user"]
           interval: 10s
           timeout: 5s
           retries: 5

       redis:
         image: redis:7-alpine
         volumes:
           - redis_data:/data

     volumes:
       postgres_data:
       redis_data:
     ```

5. **Create Development Override**
   - Action: Create `docker-compose.override.yml` for dev
   - Code:
     ```yaml
     version: '3.8'

     services:
       frontend:
         volumes:
           - ./frontend/src:/app/src
         command: npm run dev

       backend:
         volumes:
           - ./backend/src:/app/src
         environment:
           - NODE_ENV=development
           - DEBUG=true
         command: npm run dev
     ```

### Phase 3: Networking & Volumes (5 min)
**Goal:** Configure service communication and data persistence

6. **Configure Networking**
   - Load skill: `docker-core/docker-networking`
   - Action: Services communicate via service names
   - Verification:
     ```yaml
     # Backend connects to DB using service name
     DATABASE_URL=postgresql://user:pass@db:5432/app
     # Not localhost! Use service name 'db'
     ```

7. **Setup Volumes**
   - Action: Persist database data
   - Verification:
     ```bash
     docker compose down          # Stop services
     docker compose up -d         # Restart
     # Database data should persist
     ```

### Phase 4: Testing & Verification (10 min)
**Goal:** Verify everything works together

8. **Build and Start Services**
   - Action:
     ```bash
     docker compose build        # Build all images
     docker compose up -d        # Start detached
     docker compose ps           # Check all running
     ```

9. **Verify Each Service**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000/health
   - Database: `docker compose exec db psql -U user -d app`

10. **Code Review**
    - Call agent: `code-reviewer`
    - Purpose: Review Dockerfiles and compose config
    - Expected: Best practices verified, no security issues

## Context Optimization Strategy

**Lazy Loading Timeline:**
```
Phase 1: Load dockerfile-multistage    → +8k tokens
         Create Dockerfiles
         Unload                        → -8k tokens

Phase 2: Load docker-compose-setup     → +7k tokens
         Create compose files
         Unload                        → -7k tokens

Phase 3: Load docker-networking        → +5k tokens
         Configure networking
         Unload                        → -5k tokens

Phase 4: Call code-reviewer            → agent context isolated
```

**Peak Context:** ~8k tokens
**Average:** ~6k tokens
**Savings:** 50% vs loading all Docker skills (~40k tokens)

## Success Criteria

Plugin is successful when:
- [ ] All Dockerfiles build without errors
- [ ] Images use multi-stage builds (check sizes)
- [ ] `docker compose up -d` starts all services
- [ ] All services show "healthy" in `docker compose ps`
- [ ] Frontend accessible at localhost:3000
- [ ] Backend API responds at localhost:4000
- [ ] Database persists data across restarts
- [ ] Services can communicate (backend → db, backend → redis)
- [ ] Code reviewer approves configuration

## Usage Example

### Scenario: Dockerize fullstack app

**Project Structure:**
```
my-app/
├── frontend/         # React app
├── backend/          # Node.js API
└── (will create)
    ├── frontend/Dockerfile
    ├── backend/Dockerfile
    ├── docker-compose.yml
    └── docker-compose.override.yml
```

**Invocation:**
```bash
/cook dockerize my fullstack app with frontend, backend, postgres, redis
```

**Expected Output:**
```
✅ Created frontend/Dockerfile (30MB image)
✅ Created backend/Dockerfile (150MB image)
✅ Created docker-compose.yml
✅ Created docker-compose.override.yml for development
✅ All services running and healthy
```

**Verification:**
```bash
docker compose ps
# Should show 4 services: frontend, backend, db, redis

docker compose logs backend
# Should show "Server started on port 4000"

curl http://localhost:4000/health
# Should return 200 OK

docker images
# Check image sizes - should be optimized
```

## Customization Options

### Option 1: Add Nginx Reverse Proxy
**When to use:** Production deployment
**Modify:** Add nginx service
```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend
```

### Option 2: Add Monitoring (Prometheus + Grafana)
**When to use:** Production observability
**Modify:** Add monitoring services

### Option 3: Use External Database
**When to use:** Production with managed DB
**Modify:** Remove db service, update DATABASE_URL

## Troubleshooting

### Issue 1: Services can't communicate
**Symptoms:** Backend can't connect to database
**Cause:** Using localhost instead of service names
**Fix:**
```bash
# Wrong
DATABASE_URL=postgresql://user:pass@localhost:5432/app

# Correct
DATABASE_URL=postgresql://user:pass@db:5432/app
```

### Issue 2: Database data lost on restart
**Symptoms:** Data disappears when stopping containers
**Cause:** No volume defined
**Fix:** Ensure volume is defined and mounted correctly

### Issue 3: Images too large
**Symptoms:** Images are 500MB+
**Cause:** Not using multi-stage builds
**Fix:** Use multi-stage Dockerfile from Phase 1

### Issue 4: Build context too large
**Symptoms:** Build takes forever
**Cause:** Missing .dockerignore
**Fix:** Create .dockerignore excluding node_modules, .git, etc.

## Related Plugins

- `frontend-fullstack-setup`: Setup frontend before dockerizing
- `docker-production-deploy`: Deploy containers to production
- `docker-security-hardening`: Add security layers

## Performance Metrics

**Image Sizes:**
- Frontend: 30MB (vs 900MB single-stage) - 97% reduction
- Backend: 150MB (vs 600MB single-stage) - 75% reduction

**Context Usage:**
- All Docker skills: ~40k tokens
- This plugin: ~20k tokens
- **Savings:** 50% reduction

**Time Estimate:**
- Simple app: 15-20 minutes
- Medium app: 25-30 minutes
- Complex app: 35-45 minutes

**Build Times:**
- First build: 5-10 minutes
- Rebuild (cached): 30 seconds - 2 minutes

---

**Plugin Version:** 1.0
**Last Updated:** 2025-12-01
**Maintained by:** Skills Team
