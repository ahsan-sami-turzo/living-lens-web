FROM nginx:stable-alpine as production-stage
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]