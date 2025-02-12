FROM node:23.4.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn run build

ENV NODE_ENV=test

EXPOSE  8000

CMD [ "yarn","run","start:dev" ]



