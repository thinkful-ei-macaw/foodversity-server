function makeFoodsArray() {
  return [
    {
      id: 1,
      title: "Food 1",
      content: "Content Content",

      day_id: 1,
    },
    {
      id: 2,
      title: "Food 2",
      content: "Content Content 2",

      day_id: 1,
    },
    {
      id: 3,
      title: "Food 3",
      content: "Content Content 3",

      day_id: 2,
    },
  ];
}

function makeDaysArray() {
  return [
    {
      id: 1,
      title: "test day 1",
    },
    {
      id: 2,
      title: "test day 2",
    },
  ];
}

module.exports = {
  makeFoodsArray,
  makeDaysArray,
};
