FROM node:latest
RUN npm install -g npm@9.6.4
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]