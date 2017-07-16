/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';
import {PShopOrderList} from '../data-type/pshop-order-list';

@Component({
  selector: 'shop-order-list',
  templateUrl: './pshop-order-list.component.html',
  styleUrls: ['./pshop-order-list.component.css']
})
export class PShopOrderListComponent implements OnInit {
  public title = '门店订单';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: PShopOrderList[] = [];
  public filterData = {
    sn: '',
    status: ''
  };

  public modalData;

  public pshopFunction = PShopFunction;

  // 模态窗
  public modalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, public funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getAdminShopServiceOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getAdminShopServiceOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getAdminShopServiceOrderList(
      this.filterData.sn,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public getAdminShopServiceOrderInfo(shopServiceOrderId): void {
    this.apiCall.getAdminShopServiceOrderInfo(
      shopServiceOrderId,
      (data) => {
        this.modalData = data;
      }
    );
  }

  // 模态窗
  public toggleModal(item?): void {
    this.modalShow = !this.modalShow;
    if (item) {
      this.getAdminShopServiceOrderInfo(item.shop_service_order_id)
    }
    if (!this.modalShow) {
      this.modalData = null;
    }
  }
}
