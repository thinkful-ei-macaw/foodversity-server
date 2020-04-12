const app = require("../src/app");

describe("App", () => {
  it('GET /respods with 200 containing "I am serving, I am a server!"', () => {
    return supertest(app)
      .get("/")
      .expect(200, "I am serving, I am a server!");
  });
});
