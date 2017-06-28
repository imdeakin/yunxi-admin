/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {RelationList} from '../data-type/relation-list';
import {UsersFunction} from '../data-type/users-function';
import { AdminFunc } from '../../../serv/admin.server';

@Component({
  selector: 'relation-list',
  templateUrl: './relation-list.component.html',
  styleUrls: ['./relation-list.component.css']
})
export class RelationListComponent implements OnInit {
  public title = '会员推广统计';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: RelationList[];
  public filterData = {
    userId:'',
    type:'1',
    years:'',
    months:''
  };
  public usersFunction = UsersFunction;

  // 模态窗
  public modalShow: boolean = false;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer,
              public adminFunc:AdminFunc) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getRelationList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getRelationList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStatisticsData(this.filterData.userId,this.filterData.type,this.filterData.userId,this.filterData.months, (data)=> {
      this.tableList = data;
      console.log(data);
    });
  }

  // 模态窗
  public toggleModal(): void {
    this.modalShow = !this.modalShow;
  }
}
