export interface Odds {
    home: number;
    draw: number;
    away: number;
}

export interface OddsService {
    getOdds(matchId: string): Promise<Odds>;
    updateOdds(matchId: string, odds: Odds): Promise<void>;
    deleteOdds(matchId: string): Promise<void>;
}