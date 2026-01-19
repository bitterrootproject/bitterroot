dev:
	uv run manage runserver --nostatic

docker-build:
	docker build . -t bt-web:dev

docker-run:
	docker run -it --rm -p 8000:8000 bt-web:dev

docker-shell:
	docker run -it --rm bt-web:dev bash

docker:
	@echo "\033[1;32mBuilding Docker image\033[0m"
	@echo "Tag = bt-web:dev\n"
	$(MAKE) docker-build

	@echo "\n\n\033[1;32mRunning Docker image\033[0m\n"
	$(MAKE) docker-run

schema:
	@echo "Generating OpenAPI schema to docs/schema.yml"
	@if [ -f docs/schema.yml ]; then\
		echo "Existing schema found, backing up";\
		mv docs/schema.yml docs/schema.$(shell date '+%Y-%m-%d_%H:%M:%S').yml;\
	fi
	uv sync --group dev
	uv run manage generateschema > docs/schema.yml

lint:
	@echo "\033[1;34mBackend: Format\033[0m\n"
	uv run ruff format

	@echo "\033[1;34mBackend: Lint\033[0m\n"
	uv run ruff check --fix

	@echo "\n\n\033[1;34mCheck for whitespace differences\033[0m\n"
	git diff-index --check HEAD --

# build:
# 	$(MAKE) docker-build