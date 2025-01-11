import { MonsterType } from "../utils/monster.utils";

export class Monster {

      name: string = "My Monster";
      image: string ="/img/monster1.png";
      type: MonsterType = MonsterType.ELECTRIC;
      hp: number = 40;
      figureCaption: string = "N°001 Monster";
      attackName: string = "Geo Impact";
      attackStrength: number = 60;
      attackDescription: string = "This is the description of the attack."

}