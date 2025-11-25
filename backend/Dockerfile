# Use Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire backend
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
