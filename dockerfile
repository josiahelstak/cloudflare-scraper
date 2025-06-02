# Use official Node.js LTS base image
FROM node:20-slim

# Install required dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libgbm1 libasound2 libpangocairo-1.0-0 libxss1 \
    libgtk-3-0 libxshmfence1 libglu1 chromium \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy remaining app files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
