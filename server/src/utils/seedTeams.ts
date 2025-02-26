import { Team } from '../models/teamModel.js'; // Import Team model
import { sequelize } from '../config/connection.js'; // Ensure database connection

const teams = [
    { city: 'Anaheim', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/ANA_light.svg', triCode: 'ANA', teamName: 'Anaheim Ducks', className: 'Anaheim' },
    { city: 'Arizona', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/ARI_light.svg', triCode: 'ARI', teamName: 'Arizona Coyotes', className: 'Arizona' },
    { city: 'Boston', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/BOS_light.svg', triCode: 'BOS', teamName: 'Boston Bruins', className: 'Boston' },
    { city: 'Buffalo', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/BUF_light.svg', triCode: 'BUF', teamName: 'Buffalo Sabres', className: 'Buffalo' },
    { city: 'Calgary', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CGY_light.svg', triCode: 'CGY', teamName: 'Calgary Flames', className: 'Calgary' },
    { city: 'Carolina', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg', triCode: 'CAR', teamName: 'Carolina Hurricanes', className: 'Carolina' },
    { city: 'Chicago', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CHI_light.svg', triCode: 'CHI', teamName: 'Chicago Blackhawks', className: 'Chicago' },
    { city: 'Colorado', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg', triCode: 'COL', teamName: 'Colorado Avalanche', className: 'Colorado' },
    { city: 'Columbus', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg', triCode: 'CBJ', teamName: 'Columbus Blue Jackets', className: 'Columbus' },
    { city: 'Dallas', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg', triCode: 'DAL', teamName: 'Dallas Stars', className: 'Dallas' },
    { city: 'Detroit', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/DET_light.svg', triCode: 'DET', teamName: 'Detroit Red Wings', className: 'Detroit' },
    { city: 'Edmonton', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg', triCode: 'EDM', teamName: 'Edmonton Oilers', className: 'Edmonton' },
    { city: 'Florida', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg', triCode: 'FLA', teamName: 'Florida Panthers', className: 'Florida' },
    { city: 'Los Angeles', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg', triCode: 'LAK', teamName: 'Los Angeles Kings', className: 'LosAngeles' },
    { city: 'Minnesota', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg', triCode: 'MIN', teamName: 'Minnesota Wild', className: 'Minnesota' },
    { city: 'Montreal', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg', triCode: 'MTL', teamName: 'Montreal Canadiens', className: 'Montreal' },
    { city: 'Nashville', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NSH_light.svg', triCode: 'NSH', teamName: 'Nashville Predators', className: 'Nashville' },
    { city: 'New Jersey', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg', triCode: 'NJD', teamName: 'New Jersey Devils', className: 'NewJersey' },
    { city: 'New York', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NYI_light.svg', triCode: 'NYI', teamName: 'New York Islanders', className: 'NewYorkI' },
    { city: 'New York', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/NYR_light.svg', triCode: 'NYR', teamName: 'New York Rangers', className: 'NewYorkR' },
    { city: 'Ottawa', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg', triCode: 'OTT', teamName: 'Ottawa Senators', className: 'Ottawa' },
    { city: 'Philadelphia', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/PHI_light.svg', triCode: 'PHI', teamName: 'Philadelphia Flyers', className: 'Philadelphia' },
    { city: 'Pittsburgh', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/PIT_light.svg', triCode: 'PIT', teamName: 'Pittsburgh Penguins', className: 'Pittsburgh' },
    { city: 'San Jose', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/SJS_light.svg', triCode: 'SJS', teamName: 'San Jose Sharks', className: 'SanJose' },
    { city: 'Seattle', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/SEA_light.svg', triCode: 'SEA', teamName: 'Seattle Kraken', className: 'Seattle' },
    { city: 'St. Louis', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg', triCode: 'STL', teamName: 'St. Louis Blues', className: 'StLouis' },
    { city: 'Tampa Bay', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg', triCode: 'TBL', teamName: 'Tampa Bay Lightning', className: 'TampaBay' },
    { city: 'Toronto', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg', triCode: 'TOR', teamName: 'Toronto Maple Leafs', className: 'Toronto' },
    { city: 'Utah', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/UTA_light.svg', triCode: 'UTA', teamName: 'Utah Hockey Club', className: 'Utah' },
    { city: 'Vancouver', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/VAN_light.svg', triCode: 'VAN', teamName: 'Vancouver Canucks', className: 'Vancouver' },
    { city: 'Vegas', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg', triCode: 'VGK', teamName: 'Vegas Golden Knights', className: 'Vegas' },
    { city: 'Winnipeg', teamLogo: 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg', triCode: 'WPG', teamName: 'Winnipeg Jets', className: 'Winnipeg' },
];

export const seedTeams = async () => {
    try {
        await sequelize.sync(); // Ensure the table exists
        console.log('✅ Database synced');

        // Insert teams into the database
        await Team.bulkCreate(teams, {
            ignoreDuplicates: true, // Prevent inserting duplicates
        });

        console.log('✅ Teams seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding teams:', error);
    } finally {
        await sequelize.close(); // Close database connection
    }
};

// Run the script when executed
seedTeams();
