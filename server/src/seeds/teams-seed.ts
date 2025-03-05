import { Team } from '../models/teamModel.js';

export const seedTeams = async () => {
    try {
    await Team.bulkCreate([
        { team_id: 1, tri_code: 'ANA', city: 'Anaheim', team_name: 'Anaheim Ducks', team_logo: 'https://assets.nhle.com/logos/nhl/svg/ANA_light.svg', class_name: 'Anaheim' },
        { team_id: 2, tri_code: 'BOS', city: 'Boston', team_name: 'Boston Bruins', team_logo: 'https://assets.nhle.com/logos/nhl/svg/BOS_light.svg', class_name: 'Boston' },
        { team_id: 3, tri_code: 'BUF', city: 'Buffalo', team_name: 'Buffalo Sabres', team_logo: 'https://assets.nhle.com/logos/nhl/svg/BUF_light.svg', class_name: 'Buffalo' },
        { team_id: 4, tri_code: 'CGY', city: 'Calgary', team_name: 'Calgary Flames', team_logo: 'https://assets.nhle.com/logos/nhl/svg/CGY_light.svg', class_name: 'Calgary' },
        { team_id: 5, tri_code: 'CAR', city: 'Carolina', team_name: 'Carolina Hurricanes', team_logo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg', class_name: 'Carolina' },
        { team_id: 6, tri_code: 'CHI', city: 'Chicago', team_name: 'Chicago Blackhawks', team_logo: 'https://assets.nhle.com/logos/nhl/svg/CHI_light.svg', class_name: 'Chicago' },
        { team_id: 7, tri_code: 'COL', city: 'Colorado', team_name: 'Colorado Avalanche', team_logo: 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg', class_name: 'Colorado' },
        { team_id: 8, tri_code: 'CBJ', city: 'Columbus', team_name: 'Columbus Blue Jackets', team_logo: 'https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg', class_name: 'Columbus' },
        { team_id: 9, tri_code: 'DAL', city: 'Dallas', team_name: 'Dallas Stars', team_logo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg', class_name: 'Dallas' },
        { team_id: 10, tri_code: 'DET', city: 'Detroit', team_name: 'Detroit Red Wings', team_logo: 'https://assets.nhle.com/logos/nhl/svg/DET_light.svg', class_name: 'Detroit' },
        { team_id: 11, tri_code: 'EDM', city: 'Edmonton', team_name: 'Edmonton Oilers', team_logo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg', class_name: 'Edmonton' },
        { team_id: 12, tri_code: 'FLA', city: 'Florida', team_name: 'Florida Panthers', team_logo: 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg', class_name: 'Florida' },
        { team_id: 13, tri_code: 'LAK', city: 'Los Angeles', team_name: 'Los Angeles Kings', team_logo: 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg', class_name: 'LosAngeles' },
        { team_id: 14, tri_code: 'MIN', city: 'Minnesota', team_name: 'Minnesota Wild', team_logo: 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg', class_name: 'Minnesota' },
        { team_id: 15, tri_code: 'MTL', city: 'Montreal', team_name: 'Montreal Canadiens', team_logo: 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg', class_name: 'Montreal' },
        { team_id: 16, tri_code: 'NSH', city: 'Nashville', team_name: 'Nashville Predators', team_logo: 'https://assets.nhle.com/logos/nhl/svg/NSH_light.svg', class_name: 'Nashville' },
        { team_id: 17, tri_code: 'NJD', city: 'New Jersey', team_name: 'New Jersey Devils', team_logo: 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg', class_name: 'NewJersey' },
        { team_id: 18, tri_code: 'NYI', city: 'NY Islanders', team_name: 'New York Islanders', team_logo: 'https://assets.nhle.com/logos/nhl/svg/NYI_light.svg', class_name: 'NewYorkI' },
        { team_id: 19, tri_code: 'NYR', city: 'NY Rangers', team_name: 'New York Rangers', team_logo: 'https://assets.nhle.com/logos/nhl/svg/NYR_light.svg', class_name: 'NewYorkR' },
        { team_id: 20, tri_code: 'OTT', city: 'Ottawa', team_name: 'Ottawa Senators', team_logo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg', class_name: 'Ottawa' },
        { team_id: 21, tri_code: 'PHI', city: 'Philadelphia', team_name: 'Philadelphia Flyers', team_logo: 'https://assets.nhle.com/logos/nhl/svg/PHI_light.svg', class_name: 'Philadelphia' },
        { team_id: 22, tri_code: 'PIT', city: 'Pittsburgh', team_name: 'Pittsburgh Penguins', team_logo: 'https://assets.nhle.com/logos/nhl/svg/PIT_light.svg', class_name: 'Pittsburgh' },
        { team_id: 23, tri_code: 'SJS', city: 'San Jose', team_name: 'San Jose Sharks', team_logo: 'https://assets.nhle.com/logos/nhl/svg/SJS_light.svg', class_name: 'SanJose' },
        { team_id: 24, tri_code: 'SEA', city: 'Seattle', team_name: 'Seattle Kraken', team_logo: 'https://assets.nhle.com/logos/nhl/svg/SEA_light.svg', class_name: 'Seattle' },
        { team_id: 25, tri_code: 'STL', city: 'St. Louis', team_name: 'St. Louis Blues', team_logo: 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg', class_name: 'StLouis' },
        { team_id: 26, tri_code: 'TBL', city: 'Tampa Bay', team_name: 'Tampa Bay Lightning', team_logo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg', class_name: 'TampaBay' },
        { team_id: 27, tri_code: 'TOR', city: 'Toronto', team_name: 'Toronto Maple Leafs', team_logo: 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg', class_name: 'Toronto' },
        { team_id: 28, tri_code: 'UTA', city: 'Utah', team_name: 'Utah Hockey Club', team_logo: 'https://assets.nhle.com/logos/nhl/svg/UTA_light.svg', class_name: 'Utah' },
        { team_id: 29, tri_code: 'VAN', city: 'Vancouver', team_name: 'Vancouver Canucks', team_logo: 'https://assets.nhle.com/logos/nhl/svg/VAN_light.svg', class_name: 'Vancouver' },
        { team_id: 30, tri_code: 'VGK', city: 'Vegas', team_name: 'Vegas Golden Knights', team_logo: 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg', class_name: 'Vegas' },
        { team_id: 31, tri_code: 'WSH', city: 'Washington', team_name: 'Washington Capitals', team_logo: 'https://assets.nhle.com/logos/nhl/svg/WSH_secondary_light.svg', class_name: 'Washington' },
        { team_id: 32, tri_code: 'WPG', city: 'Winnipeg', team_name: 'Winnipeg Jets', team_logo: 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg', class_name: 'Winnipeg' },
    ]);
    console.log('✅ Teams have been seeded.');
} catch (error) {
        console.error('❌ Error seeding teams:', error);
}
}