ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

USER root
# Installing commond packages
RUN apk add --update --no-cache curl rsync wget git ncdu

USER node

WORKDIR /tmp/app/

# Copy minimal required files to install project dependencies
COPY --chown=node:node ./package.json ./package-lock.json /tmp/app/
COPY --chown=node:node ./packages/cms/package.json /tmp/app/packages/cms/package.json

# Install dependencies
RUN npm ci --no-audit --no-fund --verbose && \
# Remove node_modules
    rm -rf /tmp/app/

WORKDIR /home/node/
