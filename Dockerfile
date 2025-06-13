FROM node:22
WORKDIR /app
COPY . .
RUN corepack enable
RUN yarn install
EXPOSE 3000
CMD npx knex migrate:latest && yarn dev