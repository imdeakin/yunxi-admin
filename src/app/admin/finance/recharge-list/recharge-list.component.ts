/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {FinanceFunction} from '../data-type/finance-function';
import {CloudpayVerificationList} from '../data-type/cloudpay-verification-list';

declare let layer: any;

@Component({
  selector: 'recharge-list',
  templateUrl: './recharge-list.component.html',
  styleUrls: ['./recharge-list.component.css']
})
export class RechargeListComponent implements OnInit {
  public title = '充值列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: CloudpayVerificationList[];

  public financeFunction = FinanceFunction;

  public filterData = {
    sn: '',
    name: '',
    mobile: ''
  };

  // 模态窗
  public modalData = {
    order_id: '',
    sn: '',
    mobile: '',
    trade_mode: '',
    yft_account: '',
    create_time: '',
    money: '',
    status: 0
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;


  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getRechargeOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getRechargeOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getRechargeOrderList(
      this.filterData.sn,
      this.filterData.mobile,
      this.filterData.name,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        order_id: item.order_id,
        sn: item.sn,
        mobile: item.mobile,
        trade_mode: item.trade_mode,
        yft_account: item.yft_account,
        create_time: item.create_time,
        money: item.money,
        status: item.status
      };
    }
    this.readModalShow = !this.readModalShow;
  }
}
