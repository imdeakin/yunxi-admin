/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {FinanceFunction} from '../data-type/finance-function';
import {BonusWithdrawListList} from '../data-type/bouns-withdraw-list';

declare let layer: any;

@Component({
  selector: 'bonus-withdraw-history-list',
  templateUrl: './bonus-withdraw-history-list.component.html',
  styleUrls: ['./bonus-withdraw-history-list.component.css']
})
export class bonusWithdrawHistoryListComponent implements OnInit {
  public title = '奖金提现历史';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: BonusWithdrawListList[];

  public financeFunction = FinanceFunction;

  public filterData = {
    sn: '',
    mobile: '',
    cardNumber: '',
    cardType: '',
    status: ''
  };

  // 模态窗
  public modalData = {
    order_id: '',
    sn: '',
    mobile: '',
    cardType: '',
    yft_account: '',
    create_time: '',
    money: '',
    status: '',
    cardNumber:''
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;


  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getBonusWithdrawList()
    ;
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getBonusWithdrawList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getBonusWithdrawList(
      this.filterData.sn,
      this.filterData.mobile,
      this.filterData.cardNumber,
      this.filterData.cardType,
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

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        order_id: item.order_id,
        sn: item.sn,
        mobile: item.mobile,
        cardType : item.cardType,
        yft_account: item.yft_account,
        create_time: item.create_time,
        money: item.money,
        status: item.status,
        cardNumber:''
      };
    }
    this.readModalShow = !this.readModalShow;
  }
}
