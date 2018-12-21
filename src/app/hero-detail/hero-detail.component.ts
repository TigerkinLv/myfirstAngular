import { Component, OnInit ,Input} from '@angular/core';
import { Hero } from "../hero";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero:Hero; //hero 属性必须是Input属性，使用装饰器注释，  使用@Input 装饰器 使hero 属性可用于外部绑定HeroesComponent

  constructor( //  将下面三个服务注入构造函数，将其值保存为私有字段中
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero():void{
    const id = +this.route.snapshot.paramMap.get("id"); // "+" 把字符串转化为数字
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  // 仅后退
  goBack(): void{
    this.location.back();
  }
  // 后退保存
  save():void{
    this.heroService.updateHero(this.hero).subscribe(()=> this.goBack());
  }
}
