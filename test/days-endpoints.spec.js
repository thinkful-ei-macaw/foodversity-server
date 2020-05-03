const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { TEST_DATABASE_URL } = require("../src/config");
const { makeDaysArray } = require("./foods.fixtures");

let authToken;

describe("days Endpoints", function () {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
    supertest(app)
      .post("/users")
      .send({
        full_name: "testuser",
        user_name: "testing_mocha",
        password: "ch@i1234",
      })
      .then((res) => {
        supertest(app)
          .post("/api/auth/login")
          .send({
            user_name: "testing_mocha",
            password: "ch@i1234",
          })
          .then((loginRes) => {
            authToken = loginRes.body.authToken;
          });
      });
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE TABLE foodversity_users, foods, days RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE TABLE foods, days RESTART IDENTITY CASCADE")
  );

  context("Given there are days in the database", () => {
    const testDays = makeDaysArray();
    beforeEach("insert days", () => {
      return db.insert(testDays).into("days");
    });
    it("responds with 200 and all of the days", () => {
      return supertest(app).get("/days").expect(200, testDays);
    });

    //get id error
    describe("GET /days/:id", () => {
      context("Given no days in the database", () => {
        it("responds with 404", () => {
          const id = 123456;

          return supertest(app).get(`/days/${id}`).expect(401);
        });
      });
    });
    //get id happy
    describe("GET /days/:id", () => {
      context("given days in database", () => {
        it("responds with 200", () => {
          return supertest(app).get(`days/${id}`).expect(200);
        });
      });
    });
    //days post happy
    describe(`POST /days`, () => {
      it(`creates a day, responding with 201 and the new day`, function () {
        const testDay = testDays[0];
        const newDay = {
          title: "day ",
        };
        return supertest(app)
          .post("/days")
          .set({ Authorization: `Bearer ${authToken}` })
          .send(newDay)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.title).to.eql(newDay.title);
            expect(res.headers.location).to.eql(`/days/${res.body.id}`);
          });
      });
      //post errror path

      it("tests for missing fields", function () {
        const requiredFields = ["title"];

        requiredFields.forEach((field) => {
          const testDay = testDays[0];
          const newDay = {
            title: "Test day",
          };

          it(`responds with 400 and an error message when the '${field}' is missing`, () => {
            delete newDay[field];

            return supertest(app)
              .post("/days")
              .send(newDay)
              .expect(400, {
                error: `Missing '${field}' in request body`,
              });
          });
        });
      });

      //days id delete happy
      describe(`DELETE /days/:days_id`, () => {
        context("Given there are days in the database", () => {
          const testDays = makeDaysArray();

          beforeEach("insert days", () => {
            return db.into("days").insert(testDays);
          });

          it("responds with 204 and removes the days", () => {
            const idToRemove = 2;
            const expectedDays = testDays.filter(
              (days) => days.id !== idToRemove
            );
            return supertest(app)
              .delete(`/days/${idToRemove}`)
              .expect(204)
              .then((res) => supertest(app).get(`/days`).expect(expectedDays));
          });
        });
      });
      //days id delete eroor
      describe(`DELETE /days/:days_id`, () => {
        context(`Given no days`, () => {
          it(`responds with 404`, () => {
            const daysId = 123456;
            return supertest(app)
              .delete(`/days/${daysId}`)
              .expect(404, { error: { message: `Day doesn't exist` } });
          });
        });
      });
    });
  });
});
