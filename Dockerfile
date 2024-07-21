# Stage 1: Build stage
FROM node:20-alpine AS build

# Set timezone for logs
ENV TZ=Asia/Kathmandu

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy .env, package.json and package-lock.json
COPY --from=build /app/.env.example /app/package*.json ./

# Copy built files and necessary dependencies from the build stage
COPY --from=build /app/data  ./data
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "serve"]
