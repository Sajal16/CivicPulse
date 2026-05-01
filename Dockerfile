FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Pass in the environment variable during build time so Vite can embed it
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Build the app
RUN npm run build

# Serve the app
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist

# Cloud Run defaults to port 8080
EXPOSE 8080

# Start the static file server
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT:-8080}"]
