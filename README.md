# TechWave Entertainment - Technical assignment

## Description

This project is a movie managing API made with NestJS.

## Project setup

### Database

The first requirement is to have a postgresql server up and running on your machine.

With that you can create a new database, a sql query to do so can be found in `database/script.sql`.

You can then create the 3 tables needed for this project with the following 3 queries in the file.

### API

The second requirement is to have npm and node installed on your machine.

You first need to create a `.env` file at the root of the project similar to `.env.sample`, and add in your postgres configuration.

Now the dependencies can be installed :

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

Once the server started, the API can be used via a swagger interface available at this url [http://localhost:3000/api](http://localhost:3000/api).

## Explanation

For this assignment I decided to go as simple as possible, with explicit variable and method names to avoid unnecessary comments on the code.

To create new resources, I used POST as we do not know what the ID of the object is going to be. Hence, I used PUT for the update as we update all the information at once and keep the same ID for the object. WIth that the result is always the same for the same parameters, which makes this operation idempotent according to the documentation for this verb.

To update and delete resources, I first check whether it exists to avoid errors, and I decided to send back an explicit message to the user in the case it does not exist. Which I believe makes it clearer for the user and does not cause issues as he can see list the movies that exists with their ids.
