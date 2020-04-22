CREATE TABLE foods (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    content TEXT NOT NULL,
    days_id INTEGER REFERENCES days(id),
    meal_type TEXT, --bf/lunch/dinner/dessert
    first_item TEXT,
    second_item TEXT,
    third_item TEXT,
    url TEXT
        ON DELETE CASCADE
);