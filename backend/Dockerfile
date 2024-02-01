# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.18.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Throw-away build stage to reduce size of final image
FROM base as build

# Set development environment
ENV NODE_ENV="development"

# Install all dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Final stage for app image
FROM base

# Set production environment
ENV NODE_ENV="production"

# Install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application
COPY --from=build /app/build ./build
COPY --from=build /app/dist ./dist

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "build/index.js" ]