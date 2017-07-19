/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';

@Component({
  selector: 'pshop-flowlog-list',
  templateUrl: './pshop-flowlog-list.component.html',
  styleUrls: ['./pshop-flowlog-list.component.css']
})
export class PShopFlowlogListComponent implements OnInit {
  public title = '门店流水';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [];
  public userId;
  public filterData = {
    searchName: '',
    status: ''
  };

  public modalData;

  public pshopFunction = PShopFunction;

  // 模态窗
  public modalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, public funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
      // this.userId = adminFunc.getAdminId();
        this.userId = 'eaffcd33a7524293a2a4160698f2f642';
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getStoreAccountFlowlogList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getStoreAccountFlowlogList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStoreAccountFlowlogList(
      this.filterData.searchName,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
      }
    );
  }

  public getPersonShopServiceOrderInfo(shopServiceOrderId): void {
    this.apiCall.getPersonShopServiceOrderInfo(
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
      this.modalData = item;
    }
    if (!this.modalShow) {
      this.modalData = null;
    }
  }
}
