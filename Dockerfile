FROM gcr.io/distroless/nodejs18-debian12

WORKDIR /var/server

COPY ./server.js server.js
COPY ./node_modules node_modules

ENV NODE_ENV production

EXPOSE 8080
CMD ["--es-module-specifier-resolution=node", "server.js"]
