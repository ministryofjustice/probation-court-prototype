FROM node:10.15-slim

RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --gid 2000

# Create app directory
RUN mkdir -p /app
WORKDIR /app
ADD . .

ENV NODE_ENV=production

RUN npm ci
RUN npm run build
RUN chown -R appuser:appgroup /app

ENV PORT=3000
EXPOSE 3000
USER 200

CMD [ "npm", "start" ]
