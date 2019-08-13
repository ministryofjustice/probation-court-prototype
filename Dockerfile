FROM node:12.3.1-slim

RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --gid 2000


# Create app directory
RUN mkdir -p /app
WORKDIR /app
ADD . .


RUN npm ci
RUN npm run build

RUN chown -R appuser:appgroup /app


ENV PORT=3001

EXPOSE 3001

USER 200


CMD [ "npm", "start" ]

