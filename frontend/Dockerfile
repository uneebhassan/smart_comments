# Use Node image
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy project
COPY frontend/ .

# Build app for production
RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
