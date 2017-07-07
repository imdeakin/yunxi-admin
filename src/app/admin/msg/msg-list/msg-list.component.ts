/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {MsgFunction} from '../data-type/msg-function';
import {MsgList} from '../data-type/msg-list';

declare let layer: any;

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
    regionName: '',
    msgType: 0,
    title: '',
    content: '',
    remark: ''
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;
  public sendMsgShow:boolean = true;

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
      this.filterData.title,
      this.filterData.type,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
        if(this.filterData.type == '6'){
            this.sendMsgShow = false;
        }else{
             this.sendMsgShow = true;
        }
      }
    );
  }

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        userMsgId: item.user_msg_id,
        regionId: item.region_id,
        regionName: item.region_name,
        msgType: item.msg_type,
        title: item.title,
        content: item.content,
        remark: item.remark
      };
    }
    this.readModalShow = !this.readModalShow;
  }

  public toggleEditModal(item?): void {
    if (item) {
      this.modalData = {
        userMsgId: item.user_msg_id,
        regionId: item.region_id,
        regionName: item.region_name,
        msgType: item.msg_type,
        title: item.title,
        content: item.content,
        remark: item.remark
      };
    }
    this.editModalShow = !this.editModalShow;
    if (!this.editModalShow) {
      this.modalData = {
        userMsgId: '',
        regionId: '',
        regionName: '',
        msgType: 0,
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
      this.modalData.userMsgId,
      this.modalData.content,
      this.modalData.remark,
      (data) => {
        this.toggleEditModal();
        this.getMsgList(1);
      }
    );
  }

  public addMsg(): void {
    let type = 6;
    console.log(this.modalData.content);
    this.apiCall.addMsg(
      this.modalData.regionId,
      this.modalData.title,
      type,
      this.modalData.content,
      (data) => {
        this.toggleEditModal();
        this.getMsgList(1);
      }
    );
  }

  public removeMsg(msgId): void {
    this.apiCall.removeMsg(
      msgId,
      (data) => {
        this.getMsgList(1);
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

  //确认弹窗
  public verificationConfirm(msgId): void {
    let adminId = '';
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeMsg(msgId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
