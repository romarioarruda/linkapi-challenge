FROM node:16

RUN apt-get update -y

WORKDIR /linkapi/

COPY package.json package-lock.json /linkapi/

RUN npm install

COPY ./ /linkapi/

USER node

ENTRYPOINT npm start
