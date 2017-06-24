import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRoutingModule} from './admin-routing.module';
import {Ng2PaginationModule} from "ng2-pagination";
import {AdminComponent} from './admin.component';

import {
  HeadBarComponent,
  AccordionNavComponent,
  DatePickerComponent,
  SelectBoxComponent,
  CityPickerComponent,
  CityPickerServer,
  ImgUploadComponent,
  ProvinceComponent,
  InsurerComponent
} from '../com';


import {
  // 工作台
  WorkbenchPageComponent,
  BarGraphPageComponent,

  // 违章管理
  cantWeizhangComponent,
  canWeizhangComponent,

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

  // 财务管理
  CloudpayVerificationComponent,
  CloudpayVerificationHistoryComponent,
  RechargeListComponent,
  bonusWithdrawListComponent,

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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule,
    Ng2PaginationModule
  ],
  declarations: [
    AdminComponent,
    HeadBarComponent,
    AccordionNavComponent,
    DatePickerComponent,
    SelectBoxComponent,
    CityPickerComponent,
    ImgUploadComponent,
    ProvinceComponent,
    InsurerComponent,
    // 工作台
    BarGraphPageComponent,
    WorkbenchPageComponent,

    // 违章管理
    cantWeizhangComponent,
    canWeizhangComponent,

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

    // 财务管理
    CloudpayVerificationComponent,
    CloudpayVerificationHistoryComponent,
    RechargeListComponent,
    bonusWithdrawListComponent,

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
  ],
  providers: [CityPickerServer]
})
export class AdminModule {
}
