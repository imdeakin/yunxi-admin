/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {BrandList} from '../data-type/brand-list';
import {StoreFunction} from '../data-type/store-function';

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  public title = '品牌管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: BrandList[] = [
    {
      title: '4145asdasd45asd4',
      update_time: '2017-02-02 12:00:00',
      status: 1
    },
    {
      title: '4145asdasd45asd4',
      update_time: '2017-02-02 12:00:00',
      status: 1
    },
    {
      title: '4145asdasd45asd4',
      update_time: '2017-02-02 12:00:00',
      status: 1
    },
    {
      title: '4145asdasd45asd4',
      update_time: '2017-02-02 12:00:00',
      status: 1
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

  // 模态窗
  public modalShow: boolean = false;

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

  // 模态窗
  public toggleModal(): void {
    this.modalShow = !this.modalShow;
  }
}
