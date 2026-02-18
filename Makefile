tag=latest

all: run

run:
	npm run dev

build:
	npm run build

docker: build
	docker buildx build --platform linux/amd64 -t kobums/gowoobro_web:$(tag) --load.

push: build
	docker buildx build --platform linux/amd64 -t kobums/gowoobro_web:$(tag) --push .

clean:
	rm -rf .next
