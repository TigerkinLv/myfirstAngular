import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';


const httpOptions={
  headers : new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({ //   使用Injectable 注释器注释，标识该类成为参与依赖注入系统的类
  providedIn: 'root'
})
export class HeroService {
  // getHeroes():Hero[]{
  //   return HEROES;
  // }
  private heroesUrl='api/heroes';
  
  getHero(id:number):Observable<Hero>{
    // 拿取到 英雄后发送信息
    // this.messageService.add(`HeroService: fetch heroes id=${id}`);
    const url =`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_=>this.log(`fetched hero id=${id}`)),catchError(this.handleError<Hero>(`getHero id=${id}`)));  // of(HEROES) 返回一个observable<Hero[]> 发出 单个值
  }
  getHeroes():Observable<Hero[]>{
    // 拿取到 英雄后发送信息
    // this.messageService.add(`HeroService: fetch heroes`);
    // return of(HEROES);  // of(HEROES) 返回一个observable<Hero[]> 发出 单个值
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_=>this.log("fetched Heroes")),catchError(this.handleError("getHeroes",[]))); 
  }

  constructor(
    private messageService:MessageService,
    private http: HttpClient,
    ) {  // 定义私有heroService 属性并将其标识为HeroService注入站点

  }

  // 更新服务器端英雄
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero:Hero | number):Observable<Hero>{
    const id=typeof hero ==='number'?hero:hero.id;
    const url=`${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_=>this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    )
  }


  searchHeroes(term: string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_=>this.log(`found heroes matching '${term}'`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`,[]))
    )
  }

  private log(message : string){
    this.messageService.add(`HeroMessage: ${message}`);
  }
  // 处理http请求失败
  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      this.log(`${operation} failed:${error.message}`);
      // 返回空值让程序继续执行
      return of(result as T);
    }
  }

}
