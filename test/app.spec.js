const app = require("../src/app");

const knex = require("knex");

describe("App", () => {
  it('GET /responds with 200 containing "I am serving, I am a server!"', () => {
    return supertest(app).get("/").expect(200, "I am serving, I am a server!");
  });
});
