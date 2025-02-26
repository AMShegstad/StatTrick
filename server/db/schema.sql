CREATE DATABASE stattrick_db;

\c stattrick_db;

-- Create the userData table
CREATE TABLE IF NOT EXISTS userData (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    favoriteteam VARCHAR(255) NOT NULL
);

-- Create the teams table
CREATE TABLE IF NOT EXISTS teams (
    tricode VARCHAR(3) PRIMARY KEY, -- Team abbreviation, e.g., 'MIN' for Minnesota
    city VARCHAR(255), -- City name for the team
    teamname VARCHAR(255), -- Team name
    teamlogo VARCHAR(255), -- URL to the team's logo
    classname VARCHAR(255), -- Class name for the team's logo
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the players table
CREATE TABLE IF NOT EXISTS players (
    playerid INT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    teamabbreviation VARCHAR(3) NOT NULL, -- Shortened team code
    positioncode VARCHAR(10) NOT NULL,
    headshot VARCHAR(255),
    sweaternumber INT,
    points INT DEFAULT 0,
    FOREIGN KEY (teamabbreviation) REFERENCES teams(tricode) ON DELETE CASCADE
);

-- Create the user_favorites table to store the relationship between users and their favorite players
CREATE TABLE IF NOT EXISTS user_favorites (
    userid INTEGER NOT NULL,
    playerid INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES userData(id) ON DELETE CASCADE,
    FOREIGN KEY (playerid) REFERENCES players(playerid) ON DELETE CASCADE
);

\i seeds.sql
