# syntax=docker/dockerfile:1
FROM golang:1.20-alpine
EXPOSE 8080
WORKDIR /back

RUN apk add make

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN make pre_gen

ENTRYPOINT ["make", "run"]
