FROM node:22-alpine AS build
ARG NPM_TOKEN
WORKDIR /app
COPY .npmrc package*.json ./
COPY ./packages/api/package*.json ./packages/api/
COPY ./packages/shared/ ./packages/shared/
RUN NPM_TOKEN=${NPM_TOKEN} npm install -w packages/api && rm -f .npmrc
COPY ./packages/api/ ./packages/api/
RUN npm run build -w packages/api

FROM node:22-alpine AS production
ARG NPM_TOKEN
WORKDIR /app
COPY .npmrc package*.json ./
COPY ./packages/api/package*.json ./packages/api/
COPY --from=build app/packages/shared/ ./packages/shared/
RUN NPM_TOKEN=${NPM_TOKEN} npm install --omit=dev && rm -f .npmrc
COPY --from=build /app/packages/api/dist ./packages/api/dist

CMD ["sh", "-c", "npm run migration:run -w packages/api && npm run start:prod -w packages/api"]