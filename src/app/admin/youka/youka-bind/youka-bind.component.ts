/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaBind} from '../data-type/youka-bind';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';

@Component({
  selector: 'youka-bind',
  templateUrl: './youka-bind.component.html',
  styleUrls: ['./youka-bind.component.css']
})
export class YoukaBindComponent implements OnInit {
  public title = '油卡绑定列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaBind[];
  public search_oilCard: string = '';
  public youkaFunction = YoukaFunction;

  public filterData = {
    nowData:'',
    oilCard:'',
    mobile:'',
    userName:'',
    searchData:''
  }

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaBindList();
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
  public getYoukaBindList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoukaBindList(this.filterData.oilCard,this.filterData.mobile,this.filterData.userName, this.curPageIndex, this.perPageSize, (list, total) => {
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

  selectValue(){
      this.getYoukaSelectOptions();
      this.getYoukaBindList(1);
      this.filterData = {
        nowData:'',
        oilCard:'',
        mobile:'',
        userName:'',
        searchData:''
      }
  }

   //匹配油卡搜索查询
  public getYoukaSelectOptions():void{
    console.log(this.filterData);
      switch(this.filterData.nowData){
        case 'oilCard':
          this.filterData.oilCard = this.filterData.searchData;
          break;
        case 'mobile':
          this.filterData.mobile = this.filterData.searchData;
          break;
        case 'userName':
          this.filterData.userName = this.filterData.searchData;
          break;
      }
  }

}
