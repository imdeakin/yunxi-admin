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
  public curPageIndex = 0;
  public tableList: InsuranceOrderList[] = [
    {
      insurance_order_id: '003ec908916b41f688b21bbfabcf3431',
      sn: '868300435990122496',
      biz_id: '30271516',
      trade_mode: 1,
      trade_code: '201723232123123',
      car_number: '川A0X1D5',
      name: '黄馍馍',
      mobile: '18476509132',
      insurer_name: '平安',
      city_name: '濮阳市',
      pay_time: '2017-12-25 12:20:55',
      synch_flag: 1,
      msg: '超速',
      status: 4,
    },
    {
      insurance_order_id: '003ec908916b41f688b21bbfabcf3431',
      sn: '868300435990122496',
      biz_id: '30271516',
      trade_mode: 1,
      trade_code: '201723232123123',
      car_number: '川A0X1D5',
      name: '黄馍馍',
      mobile: '18476509132',
      insurer_name: '平安',
      city_name: '濮阳市',
      pay_time: '2017-12-25 12:20:55',
      synch_flag: 1,
      msg: '超速',
      status: 4,
    },
    {
      insurance_order_id: '003ec908916b41f688b21bbfabcf3431',
      sn: '868300435990122496',
      biz_id: '30271516',
      trade_mode: 1,
      trade_code: '201723232123123',
      car_number: '川A0X1D5',
      name: '黄馍馍',
      mobile: '18476509132',
      insurer_name: '平安',
      city_name: '濮阳市',
      pay_time: '2017-12-25 12:20:55',
      synch_flag: 1,
      msg: '超速',
      status: 4,
    },
    {
      insurance_order_id: '003ec908916b41f688b21bbfabcf3431',
      sn: '868300435990122496',
      biz_id: '30271516',
      trade_mode: 1,
      trade_code: '201723232123123',
      car_number: '川A0X1D5',
      name: '黄馍馍',
      mobile: '18476509132',
      insurer_name: '平安',
      city_name: '濮阳市',
      pay_time: '2017-12-25 12:20:55',
      synch_flag: 1,
      msg: '超速',
      status: 4,
    }
  ];
  public insuranceFunction = InsuranceFunction;
  public filterData = {
    searchName: ''
  };

  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
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
    // this.apiCall.getYoukaTaocanList(this.curPageIndex, this.perPageSize, (list, total) => {
    //   this.tableList = list;
    //   this.total = total;
    // });
  }

  public setInputDate(event) {
    this.value = event.target.value;
  }

  public setDate(date) {
    this.selDate = date;
  }
}
