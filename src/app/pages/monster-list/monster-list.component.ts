import { CommonModule } from "@angular/common"
import { Component, computed, inject, model, signal } from "@angular/core"
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component"
import { SearchBarComponent } from "../../components/search-bar/search-bar.component"
import { MonsterService } from "../../services/monster/monster.service"
import { Monster } from "../../models/monster.model"
import { Router } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent, MatButtonModule],
  templateUrl:'./monster-list.component.html',
  styleUrl: './monster-list.component.css',
})

export class MonsterListComponent {

  router = inject(Router)
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
    this.router.navigate(['monster'])
  }

  openMonster(monster: Monster){
    this.router.navigate(['monster', monster.id])
  }
}
