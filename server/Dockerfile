FROM node:15.8.0-alpine3.10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]