import { Team } from '../models/teamModel'; // Import Team class from teamModel.tsx
// Create new Team objects for each NHL team using all known team data, remaining keys will have values collected from API calls
const bostonTeam = new Team({
    city: 'Boston',
    logo: "./public/NHL Logos/Boston.png",
    triCode: 'BOS',
    teamName: 'Boston Bruins',
    className: 'Boston',
});
const buffaloTeam = new Team({
    city: 'Buffalo',
    logo: "./public/NHL Logos/Buffalo.png",
    triCode: 'BUF',
    teamName: 'Buffalo Sabres',
    className: 'Buffalo',
});
const detroitTeam = new Team({
    city: 'Detroit',
    logo: "./public/NHL Logos/Detroit.png",
    triCode: 'DET',
    teamName: 'Detroit Red Wings',
    className: 'Detroit',
});
const floridaTeam = new Team({
    city: 'Florida',
    logo: "./public/NHL Logos/Florida.png",
    triCode: 'FLA',
    teamName: 'Florida Panthers',
    className: 'Florida',
});
const montrealTeam = new Team({
    city: 'Montreal',
    logo: "./public/NHL Logos/Montreal.png",
    triCode: 'MTL',
    teamName: 'Montreal Canadiens',
    className: 'Montreal',
});
const ottawaTeam = new Team({
    city: 'Ottawa',
    logo: "./public/NHL Logos/Ottawa.png",
    triCode: 'OTT',
    teamName: 'Ottowa Senators',
    className: 'Ottawa',
});
const tampaBayTeam = new Team({
    city: 'Tampa Bay',
    logo: "./public/NHL Logos/TampaBay.png",
    triCode: 'TBL',
    teamName: 'Tampa Bay Lightning',
    className: 'TampaBay',
});
const torontoTeam = new Team({
    city: 'Toronto',
    logo: "./public/NHL Logos/Toronto.png",
    triCode: 'TOR',
    teamName: 'Toronto Maple Leafs',
    className: 'Toronto',
});
const carolinaTeam = new Team({
    city: 'Carolina',
    logo: "./public/NHL Logos/Carolina.png",
    triCode: 'CAR',
    teamName: 'Carolina Hurricanes',
    className: 'Carolina',
});
const columbusTeam = new Team({
    city: 'Columbus',
    logo: "./public/NHL Logos/Columbus.png",
    triCode: 'CBJ',
    teamName: 'Columbus Blue Jackets',
    className: 'Columbus',
});
const newJerseyTeam = new Team({
    city: 'New Jersey',
    logo: "./public/NHL Logos/NewJersey.png",
    triCode: 'NJD',
    teamName: 'New Jersey Devils',
    className: 'NewJersey',
});
const nyIslandersTeam = new Team({
    city: 'NY Islanders',
    logo: "./public/NHL Logos/NYIslanders.png",
    triCode: 'NYI',
    teamName: 'New York Islanders',
    className: 'NewYorkI',
});
const nyRangersTeam = new Team({
    city: 'NY Rangers',
    logo: "./public/NHL Logos/NYRangers.png",
    triCode: 'NYR',
    teamName: 'New York Rangers',
    className: 'NewYorkR',
});
const philadelphiaTeam = new Team({
    city: 'Philadelphia',
    logo: "./public/NHL Logos/Philadelphia.png",
    triCode: 'PHI',
    teamName: 'Philadelphia Flyers',
    className: 'Philadelphia',
});
const pittsburghTeam = new Team({
    city: 'Pittsburgh',
    logo: "./public/NHL Logos/Pittsburgh.png",
    triCode: 'PIT',
    teamName: 'Pittsburg Penguins',
    className: 'Pittsburgh',
});
const washingtonTeam = new Team({
    city: 'Washington',
    logo: "./public/NHL Logos/Washington.png",
    triCode: 'WSH',
    teamName: 'Washington Capitals',
    className: 'Washington',
});
const chicagoTeam = new Team({
    city: 'Chicago',
    logo: "./public/NHL Logos/Chicago.png",
    triCode: 'CHI',
    teamName: 'Chicago Blackhawks',
    className: 'Chicago',
});
const coloradoTeam = new Team({
    city: 'Colorado',
    logo: "./public/NHL Logos/Colorado.png",
    triCode: 'COL',
    teamName: 'Colorado Avalanche',
    className: 'Colorado',
});
const dallasTeam = new Team({
    city: 'Dallas',
    logo: "./public/NHL Logos/Dallas.png",
    triCode: 'DAL',
    teamName: 'Dallas Stars',
    className: 'Dallas',
});
const minnesotaTeam = new Team({
    city: 'Minnesota',
    logo: "./public/NHL Logos/Minnesota.png",
    triCode: 'MIN',
    teamName: 'Minnesota Wild',
    className: 'Minnesota',
});
const nashvilleTeam = new Team({
    city: 'Nashville',
    logo: "./public/NHL Logos/Nashville.png",
    triCode: 'NSH',
    teamName: 'Nashville Predators',
    className: 'Nashville',
});
const stLouisTeam = new Team({
    city: 'St. Louis',
    logo: "./public/NHL Logos/StLouis.png",
    triCode: 'STL',
    teamName: 'St. Louis Blues',
    className: 'StLouis',
});
const utahTeam = new Team({
    city: 'Utah',
    logo: "./public/NHL Logos/Utah.svg",
    triCode: 'UTA',
    teamName: 'Utah Hockey Club',
    className: 'Utah',
});
const winnipegTeam = new Team({
    city: 'Winnipeg',
    logo: "./public/NHL Logos/Winnipeg2.png",
    triCode: 'WPG',
    teamName: 'Winnipeg Jets',
    className: 'Winnipeg',
});
const anaheimTeam = new Team({
    city: 'Anaheim',
    logo: "./public/NHL Logos/Anaheim.png",
    triCode: 'ANA',
    teamName: 'Anaheim Ducks',
    className: 'Anaheim',
});
const calgaryTeam = new Team({
    city: 'Calgary',
    logo: "./public/NHL Logos/Calgary.png",
    triCode: 'CGY',
    teamName: 'Calgary Flames',
    className: 'Calgary',
});
const edmontonTeam = new Team({
    city: 'Edmonton',
    logo: "./public/NHL Logos/Edmonton.png",
    triCode: 'EDM',
    teamName: 'Edmonton Oilers',
    className: 'Edmonton',
});
const losAngelesTeam = new Team({
    city: 'Los Angeles',
    logo: "./public/NHL Logos/LosAngeles.png",
    triCode: 'LAK',
    teamName: 'Los Angeles Kings',
    className: 'LosAngeles',
});
const sanJoseTeam = new Team({
    city: 'San Jose',
    logo: "./public/NHL Logos/SanJose.png",
    triCode: 'SJS',
    teamName: 'San Jose Sharks',
    className: 'SanJose',
});
const seattleTeam = new Team({
    city: 'Seattle',
    logo: "./public/NHL Logos/Seattle.png",
    triCode: 'SEA',
    teamName: 'Seattle Kraken',
    className: 'Seattle',
});
const vancouverTeam = new Team({
    city: 'Vancouver',
    logo: "./public/NHL Logos/Vancouver.png",
    triCode: 'VAN',
    teamName: 'Vancouver Canucks',
    className: 'Vancouver',
});
const vegasTeam = new Team({
    city: 'Vegas',
    logo: "./public/NHL Logos/Vegas.png",
    triCode: 'VGK',
    teamName: 'Vegas Golden Knights',
    className: 'Vegas',
});
export const teams = {
    bostonTeam,
    buffaloTeam,
    detroitTeam,
    floridaTeam,
    montrealTeam,
    ottawaTeam,
    tampaBayTeam,
    torontoTeam,
    carolinaTeam,
    columbusTeam,
    newJerseyTeam,
    nyIslandersTeam,
    nyRangersTeam,
    philadelphiaTeam,
    pittsburghTeam,
    washingtonTeam,
    chicagoTeam,
    coloradoTeam,
    dallasTeam,
    minnesotaTeam,
    nashvilleTeam,
    stLouisTeam,
    utahTeam,
    winnipegTeam,
    anaheimTeam,
    calgaryTeam,
    edmontonTeam,
    losAngelesTeam,
    sanJoseTeam,
    seattleTeam,
    vancouverTeam,
    vegasTeam,
};
