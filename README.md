# Onramp Fullstack Take Home Project

## Overview 🤖

A crud fullstack blogpost website.

###Features

- Users can create accounts.
- Users can sign in to their accounts.
- Users can add sign out of their accounts.
- Users can view the posts they've created.
- Users can view posts from all users.
  <br>
- Users can create posts.
- Users can edit posts.
- Users can delete posts.

### Architecture Pattern

I choose to go with MVC(Model View Controller) as my architecture pattern

## Tech stack

# Built using: React using nextjs, Typescript and posgresql

**Styling packages:** chackra-ui

**Packages for server setup/management:** express, morgan

**Packages used for development (linters):** eslint, prettier.

**state managment:** react-context

**Packages for authentication:** jsonwebtoken, argon2

**Packages for database setup/management:** typeorm and postgresql

You are actively encouraged to research the web, books, videos, or tutorials for this project. That said, we expect all code that is submitted to be your own (e.g. this project should NOT be completed with another person). That means that we expect each candidate to refrain from copying and/or pasting code into the project. If we find copied code in your project, we will have to disqualify you. Web and video resources are available at the end of this document.

## Installation instruction

- enviroment variables

  - DB_PORT - port in which server willrun.
  - DB_USER - db user.
  - DB_PASS - db passowrd.

To get the run front end running

1. Clone this repo

2. `cd` into blend-blog-project/web

3. `yarn` to install all required dependencies

4. `yarn dev` to start the local server and run the app in the development mode.

5. Open [http://localhost:3000](http://localhost:3000)to view it in the browser.

To get back end running

1. `cd` into blend-blog-project/server

2. `yarn` to install all required dependencies

3. `yarn dev` to start the local server and run the app in the development mode.

4. you will be given the URL in which your server is running.
