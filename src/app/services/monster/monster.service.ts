import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = []

  currentIndex: number = 1;

  constructor() { 

    this.monsters = [];

      const monster1 = new Monster();
      monster1.name = "Pik";
      monster1.image = "/img/monster1.png"
      monster1.type = MonsterType.ELECTRIC
      monster1.hp = 20;
      monster1.figureCaption = "N°001 Pik"
      this.monsters.push(monster1)
  
      const monster2 = new Monster();
      monster2.name = "Psyduch";
      monster2.image = "/img/psyduck.png"
      monster2.type = MonsterType.WATER
      monster2.hp = 60;
      monster2.figureCaption = "N°002 Psyduck"
      this.monsters.push(monster2)
  
      const monster3 = new Monster();
      monster3.name = "Bulbasaur";
      monster3.image = "/img/bulbasaur.png"
      monster3.type = MonsterType.PLANT
      monster3.hp = 20;
      monster3.figureCaption = "N°Growlithe003 Bulb"
      this.monsters.push(monster3)
  
      const monster4 = new Monster();
      monster4.name = "Growlithe";
      monster4.image = "/img/monster3.png"
      monster4.type = MonsterType.FIRE
      monster4.hp = 80;
      monster4.figureCaption = "N°004 Growlithe"
      this.monsters.push(monster4)

  }

  getAll(): Monster[]{
    return this.monsters.map( monster => monster.copy())

  }

  get(id: number): Monster | undefined{
    const monster = this.monsters.find( monster => monster.id === id)
    return monster ? monster.copy() : undefined
  }
  
  add(monster: Monster): Monster{
    const monsterCopy = monster.copy()

    monsterCopy.id = this.currentIndex 
    this.monsters.push( monsterCopy.copy())
    this.currentIndex++;

    return monsterCopy;
  }

  update(monster: Monster): Monster{
    const monsterCopy = monster.copy()

    const monsterIndex = this.monsters.findIndex( originalMonster => originalMonster.id === monster.id )

    if(monsterIndex != -1){
      this.monsters[monsterIndex] = monsterCopy.copy()
    }
    
    return monsterCopy;
  }

  delete(id: number){
    const monsterIndex = this.monsters.findIndex( originalMonster => originalMonster.id === id )

    if(monsterIndex != -1){
      this.monsters.splice(monsterIndex, 1)
    }

  }
  
}
