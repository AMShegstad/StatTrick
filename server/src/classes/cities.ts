// import { Team } from '../models/index.js'; // Import Team class from teamModel.tsx

// // Create new Team objects for each NHL team using all known team data, remaining keys will have values collected from API calls

// const bostonTeam = new Team({
//     city: 'Boston',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/BOS_light.svg",
//     triCode: 'BOS',
//     teamName: 'Boston Bruins',
//     className: 'Boston',
// });

// const buffaloTeam = new Team({
//     city: 'Buffalo',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/BUF_light.svg",
//     triCode: 'BUF',
//     teamName: 'Buffalo Sabres',
//     className: 'Buffalo',
// });

// const detroitTeam = new Team({
//     city: 'Detroit',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/DET_light.svg",
//     triCode: 'DET',
//     teamName: 'Detroit Red Wings',
//     className: 'Detroit',
// });

// const floridaTeam = new Team({
//     city: 'Florida',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/FLA_light.svg",
//     triCode: 'FLA',
//     teamName: 'Florida Panthers',
//     className: 'Florida',
// });

// const montrealTeam = new Team({
//     city: 'Montreal',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/MTL_light.svg",
//     triCode: 'MTL',
//     teamName: 'Montreal Canadiens',
//     className: 'Montreal',
// });

// const ottawaTeam = new Team({
//     city: 'Ottawa',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/OTT_light.svg",
//     triCode: 'OTT',
//     teamName: 'Ottowa Senators',
//     className: 'Ottawa',
// });

// const tampaBayTeam = new Team({
//     city: 'Tampa Bay',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/TBL_light.svg",
//     triCode: 'TBL',
//     teamName: 'Tampa Bay Lightning',
//     className: 'TampaBay',
// });

// const torontoTeam = new Team({
//     city: 'Toronto',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/TOR_light.svg",
//     triCode: 'TOR',
//     teamName: 'Toronto Maple Leafs',
//     className: 'Toronto',
// });

// const carolinaTeam = new Team({
//     city: 'Carolina',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/CAR_light.svg",
//     triCode: 'CAR',
//     teamName: 'Carolina Hurricanes',
//     className: 'Carolina',
// });

// const columbusTeam = new Team({
//     city: 'Columbus',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg",
//     triCode: 'CBJ',
//     teamName: 'Columbus Blue Jackets',
//     className: 'Columbus',
// });

// const newJerseyTeam = new Team({
//     city: 'New Jersey',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/NJD_light.svg",
//     triCode: 'NJD',
//     teamName: 'New Jersey Devils',
//     className: 'NewJersey',
// });

// const nyIslandersTeam = new Team({
//     city: 'NY Islanders',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/NYI_light.svg",
//     triCode: 'NYI',
//     teamName: 'New York Islanders',
//     className: 'NewYorkI',
// });

// const nyRangersTeam = new Team({
//     city: 'NY Rangers',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/NYR_light.svg",
//     triCode: 'NYR',
//     teamName: 'New York Rangers',
//     className: 'NewYorkR',
// });

// const philadelphiaTeam = new Team({
//     city: 'Philadelphia',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/PHI_light.svg",
//     triCode: 'PHI',
//     teamName: 'Philadelphia Flyers',
//     className: 'Philadelphia',
// });

// const pittsburghTeam = new Team({
//     city: 'Pittsburgh',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/PIT_light.svg",
//     triCode: 'PIT',
//     teamName: 'Pittsburg Penguins',
//     className: 'Pittsburgh',
// });

// const washingtonTeam = new Team({
//     city: 'Washington',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/WSH_secondary_light.svg",
//     triCode: 'WSH',
//     teamName: 'Washington Capitals',
//     className: 'Washington',
// });

// const chicagoTeam = new Team({
//     city: 'Chicago',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/CHI_light.svg",
//     triCode: 'CHI',
//     teamName: 'Chicago Blackhawks',
//     className: 'Chicago',
// });

// const coloradoTeam = new Team({
//     city: 'Colorado',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/COL_light.svg",
//     triCode: 'COL',
//     teamName: 'Colorado Avalanche',
//     className: 'Colorado',
// });

