/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaOrder} from '../data-type/youka-order';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';

@Component({
  selector: 'youka-order',
  templateUrl: './youka-order.component.html',
  styleUrls: ['./youka-order.component.css']
})
export class YoukaOrderComponent implements OnInit {
  public title = '油卡套餐订单';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaOrder[];
  public filterData = {
    oilPackageId:'',
    sn:'',
    oilCard: '',
    price:'',
    mobile:'',
    totalPeriods:'',
    usedPeriods:'',
    payTime:'',
    amount:0,
    classify: '',
    described:'',
    status:'',
    tradeMode: '',
    modifyTime:'',
    oilCardId:'',
  };
  public youkaFunction = YoukaFunction;

  public classifyOptions = this.youkaFunction.youcaTaocanClassOptions;

  public tradeModeOptions = this.youkaFunction.youcaTradeModeOptions;

  public select_active = {
    classify: true
  };

  // 模态窗
  public modalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  /**
   * 获取油卡绑定列表
   */
  public getYoukaOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    console.log(this.filterData.tradeMode);
    this.apiCall.getYoukaOrderList(this.filterData.sn,this.filterData.oilCard, this.filterData.tradeMode, this.filterData.oilPackageId, this.filterData.status,this.filterData.classify,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getTaocanClassText(classify): string {
    return YoukaFunction.getYoucaTaocanClassText(classify);
  }

  public getTaocanOrderStatusText(status): string {
    return YoukaFunction.getYoukaOrderStatus(status);
  }

  public getYoukaPayStyle(payStyle): string{
    return YoukaFunction.getYoukaPayStyle(payStyle);
  }

  public filterSubmit(): void {
    this.getYoukaOrderList(1);
  }

  // 模态窗
  public toggleModal(data?): void {
    this.modalShow = !this.modalShow;
     if(data){
       console.log(data);
       this.filterData = {
          oilPackageId:data.oil_package_id,
          sn:data.sn,
          price:data.price,
          oilCard: data.oil_card,
          mobile:data.mobile,
          totalPeriods:data.total_periods,
          usedPeriods:data.used_periods,
          payTime:data.pay_time,
          amount:data.amount,
          classify:data.classify,
          described:data.described,
          status:data.status,
          tradeMode: data.trade_mode,
          modifyTime:data.modify_time,
          oilCardId:data.oil_card_id
      };
    }else{
      this.filterData = {
        oilPackageId:'',
        sn:'',
        oilCard: '',
        price:'',
        mobile:'',
        totalPeriods:'',
        usedPeriods:'',
        payTime:'',
        amount:0,
        classify: '',
        described:'',
        status:'',
        tradeMode: '',
        modifyTime:'',
        oilCardId:'',
        };
    }
  }
}
