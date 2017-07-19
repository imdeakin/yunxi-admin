/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminFunc} from '../../../serv/admin.server';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';
import { Rc4Server } from '../../../serv/rc4.server';

declare let layer: any;

@Component({
  selector: 'pshop-list',
  templateUrl: './pshop-list.component.html',
  styleUrls: ['./pshop-list.component.css']
})
export class PShopListComponent implements OnInit {
  public title = '我的门店';
  public userId: string;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList;
  public filterData = {
    mobile: '',
    status: '',
  };
  public valuePlace = {
    provinceCode:'',
    cityCode:'',
    districtCode:''
  };

  public shopFunction = PShopFunction;

  // 模态窗
  public editModalShow: boolean = false;
  public readShopDetailModalShow: boolean = false; // 门店详情的显示状态
  public readShopBankModalShow: boolean = false; // 门店银行卡详情的显示状态
  public readShopIdCardModalShow: boolean = false; // 门店身份证详情的显示状态

  public editShopDetailModalShow: boolean = false; // 编辑门店详情的显示状态
  public editShopDescribedShow:boolean = false;//编辑门店详情的描述
  public editShopBankModalShow: boolean = false; // 编辑门店银行卡详情的显示状态
  public editShopIdCardModalShow: boolean = false; // 编辑门店身份证详情的显示状态
  public TakeMoneyModalShow:boolean = false;//获取我的账户信息

  public shopDetail; // 门店详情数据
  public myAccountData;//我的账户详情
  public place;//地方
  public MoneyShop_id;//体现id;
  public tixianModal ={
    money:'',
    payPwd:''
  }

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc,
              public cityPickerServer: CityPickerServer,
              public rc4Server:Rc4Server) {
    // this.userId = adminFunc.getAdminId();
    this.userId = 'eaffcd33a7524293a2a4160698f2f642';
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPersonShopList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPersonShopList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPersonShopList(
      this.userId,
      this.filterData.mobile,
      this.filterData.status,
      this.curPageIndex, this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
      }
    );
  }

  public getPersonShopInfo(shopId): void {
    this.shopDetail = null;
    this.apiCall.getPersonShopInfo(
      this.userId,
      shopId,
      (data) => {
        this.shopDetail = this.funcServer.deepCopy(data.result);
        this.valuePlace = {
          provinceCode:data.result.province_code,
          cityCode:data.result.city_code,
          districtCode:data.result.area_code
        }
        console.log(this.shopDetail);
      }
    );
  }

  //编辑我的门店信息
  public updateShopInfo():void{
      this.apiCall.updateShopInfo(this.shopDetail.shop_id,
        this.shopDetail.spokes_man,this.place[0],
        this.place[1],this.place[2],
        this.shopDetail.mobile,this.shopDetail.shop_name,
        this.shopDetail.business_scope,this.shopDetail.detailed_address,
        this.shopDetail.graphic_introduction,this.shopDetail.opening_hours,
        (data)=>{
          this.toggleEditDetailModal();  
          this.getPersonShopList(1);
        },(data) =>{
        }
      )
  }

  //获取我的账户列表
  public getMyAccountList(shopId):void{
    this.MoneyShop_id = shopId;
    this.apiCall.getMyAccountList(shopId,this.userId,(data)=>{
        console.log(data);
        this.myAccountData = this.funcServer.deepCopy(data[0]);
    })
  }

  //体现金额
  public withdrawApply():void{
    this.apiCall.withdrawApply(this.MoneyShop_id,this.myAccountData.user_id,this.myAccountData.bank_card_id,this.tixianModal.money,this.rc4Server.encrypt(this.tixianModal.payPwd),(data)=>{
      this.toggleTakeMoneyModal();
      this.getPersonShopList(1)  
      layer.msg('提现成功');
    },(data)=>{
        let text = '';
        switch(data){
          case 14:
            text= "密码错误";
            break;
          default:
            text = "未知错误"
        }
        layer.msg(text);
    })
  }

  // 模态窗
  public toggleEditModal(shopId?): void {
    if (shopId) {
      this.getPersonShopInfo(shopId);
    }
    this.editModalShow = !this.editModalShow;
  }

  public toggleReadDetailModal(shopId?): void {
    if (shopId) {
      this.getPersonShopInfo(shopId);
    }
    this.readShopDetailModalShow = !this.readShopDetailModalShow;
  }

  public toggleReadShopBankModal(): void {
    this.readShopBankModalShow = !this.readShopBankModalShow;
  }

  public toggleReadShopIdCardModal(): void {
    this.readShopIdCardModalShow = !this.readShopIdCardModalShow;
  }

  public toggleEditDetailModal(shopId?): void {
    if (shopId) {
      this.getPersonShopInfo(shopId);
    }
    console.log(this.place);
    this.editShopDetailModalShow = !this.editShopDetailModalShow;
  }

  public toggleEditShopDescribedModal():void{
    this.editShopDescribedShow = !this.editShopDescribedShow;
  }

  public toggleEditShopBankModal(): void {
    this.editShopBankModalShow = !this.editShopBankModalShow;
  }

  public toggleEditShopIdCardModal(): void {
    this.editShopIdCardModalShow = !this.editShopIdCardModalShow;
  }

  public toggleTakeMoneyModal(shopId?):void{
    this.TakeMoneyModalShow = !this.TakeMoneyModalShow;
    if(shopId){
      this.getMyAccountList(shopId);
    }
    if(!this.TakeMoneyModalShow){
      this.tixianModal ={
        money:'',
        payPwd:''
      }
    }
  }
}
