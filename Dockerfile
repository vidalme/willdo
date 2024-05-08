FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm install
EXPOSE 3000
COPY . .
RUN npm run build
RUN npm install -g serve
ENTRYPOINT serve -s -l 3000 ./dist