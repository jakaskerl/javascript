FROM node:latest

WORKDIR /container

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5800

CMD ["npm", "start"]

