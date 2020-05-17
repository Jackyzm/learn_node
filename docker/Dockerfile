FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#复制所有文件到 工作目录。
COPY . .

RUN yarn install

EXPOSE 8000
CMD yarn start:prod