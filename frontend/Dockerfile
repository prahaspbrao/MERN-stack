# Stage 1: Build React app
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve using nginx
FROM nginx:alpine

# Copy build files to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
