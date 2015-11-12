FROM node:0.12

RUN apt-get update && \
  npm install -g pm2 && \
  mkdir -p /opt/app/KlixNetwork && npm install npm -g

RUN npm install -g n; n 0.12.0
RUN npm install -g npm@2.5.1

WORKDIR /opt/app/KlixNetwork

RUN git clone https://github.com/chiligit/klixwebsite.git

RUN npm install;

RUN node index.js

ADD simplejsserver.js /opt/app/KlixNetwork/simplesjserver.js

EXPOSE 3000
VOLUME ["/opt/app/KlixNetwork"]

CMD pm2 start simplesjserver.js -l /opt/app/KlixNetwork/logs/KlixNetwork.log -i 0 && pm2 logs