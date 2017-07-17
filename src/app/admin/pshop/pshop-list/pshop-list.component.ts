/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminFunc} from '../../../serv/admin.server';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';

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

  public shopFunction = PShopFunction;

  // 模态窗
  public editModalShow: boolean = false;
  public readShopDetailModalShow: boolean = false; // 门店详情的显示状态
  public readShopBankModalShow: boolean = false; // 门店银行卡详情的显示状态
  public readShopIdCardModalShow: boolean = false; // 门店身份证详情的显示状态

  public editShopDetailModalShow: boolean = false; // 编辑门店详情的显示状态
  public editShopBankModalShow: boolean = false; // 编辑门店银行卡详情的显示状态
  public editShopIdCardModalShow: boolean = false; // 编辑门店身份证详情的显示状态

  public shopDetail; // 门店详情数据

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc,
              public cityPickerServer: CityPickerServer) {
    this.userId = adminFunc.getAdminId();
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
    console.log(shopId);
    this.apiCall.getPersonShopInfo(
      this.userId,
      shopId,
      (data) => {
        this.shopDetail = data.result;
        console.log(this.shopDetail);
      }
    );
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
    this.editShopDetailModalShow = !this.editShopDetailModalShow;
  }

  public toggleEditShopBankModal(): void {
    this.editShopBankModalShow = !this.editShopBankModalShow;
  }

  public toggleEditShopIdCardModal(): void {
    this.editShopIdCardModalShow = !this.editShopIdCardModalShow;
  }
}
