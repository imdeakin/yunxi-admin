/**
 * Created by Kun on 2017/7/20 0008.
 */
import { Component, ElementRef, OnInit } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { weiZhangFunction } from '../date-type/weizhang-function';
import { ApiConfig } from '../../../http/api-config';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector:'weizhangInfo',
    templateUrl:'./weizhangInfo.component.html',
    styleUrls:['./weizhangInfo.component.css']
})
export class WeiZhangeInfoComponent implements OnInit {
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
      this.total = total;
    });
  }
}
