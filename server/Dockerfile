FROM node:current-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000 

CMD ["node", "index.js"]
