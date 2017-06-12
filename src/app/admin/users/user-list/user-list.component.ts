/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {User} from '../data-type/user';
import {UsersFunction} from '../data-type/users-function';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public title = '会员列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: User[];
  public filterData = {
    mobile: '',
    level: '',
    regionId: ''
  };
  public usersFunction = UsersFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalData;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, public funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getUserList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getUserList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getUserList(this.filterData.mobile, this.filterData.level, this.filterData.regionId, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getUserInfo(memberId): void {
    this.apiCall.getUserInfo(memberId, (data) => {
        this.modalData = data;
    });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.getUserInfo(item.member_id);
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.modalData = null;
    }
  }
}
