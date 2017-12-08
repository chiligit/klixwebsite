FROM node:6.10.3

RUN apt-get update && \
  npm install -g pm2 && \
  mkdir -p /opt/app/KlixNetwork && npm install npm -g

RUN mkdir -p /opt/test

RUN npm install -g --force npm@2.5.1
RUN npm install -g n --force; n 0.12.0

WORKDIR /opt/app/KlixNetwork

RUN git clone https://github.com/chiligit/klixwebsite.git

WORKDIR /opt/app/KlixNetwork/klixwebsite

RUN npm install;

EXPOSE 3000
VOLUME /opt/app/KlixNetwork/klixwebsite/shared

CMD node index.js 
