FROM node:0.12

RUN apt-get update && \
  npm install -g pm2 && \
  mkdir -p /opt/app/KlixNetwork && npm install npm -g

RUN npm install -g n; n 0.12.0
RUN npm install -g npm@2.5.1

WORKDIR /opt/app/KlixNetwork

RUN git clone https://github.com/chiligit/klixwebsite.git

WORKDIR /opt/app/KlixNetwork/klixwebsite

RUN mkdir -p /opt/app/KlixNetwork/klixwebsite/assets-shared

RUN npm install;

EXPOSE 3000
VOLUME ["/opt/app/KlixNetwork"]
VOLUME ["/opt/app/KlixNetwork/klixwebsite/assets-shared"]

CMD node index.js 
