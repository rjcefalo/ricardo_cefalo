FROM node:latest
ADD . /app
WORKDIR /app
RUN npm install
CMD ["npm","run","dev"]