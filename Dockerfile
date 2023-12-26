FROM ubuntu:latest

WORKDIR /app

RUN apt update && apt install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt install nodejs -y

COPY package*.json .
RUN npm install

EXPOSE 5000

COPY . .
RUN npm run build

RUN npm install -g serve
ENTRYPOINT serve -s -l 5000 ./dist