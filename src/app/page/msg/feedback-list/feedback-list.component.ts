/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {MsgFunction} from '../data-type/msg-function';
import {FeedbackList} from '../data-type/feedback-list';

@Component({
  selector: 'feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  public title = '意见反馈';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: FeedbackList[] = [
    {
      mobile: '1856435664',
      name: '马云',
      content: '洗车速度太慢等了1小时还没...',
      contact: '1856435664',
      create_time: '2017-5-5 12:00:00',
      status: 1
    }
  ];
  public filterData = {
    mobile: '',
    title: '',
    status: ''
  };

  public msgFunction = MsgFunction;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaUserList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getYoukaUserList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    // this.apiCall.getYoukaOrderList(this.filterData.mobile, this.filterData.level, this.filterData.regionId, this.curPageIndex, this.perPageSize, (list, total) => {
    //   this.tableList = list;
    //   this.total = total;
    // });
  }
}
