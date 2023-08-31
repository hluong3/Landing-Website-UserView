# Jenkins Pipeline Agent Dockerfile, note name is not .DockerFile
# File has instructions to build image to act as the pipeline agent run time and to allow use of various test tools and linters
FROM node:14-slim as build-step

RUN npm config set registry http://registry.npmjs.org
RUN npm install -g @angular/cli@9.1.15


RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN ls -la 

RUN npm install
RUN ls -la
RUN npm run-script build

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/dxcmwp /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/setting/setting.template.json > /usr/share/nginx/html/assets/setting/setting.json && exec nginx -g 'daemon off;'"]
