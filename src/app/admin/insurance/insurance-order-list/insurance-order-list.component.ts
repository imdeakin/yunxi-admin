/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {FuncServer} from '../../../serv/func.server';
import {InsuranceOrderList} from '../data-type/insurance-order-list'
import {InsuranceFunction} from '../data-type/insurance-function'

@Component({
  selector: 'insurance-order-list',
  templateUrl: './insurance-order-list.component.html',
  styleUrls: ['./insurance-order-list.component.css']
})
export class InsuranceOrderListPageComponent implements OnInit {
  public title = '车险订单';
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public total = 0;
  public tableList: InsuranceOrderList[];
  public insuranceFunction = InsuranceFunction;
  public filterData = {
    searchName: ''
  };

  constructor(private elRef: ElementRef, private apiCall: ApiCall, public funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getInsuranceOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getInsuranceOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getInsuranceOrderList(this.filterData.searchName, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }
}
