import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

export class Hero {
  id: number;
  category: string;
  name: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes as Hero[]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const hero = { name } as Hero;

    this.heroService.addHero(hero).subscribe(() => {
      this.getHeroes();
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
