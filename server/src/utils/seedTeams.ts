import { Team } from '../models/index.js'; // Adjust path as needed
import { sequelize } from '../config/connection.js'; // Ensure database connection

const teams = [
    { city: 'Anaheim', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/ANA_light.svg', tricode: 'ANA', teamName: 'Anaheim Ducks', className: 'Anaheim' },
    { city: 'Arizona', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/ARI_light.svg', tricode: 'ARI', teamName: 'Arizona Coyotes', className: 'Arizona' },
    { city: 'Boston', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/BOS_light.svg', tricode: 'BOS', teamName: 'Boston Bruins', className: 'Boston' },
    { city: 'Buffalo', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/BUF_light.svg', tricode: 'BUF', teamName: 'Buffalo Sabres', className: 'Buffalo' },
    { city: 'Calgary', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CGY_light.svg', tricode: 'CGY', teamName: 'Calgary Flames', className: 'Calgary' },
    { city: 'Carolina', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg', tricode: 'CAR', teamName: 'Carolina Hurricanes', className: 'Carolina' },
    { city: 'Chicago', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CHI_light.svg', tricode: 'CHI', teamName: 'Chicago Blackhawks', className: 'Chicago' },
    { city: 'Colorado', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg', tricode: 'COL', teamName: 'Colorado Avalanche', className: 'Colorado' },
    { city: 'Columbus', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg', tricode: 'CBJ', teamName: 'Columbus Blue Jackets', className: 'Columbus' },
    { city: 'Dallas', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg', tricode: 'DAL', teamName: 'Dallas Stars', className: 'Dallas' },
    { city: 'Detroit', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/DET_light.svg', tricode: 'DET', teamName: 'Detroit Red Wings', className: 'Detroit' },
    { city: 'Edmonton', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg', tricode: 'EDM', teamName: 'Edmonton Oilers', className: 'Edmonton' },
    { city: 'Florida', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg', tricode: 'FLA', teamName: 'Florida Panthers', className: 'Florida' },
    { city: 'Los Angeles', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg', tricode: 'LAK', teamName: 'Los Angeles Kings', className: 'LosAngeles' },
    { city: 'Minnesota', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg', tricode: 'MIN', teamName: 'Minnesota Wild', className: 'Minnesota' },
    { city: 'Montreal', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg', tricode: 'MTL', teamName: 'Montreal Canadiens', className: 'Montreal' },
    { city: 'Nashville', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NSH_light.svg', tricode: 'NSH', teamName: 'Nashville Predators', className: 'Nashville' },
    { city: 'New Jersey', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg', tricode: 'NJD', teamName: 'New Jersey Devils', className: 'NewJersey' },
    { city: 'New York', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NYI_light.svg', tricode: 'NYI', teamName: 'New York Islanders', className: 'NewYorkI' },
    { city: 'New York', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NYR_light.svg', tricode: 'NYR', teamName: 'New York Rangers', className: 'NewYorkR' },
    { city: 'Ottawa', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg', tricode: 'OTT', teamName: 'Ottawa Senators', className: 'Ottawa' },
    { city: 'Philadelphia', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/PHI_light.svg', tricode: 'PHI', teamName: 'Philadelphia Flyers', className: 'Philadelphia' },
    { city: 'Pittsburgh', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/PIT_light.svg', tricode: 'PIT', teamName: 'Pittsburgh Penguins', className: 'Pittsburgh' },
    { city: 'San Jose', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/SJS_light.svg', tricode: 'SJS', teamName: 'San Jose Sharks', className: 'SanJose' },
    { city: 'Seattle', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/SEA_light.svg', tricode: 'SEA', teamName: 'Seattle Kraken', className: 'Seattle' },
    { city: 'St. Louis', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg', tricode: 'STL', teamName: 'St. Louis Blues', className: 'StLouis' },
    { city: 'Tampa Bay', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg', tricode: 'TBL', teamName: 'Tampa Bay Lightning', className: 'TampaBay' },
    { city: 'Toronto', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg', tricode: 'TOR', teamName: 'Toronto Maple Leafs', className: 'Toronto' },
    { city: 'Utah', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/UTA_light.svg', tricode: 'UTA', teamName: 'Utah Hockey Club', className: 'Utah' },
    { city: 'Vancouver', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/VAN_light.svg', tricode: 'VAN', teamName: 'Vancouver Canucks', className: 'Vancouver' },
    { city: 'Vegas', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg', tricode: 'VGK', teamName: 'Vegas Golden Knights', className: 'Vegas' },
    { city: 'Winnipeg', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg', tricode: 'WPG', teamName: 'Winnipeg Jets', className: 'Winnipeg' },
];

export const seedTeams = async (teams: any) => {
    try {
        await sequelize.sync(); // Ensure the table exists
        console.log('✅ Database synced');

        // Insert teams into the database
        await Team.bulkCreate(teams, {
            ignoreDuplicates: true, // Prevent inserting duplicates
            updateOnDuplicate: ['city', 'teamName', 'teamLogo', 'className']
        });

        console.log('✅ Teams seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding teams:', error);
    } finally {
        await sequelize.close(); // Close database connection
    }
};

// Run the script when executed
seedTeams(teams);

export default seedTeams;
