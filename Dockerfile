FROM node:15 as builder
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

ADD . /app
RUN yarn build
RUN cd build
RUN ls -la

FROM node:15-alpine
WORKDIR /app
RUN apk update
RUN apk add git

COPY --from=builder /app/build/ /app/
RUN yarn install --production
RUN ls

CMD ["node", "server.js"]
