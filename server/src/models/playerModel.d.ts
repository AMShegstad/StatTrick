// playerModel.d.ts

export interface Player {
    id: string;
    name: string;
    age: number;
    team: string;
    position: string;
    goals: number;
    assists: number;
    matchesPlayed: number;
}

export function getPlayerById(id: string): Promise<Player | null>;
export function getAllPlayers(): Promise<Player[]>;
export function addPlayer(player: Player): Promise<void>;
export function updatePlayer(id: string, player: Partial<Player>): Promise<void>;
export function deletePlayer(id: string): Promise<void>;