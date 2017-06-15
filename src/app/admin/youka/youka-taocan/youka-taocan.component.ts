/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaTaocan} from '../data-type/youka-taocan';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';

@Component({
  selector: 'youka-taocan',
  templateUrl: './youka-taocan.component.html',
  styleUrls: ['./youka-taocan.component.css']
})
export class YoukaTaocanComponent implements OnInit {
  public title = '油卡套餐';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaTaocan[];
  public youkaFunction = YoukaFunction;


  // 模态窗
  public modalShow: boolean = false;
  public eachs = 0;
  public youkaType = 0;
  public described = '';
  public need_points = 0;
  public type = 0;
  public amount = 0;
  public oil_card_type = 0;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaTaocanList();
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
   * 获取油卡套餐列表
   */
  public getYoukaTaocanList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoukaTaocanList(this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getTaocanClassText(classify: number): string {
    return YoukaFunction.getYoucaTaocanClassText(classify);
  }

  public getTaocanTypeText(type: number): string {
    return YoukaFunction.getYoukaTaocanPayTypeText(type);
  }

   public getTaocanOilCardTypeText(type: number): string {
    return YoukaFunction.getYoukaTypeText(type);
  }

  /**
   * 编辑油卡套餐
   */
  
  public updateYoukaTaocanList():void{
      
  }

  // 模态窗
  public toggleModal(data?): void {
    this.modalShow = !this.modalShow;
    if(data){
        this.eachs = data.eachs;
        this.amount = data.amount;
        this.described = data.described;
        this.need_points = data.need_points;
        this.type = data.type;
        this.oil_card_type = data.oil_card_type;
        console.log(data);
        console.log(this.type);
    }
  }

  public test(data):void{
    console.log(data);
  } 

}