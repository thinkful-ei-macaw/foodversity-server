const app = require("../src/app");

const knex = require("knex");

describe("App", () => {
  it('GET /responds with 200 containing "I am serving, I am a server!"', () => {
    return supertest(app).get("/").expect(200, "I am serving, I am a server!");
  });
});

describe("Loading the days page", () => {
  it("should return 200 from GET /days", () => {
    return supertest(app).get("/days").expect(200, days);
  });
});

// describe("GET /days endpoint", () => {
//   it("should return 200", () => {
//     const days = {
//       id: 1,
//       title: "monday",
//     };
//     return supertest(app)
//       .get("/days")
//       .days(days)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then((res) => {
//         expect(res.body).to.be.an("array");
//         expect(res.body[0]).to.be.an("object");
//       });
//   });
// });
