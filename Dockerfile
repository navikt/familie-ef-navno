FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/jre:openjdk-21

WORKDIR /var/server

COPY ./server.js server.js
COPY ./node_modules node_modules

ENV NODE_ENV production

EXPOSE 8080
CMD ["--es-module-specifier-resolution=node", "server.js"]
