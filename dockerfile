FROM node:0.12

RUN apt-get update && \
  npm install -g pm2 && \
  mkdir -p /opt/app/KlixNetwork && npm install npm -g


VOLUME ["/opt/app/KlixNetwork"]
EXPOSE 3000

WORKDIR /opt/app/KlixNetwork

CMD pm2 start simplejsserver.js -l /opt/app/KlixNetwork/logs/KlixNetwork.log -i 0 && pm2 logs