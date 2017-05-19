/**
 * Created by Deakin on 2017/5/9 0009.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard.component';

import {
  WorkbenchPageComponent,
  WeizhangPageComponent,

  YoukaTaocanComponent,
  YoukaBindComponent,
  YoukaOrderComponent,
  YoukaRecordComponent
} from './page';

const routes: Routes = [
  {path: '', redirectTo: '/weizhang', pathMatch: 'full'},
  {path: 'workbench', component: WorkbenchPageComponent},
  {path: 'weizhang', component: WeizhangPageComponent},
  {path: 'youka-taocan', component: YoukaTaocanComponent},
  {path: 'youka-bind', component: YoukaBindComponent},
  {path: 'youka-order', component: YoukaOrderComponent},
  {path: 'youka-record', component: YoukaRecordComponent},
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
