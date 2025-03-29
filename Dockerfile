# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install git for husky
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Remove husky prepare script
RUN npm pkg delete scripts.prepare

# Install dependencies including dev dependencies
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove husky prepare script and install production dependencies only
RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/. .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"] 