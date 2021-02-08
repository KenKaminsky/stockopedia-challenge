# pull official base image
FROM node:15.8.0-alpine3.10

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .

# Installs all node packages
RUN yarn install
RUN yarn global add react-scripts@4.0.2

# add app
COPY . .

ENV REACT_APP_BASE_URL=http://localhost:5000/graphql
ENV REACT_APP_API_KEY =35e1b8f614fb85ebd42495420c724509

# Uses port which is used by the actual application
EXPOSE 3000

# start app
CMD ["yarn", "start"]