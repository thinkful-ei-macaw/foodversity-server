const knex = require("knex");
const app = require("../src/app");
const { TEST_DATABASE_URL } = require("../src/config");
const { makeFoodsArray, makeDaysArray } = require("./foods.fixtures");

let authToken;

describe("foods Endpoints", function () {
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

  context("Given there are foods in the database", () => {
    const testDays = makeDaysArray();
    const testFoods = makeFoodsArray();
    beforeEach("insert days", () => {
      return db.insert(testDays).into("days");
    });
    beforeEach("insert foods", () => {
      return db.insert(testFoods).into("foods");
    });
    it("responds with 200 and all of the foods", () => {
      return supertest(app).get("/food").expect(200, testFoods);
    });
    //get food id error path
    describe("GET /food/:id", () => {
      context("Given no foods in the database", () => {
        it("responds with 404", () => {
          const id = 123456;

          return supertest(app).get(`/food/${id}`).expect(401);
        });
      });
    });
    //get food id happy path
    describe("GET /food/:id", () => {
      context("given foods in database", () => {
        it("responds with 200", () => {
          return supertest(app).get(`food/${id}`).expect(200);
        });
      });
    });
    //post food happy
    describe(`POST /food`, () => {
      it(`creates a food, responding with 201 and the new food`, function () {
        const testDay = testDays[0];
        const newFood = {
          content: "food Item",
          days_id: testDay.id,
        };
        return supertest(app)
          .post("/food")
          .set({
            Authorization: `Bearer ${authToken}`,
          })
          .send(newFood)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.content).to.eql(newFood.content);
            expect(res.body.days_id).to.eql(newFood.days_id);
            expect(res.headers.location).to.eql(`/food/${res.body.id}`);
          });
      });
      //errror path

      it("tests for missing fields", function () {
        const requiredFields = ["text", "rating", "user_id", "thing_id"];

        requiredFields.forEach((field) => {
          const testDay = testDays[0];
          const newFood = {
            content: "Test new food",
            days_id: testDay.id,
          };

          it(`responds with 400 and an error message when the '${field}' is missing`, () => {
            delete newFood[field];

            return supertest(app)
              .post("/food")
              .send(newFood)
              .expect(400, {
                error: `Missing '${field}' in request body`,
              });
          });
        });
      });
    });
  });
});
//food id delete happy
describe(`DELETE /food/:food_id`, () => {
  context("Given there are foods in the database", () => {
    const testFoods = makeFoodsArray();

    beforeEach("insert food", () => {
      return db.into("food").insert(testFoods);
    });

    it("responds with 204 and removes the food", () => {
      const idToRemove = 2;
      const expectedFoods = testFoods.filter((food) => food.id !== idToRemove);
      return supertest(app)
        .delete(`/days/${idToRemove}`)
        .expect(204)
        .then((res) => supertest(app).get(`/days`).expect(expectedFoods));
    });
  });
});
//food id delete eroor
describe(`DELETE /food/:food_id`, () => {
  context(`Given no food`, () => {
    it(`responds with 404`, () => {
      const foodId = 123456;
      return supertest(app)
        .delete(`/food/${foodId}`)
        .expect(404, { error: { message: `Food doesn't exist` } });
    });
  });
});
