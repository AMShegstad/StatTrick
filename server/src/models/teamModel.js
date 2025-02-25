import { DataTypes, Model } from 'sequelize';
;
export class Team extends Model {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "city", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "triCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "teamName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "className", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wins", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "losses", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "overtimeLosses", {
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
        Object.defineProperty(this, "gamesPlayed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "conferenceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "divisionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "divisionSequence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
export function TeamFactory(sequelize) {
    Team.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        triCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        className: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        overtimeLosses: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesPlayed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        conferenceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        divisionName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        divisionSequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Team',
    });
    return Team;
}
