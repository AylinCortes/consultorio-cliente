FROM node:latest

EXPOSE 3000

RUN npm install --global yarn --force

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
USER root
RUN chown -R 0:0 /app && chmod -R 777 /app
RUN yarn

COPY . ./
RUN yarn build