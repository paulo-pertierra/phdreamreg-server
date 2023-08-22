FROM node:16-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install \
 && npx prisma generate \
 && npx prisma db push

CMD [ "npm", "run", "prod" ]

EXPOSE 5000