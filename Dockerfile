# docker build -t mmmohebi/diet-calculator  . && docker push mmmohebi/diet-calculator

FROM node:20.10.0 AS builder
WORKDIR /npm
COPY . .

RUN npm install
RUN npm run build

FROM node:20.10.0
WORKDIR /app
COPY --from=builder /npm/.output .

ENV PORT=3005
ENV HOST=0.0.0.0

CMD ["node", "server/index.mjs"]

