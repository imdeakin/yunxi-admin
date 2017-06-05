/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarSeriesList} from '../data-type/car-series-list';

@Component({
  selector: 'car-series-list',
  templateUrl: './car-series-list.component.html',
  styleUrls: ['./car-series-list.component.css']
})
export class CarSeriesListComponent implements OnInit {
  public title = '管理员';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: CarSeriesList[] = [
    {
      id: '4280172168844',
      series: 'A8',
    },
    {
      id: '4280172168844',
      series: 'A8',
    },
    {
      id: '4280172168844',
      series: 'A8',
    },
    {
      id: '4280172168844',
      series: 'A8',
    },
    {
      id: '4280172168844',
      series: 'A8',
    }
  ];
  public filterData = {
    series: ''
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
