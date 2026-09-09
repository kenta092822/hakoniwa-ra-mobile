FROM node:22-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY hakoniwa_ra_runtime_v1_3.zip /tmp/hakoniwa_ra_runtime_v1_3.zip
RUN unzip /tmp/hakoniwa_ra_runtime_v1_3.zip -d /app \
    && rm /tmp/hakoniwa_ra_runtime_v1_3.zip \
    && mkdir -p /data

ENV NODE_ENV=production
ENV DATA_DIR=/data
ENV TURN_SECONDS=21600

EXPOSE 3000

CMD ["node", "server.js"]
