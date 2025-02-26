CREATE DATABASE stattrick_db;

\c stattrick_db;

-- Create the userData table
CREATE TABLE IF NOT EXISTS userData (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    favoriteTeam VARCHAR(255) NOT NULL
);

-- Create the players table
CREATE TABLE IF NOT EXISTS players (
    playerID INT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    teamAbbreviation VARCHAR(3) NOT NULL, -- Shortened team code
    positionCode VARCHAR(10) NOT NULL,
    headshot VARCHAR(255),
    sweaterNumber INT,
    points INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    plusMinus INT DEFAULT 0,
    saves INT DEFAULT 0,
    goalsAllowed INT DEFAULT 0,
    savePercentage DECIMAL(5, 4) DEFAULT 0,
    goalsAgainstAverage DECIMAL(5, 4) DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key linking to the teams table
    FOREIGN KEY (teamAbbreviation) REFERENCES teams(triCode) ON DELETE CASCADE
);

-- Create the user_favorites table to store the relationship between users and their favorite players
CREATE TABLE IF NOT EXISTS user_favorites (
    userID INTEGER NOT NULL,
    playerID INTEGER NOT NULL,
    PRIMARY KEY (userID, playerID),  -- Composite primary key (userID + playerID)
    FOREIGN KEY (userID) REFERENCES userData(id) ON DELETE CASCADE,
    FOREIGN KEY (playerID) REFERENCES players(playerID) ON DELETE CASCADE
);

-- Create the teams table
CREATE TABLE IF NOT EXISTS teams (
    triCode VARCHAR(3) PRIMARY KEY, -- Team abbreviation, e.g., 'MIN' for Minnesota
    city VARCHAR(255) NOT NULL, -- City where the team is located
    teamName VARCHAR(255) NOT NULL, -- Full team name, e.g., 'Minnesota Wild'
    teamLogo VARCHAR(255), -- URL for the team's logo
    className VARCHAR(255) -- Class name for the team's logo
);
