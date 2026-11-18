# LEVEL UP

Video game catalog that combines the [RAWG](https://rawg.io/apidocs) API with games stored in a local database. Bootcamp project, 2021.

## Features

- Browse games from RAWG, from the local database, or both
- Search by name, with pagination
- Sort alphabetically (ascending or descending) and by rating
- Game detail with genres, platforms, release date and description
- Add your own games through a validated form

## Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Client   | React 17, Redux, React Router      |
| API      | Node.js, Express, Sequelize        |
| Database | PostgreSQL                         |
| Tests    | Jest, Supertest, React Testing Library |

## Getting started

Requirements: Node.js 16, a PostgreSQL database named `videogames` and a free [RAWG API key](https://rawg.io/apidocs).

```bash
cd api
cp .env.example .env
npm install
npm start
```

```bash
cd client
cp .env.example .env
npm install
npm start
```

The API listens on `http://localhost:3001` and the client on `http://localhost:3000`. Set `API_KEY` and the database credentials in `api/.env`.

## Scripts

| Where    | Command         | What it does           |
| -------- | --------------- | ---------------------- |
| `api`    | `npm test`      | Runs the API tests     |
| `api`    | `npm run lint`  | Lints the API          |
| `client` | `npm test`      | Runs the client tests  |
| `client` | `npm run build` | Builds the client      |

## API

| Method | Path          | Description                                          |
| ------ | ------------- | ---------------------------------------------------- |
| GET    | `/games`      | RAWG games, paginated with `?page=` or searched with `?name=` |
| GET    | `/games/:id`  | Detail of a RAWG game                                |
| GET    | `/gamesDB`    | Games stored in the local database                   |
| GET    | `/genres`     | Genres, loaded from RAWG the first time              |
| POST   | `/new`        | Stores a new game                                    |
