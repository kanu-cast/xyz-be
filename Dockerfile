# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (except files ignored by .dockerignore)
COPY . .

# Expose port (match your Express server port)
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "run", "start"]
