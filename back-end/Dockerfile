FROM node:12.16.3

# Create app directory
RUN mkdir -p /usr/src/garden-cloud-api
WORKDIR /usr/src/garden-cloud-api

# Install app dependencies
COPY package.json /usr/src/garden-cloud-api
RUN npm install

# Bundle app source
COPY . /usr/src/garden-cloud-api

# Build arguments
ARG NODE_VERSION=12.16.3

# Environment
ENV NODE_VERSION $NODE_VERSION