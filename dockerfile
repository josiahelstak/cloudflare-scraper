# Use Debian-based image for better apt compatibility
FROM node:20-bullseye

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libgbm1 libasound2 libpangocairo-1.0-0 libxss1 \
    libgtk-3-0 libxshmfence1 libglu1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
