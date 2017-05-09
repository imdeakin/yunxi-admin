/**
 * Created by Deakin on 2017/5/9 0009.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';

import { WeizhangPageComponent } from './page/weizhang';

const routes: Routes = [
    { path: '', redirectTo: '/weizhang', pathMatch: 'full' },
    { path: 'weizhang',  component: WeizhangPageComponent },
    // { path: 'detail/:id', component: HeroDetailComponent },
    // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
