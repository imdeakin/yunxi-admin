/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaBind} from '../data-type/youka-bind';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';

declare let layer: any;

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

  public modalData = {
      oil_card_id:'',
      oil_card:'',
      type:0,
      user_name:''
  };

  public modalShow:boolean = false;
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
    console.log(this.filterData.mobile);
    this.apiCall.getYoukaBindList(this.filterData.oilCard,this.filterData.mobile,this.filterData.userName, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
      this.filterData.oilCard = '';
      this.filterData.mobile = '';
      this.filterData.userName = '';
    });
  }

  public getYoukaDefaultText(classify: number): string {
    return YoukaFunction.getDefaultText(classify);
  }

  public getYoukaTypeText(type: number): string {
    return YoukaFunction.getYoukaTypeText(type);
  }

  public selectValue():void{
      this.getYoukaSelectOptions();
  }

   //匹配油卡搜索查询
  public getYoukaSelectOptions():void{
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
      this.getYoukaBindList(1);
  }

  public updateOilBound():void{
    this.apiCall.updateOilBound(this.modalData.oil_card_id,this.modalData.oil_card,this.modalData.type,this.modalData.user_name,(data)=>{
        this.toggleModal();
        this.getYoukaBindList(1);
    })  
  }

  public delOilBound(oil_card_id):void{
    this.apiCall.delOilBound(oil_card_id,(data) =>{
        this.getYoukaBindList(1);
    })
  }

  public toggleModal(item?):void{
      if(item){
        this.modalData = this.funcServer.deepCopy(item);
      }
      this.modalShow = !this.modalShow;
      if(!this.modalShow){

      }
  }

  public modalSubmit():void{
    if(this.modalData.oil_card_id)
      this.updateOilBound();
  }

  public verificationConfirm(oil_card_id): void {
    let adminId = '';
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.delOilBound(oil_card_id);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
