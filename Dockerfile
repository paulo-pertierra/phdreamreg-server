FROM node:16-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install \
 && npx prisma generate \
 && npx prisma db push \
 && npm run build

CMD [ "node", "./src/index.js"]

EXPOSE 5000