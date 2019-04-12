const middleware = require("./middleware.js");
const express = require("express");

const server = express();
middleware(server);

const db = require("../data/dbConfig");

server.get("/games", (req, res) => {
  db("games")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json({ error: "The games could not be retrieved." });
    });
});


module.exports = server;