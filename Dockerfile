FROM node:16 as base

# Code location
WORKDIR /src
# Copy modules
COPY package*.json /
# Port to use for app
EXPOSE 4000


FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "server.js"]

# launch dev
FROM base as dev
ENV NODE_ENV=development
# install nodemon and install dependencies
RUN npm install -g nodemon && npm install
# copy to WORKDIR
COPY . /
# launch with nodemon
CMD ["nodemon", "server.js"]