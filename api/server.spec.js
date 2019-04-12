const request = require("supertest");
const server = require("./server.js");

const db = require("../data/dbConfig");

afterEach(async () => {
  await db("games").truncate();
});

describe("server.js", () => {
  describe("GET /games", () => {
    it("should return status code 200 when able to GET games", async () => {
      let response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });

    it("should return an array", async () => {
      let expected = [];
      let response = await request(server).get("/games");

      expect(response.body).toEqual(expected);
    });

    it("should return the list of games", async () => {
      let gameList = [
        { id: 1, title: "Mortal Kombat", genre: "Arcade", releaseYear: 1992 }
      ];
      let response = await request(server)
        .post("/games")
        .send({
          id: 1,
          title: "Mortal Kombat",
          genre: "Arcade",
          releaseYear: 1992
        });

      expect(response.body).toEqual(gameList);
    });
  });

  describe("POST /games", () => {
    it("should return status code 201 when a game is posted", async () => {
      let game = { title: "Mortal Kombat", genre: "Arcade", releaseYear: 1992 };
      let response = await request(server)
        .post("/games")
        .send(game);

      expect(response.status).toBe(201);
    });

    it("should return status code 422 when there is no title or genre", async () => {
      let game = {};
      let response = await request(server)
        .post("/games")
        .send(game);

      expect(response.status).toBe(422);
    });

    it("should return status code 201 when a game is posted", async () => {
      let game = { title: "Mortal Kombat", genre: "Arcade", releaseYear: 1992 };
      let gameList = [
        { id: 1, title: "Mortal Kombat", genre: "Arcade", releaseYear: 1992 }
      ];

      let response = await request(server)
        .post("/games")
        .send(game);

      expect(response.body).toEqual(gameList);
    });
  });
});
