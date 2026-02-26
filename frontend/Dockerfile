# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the React code
COPY . .

# Expose the React port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]