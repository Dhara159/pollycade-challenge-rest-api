![Polycade.com](https://i.imgur.com/jcvsFKh.png)

---

# Polycade Engineering Node.js REST API Challenge

Our apps need to query and store lots of information. We want to make sure that you have a good understanding of JavaScript and Node.js fundamentals. Can you build a simple API that can read data from and write data to a PostgreSQL database with Node.js?

## The Challenge

Build a REST API that will allow Polycade to manage pricing individually on machines remotely with the following:

- Endpoints
  - GET `/pricing-models`
    - returns all of the pricing models available for the system
    - also returns the default pricing model in `prices.json`
  - POST `/pricing-models`
    - creates a new pricing model in the system
    - returns the ID of the new pricing model to the caller
  - GET `/pricing-models/:pm-id`
    - get an individual pricing model
    - include the price configurations for the pricing model
    - if the pricing model isn't found by `pm-id` it responds with not found
  - PUT `/pricing-models/:pm-id`
    - updates an existing pricing model meta-data
    - does not affect the pricing configurations for the pricing model
  - GET `/pricing-models/:pm-id/prices`
    - returns the prices configured for a specific pricing model
  - POST `/pricing-models/:pm-id/prices`
    - adds a new price configuration for a pricing model
  - DELETE `/pricing-models/:pm-id/prices/:price-id`
    - removes a price configuration from a pricing model
    - if the pricing model isn't found by `pm-id` it responds with not found
    - if the price configuration isn't found by `price-id` it responds with not found
  - PUT `/machines/:machine-id/prices/:pm-id`
    - sets the pricing model for an individual machine to the one from `pm-id`
    - if the machine already has a pricing model, it is replaced by this one
    - if the machine isn't found by `machine-id` it responds with not found
    - if the pricing model isn't found by `pm-id` it responds with not found
  - DELETE `/machines/:machine-id/prices/:pm-id`
    - removes the pricing model from the machine (unsets it)
  - GET `/machines/:machine-id/prices`
    - return the pricing model and price configurations set for a given machine
    - if the machine does not have a pricing model configured then the default model from `prices.json` is returned
    - if the machine isn't found by `machine-id` it responds with not found
- Tests
  - Each endpoint should have its own test
- Database
  - Use PostgreSQL to store data about machines and prices

## Instructions

How to attempt this challenge:

1) Create a new repo in your account and note the git url
2) Clone this repo
3) Solve the challenge
4) Set your new repo as the origin: `git remote set-url origin ${your repo url}`
5) Push your solution to your repo

You must follow these steps for your solution to be accepted -- forks or other methods will not be considered.

## Scrips

"start": Run migrations, seeders and start server

"watch": Run server with nodemon after resetting dev environment,

"test": Run test after resetting test environment

"watch-test": Run test in watch mode after resetting test environment

"lint": Fix eslint issues

"migration": Run sequelize migration

"migration-undo": Undo all migrations

"test-migration-undo": Undo all migrations in test environment

"setup-dev": Run migrations and seeders in dev environment

"reset-dev": Reset dev environment ( Undo seeders, migrations and run clean migrations and seeders)

"setup-test": Run migrations and seeders in test environment

"reset-test": Reset test environment ( Undo seeders, migrations and run clean migrations and seeders)

"seeders": Run all seeders in dev environment

"test-migration": Run sequelize migration in test environment

"test-seeders": Run sequelize seeders in test environment

## Instructions to setup repo 

How to attempt this challenge:

1) git clone https://github.com/Dhara159/pollycade-challenge-rest-api.git
2) Create two new databases. (For dev and test environment) 
3) Run `npm install`
4) Create .env file and Add test and dev database URL in .env (Follow .env.example for more)
5) To start server: Run `npm run start`
6) To start server in watch mode: Run `npm run watch`
7) To run tests: Run `npm run test`
8) To start tests in watch mode: Run `npm run watch-test`

> You don't have to run migrations and seeders separately. It is called directly when you run any server start, test command

## [Postman collection](https://github.com/Dhara159/pollycade-challenge-rest-api/blob/master/Polycade.postman_collection.json)

## [Folder Structure](https://github.com/Dhara159/pollycade-challenge-rest-api/blob/master/FOLDER-STRUCTURE.md)
