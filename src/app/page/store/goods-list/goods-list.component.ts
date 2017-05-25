/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {GoodsList} from '../data-type/godds-list';
import {StoreFunction} from '../data-type/store-function';

@Component({
  selector: 'goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.css']
})
export class GoodsListComponent implements OnInit {
  public title = '商品管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: GoodsList[] = [
    {
      title: '4145asdasd45asd4',
      brand: '小花',
      type: 1,
      region_name: '440000/440100',
      update_time: '2017-02-02 12:00:00',
      status: 1,
      inventory: 123,
      freight: 123,
      price: 123,
    },
    {
      title: '4145asdasd45asd4',
      brand: '小花',
      type: 1,
      region_name: '440000/440100',
      update_time: '2017-02-02 12:00:00',
      status: 1,
      inventory: 123,
      freight: 123,
      price: 123,
    },
    {
      title: '4145asdasd45asd4',
      brand: '小花',
      type: 1,
      region_name: '440000/440100',
      update_time: '2017-02-02 12:00:00',
      status: 1,
      inventory: 123,
      freight: 123,
      price: 123,
    }
  ];
  public filterData = {
    title: '',
    status: '',
    inventory_from: '',
    inventory_to: '',
    type: ''
  };
  public storeFunction = StoreFunction;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPartnerList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPartnerList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    // this.apiCall.getPartnerList(this.filterData.sn,
    //   this.filterData.partnerLevelId,
    //   this.filterData.regionId,
    //   this.filterData.effectTime,
    //   this.curPageIndex,
    //   this.perPageSize, (list, total) => {
    //     this.tableList = list;
    //     this.total = total;
    //   });
  }
}
