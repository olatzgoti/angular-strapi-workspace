# Se importa la image con la versión de node del proyecto y el node_modules
ARG IMAGE_NODE_PROJECT
FROM ${IMAGE_NODE_PROJECT} AS builder

USER root
# Installing libvips-dev for sharp Compatibility
RUN apk add --update --no-cache vips-dev zlib-dev libpng-dev vips-dev build-base gcc autoconf automake nasm

USER node

ARG ADMIN_PREFIX=/dashboard
ENV ADMIN_PREFIX=${ADMIN_PREFIX}

ARG API_PREFIX=/v1
ENV API_PREFIX=${API_PREFIX}

# Se importa el nuevo codigo del proyecto
COPY --chown=node:node ./ /tmp/app/

WORKDIR /tmp/app/

# Instalar dependencias
RUN NODE_ENV=production npm ci --workspace=packages/cms --prefer-offline --no-audit --no-fund --verbose && \
# Mover proyecto pre-build
    mv /tmp/app/node_modules/ /tmp/app/packages/cms/ && \
    mv /tmp/app/packages/cms/ /tmp/cms/ && \
# Build del proyecto
    cd /tmp/cms/ && \
    NODE_ENV=production npm run build --prefix /tmp/cms/ && \
# strapi home
    mkdir -p /home/node/strapi/ && \
# Mover el build a la carpeta home
    mv /tmp/cms/dist/* /home/node/strapi/ && \
    mv /tmp/cms/node_modules /home/node/strapi/ && \
    mv /tmp/app/patches/ /home/node/strapi/ && \
    cp /tmp/app/package-lock.json /home/node/strapi/ && \
# Instal finall
    NODE_ENV=production npm ci --prefer-offline --no-audit --no-fund --verbose --prefix /home/node/strapi/ && \
# Borrar cache
    rm -rf /tmp/app/ /tmp/cms/

ARG IMAGE_NODE_PROJECT
FROM ${IMAGE_NODE_PROJECT}

USER root
# Installing libvips-dev for sharp Compatibility
RUN apk add --update --no-cache vips-dev zlib-dev libpng-dev vips-dev && \
    rm -rf /tmp/* /opt/*
USER node

COPY --from=builder --chown=node:node /home/node/strapi/ /home/node/strapi/

ENV NODE_ENV=production

WORKDIR /home/node/strapi/

EXPOSE 1337
CMD ["npm", "start", "--verbose"]
