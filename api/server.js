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

server.post("/games", (req, res) => {
  const game = req.body;

  db("games")
    .insert(game)
    .then(ids => {
      const id = ids[0];
      db("games")
        .where({ id })
        .then(game => {
          res.status(201).json(game);
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the game to the database."
      });
    });
});




module.exports = server;