# Books Catalog

## Back-end

The project comprises of a backend folder which is a HTTP microservice with an endpoint (/api/books) which returns the books catalogue. The raw response for Google's Book API is used a store and the returned list of books is the transformed data from the raw response. When the App starts, the raw response is transformed and stored in-memory and it would be used as a in-memory db until the App lives.

The App exposes following APIs

1. GET /api/books - to retrieve all books
2. GET /api/books/:bookId - to retrieve a single book
3. DELETE /api/books - to delete all books
4. DELETE /api/books/:bookId - to delete a single book

## React UI - Frontend

The frontend folder is a SPA using React.js with Typescript to list all the books (GET /api/books) and users can click on a book to know more about the author, description etc. The App uses a in-built redux-like global state manager, which is build using React Context APIs to maintain a global store. The state manager is my own implementation of a flux concept, which can be used in SPA's like to avoid using heavy-weight libraies like redux, saga etc.,

## Project setup

You dont have to setup the front-end and back-end app seperately. I have made it simpler for you :). The project uses concurrently to run both the app at the same time.

In the project root directory, you can run:

1.`npm install` 2. `npm run setup`

After successfull installation of both apps,

`npm run start`

It should start the react-app in http://localhost:3000 and start the node.js app in http://localhost:3001
