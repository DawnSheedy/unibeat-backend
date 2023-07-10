FROM node:18-alpine

LABEL author="Dawn Sheedy (dawn@dawnsheedy.com)"
LABEL version="1.0"

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY dataload/ ./dataload/

COPY public ./public/

COPY scripts/ ./scripts/

RUN yarn index-songs

RUN rm -rf dataload/

COPY src/ ./src/

COPY tsconfig.json ./

RUN yarn build

EXPOSE 8000

CMD ["node", "build/index.js"]