import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMonster } from '../../interfaces/monster.interface';

@Injectable({
  providedIn: 'root'
})


export class MonsterService {

  monsters: Monster[] = []

  currentIndex: number = 0;

  constructor() {
    this.load()
  }

  private save(){
    localStorage.setItem('monsters', JSON.stringify(this.monsters))
  }

  private load(){
    const monsterData = localStorage.getItem('monsters')
    if( monsterData){
      this.monsters = JSON.parse( monsterData).map( (monsterJSON:any) => Object.assign( new Monster(), monsterJSON))
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id))
    }else{
      this.init()
      this.save()
    }

  }

  private init(){
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "Pik";
    monster1.image = "/img/monster1.png"
    monster1.type = MonsterType.ELECTRIC
    monster1.hp = 20;
    monster1.figureCaption = "N°001 Pik"
    this.monsters.push(monster1)

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = "Psyduch";
    monster2.image = "/img/psyduck.png"
    monster2.type = MonsterType.WATER
    monster2.hp = 60;
    monster2.figureCaption = "N°002 Psyduck"
    this.monsters.push(monster2)

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = "Bulbasaur";
    monster3.image = "/img/bulbasaur.png"
    monster3.type = MonsterType.PLANT
    monster3.hp = 20;
    monster3.figureCaption = "N°Growlithe003 Bulb"
    this.monsters.push(monster3)

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
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
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster{
    const monsterCopy = monster.copy()

    const monsterIndex = this.monsters.findIndex( originalMonster => originalMonster.id === monster.id )

    if(monsterIndex != -1){
      this.monsters[monsterIndex] = monsterCopy.copy()
      this.save()
    }

    return monsterCopy;
  }

  delete(id: number){
    const monsterIndex = this.monsters.findIndex( originalMonster => originalMonster.id === id )

    if(monsterIndex != -1){
      this.monsters.splice(monsterIndex, 1)
      this.save()
    }

  }
  
}



export class MonsterServiceApi {

  private BASE_URL = "http://localhost:3000/pokemons/monsters"
  private http = inject(HttpClient)

  getAll(): Observable<Monster[]> {
    return this.http
    .get<IMonster[]>(this.BASE_URL)
    .pipe(
      map( monstersJson => { 
        return monstersJson.map<Monster>( monster => Monster.fromJson(monster))
      })
    )
  }

  get(id: number):Observable<Monster>{
    return this.http
    .get<IMonster>(this.BASE_URL + id)
    .pipe(
      map( (results) => {
        return Monster.fromJson(results)
      }) 
    )
  }

  add(monster: Monster):Observable<Monster>{
    return this.http
    .post<IMonster>(this.BASE_URL, monster.toJson())
    .pipe(
      map( result => {
        return Monster.fromJson(result)
      })
    )
  }

  update(monster: Monster): Observable<Monster>{
    return this.http
    .put<IMonster>(this.BASE_URL + monster.id, monster.toJson())
    .pipe(
      map ( result => {
        return Monster.fromJson(result)
      })
    )
  }

  delete(id: number): Observable<void>{
    return this.http
    .delete<void>(this.BASE_URL + id)
  }


}