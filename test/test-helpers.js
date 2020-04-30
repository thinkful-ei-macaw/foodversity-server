const bcrypt = require("bcryptjs");

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      nickname: "TU1",
      password: "password",
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      nickname: "TU2",
      password: "password",
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      nickname: "TU3",
      password: "password",
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      nickname: "TU4",
      password: "password",
    },
  ];
}

function makeFoodsFixtures() {
  const testUsers = makeUsersArray();

  return { testUsers };
}

module.exports = {
  makeUsersArray,
  makeFoodsFixtures,
};
