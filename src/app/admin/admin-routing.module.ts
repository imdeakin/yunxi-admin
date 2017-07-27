/**
 * Created by Administrator on 2017/6/5.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component'
import {
  // 工作台
  WorkbenchPageComponent,

  // 违章管理
  canWeizhangComponent,
  cantWeizhangComponent,
  WeiZhangeInfoComponent,
  CantWeiZhangeInfoComponent,

  // 油卡管理
  YoukaTaocanComponent,
  YoukaBindComponent,
  YoukaOrderComponent,
  YoukaRecordManageComponent,
  YoukaRecordComponent,

  // 车险管理
  InsuranceOrderListPageComponent,
  CarProtectComponent,

  // 会员管理
  UserListComponent,
  UserRecordComponent,
  UplevelOrderComponent,
  RelationListComponent,
  myUserListComponent,

  // 合伙人管理
  PartnerListComponent,
  PartnerApplyListComponent,

  // 商城管理
  GoodsListComponent,
  GoodsTypeListComponent,
  BrandListComponent,
  OrderListComponent,

  // 门店管理
  ShopListComponent,
  ShopServerListComponent,
  ShopOrderListComponent,

  // 个人门店
  PShopListComponent,
  PShopServerListComponent,
  PShopOrderListComponent,
  PShopWithdrawListComponent,
  PShopFlowlogListComponent,

  // 财务管理
  CloudpayVerificationComponent,
  CloudpayVerificationHistoryComponent,
  RechargeListComponent,
  bonusWithdrawListComponent,
  bonusWithdrawHistoryListComponent,
  manualChargeComponent,

  // 消息中心
  MsgListComponent,
  FeedbackListComponent,

  // 广告
  AdListComponent,

  // 系统管理
  AdminListComponent,
  ArticleListComponent,
  CarSeriesListComponent,
  CarModelListComponent,
  CarBrandListComponent,
} from './pages';

const AdminRoutes: Routes = [
  // 后台管理
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      // 工作台
      {path: 'workbench', component: WorkbenchPageComponent},

      // 违章管理
      {path: 'canweizhang',component:canWeizhangComponent},
      {path: 'cantweizhang',component:cantWeizhangComponent},
      {path: 'weizhanginfo/:orderId',component:WeiZhangeInfoComponent},
      {path: 'cantweizhanginfo/:orderId',component:CantWeiZhangeInfoComponent},

      // 油卡管理
      {path: 'youka-taocan', component: YoukaTaocanComponent},
      {path: 'youka-bind', component: YoukaBindComponent},
      {path: 'youka-order', component: YoukaOrderComponent},
      {path: 'youka-recordManage',component:YoukaRecordManageComponent},
      {path: 'youka-record', component: YoukaRecordComponent},

      // 车险管理
      {path: 'insurance-order-list', component: InsuranceOrderListPageComponent},
      {path:'car-protect-list',component:CarProtectComponent},
      // 会员管理
      {path: 'user-list', component: UserListComponent},
      {path: 'user-list/:memberId', component:myUserListComponent},
      {path: 'user-record', component: UserRecordComponent},
      {path: 'uplevel-order', component: UplevelOrderComponent},
      {path: 'relation-list', component: RelationListComponent},


      // 合伙人管理
      {path: 'partner-list', component: PartnerListComponent},
      {path: 'partner-apply-list', component: PartnerApplyListComponent},

      // 商城管理
      {path: 'goods-list', component: GoodsListComponent},
      {path: 'goods-type-list', component: GoodsTypeListComponent},
      {path: 'goods-type-list/:goodsTypeId', component: BrandListComponent},
      {path: 'order-list', component: OrderListComponent},

      // 门店管理
      {path: 'shop-list', component: ShopListComponent},
      {path: 'shop-list/:shopId', component: ShopServerListComponent},
      {path: 'shop-order-list', component: ShopOrderListComponent},

      // 门店管理
      {path: 'pshop-list', component: PShopListComponent},
      {path: 'pshop-list/:shopId', component: PShopServerListComponent},
      {path: 'pshop-server-list', component: PShopServerListComponent},
      {path: 'pshop-order-list', component: PShopOrderListComponent},
      {path: 'pshop-withdraw-list',component:PShopWithdrawListComponent},
      {path: 'pshop-flowlog-list',component:PShopFlowlogListComponent},
      
      // 消息管理
      {path: 'msg-list', component: MsgListComponent},
      {path: 'feedback-list', component: FeedbackListComponent},

      // 财务管理
      {path: 'cloudpay-verification-list/:sn', component: CloudpayVerificationComponent},
      {path: 'cloudpay-verification-list', component: CloudpayVerificationComponent},
      {path: 'cloudpay-verification-history-list', component: CloudpayVerificationHistoryComponent},
      {path: 'recharge-list', component: RechargeListComponent},
      {path: 'bonus-withdraw-list', component: bonusWithdrawListComponent},
      {path: 'bonus-withdraw-history-list',component:bonusWithdrawHistoryListComponent},
      {path: 'manual-charge-list',component:manualChargeComponent},

      // 广告
      {path: 'ad-list', component: AdListComponent},

      // 系统管理
      {path: 'admin-list', component: AdminListComponent},
      {path: 'article-list', component: ArticleListComponent},
      {path: 'car-series-list', component: CarSeriesListComponent},
      {path: 'car-model-list', component: CarModelListComponent},
      {path: 'car-brand-list', component: CarBrandListComponent}
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
