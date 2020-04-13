CREATE TABLE food (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    days_id INTEGER REFERENCES days(id)
        ON DELETE CASCADE
);