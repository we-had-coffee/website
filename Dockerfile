FROM nginx:alpine
ADD ./dist /usr/share/nginx/html

RUN sed -i 's/#gzip  on;/server_tokens  off;/g' /etc/nginx/nginx.conf
