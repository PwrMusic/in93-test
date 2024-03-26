FROM sitespeedio/node:ubuntu-22-04-nodejs-20.9.0
COPY . /usr/in93-docker-test
WORKDIR /usr/in93-docker-test
RUN npm ci
RUN npm run build:server
ARG someValue=defaultValue
WORKDIR /usr/in93-docker-test

CMD [ "/usr/local/bin/npm", "run", "start:server" ]
