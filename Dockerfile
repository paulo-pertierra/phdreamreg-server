FROM node:16-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache --virtual .gyp python3 py3-pip make g++ \
 && npm install \
 && apk del .gyp \
 && npx prisma generate \
 && npx prisma db push

CMD [ "npm", "run", "start" ]

EXPOSE 5000