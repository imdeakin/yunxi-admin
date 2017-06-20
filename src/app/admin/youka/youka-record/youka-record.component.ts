/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaRecord} from '../data-type/youka-record';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';
import { ModalWindowComponent } from '../../../../../../yunxi-admin - 副本/src/app/com/modal-window/modal-window.component';

@Component({
  selector: 'youka-record',
  templateUrl: './youka-record.component.html',
  styleUrls: ['./youka-record.component.css']
})
export class YoukaRecordComponent implements OnInit {
  public title = '到账记录';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaRecord[];
  public youkaFunction = YoukaFunction;

  public modalData ={
      oilCard:'',
      sn:'',
      createTime:'',
      price:'',
      described:'',
      totalPeriods:'',
      usedPeriods:''
  }

  // 模态窗
  public modalShow: boolean = false;

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

  /**
   * 获取油卡绑定列表
   */
  public getYoukaRecordList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoucardOrderReturnList(this.modalData.oilCard,this.modalData.sn,this.curPageIndex, this.perPageSize, (list, total) => {
      console.log(list);
      this.tableList = list;
      this.total = total;
    });
  }

  public getYoukaDefaultText(classify: number): string {
    return YoukaFunction.getDefaultText(classify);
  }

  public getYoukaTypeText(type: number): string {
    return YoukaFunction.getYoukaTypeText(type);
  }

  public getCardOrderReturn(item:string):string{
    var thisData = '';
      this.apiCall.getCardOrderReturn(item,(data)=>{
          thisData = data;
      })
      return thisData;
  }
  // 模态窗
  public toggleModal(item?): void {
    this.modalShow = !this.modalShow;
    if(item){
      item = this.getCardOrderReturn(item)
      console.log(item);
      this.modalData ={
          oilCard:item.oil_card,
          sn:item.sn,
          createTime:item.create_time,
          price:item.price,
          described:item.described,
          totalPeriods:item.total_periods,
          usedPeriods:item.used_periods
      }
    }
  }
}
