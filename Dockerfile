FROM node:18-alpine as build
WORKDIR /var/app
COPY . .
RUN npm install --production=false && \
    npm run build

FROM node:18-alpine as dependencies
WORKDIR /var/app
COPY package.json npm.* prisma ./
RUN npm install --production=true

FROM node:18-alpine as run
WORKDIR /usr/app
COPY --from=dependencies /var/app/node_modules ./node_modules/
COPY --from=dependencies /var/app/package.json ./package.json
COPY --from=build /var/app/dist ./dist/
CMD node dist/nest/main.js