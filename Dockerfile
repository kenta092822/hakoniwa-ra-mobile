FROM node:22-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY hakoniwa_ra_runtime_v1_3.zip /tmp/hakoniwa_ra_runtime_v1_3.zip
COPY hotfix/mobile-modal-scroll.css /tmp/mobile-modal-scroll.css
COPY hotfix/ui-compact-v2.css /tmp/ui-compact-v2.css
COPY hotfix/ui-compact-v2.js /tmp/ui-compact-v2.js
COPY hotfix/log-compact-v3.css /tmp/log-compact-v3.css
COPY hotfix/log-compact-v3.js /tmp/log-compact-v3.js
RUN unzip /tmp/hakoniwa_ra_runtime_v1_3.zip -d /app \
    && cat /tmp/mobile-modal-scroll.css >> /app/public/style.css \
    && cat /tmp/ui-compact-v2.css >> /app/public/style.css \
    && cat /tmp/log-compact-v3.css >> /app/public/style.css \
    && cat /tmp/ui-compact-v2.js >> /app/public/app.js \
    && cat /tmp/log-compact-v3.js >> /app/public/app.js \
    && sed -i "s/hakoniwa-ra-v1.3.0/hakoniwa-ra-v1.3.1/" /app/public/sw.js \
    && rm /tmp/hakoniwa_ra_runtime_v1_3.zip /tmp/mobile-modal-scroll.css /tmp/ui-compact-v2.css /tmp/ui-compact-v2.js /tmp/log-compact-v3.css /tmp/log-compact-v3.js \
    && mkdir -p /data

ENV NODE_ENV=production
ENV DATA_DIR=/data
ENV TURN_SECONDS=21600

EXPOSE 3000

CMD ["node", "server.js"]
