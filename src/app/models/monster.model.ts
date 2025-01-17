import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster {

      id: number = -1;
      name: string = "My Monster";
      image: string ="/img/monster1.png";
      type: MonsterType = MonsterType.ELECTRIC;
      hp: number = 40;
      figureCaption: string = "N°001 Monster";
      attackName: string = "Geo Impact";
      attackStrength: number = 60;
      attackDescription: string = "This is the description of the attack."

      copy(): Monster{
            return Object.assign( new Monster(), this)
      }

      static fromJson( monsterJson: IMonster){
            return Object.assign( new Monster(), monsterJson)
      }

      toJson(): IMonster{
            const monsterJson: IMonster = Object.assign( {}, this)
            delete monsterJson.id
            return monsterJson
      }
}