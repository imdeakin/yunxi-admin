/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {MsgFunction} from '../data-type/msg-function';
import {MsgList} from '../data-type/msg-list';

@Component({
  selector: 'msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.css']
})
export class MsgListComponent implements OnInit {
  public title = '消息管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: MsgList[];
  public filterData = {
    title: '',
    type: '',
    regionId: ''
  };

  public msgFunction = MsgFunction;

  // 模态窗
  public modalData = {
    userMsgId: '',
    regionId: '',
    msgType: 0,
    fileId: '',
    title: '',
    content: '',
    remark: ''
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getMsgList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getMsgList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getMsgList(
      this.filterData.regionId,
      this.filterData.type,
      this.filterData.title,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        userMsgId: '',
        regionId: item.region_name,
        msgType: item.msg_type,
        fileId: item.img,
        title: item.title,
        content: '',
        remark: ''
      };
    }
    this.readModalShow = !this.readModalShow;
  }

  public toggleEditModal(item?): void {
    if (item) {
      this.modalData = {
        userMsgId: '',
        regionId: item.region_name,
        msgType: item.msg_type,
        fileId: item.img,
        title: item.title,
        content: '',
        remark: ''
      };
    }
    this.editModalShow = !this.editModalShow;
    if (!this.editModalShow) {
      this.modalData = {
        userMsgId: '',
        regionId: '',
        msgType: 0,
        fileId: '',
        title: '',
        content: '',
        remark: ''
      };
    }
  }

  public updateMsg(): void {
    this.apiCall.updateMsg(
      this.modalData.regionId,
      this.modalData.title,
      this.modalData.msgType,
      this.modalData.fileId,
      this.modalData.userMsgId,
      this.modalData.content,
      this.modalData.remark,
      (data) => {
        this.toggleEditModal();
        this.getMsgList(0);
      }
    );
  }

  public addMsg(): void {
    this.apiCall.addMsg(
      this.modalData.regionId,
      this.modalData.title,
      this.modalData.msgType,
      this.modalData.fileId,
      (data) => {
        this.toggleEditModal();
        this.getMsgList(0);
      }
    );
  }

  public removeMsg(msgId): void {
    this.apiCall.removeMsg(
      msgId,
      (data) => {
        this.getMsgList(0);
      }
    );
  }

  public modalSubmit(): void {
    if (this.modalData.userMsgId) {
      this.updateMsg();
    } else {
      this.addMsg();
    }
  }
}
