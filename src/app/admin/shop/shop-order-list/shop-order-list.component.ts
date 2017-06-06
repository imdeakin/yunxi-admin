/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';
import {ShopOrderList} from '../data-type/shop-order-list';

@Component({
  selector: 'shop-order-list',
  templateUrl: './shop-order-list.component.html',
  styleUrls: ['./shop-order-list.component.css']
})
export class ShopOrderListComponent implements OnInit {
  public title = '门店订单';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: ShopOrderList[] = [
    {
      code: '380117778299',
      mobile: '18174666666',
      server: '张三',
      pay_type: 0,
      price: 99,
      region_name: '440000/440100',
      create_time: '2017-12-20 12:50:55',
      pay_time: '2017-12-21 12:50:55',
      status: 1
    },
    {
      code: '380117778299',
      mobile: '18174666666',
      server: '张三',
      pay_type: 0,
      price: 99,
      region_name: '440000/440100',
      create_time: '2017-12-20 12:50:55',
      pay_time: '2017-12-21 12:50:55',
      status: 1
    },
    {
      code: '380117778299',
      mobile: '18174666666',
      server: '张三',
      pay_type: 0,
      price: 99,
      region_name: '440000/440100',
      create_time: '2017-12-20 12:50:55',
      pay_time: '2017-12-21 12:50:55',
      status: 2
    },
    {
      code: '380117778299',
      mobile: '18174666666',
      server: '张三',
      pay_type: 0,
      price: 99,
      region_name: '440000/440100',
      create_time: '2017-12-20 12:50:55',
      pay_time: '2017-12-21 12:50:55',
      status: 1
    },
    {
      code: '380117778299',
      mobile: '18174666666',
      server: '张三',
      pay_type: 0,
      price: 99,
      region_name: '440000/440100',
      create_time: '2017-12-20 12:50:55',
      pay_time: '2017-12-21 12:50:55',
      status: 1
    }
  ];
  public filterData = {
    code: '',
    status: '',
    regionId: ''
  };

  public shopFunction = ShopFunction;

  // 模态窗
  public modalShow: boolean = false;

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

  // 模态窗
  public toggleModal(): void {
    this.modalShow = !this.modalShow;
  }
}
