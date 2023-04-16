
# pull official base image
FROM node:14

LABEL version="1.0"
LABEL description="This is the base docker image for the Economia popular frontend react app."
LABEL maintainer = ["@undav.edu.ar", "@undav.edu.ar"]

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN mkdir /app/node_modules/
RUN chown -R node:node /app/node_modules/

RUN npm install -g npm@latest
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

#RUN npm run build
# add app
ADD . /app

# start app
CMD ["npm", "start"]
