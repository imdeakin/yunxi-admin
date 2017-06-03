/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';
import {ShopServerList} from '../data-type/shop-server-list';

@Component({
  selector: 'shop-server-list',
  templateUrl: './shop-server-list.component.html',
  styleUrls: ['./shop-server-list.component.css']
})
export class ShopServerListComponent implements OnInit {
  public title = '门店服务';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: ShopServerList[] = [
    {
      code: '65456165654',
      shop_name: '哇哈哈',
      server: '洗车8折卡',
      region_name: '440000/440100',
      status: 0,
      create_time: '2017-12-20 12:50:55'
    },
    {
      code: '65456165654',
      shop_name: '哇哈哈',
      server: '洗车8折卡',
      region_name: '440000/440100',
      status: 0,
      create_time: '2017-12-20 12:50:55'
    },
    {
      code: '65456165654',
      shop_name: '哇哈哈',
      server: '洗车8折卡',
      region_name: '440000/440100',
      status: 0,
      create_time: '2017-12-20 12:50:55'
    },
    {
      code: '65456165654',
      shop_name: '哇哈哈',
      server: '洗车8折卡',
      region_name: '440000/440100',
      status: 0,
      create_time: '2017-12-20 12:50:55'
    },
    {
      code: '65456165654',
      shop_name: '哇哈哈',
      server: '洗车8折卡',
      region_name: '440000/440100',
      status: 0,
      create_time: '2017-12-20 12:50:55'
    }
  ];
  public filterData = {
    code: '',
    status: '',
    regionId: ''
  };

  public shopFunction = ShopFunction;

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
