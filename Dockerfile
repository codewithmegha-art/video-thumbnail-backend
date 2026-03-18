# Use Node base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]