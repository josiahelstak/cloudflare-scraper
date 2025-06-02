# Use a lightweight Node.js image
FROM node:20-slim

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libxss1 \
  libgtk-3-0 \
  libxshmfence1 \
  libglu1 \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Set working directory in the container
WORKDIR /app

# Copy your code into the container
COPY . .

# Install node dependencies
RUN npm install

# Set Chromium path for puppeteer-core
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
