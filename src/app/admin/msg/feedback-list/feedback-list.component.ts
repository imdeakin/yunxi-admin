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
  public curPageIndex = 1;
  public tableList: FeedbackList[];
  public filterData = {
    mobile: '',
    title:'',
    status:''
  };

  public msgFunction = MsgFunction;

  // 模态窗
  public modalData = {
    feedbackId: '',
    userName: '',
    mobile: '',
    content: 0,
    contact: '',
    createTime: '',
    status: ''
  };
  public readModalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getFeedbackList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getFeedbackList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getFeedbackList(this.filterData.mobile, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        feedbackId: item.feedback_id,
        userName: item.user_name,
        mobile: item.mobile,
        content: item.content,
        contact: item.contact,
        createTime: item.create_time,
        status: item.status
      };
    }
    this.readModalShow = !this.readModalShow;
  }

  public removeFeedback(feedbackId): void {
    this.apiCall.removeFeedback(
      feedbackId,
      (data) => {
        this.getFeedbackList(1);
      }
    );
  }
}
