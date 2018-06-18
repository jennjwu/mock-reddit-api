# mock-reddit-api
restful service project

## Setup
1. Install [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) should be installed with it.
1. Clone this project
1. Go to directory: `cd mock-reddit-api`
1. Install dependencies: `npm install`

## Usage
0. Create a user account on mlab where mongodb instance is hosted.
1. Run `mongoUser=<mongoUser> mongoPass=<mongoPass> node index.js` to start the server locally
1. Visit `localhost:3000` to hit the server. Available endpoints are documented in the next section.

## Endpoints
- [create user](docs/register.md): `POST /users`
- [login user](docs/login.md): `POST /users/login`
- [get reddit data](docs/reddit.md): `GET /reddit`
- [create favorite](docs/saveFavorite.md): `POST /favorites`
- [get user's favorites](docs/getFavorites.md): `GET /favorites`

## Development
Using [nodemon](https://www.npmjs.com/package/nodemon) to auto restart node app upon file changes:
 
 ``` npx nodemon```
 
 or if installed globally:
 
 ``` nodemon```