// const dallasTeam = new Team({
//     city: 'Dallas',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/DAL_light.svg",
//     triCode: 'DAL',
//     teamName: 'Dallas Stars',
//     className: 'Dallas',
// });

// const minnesotaTeam = new Team({
//     city: 'Minnesota',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/MIN_light.svg",
//     triCode: 'MIN',
//     teamName: 'Minnesota Wild',
//     className: 'Minnesota',
// });

// const nashvilleTeam = new Team({
//     city: 'Nashville',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/NSH_light.svg",
//     triCode: 'NSH',
//     teamName: 'Nashville Predators',
//     className: 'Nashville',
// });

// const stLouisTeam = new Team({
//     city: 'St. Louis',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/STL_light.svg",
//     triCode: 'STL',
//     teamName: 'St. Louis Blues',
//     className: 'StLouis',
// });

// const utahTeam = new Team({
//     city: 'Utah',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/UTA_light.svg",
//     triCode: 'UTA',
//     teamName: 'Utah Hockey Club',
//     className: 'Utah',
// });

// const winnipegTeam = new Team({
//     city: 'Winnipeg',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/WPG_light.svg",
//     triCode: 'WPG',
//     teamName: 'Winnipeg Jets',
//     className: 'Winnipeg',
// });

// const anaheimTeam = new Team({
//     city: 'Anaheim',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/ANA_light.svg",
//     triCode: 'ANA',
//     teamName: 'Anaheim Ducks',
//     className: 'Anaheim',
// });

// const calgaryTeam = new Team({
//     city: 'Calgary',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/CGY_light.svg",
//     triCode: 'CGY',
//     teamName: 'Calgary Flames',
//     className: 'Calgary',
// });

// const edmontonTeam = new Team({
//     city: 'Edmonton',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/EDM_light.svg",
//     triCode: 'EDM',
//     teamName: 'Edmonton Oilers',
//     className: 'Edmonton',
// });

// const losAngelesTeam = new Team({
//     city: 'Los Angeles',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/LAK_light.svg",
//     triCode: 'LAK',
//     teamName: 'Los Angeles Kings',
//     className: 'LosAngeles',
// });

// const sanJoseTeam = new Team({
//     city: 'San Jose',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/SJS_light.svg",
//     triCode: 'SJS',
//     teamName: 'San Jose Sharks',
//     className: 'SanJose',
// });

// const seattleTeam = new Team({
//     city: 'Seattle',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/SEA_light.svg",
//     triCode: 'SEA',
//     teamName: 'Seattle Kraken',
//     className: 'Seattle',
// });

// const vancouverTeam = new Team({
//     city: 'Vancouver',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
//     triCode: 'VAN',
//     teamName: 'Vancouver Canucks',
//     className: 'Vancouver',
// });

// const vegasTeam = new Team({
//     city: 'Vegas',
//     teamLogo: "https://assets.nhle.com/logos/nhl/svg/VGK_light.svg",
//     triCode: 'VGK',
//     teamName: 'Vegas Golden Knights',
//     className: 'Vegas',
// });

// export const teams = { // Create object to store all teams and export for use in other files
//     bostonTeam,
//     buffaloTeam,
//     detroitTeam,
//     floridaTeam,
//     montrealTeam,
//     ottawaTeam,
//     tampaBayTeam,
//     torontoTeam,
//     carolinaTeam,
//     columbusTeam,
//     newJerseyTeam,
//     nyIslandersTeam,
//     nyRangersTeam,
//     philadelphiaTeam,
//     pittsburghTeam,
//     washingtonTeam,
//     chicagoTeam,
//     coloradoTeam,
//     dallasTeam,
//     minnesotaTeam,
//     nashvilleTeam,
//     stLouisTeam,
//     utahTeam,
//     winnipegTeam,
//     anaheimTeam,
//     calgaryTeam,
//     edmontonTeam,
//     losAngelesTeam,
//     sanJoseTeam,
//     seattleTeam,
//     vancouverTeam,
//     vegasTeam,
// };
