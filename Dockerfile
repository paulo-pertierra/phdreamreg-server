FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma db push

CMD [ "npm", "run", "start" ]

EXPOSE 5000