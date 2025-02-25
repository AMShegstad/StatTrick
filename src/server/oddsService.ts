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
    const oddsURL = `https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds?regions=us&oddsFormat=american&dateFormat=iso`;
    //retrives odds for the next 8 games from the chosen sport, in our case, the National Hockey League.
    
    try {
      const response = await fetch(oddsURL, {
        headers: {
          "User-Agent": "VSCode/1.63.0",
          "Accept": "application/json",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
            //"x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
            "x-rapidapi-host": process.env.RAPIDAPI_HOST as string,
            "Host": process.env.HOST as string,
          },
        });
        
        /*
        try {
          const response = await fetch(oddsURL, {
              headers: {
                  "User-Agent": "VSCode/1.63.0",
                  "Accept": "application/json",
                  "x-rapidapi-key": "d818cb5b36mshc66975bd6b0c2c9p1a5e37jsn2e209b594a82", // Replace with your actual API key
                  "x-rapidapi-host": "odds.p.rapidapi.com",
                  "Host": "odds.p.rapidapi.com",
              },
          });
        */

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
  