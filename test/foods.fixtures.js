function makeFoodsArray() {
  return [
    {
      id: 1,
      content: "Content Content",
      meal_type: null,
      second_item: null,
      third_item: null,
      url: null,
      days_id: 1,
    },
    {
      id: 2,
      content: "Content Content 2",
      meal_type: null,
      second_item: null,
      third_item: null,
      url: null,
      days_id: 1,
    },
    {
      id: 3,
      content: "Content Content 3",
      meal_type: null,
      second_item: null,
      third_item: null,
      url: null,
      days_id: 2,
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
