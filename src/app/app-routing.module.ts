/**
 * Created by Deakin on 2017/5/9 0009.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard.component';

import {
  // 工作台
  WorkbenchPageComponent,

  // 违章管理
  WeizhangPageComponent,

  // 油卡管理
  YoukaTaocanComponent,
  YoukaBindComponent,
  YoukaOrderComponent,
  YoukaRecordComponent,

  // 会员管理
  UserListComponent
} from './page';

const routes: Routes = [
  {path: '', redirectTo: '/weizhang', pathMatch: 'full'},

  // 工作台
  {path: 'workbench', component: WorkbenchPageComponent},

  // 违章管理
  {path: 'weizhang', component: WeizhangPageComponent},

  // 油卡管理
  {path: 'youka-taocan', component: YoukaTaocanComponent},
  {path: 'youka-bind', component: YoukaBindComponent},
  {path: 'youka-order', component: YoukaOrderComponent},
  {path: 'youka-record', component: YoukaRecordComponent},

  // 会员管理
  {path: 'user-list', component: UserListComponent},
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
