export enum MonsterType {
    PLANT = "plant",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water"
}

export interface IMonsterProperties {
    imageUrl: string;
    color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
    [MonsterType.PLANT]: {
        imageUrl: '/img/plant.png',
        color: 'rgb(152, 229, 129)'
    },
    [MonsterType.ELECTRIC]: {
        imageUrl: '/img/electric.png',
        color: 'rgb(252, 255, 62)'
    },
    [MonsterType.FIRE]: {
        imageUrl: '/img/fire.png',
        color: 'rgb(247, 154, 73)'
    },
    [MonsterType.WATER]: {
        imageUrl: '/img/water.png',
        color: 'rgb(132, 202, 248)'
    }
}