const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("GET /days/:id", () => {
  context("Given no days in the database", () => {
    it("responds with 401", () => {
      const id = 123456;
      return supertest(app).get(`/days/${id}`).expect(401);
    });
  });
});
