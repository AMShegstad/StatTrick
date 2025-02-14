import { DataTypes, Model } from 'sequelize';

interface PlayerInfo {
    id: number;
    position: string;
    name: string;
    goals: number;
    assists: number;
    points: number;
    plusMinus: number;
};



interface PlayerInfo extends class Player {
    constructor(id: number, position: string, name: string, goals: number, assists: number, points: number, plusMinus: number) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.goals = goals;
        this.assists = assists;
        this.points = points;
        this.plusMinus = plusMinus;
    }
}
