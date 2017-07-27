/**
 * Created by Kun on 2017/7/20 0008.
 */
import { Component, ElementRef, OnInit } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { weiZhangFunction } from '../date-type/weizhang-function';
import { ApiConfig } from '../../../http/api-config';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare let layer: any;

@Component({
    selector:'cantweizhangInfo',
    templateUrl:'./cantweizhangInfo.component.html',
    styleUrls:['./cantweizhangInfo.component.css']
})
export class CantWeiZhangeInfoComponent implements OnInit {
  public title = "车辆违章信息";
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public total = 0;
  public tableList;
  public orderId;
  public dataList;
  public filter = {
      searchName:''
  }

  public modalData = {
    peccancy_id:'',
    punish_money:0,
    punish_points:0,
    peccancy_date:'',
    address:'',
    punish_reason:''
  }
  public addWeiZhangInfoShow:boolean = false;

    // 日期时间
  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';
  public setInputDate(event) {
    this.value = event.target.value;
  }
  public setDate(date) {
    this.selDate = date;
  }

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
  }

  public ngOnInit():void{
    this.activatedRoute.params
    .map((params:Params)=> params['orderId'])
    .subscribe((orderId)=>{
        this.orderId = orderId;
    })
     this.computeOnResize();
     this.peccancyDetailsList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public peccancyDetailsList(curPageIndex?):void{
     if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.peccancyDetailsList(this.filter.searchName,this.orderId,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list.peccancy_list;
      delete list.peccancy_list;
      this.dataList = list;
      console.log(this.dataList);
      this.total = total;
    });
  }

  public addtoggleModal(item?):void{
    if(item){
      this.modalData = this.funcServer.deepCopy(item);
    }
     this.addWeiZhangInfoShow = !this.addWeiZhangInfoShow;
    if(!this.addWeiZhangInfoShow){
       this.modalData = this.funcServer.emptyObj(this.modalData);
    }
  }

  public addPeccancy():void{
    this.apiCall.addPeccancy(this.orderId,this.modalData.peccancy_id,this.modalData.punish_money,this.modalData.punish_points,this.modalData.peccancy_date,this.modalData.address,this.modalData.punish_reason,(data)=>{
        this.addtoggleModal();
        this.peccancyDetailsList();
    })
  }

  public delPeccancy(item):void{
    this.apiCall.delPeccancy(this.orderId,item.peccancy_id,(data)=>{
       this.peccancyDetailsList();
    })
  }

  public modalSubmit():void{
      if(this.modalData.peccancy_id){
        this.addPeccancy();
      }else{
        this.addPeccancy();
      }
  }

    // 核验弹窗
  public verificationConfirm(item): void {
    let index = layer.confirm(
      '确认是否删除',
      {
        title: '确认',
        btn: ["删除", "取消"]
      },
      () => {
        this.delPeccancy(item);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
