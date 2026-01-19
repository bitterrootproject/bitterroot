# Bitteroot

A hostable, searchable, database to categorize and analyze the scholarships of different universities and identify different niches of academic literature.

Bitterroot is the brainchild of John Norton, a linguistics Master's student at the University of Montana with over six years of experience speaking and studying Turkic languages and living in the Turkic world.

Bitterroot uses Django and SvelteKit. The ultimate goal is for full self-hostability. Federation may be considered at a later date.

See the draft database schema here: https://dbdiagram.io/d/Bitterroot-draft-DB-schema-691abd9d6735e111701cd9fd (also in [docs/schema.dbml](./docs/schema.dbml))

## Tools

Bitterroot uses [Turborepo](https://turborepo.dev/docs/getting-started) to manage the monorepo.

## Contributing

Before committing, please run:

```shell
make lint
make format
```