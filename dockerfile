FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g node-gyp

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY .env /app

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
