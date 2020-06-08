FROM node:12.18.0

RUN mkdir /usr/app && chown node:node /usr/app

WORKDIR /usr/app

RUN npm install -g nodemon
RUN mkdir node_modules && chown node:node node_modules

COPY package.json .

RUN npm install --quiet

EXPOSE 4444

# --legacy-watch is required for monitoring changes in a mounted volume inside a container
CMD ["npm", "run", "dev"]
