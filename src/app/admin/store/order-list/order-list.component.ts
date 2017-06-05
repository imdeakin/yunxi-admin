/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {OrderList} from '../data-type/order-list';
import {StoreFunction} from '../data-type/store-function';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public title = '订单管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: OrderList[] = [
    {
      code: '4145asdasd45asd4',
      mobile: '18174668888',
      create_time: '2017-02-02 12:00:00',
      price: '250',
      status: 1,
      pay_type: 1,
      sign_time: '2017-02-02 12:00:00',
      track_num: '42990187920877'
    },
    {
      code: '4145asdasd45asd4',
      mobile: '18174668888',
      create_time: '2017-02-02 12:00:00',
      price: '250',
      status: 1,
      pay_type: 1,
      sign_time: '2017-02-02 12:00:00',
      track_num: '42990187920877'
    },
    {
      code: '4145asdasd45asd4',
      mobile: '18174668888',
      create_time: '2017-02-02 12:00:00',
      price: '250',
      status: 1,
      pay_type: 1,
      sign_time: '2017-02-02 12:00:00',
      track_num: '42990187920877'
    },
    {
      code: '4145asdasd45asd4',
      mobile: '18174668888',
      create_time: '2017-02-02 12:00:00',
      price: '250',
      status: 1,
      pay_type: 1,
      sign_time: '2017-02-02 12:00:00',
      track_num: '42990187920877'
    }
  ];
  public filterData = {
    mobile: '',
    createTime: '',
    partnerLevelId: '',
    regionId: '',
    status: ''
  };
  public storeFunction = StoreFunction;

  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPartnerApplyList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPartnerApplyList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPartnerApplyList(this.filterData.mobile,
      this.filterData.createTime,
      this.filterData.partnerLevelId,
      this.filterData.regionId,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize, (list, total) => {
        this.tableList = list;
        this.total = total;
      });
  }

  public setInputDate(event) {
    this.value = event.target.value;
    this.filterData.createTime = this.value;
  }

  public setDate(date) {
    this.selDate = date;
  }
}
