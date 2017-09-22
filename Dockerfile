FROM node:0.12
RUN mkdir -p /home/node/service
WORKDIR /home/node/service
COPY package.json /home/node/service
RUN npm install
COPY . /home/node/service
EXPOSE 3000
VOLUME /home/node/service/shared
CMD [ "node", "index.js" ]

