dev:
	npm run dev

build-watch:
	npm run build:watch

lint:
	@echo "\n\n\033[1;34mFrontend: Format\033[0m\n"
	npm run format

	@echo "\n\n\033[1;34mFrontend: Lint\033[0m\n"
	npm run lint

	@echo "\n\n\033[1;34mFrontend: Check with svelte-check\033[0m\n"
	npm run check

	@echo "\n\n\033[1;34mCheck for whitespace differences\033[0m\n"
	git diff-index --check HEAD --
