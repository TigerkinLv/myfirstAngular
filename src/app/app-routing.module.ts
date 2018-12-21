import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes: Routes=[
  { path: "heroes", component: HeroesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full"} // 空路由重定向为 路由 / dashboard/  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // 初始化路由器并开始监听浏览器位置更改
  ],
  exports:[RouterModule]
})



export class AppRoutingModule { }
