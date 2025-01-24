FROM node:23.4.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn run build

ENV NODE_ENV=prod

EXPOSE  8000

CMD [ "npm","run","start:prod" ]



