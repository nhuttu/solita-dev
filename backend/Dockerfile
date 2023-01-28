FROM node:16.17.0-bullseye-slim as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

# RUN npm run test

COPY --chown=node:node . .

RUN npm run build 

# ---

FROM node:16.17.0-bullseye-slim

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/build ./build

RUN npm ci --production

CMD [ "sh", "-c", "npm run start" ]




