FROM docker.do.neoflex.ru/nginx:latest
WORKDIR /usr/share/nginx/html
COPY build/ ./
