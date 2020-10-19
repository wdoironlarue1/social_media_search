Simple web app that uses APIs of multiple social media sites to search for a given string

backend created using express, frontend created using create-react-app

uses nodemon to restart the server when changes are made 

in order for this app to work (if you were to clone the repo, install the dependencies, and run the api and client) you'll need to create a `config.js` file in the `api` directory that exports an object that has credentials such as reddit username, reddit password, reddit app id, reddit app secret, twitter consumer key, and twitter consumer secret)

----------
TODO
- make it more visually appealing
- add logos of social media around title
- use the user's input for the search
- add reddit search
- add instagram search
- add FB search
- add tests to front-end components
- add tests to back-end logic
- remove unneeded data grabbed from apis serverside
----------
to run, clone repo, navigate to the `api` folder in terminal, and run `npm start`. Then navigate to the `client` folder and run `npm start`.
