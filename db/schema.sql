CREATE DATABASE statTrick_db;

\c statTrick_db;

CREATE TABLE userData (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    favoriteTeam VARCHAR(255) NOT NULL
);