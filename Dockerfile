FROM cgr.dev/chainguard/node:18

WORKDIR /var/server

COPY ./build build
COPY ./server.js server.js
COPY ./package.json package.json
COPY ./node_modules node_modules

EXPOSE 8080
CMD ["/usr/bin/npm", "run", "serve"]
