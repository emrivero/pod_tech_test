# Pod's technical interview

## Requirements
- Docker (v24.0.5)
- Docker Compose (v2.20.2)
- Ubuntu (v20.04.1 LTS)
  
> **Note:** The project was developed using the versions specified above. It may work with other versions, but it is not guaranteed.

## Main technologies used
- Node.js (v18.15.0)
- Typescript (5.1.6)
- Jest (29.6.2)
- ESlint (8.46.0)

## How to run the project
1. Clone the repository
2. Run `docker compose up` to start the tests projects in watch mode
3. Run `docker compose exec app npm run lint` to run the linter

## Project structure
```
.
├── docker-compose.yml
├── entrypoint.sh
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── index.ts
│   └── pod.client.ts
├── test
│   ├── spec
│   │   └── pod.client.spec.ts
│   └── unit
└── tsconfig.json
```
    
  
## How to run the project

## Changelog
### Version 0.1.0
- Initialized the project using the `npm init` command and installed necessary dependencies.
- Set up tsconfig.json configuration to use Node.js in conjunction with Typescript.
- Installed and configured Jest, initialized the test suite for test specifications, making them fail initially to apply TDD.
- Installed ESLint and necessary plugins to make it work with Typescript. ESLint and Prettier are used together as default rules.