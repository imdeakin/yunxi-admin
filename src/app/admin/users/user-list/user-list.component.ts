/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {User} from '../data-type/user';

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
  public curPageIndex = 0;
  public tableList: User[] = [
    {
      member_id: '45asd123123sad',
      member_mobile: '18174668888',
      upmember_mobile: '18174666666',
      member_level_name: 'vip',
      create_time: '2017-12-20 12:50:55',
      last_login_time: '2017-12-20 12:50:55',
      last_login_ip: '192.168.137.6',
      region_name: '440000/440100',
    },
    {
      member_id: '45asd123123sad',
      member_mobile: '18174668888',
      upmember_mobile: '18174666666',
      member_level_name: 'vip',
      create_time: '2017-12-20 12:50:55',
      last_login_time: '2017-12-20 12:50:55',
      last_login_ip: '192.168.137.6',
      region_name: '440000/440100',
    },
    {
      member_id: '45asd123123sad',
      member_mobile: '18174668888',
      upmember_mobile: '18174666666',
      member_level_name: 'vip',
      create_time: '2017-12-20 12:50:55',
      last_login_time: '2017-12-20 12:50:55',
      last_login_ip: '192.168.137.6',
      region_name: '440000/440100',
    },
    {
      member_id: '45asd123123sad',
      member_mobile: '18174668888',
      upmember_mobile: '18174666666',
      member_level_name: 'vip',
      create_time: '2017-12-20 12:50:55',
      last_login_time: '2017-12-20 12:50:55',
      last_login_ip: '192.168.137.6',
      region_name: '440000/440100',
    },
    {
      member_id: '45asd123123sad',
      member_mobile: '18174668888',
      upmember_mobile: '18174666666',
      member_level_name: 'vip',
      create_time: '2017-12-20 12:50:55',
      last_login_time: '2017-12-20 12:50:55',
      last_login_ip: '192.168.137.6',
      region_name: '440000/440100',
    }
  ];
  public filterData = {
    mobile: '',
    level: '',
    regionId: ''
  };
  public levelOptions = [
    {
      value: '',
      text: '不限'
    },
    {
      value: '1',
      text: '普通会员'
    },
    {
      value: '2',
      text: 'VIP会员'
    },
    {
      value: '3',
      text: '钻石会员'
    }
  ];

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
    this.apiCall.getYoukaOrderList(this.filterData.mobile, this.filterData.level, this.filterData.regionId, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }
}
