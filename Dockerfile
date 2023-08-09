FROM node:16-alpine

WORKDIR /app

COPY . .

ENV DATABASE_URL="postgresql://postgres:m<W4L@c8@Q&MpnVg@192.168.100.39:5432/phdreamreg-db?schema=public"

RUN npm install
RUN npx prisma generate
RUN npx prisma db push

CMD [ "npm", "run", "start" ]

EXPOSE 5000