FROM node:18.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
# RUN npm ci --omit=dev
COPY . .
COPY .env ./.env
EXPOSE 6000
CMD ["node","gateway.js"]