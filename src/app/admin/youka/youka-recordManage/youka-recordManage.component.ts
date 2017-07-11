/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaRecord} from '../data-type/youka-record';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';
// import { ModalWindowComponent } from '../../../../../../yunxi-admin/src/app/com/modal-window/modal-window.component';

@Component({
  selector: 'youka-recordManage',
  templateUrl: './youka-recordManage.component.html',
  styleUrls: ['./youka-recordManage.component.css']
})
export class YoukaRecordManageComponent implements OnInit {
  public title = '油卡套餐到账管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaRecord[];
  public youkaFunction = YoukaFunction;

  public modalData ={
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
    chargeOrderId:'',
    nowData:'',
    searchData:''
  }

  // 模态窗
  public modalShow: boolean = false;
  public submitShow:boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaRecordList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public selectValue():void{
      this.getYoukaSelectOptions();
      this.getYoukaRecordList(1);
      this.modalData.oilCard = '';
      this.modalData.sn = '';
  }

   //匹配油卡搜索查询
  public getYoukaSelectOptions():void{
    console.log(this.modalData);
      switch(this.modalData.nowData){
        case 'oilCard':
          this.modalData.oilCard = this.modalData.searchData;
          break;
        case 'sn':
          this.modalData.sn = this.modalData.searchData;
          break;
      }
  }

  /**
   * 获取油卡绑定列表
   */
  public getYoukaRecordList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoukaOrderList(this.modalData.sn,this.modalData.oilCard, this.modalData.tradeMode, this.modalData.oilPackageId, this.modalData.status,this.modalData.classify,this.curPageIndex, this.perPageSize, (list, total) => {
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

  public getYoukaPayStyle(payStyle: number ): string{
    return YoukaFunction.getYoukaPayStyle(payStyle);
  }

  // 模态窗
  public toggleModal(data?): void {
    this.modalShow = !this.modalShow;
     if(data){
       this.modalData = {
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
          oilCardId:data.oil_card_id,
          chargeOrderId:data.charge_order_id,
          nowData:'',
          searchData:''
      };
    }else{
        this.modalData ={
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
          chargeOrderId:'',
          nowData:'',
          searchData:''
        }
    }
  }

  public submitModal(chargeOrderId?){
    this.submitShow = !this.submitShow;
     console.log(chargeOrderId)
    if(chargeOrderId){
      this.modalData.chargeOrderId = chargeOrderId;
    }else{
      this.modalData.chargeOrderId = '';
    }
  }

  public modalSubmit(chargeOrderId?){
      if(chargeOrderId){
        this.apiCall.YouCardOrderReturn(chargeOrderId,(data)=>{
            this.submitModal()
            this.getYoukaRecordList()
        })
      }
  }
}
