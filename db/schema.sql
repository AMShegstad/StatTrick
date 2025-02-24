CREATE DATABASE IF NOT EXISTS stattrick_db;

\c stattrick_db;

CREATE TABLE userData (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    favoriteTeam VARCHAR(255) NOT NULL
);

CREATE TABLE players (
    id INT PRIMARY KEY, -- Player ID (Unique identifier)
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    teamAbbreviation VARCHAR(3) NOT NULL, -- Shortened team code, e.g., 'MIN' for Minnesota
    positionCode VARCHAR(10) NOT NULL, -- Code like 'G' for Goalie, 'D' for Defender, etc.
    headshot VARCHAR(255), -- URL for the player's headshot
    sweaterNumber INT, -- The player's jersey number
    points INT DEFAULT 0, -- Points for skaters, total goals + assists
    goals INT DEFAULT 0, -- Total goals for skaters
    assists INT DEFAULT 0, -- Total assists for skaters
    plusMinus INT DEFAULT 0, -- Plus/Minus stat for skaters
    saves INT DEFAULT 0, -- Total saves for goalies
    goalsAllowed INT DEFAULT 0, -- Total goals allowed for goalies
    savePercentage DECIMAL(5, 4) DEFAULT 0, -- Save percentage for goalies (saves / (saves + goals allowed))
    goalsAgainstAverage DECIMAL(5, 4) DEFAULT 0, -- Goals against average for goalies
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Track when data is inserted
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Track when data is updated
);