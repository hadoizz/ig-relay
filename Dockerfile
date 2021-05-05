FROM node:15-alpine
ENV SKIP_PREFLIGHT_CHECK=true
EXPOSE 80
WORKDIR /app

COPY package*.json tsconfig.json /app/
RUN npm install

COPY www /app/www
RUN npm run build-www

COPY bot /app/bot
RUN npm run build-bot

CMD ["npm","start"]