FROM node:alpine

RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "dev"]