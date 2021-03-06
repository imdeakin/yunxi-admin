/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaRecord} from '../data-type/youka-record';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server'; 

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

  public modalData;

  public filter ={
    oilCard:'',
    sn:'',
    nowData:'',
    searchData:'',
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

  public selectValue():void{
      this.getYoukaSelectOptions();
      this.getYoukaRecordList(1);
      this.filter.oilCard = '';
      this.filter.sn = '';
  }

   //匹配油卡搜索查询
  public getYoukaSelectOptions():void{
      switch(this.filter.nowData){
        case 'oilCard':
          this.filter.oilCard = this.filter.searchData;
          break;
        case 'sn':
          this.filter.sn = this.filter.searchData;
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
    this.apiCall.getYoucardOrderReturnList(this.filter.oilCard,this.filter.sn,this.curPageIndex, this.perPageSize, (list, total) => {
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

  public getCardOrderReturn(item:string){
    var thisData = '';
      this.apiCall.getCardOrderReturn(item,(data)=>{
        this.modalData = data;
      })
      return thisData;
  }

  // 模态窗
  public toggleModal(item?): void {
    this.modalShow = !this.modalShow;
    if(item){
      this.getCardOrderReturn(item)
    }
    if(!this.modalShow){
      this.modalData = null;
    }
  }
}
