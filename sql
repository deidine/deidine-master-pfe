CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    description TEXT NOT NULL
);
