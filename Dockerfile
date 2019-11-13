FROM node:12.13.0

RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --gid 2000

RUN mkdir -p /app
WORKDIR /app
COPY package*.json yarn*.lock ./

RUN yarn

COPY . .

ENV NODE_ENV=production

RUN yarn build
RUN chown -R appuser:appgroup /app

ENV PORT=3000
EXPOSE 3000
USER 2000

CMD [ "yarn", "start" ]
