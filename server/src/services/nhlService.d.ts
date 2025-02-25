declare module 'nhlService' {
    export interface PlayerStats {
        goals: number;
        assists: number;
        points: number;
        penaltyMinutes: number;
    }

    export interface TeamStats {
        wins: number;
        losses: number;
        overtimeLosses: number;
        points: number;
    }

    export function getPlayerStats(playerId: number): Promise<PlayerStats>;
    export function getTeamStats(teamId: number): Promise<TeamStats>;
}