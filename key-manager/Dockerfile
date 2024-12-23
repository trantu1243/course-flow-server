FROM node:alpine

RUN mkdir -p /usr/src/key-manager

WORKDIR /usr/src/key-manager

COPY . .

RUN npm install

EXPOSE 8008

CMD ["node", "app.js"]