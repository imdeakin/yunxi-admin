/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {UplevelRecord} from '../data-type/uplevel-order';
import {UsersFunction} from '../data-type/users-function';

@Component({
  selector: 'uplevel-order',
  templateUrl: './uplevel-order.component.html',
  styleUrls: ['./uplevel-order.component.css']
})
export class UplevelOrderComponent implements OnInit {
  public title = '会员升级订单表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: UplevelRecord[] = [
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    },
    {
      sn: '45asd123123sad',
      current_member_name: '2',
      before_member_name: '1',
      price: 100,
      create_time: '2017-12-20 12:50:55',
      mobile: '18174668888',
      region_name: '440000/440100',
      status: 1,
    }
  ];
  public filterData = {
    mobile: '',
    level: '',
    status: ''
  };
  public usersFunction = UsersFunction;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getLevelOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getLevelOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getLevelOrderList(this.filterData.mobile, this.filterData.level, this.filterData.status, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }
}
