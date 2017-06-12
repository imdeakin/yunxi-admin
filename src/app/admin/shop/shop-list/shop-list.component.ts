/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';
import {ShopList} from '../data-type/shop-list';

@Component({
  selector: 'shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  public title = '门店列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: ShopList[] = [
    {
      code: '4280172168844',
      mobile: '18174666666',
      name: '张三',
      region_name: '440000/440100',
      shop_name: '哇哈哈',
      business_scope: '饮料',
      legal_person_mobile: '18174666666',
      money: 88888,
      status: 0
    },
    {
      code: '4280172168844',
      mobile: '18174666666',
      name: '张三',
      region_name: '440000/440100',
      shop_name: '哇哈哈',
      business_scope: '饮料',
      legal_person_mobile: '18174666666',
      money: 88888,
      status: 0
    },
    {
      code: '4280172168844',
      mobile: '18174666666',
      name: '张三',
      region_name: '440000/440100',
      shop_name: '哇哈哈',
      business_scope: '饮料',
      legal_person_mobile: '18174666666',
      money: 88888,
      status: -1
    },
    {
      code: '4280172168844',
      mobile: '18174666666',
      name: '张三',
      region_name: '440000/440100',
      shop_name: '哇哈哈',
      business_scope: '饮料',
      legal_person_mobile: '18174666666',
      money: 88888,
      status: 0
    },
    {
      code: '4280172168844',
      mobile: '18174666666',
      name: '张三',
      region_name: '440000/440100',
      shop_name: '哇哈哈',
      business_scope: '饮料',
      legal_person_mobile: '18174666666',
      money: 88888,
      status: 0
    }
  ];
  public filterData = {
    code: '',
    status: '',
    regionId: ''
  };

  public shopFunction = ShopFunction;

  // 模态窗
  public editModalShow: boolean = false;
  public readModalShow: boolean = false;

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
  public toggleEditModal(): void {
    this.editModalShow = !this.editModalShow;
  }

  public toggleReadModal(): void {
    this.readModalShow = !this.readModalShow;
  }
}
