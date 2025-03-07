interface Outcome {
  price: number;
}

interface Market {
  outcomes: Outcome[];
}

interface Bookmaker {
  markets: Market[];
}

interface Game {
  home_team: string;
  away_team: string;
  commence_time: string;
  bookmakers: Bookmaker[];
}

export class Odds {
  home_team: string;
  away_team: string;
  commence_time: string;
  home_odds: number;
  away_odds: number;

  constructor(
    home_team: string,
    away_team: string,
    commence_time: Date,
    home_odds: number,
    away_odds: number
  ) {
    this.home_team = home_team;
    this.away_team = away_team;
    this.commence_time = commence_time.toLocaleString();
    this.home_odds = home_odds;
    this.away_odds = away_odds;
  }
}

export default class OddsService {

  static async getOdds(): Promise<Array<Odds>> {
    const oddsURL = `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${process.env.API_KEY}&regions=us&markets=h2h&oddsFormat=american`;
    //retrives odds for the next 8 games from the chosen sport, in our case, the National Hockey League.
    
    try {
      const response = await fetch(oddsURL, {
        headers: {
          "User-Agent": "VSCode/1.63.0",
          "Accept": "application/json",},
        });

        // Handle potential errors.
        if (!response.ok) {
          throw new Error(
            `Error fetching odds: ${response.status} - ${response.statusText}`
          );
        }
  
        // Parse the JSON response.
        const oddsData: Game[] = await response.json() as Game[];
  
        // Create an object to store the odds. No need to store the entire response, only the data we need to present...
        const formattedOdds = oddsData.map((game) => {
  
          return new Odds(
              game.home_team, 
              game.away_team, 
              new Date(game.commence_time), 
              game.bookmakers[0].markets[0].outcomes[0].price, 
              game.bookmakers[0].markets[0].outcomes[1].price
          );  
        });
  
        return formattedOdds;
      } catch (error) {
        console.error("Failed to retrieve odds data: ", error);
        return [];
      }
    }
  }
  