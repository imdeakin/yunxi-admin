import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {FormsModule}    from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRoutingModule} from './admin-routing.module';
import {Ng2PaginationModule} from "ng2-pagination";
import {AdminComponent} from './admin.component';
import {ChartModule} from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

//validate
import { NumberValidator } from '../com/ng-validate/number.validate';
import { DateValidator } from '../com/ng-validate/dateTime.validate';


declare var require:any;

 export function highchartsFactory() {
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
    }

import {
  HeadBarComponent,
  AccordionNavComponent,
  DatePickerComponent,
  SelectBoxComponent,
  CityPickerComponent,
  CityPickerServer,
  ProvinceComponent,
  InsurerComponent,
  WatchBoxComponent,
  EditorComponent,
  fileUploadComponent,
  ImgUploadComponent,
  ImgUploadListComponent,
  CityPickersServer,
  CityPickersComponent,
  ChartComponent,
  TreeComponent
} from '../com';


import {
  // 工作台
  WorkbenchPageComponent,
  BarGraphPageComponent,

  // 违章管理
  cantWeizhangComponent,
  canWeizhangComponent,
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
  OnlineProtectComponent,
  OfflineProtectComponent,

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
  ShopRangeComponent,

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
  RoleManageMentComponent
} from './pages';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule,
    Ng2PaginationModule,
    ChartModule
  ],
  declarations: [
    AdminComponent,
    HeadBarComponent,
    AccordionNavComponent,
    DatePickerComponent,
    SelectBoxComponent,
    CityPickerComponent,
    ProvinceComponent,
    InsurerComponent,
    WatchBoxComponent,
    EditorComponent,
    fileUploadComponent,
    ImgUploadComponent,
    ImgUploadListComponent,
    CityPickersComponent,
    ChartComponent,
    TreeComponent,
    // 工作台
    BarGraphPageComponent,
    WorkbenchPageComponent,

    // 违章管理
    cantWeizhangComponent,
    canWeizhangComponent,
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
    OnlineProtectComponent,
    OfflineProtectComponent,

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
    ShopRangeComponent,

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
    RoleManageMentComponent,

    //validate
    NumberValidator,
    DateValidator
  ],
  providers: [CityPickerServer,CityPickersServer, 
        {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
        }]
})
export class AdminModule {
}
