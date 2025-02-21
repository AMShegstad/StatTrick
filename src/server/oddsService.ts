//import path from "node:path";
//import { fileURLToPath } from "node:url";
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

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
  
  class Odds {
    home_team: string;
    away_team: string;
    commence_time: string;
    team1odds: number;
    team2odds: number;
  
    constructor(
      home_team: string,
      away_team: string,
      commence_time: string,
      team1odds: number,
      team2odds: number
    ) {
      this.home_team = home_team;
      this.away_team = away_team;
      this.commence_time = commence_time;
      this.team1odds = team1odds;
      this.team2odds = team2odds;
    }
  }
  
  export default class OddsService {
  
    static async getOdds(): Promise<Array<Odds>> {
      const oddsURL = `https://odds.p.rapidapi.com/v4/sports/icehockey_nhl/odds?regions=us&oddsFormat=american&dateFormat=iso`;
      //retrives odds for the next 8 games from the chosen sport, in our case, the National Hockey League.
      try {
        const response = await fetch(oddsURL, {
          headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY as string,
            "x-rapidapi-host": "odds.p.rapidapi.com",
          },
        });
  
        // Handle potential errors.
        if (!response.ok) {
          throw new Error(
            `Error fetching odds: ${response.status} - ${response.statusText}`
          );
        }
  
        // Parse the JSON response.
        const oddsData: Game[] = await response.json();
  
        // Create an object to store the odds. No need to store the entire response, only the data we need to present...
        const formattedOdds = oddsData.map((game) => {
  
          return new Odds(
              game.home_team, 
              game.away_team, 
              game.commence_time, 
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
  