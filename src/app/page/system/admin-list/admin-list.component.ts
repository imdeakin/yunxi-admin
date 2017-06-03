/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {AdminList} from '../data-type/admin-list';

@Component({
  selector: 'admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  public title = '管理员';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: AdminList[] = [
    {
      id: '4280172168844',
      name: '张三',
      role: 0,
      last_login_time: '2017-06-03 13:41:55'
    },
    {
      id: '4280172168844',
      name: '张三',
      role: 2,
      last_login_time: '2017-06-03 13:41:55'
    },
    {
      id: '4280172168844',
      name: '张三',
      role: 1,
      last_login_time: '2017-06-03 13:41:55'
    },
    {
      id: '4280172168844',
      name: '张三',
      role: 0,
      last_login_time: '2017-06-03 13:41:55'
    },
    {
      id: '4280172168844',
      name: '张三',
      role: 0,
      last_login_time: '2017-06-03 13:41:55'
    }
  ];
  public filterData = {
    name: ''
  };

  public systemFunction = SystemFunction;

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
