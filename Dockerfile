# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
# Using npm ci for cleaner installs, ensure package-lock.json is up to date
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
# Install production dependencies only
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/views ./views # Views directory has been removed
COPY --from=builder /usr/src/app/public ./public

# Expose the port the app runs on
# Ensure this matches the port in your main.ts or environment variables
EXPOSE 3000

# Command to run the application
# This assumes your main.ts listens on port 3000 or process.env.PORT
# Adjust if your application port is configured differently (e.g. via process.env.PORT)
CMD ["node", "dist/main.js"]
