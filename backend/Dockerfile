# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend app
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the port (matches your .env PORT)
EXPOSE 4000

# Start the server
CMD ["npm", "run", "dev"]
