import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from  '../hero.service';


@Component({ // @Component 是一个装饰器函数，它指定组件的Angular 元数据， 下面是三个元数据属性
  selector: 'app-heroes', // 组件的css元素选择器 ，是相匹配的标识父组件模板内此组件的html元素的名称 
  templateUrl: './heroes.component.html',// 组件模板文件的位置
  styleUrls: ['./heroes.component.css']// 组件的私有css样式的位置
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES; // 英雄列表
  heroes:Hero[];
  // selectedHero:Hero;

  // onSelect(hero:Hero):void{
  //   this.selectedHero=hero;
  // }
  constructor(private heroService:HeroService) { 
      // 向构造函数 添加heroService 类型的私有参数  HeroService 
  }
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  add(name: string) :void{
    name=name.trim();
    if(!name){return}
    this.heroService.addHero({name} as Hero).subscribe(hero=>{this.heroes.push(hero)})
  }

  delete(hero: Hero):void{
    this.heroes=this.heroes.filter(h=>h!==hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  ngOnInit() { //  是一个生命周期的钩子   ， 初始化逻辑
    this.getHeroes();    // 调用HeroService 方法， 而不是构造函数
  }

}
