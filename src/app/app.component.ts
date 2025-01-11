import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { Monster } from './models/monster.model';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  monsterService = inject(MonsterService)

  monsters = signal<Monster[]>([])
  search = model('')

  filterMonsters = computed( ()=> {
    return this.monsters().filter( monster => monster.name.toLocaleLowerCase().includes(this.search()))
  })

  constructor(){
    this.monsters.set( this.monsterService.getAll() )
  }
  

  addMonster(){
    const genericMonster = new Monster()
    this.monsterService.add(genericMonster)
    this.monsters.set( this.monsterService.getAll() )
  }
}
