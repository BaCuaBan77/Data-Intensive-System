# Use a lightweight Node.js base image
FROM node:25-alpine AS builder
# Create the app directory
WORKDIR /app
# Copy package.json and yarn.lock first for efficient caching
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the project files
COPY . .
# Expose the necessary port (default 3000 for Vite)
EXPOSE 5173