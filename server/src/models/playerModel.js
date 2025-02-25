import { DataTypes, Model } from 'sequelize';
// Define the Player class using the PlayerInfo interface
export class Player extends Model {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headshot", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firstName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "teamAbbreviation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "positionCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sweaterNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "points", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "goals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "assists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plusMinus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "saves", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "goalsAllowed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "savePercentage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "goalsAgainstAverage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
// Define the PlayerFactory function that initializes the Player model
export function PlayerFactory(sequelize) {
    Player.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        headshot: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        teamAbbreviation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        positionCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sweaterNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        goals: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        assists: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        plusMinus: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true, // Allows null values for non-skater players
        },
        saves: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allows null values for non-goalie players
        },
        goalsAllowed: {
            type: DataTypes.INTEGER,
            allowNull: true, // Allows null values for non-goalie players
        },
        savePercentage: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: true, // Allows null values for non-goalie players
        },
        goalsAgainstAverage: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: true, // Allows null values for non-goalie players
        },
    }, {
        sequelize,
        modelName: 'Player',
        timestamps: false,
        underscored: false,
    });
    return Player;
}
