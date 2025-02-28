-- Corrected teams data
INSERT INTO teams (tri_code, city, team_name, team_logo, class_name)
VALUES
  ('BOS', 'Boston', 'Boston Bruins', 'https://assets.nhle.com/logos/nhl/svg/BOS_light.svg', 'Boston'),
  ('BUF', 'Buffalo', 'Buffalo Sabres', 'https://assets.nhle.com/logos/nhl/svg/BUF_light.svg', 'Buffalo'),
  ('DET', 'Detroit', 'Detroit Red Wings', 'https://assets.nhle.com/logos/nhl/svg/DET_light.svg', 'Detroit'),
  ('FLA', 'Florida', 'Florida Panthers', 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg', 'Florida'),
  ('MTL', 'Montreal', 'Montreal Canadiens', 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg', 'Montreal'),
  ('OTT', 'Ottawa', 'Ottawa Senators', 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg', 'Ottawa'),
  ('TBL', 'Tampa Bay', 'Tampa Bay Lightning', 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg', 'TampaBay'),
  ('TOR', 'Toronto', 'Toronto Maple Leafs', 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg', 'Toronto'),
  ('CAR', 'Carolina', 'Carolina Hurricanes', 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg', 'Carolina'),
  ('CBJ', 'Columbus', 'Columbus Blue Jackets', 'https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg', 'Columbus'),
  ('NJD', 'New Jersey', 'New Jersey Devils', 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg', 'NewJersey'),
  ('NYI', 'NY Islanders', 'New York Islanders', 'https://assets.nhle.com/logos/nhl/svg/NYI_light.svg', 'NewYorkI'),
  ('NYR', 'NY Rangers', 'New York Rangers', 'https://assets.nhle.com/logos/nhl/svg/NYR_light.svg', 'NewYorkR'),
  ('PHI', 'Philadelphia', 'Philadelphia Flyers', 'https://assets.nhle.com/logos/nhl/svg/PHI_light.svg', 'Philadelphia'),
  ('PIT', 'Pittsburgh', 'Pittsburg Penguins', 'https://assets.nhle.com/logos/nhl/svg/PIT_light.svg', 'Pittsburgh'),
  ('WSH', 'Washington', 'Washington Capitals', 'https://assets.nhle.com/logos/nhl/svg/WSH_secondary_light.svg', 'Washington'),
  ('CHI', 'Chicago', 'Chicago Blackhawks', 'https://assets.nhle.com/logos/nhl/svg/CHI_light.svg', 'Chicago'),
  ('COL', 'Colorado', 'Colorado Avalanche', 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg', 'Colorado'),
  ('DAL', 'Dallas', 'Dallas Stars', 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg', 'Dallas'),
  ('MIN', 'Minnesota', 'Minnesota Wild', 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg', 'Minnesota'),
  ('NSH', 'Nashville', 'Nashville Predators', 'https://assets.nhle.com/logos/nhl/svg/NSH_light.svg', 'Nashville'),
  ('STL', 'St. Louis', 'St. Louis Blues', 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg', 'StLouis'),
  ('UTA', 'Utah', 'Utah Hockey Club', 'https://assets.nhle.com/logos/nhl/svg/UTA_light.svg', 'Utah'),
  ('WPG', 'Winnipeg', 'Winnipeg Jets', 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg', 'Winnipeg'),
  ('ANA', 'Anaheim', 'Anaheim Ducks', 'https://assets.nhle.com/logos/nhl/svg/ANA_light.svg', 'Anaheim'),
  ('CGY', 'Calgary', 'Calgary Flames', 'https://assets.nhle.com/logos/nhl/svg/CGY_light.svg', 'Calgary'),
  ('EDM', 'Edmonton', 'Edmonton Oilers', 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg', 'Edmonton'),
  ('LAK', 'Los Angeles', 'Los Angeles Kings', 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg', 'LosAngeles'),
  ('SJS', 'San Jose', 'San Jose Sharks', 'https://assets.nhle.com/logos/nhl/svg/SJS_light.svg', 'SanJose'),
  ('SEA', 'Seattle', 'Seattle Kraken', 'https://assets.nhle.com/logos/nhl/svg/SEA_light.svg', 'Seattle'),
  ('VAN', 'Vancouver', 'Vancouver Canucks', 'https://assets.nhle.com/logos/nhl/svg/VAN_light.svg', 'Vancouver'),
  ('VGK', 'Vegas', 'Vegas Golden Knights', 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg', 'Vegas');

-- Insert sample data into the teams table
INSERT INTO teams (tricode, city, teamname, teamlogo, classname) VALUES
('MIN', 'Minnesota', 'Wild', 'https://example.com/logos/min.png', 'wild-logo'),
('CHI', 'Chicago', 'Blackhawks', 'https://example.com/logos/chi.png', 'blackhawks-logo'),
('BOS', 'Boston', 'Bruins', 'https://example.com/logos/bos.png', 'bruins-logo');

-- Insert sample data into the players table
INSERT INTO players (playerid, firstname, lastname, teamabbreviation, positioncode, headshot, sweaternumber, points) VALUES
(1, 'Player1', 'LastName1', 'MIN', 'F', 'https://example.com/headshots/player1.png', 9, 50),
(2, 'Player2', 'LastName2', 'CHI', 'D', 'https://example.com/headshots/player2.png', 4, 30),
(3, 'Player3', 'LastName3', 'BOS', 'G', 'https://example.com/headshots/player3.png', 30, 0);

-- Insert sample data into the userData table
INSERT INTO userData (username, email, favoriteTeam) VALUES
('AlexShegstad', 'ettuShaggy@gmail.com', 'TOR');