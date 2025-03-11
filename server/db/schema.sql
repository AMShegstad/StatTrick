CREATE DATABASE stattrick_db;
\c stattrick_db;
-- Create the userData table
CREATE TABLE IF NOT EXISTS user_data (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    favorite_team VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    team_id SERIAL,
    tri_code VARCHAR(3) PRIMARY KEY, -- Team abbreviation, e.g., 'MIN' for Minnesota
    city VARCHAR(255) NOT NULL, -- City where the team is located
    team_name VARCHAR(255) NOT NULL, -- Full team name, e.g., 'Minnesota Wild'
    team_logo VARCHAR(255), -- URL for the team's logo
    class_name VARCHAR(255) -- Class name for the team's logo
);

CREATE TABLE IF NOT EXISTS players (
    player_id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    team_abbreviation VARCHAR(3) NOT NULL, -- Shortened team code
    position_code VARCHAR(10) NOT NULL,
    headshot VARCHAR(255),
    sweater_number INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign Key linking to the teams table
    FOREIGN KEY (team_abbreviation) REFERENCES teams(tri_code) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS user_favorites (
    user_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, player_id),  -- Composite primary key (userID + playerID)
    FOREIGN KEY (user_id) REFERENCES user_data(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player_stats (
    player_id INTEGER NOT NULL PRIMARY KEY,
    points INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    plus_minus INT DEFAULT 0,
    save_pctg DECIMAL(5, 4) DEFAULT 0,
    goals_against_avg DECIMAL(5, 4) DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
);
