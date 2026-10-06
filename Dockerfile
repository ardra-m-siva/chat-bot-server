FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# either this (basic)
# RUN npm ci --omit=dev 
# or this (deletes npm's download cache inside the box. It's useless at run time, so the image gets smaller.)
RUN npm ci --omit=dev && npm cache clean --force

# either this 
COPY . .

# or (copies your code and makes the built-in node user the owner. User Node is important security improvement.)
COPY --chown=node:node . .
USER node

EXPOSE 4000

# every 30 seconds Docker asks "is the app alive?" by visiting /health. If it fails 3 times, Docker marks the container as unhealthy.
#  Hosts and orchestrators use this to restart a stuck app.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "index.js"]