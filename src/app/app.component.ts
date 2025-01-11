import { Component, computed, effect, model, signal } from '@angular/core';
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { Monster } from './models/monster.model';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  // selectedMonsterIndex = signal(0)
  // selectedMonster = computed( ()=> {
  //   return this.monsters[this.selectedMonsterIndex()]
  // })

  monsters!: Monster[];

  search = model('')

  filterMonsters = computed( ()=> {
    return this.monsters.filter( monster => monster.name.toLocaleLowerCase().includes(this.search()))
  })

  constructor(){

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
  

  // toggleMonster(){
  //   this.selectedMonsterIndex.set(  (this.selectedMonsterIndex() + 1) % this.monsters.length )
  // }
}
