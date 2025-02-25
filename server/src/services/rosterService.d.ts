declare module 'rosterService' {
    export interface Player {
        id: number;
        name: string;
        position: string;
        team: string;
    }

    export interface Roster {
        team: string;
        players: Player[];
    }

    export function getRoster(team: string): Promise<Roster>;
    export function addPlayer(player: Player): Promise<void>;
    export function removePlayer(playerId: number): Promise<void>;
}