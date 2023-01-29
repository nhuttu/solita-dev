# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

# Builder stage
FROM node:16.17.0-bullseye-slim as builder

# For semantic purposes
ENV NODE_ENV build

# Assing an user
USER node
WORKDIR /home/node

# Copy the code and run a clean install
COPY . .
RUN npm ci

#Run tests. If tests fail, the image fails
RUN npm run test

#Copy files 
COPY --chown=node:node . .

# Build the project
RUN npm run build 

# ---

#Actual Image
FROM node:16.17.0-bullseye-slim

# Production mode
ENV NODE_ENV production

# Assign user and workdir
USER node
WORKDIR /home/node

# Copy package-lock.json, package.json and build folder
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/build ./build

# Clean install only production packages
RUN npm ci --production

# Run the program
CMD [ "sh", "-c", "npm run start" ]




