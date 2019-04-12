const request = require("supertest");
const server = require("./server.js");

const db = require("../data/dbConfig");

afterEach(async () => {
  await db('games').truncate();
});

describe("server.js", () => {
  describe("GET /games", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/games")

      expect(response.status).toBe(200)
    });
  });

  it("should return an array", async () => {
    let expected = [];
    let response = await request(server).get("/games")

    expect(response.body).toEqual(expected);    
  });

  it("should return the list of games", async () => {
    let gameList = [{ id: 1, title: "Mortal Kombat", genre: "Arcade", releaseYear: 1992 }]  
    let response = await request(server).post("/games").send(game)

    expect(response.body).toEqual(gameList);
  });
});
