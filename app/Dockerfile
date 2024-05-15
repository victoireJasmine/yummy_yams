FROM node:latest as build-stage

WORKDIR /frontend

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:1.17.0-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD nginx -g "daemon off;"