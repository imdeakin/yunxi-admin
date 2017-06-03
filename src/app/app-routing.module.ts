/**
 * Created by Deakin on 2017/5/9 0009.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
  UserListComponent,
  UserRecordComponent,
  UplevelOrderComponent,
  RelationListComponent,

  // 合伙人管理
  PartnerListComponent,
  PartnerApplyListComponent,

  // 商城管理
  GoodsListComponent,
  GoodsTypeListComponent,
  BrandListComponent,
  OrderListComponent,

  // 门店管理
  ShopApplyListComponent,
  ShopListComponent,
  ShopServerListComponent,
  ShopOrderListComponent,

  // 消息中心
  MsgListComponent,
  FeedbackListComponent,

  // 广告
  AdListComponent,

  // 系统管理
  AdminListComponent,
  ArticleListComponent
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
  {path: 'user-record', component: UserRecordComponent},
  {path: 'uplevel-order', component: UplevelOrderComponent},
  {path: 'relation-list', component: RelationListComponent},

  // 合伙人管理
  {path: 'partner-list', component: PartnerListComponent},
  {path: 'partner-apply-list', component: PartnerApplyListComponent},

  // 商城管理
  {path: 'goods-list', component: GoodsListComponent},
  {path: 'goods-type-list', component: GoodsTypeListComponent},
  {path: 'brand-list', component: BrandListComponent},
  {path: 'order-list', component: OrderListComponent},

  // 门店管理
  {path: 'shop-apply-list', component: ShopApplyListComponent},
  {path: 'shop-list', component: ShopListComponent},
  {path: 'shop-server-list', component: ShopServerListComponent},
  {path: 'shop-order-list', component: ShopOrderListComponent},
  {path: 'msg-list', component: MsgListComponent},
  {path: 'feedback-list', component: FeedbackListComponent},

  // 广告
  {path: 'ad-list', component: AdListComponent},

  // 系统管理
  {path: 'admin-list', component: AdminListComponent},
  {path: 'article-list', component: ArticleListComponent},
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
