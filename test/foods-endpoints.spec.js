const knex = require("knex");
const app = require("../src/app");
const { TEST_DATABASE_URL } = require("../src/config");
const { makeFoodsArray, makeDaysArray } = require("./foods.fixtures");

describe("foods Endpoints", function () {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db("foods")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE days RESTART IDENTITY CASCADE"))
  );

  afterEach("cleanup", () =>
    db("foods")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE days RESTART IDENTITY CASCADE"))
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
      return supertest(app).get("/food").expect(200, testfoods);
    });
  });

  describe("GET /food/:id", () => {
    context("Given no foods in the database", () => {
      it("responds with 404", () => {
        const id = 123456;

        return supertest(app).get(`/food/${id}`).expect(401);
      });
    });
  });
  //post food happy
  describe(`POST /food`, () => {
    beforeEach("insert foods", () =>
      helpers.seedFoodsTables(db, testUsers, testFoods)
    );

    it(`creates an review, responding with 201 and the new food`, function () {
      this.retries(3);
      const testFood = testFoods[0];
      const testDays = testDays[0];
      const newReview = {
        text: "Test new food",
        content: item,
        days_id: testDays.id,
      };
      return supertest(app)
        .post("/food")
        .send(newFood)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body.content).to.eql(newFood.content);
          expect(res.body.days_id).to.eql(newFood.days_id);
          expect(res.headers.location).to.eql(`/food/${res.body.id}`);
          const expectedDate = new Date().toLocaleString();
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect((res) =>
          db
            .from("foods")
            .select("*")
            .where({ id: res.body.id })
            .first()
            .then((row) => {
              expect(row.content).to.eql(newFood.content);

              expect(row.days_id).to.eql(newFood.days_id);
              const expectedDate = new Date().toLocaleString();
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });
    //errror path
    const requiredFields = ["text", "rating", "user_id", "thing_id"];

    requiredFields.forEach((field) => {
      const testFoods = testFoods[0];
      const testDays = testDays[0];
      const newFood = {
        content: "Test new food",
        days_id: testDays.id,
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field];

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
