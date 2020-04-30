const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

//days Get error
describe("GET /days", () => {
  context("given no days in database", () => {
    it("responds with 401", () => {
      return supertest(app).get(`/days`).expect(401);
    });
  });
});
//happy
describe("GET /days", () => {
  context("given days in database", () => {
    it("responds with 200 and all of the days", () => {
      return supertest(app).get("/days").expect(200);
    });
  });
});
//Post

//happy + error

//days Id Get
//happy
//error
describe("GET /days/:id", () => {
  context("Given no days in the database", () => {
    it("responds with 401", () => {
      const id = 123456;
      return supertest(app).get(`/days/${id}`).expect(401);
    });
  });
});

//days Id post
// happy
// error

// days ID delete
// happy
// error
