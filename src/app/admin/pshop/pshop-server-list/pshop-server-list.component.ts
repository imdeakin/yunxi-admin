/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminFunc} from '../../../serv/admin.server';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';
import {PShopServerList} from '../data-type/pshop-server-list';

import 'rxjs/add/operator/map';

declare let layer: any;

@Component({
  selector: 'pshop-server-list',
  templateUrl: './pshop-server-list.component.html',
  styleUrls: ['./pshop-server-list.component.css']
})
export class PShopServerListComponent implements OnInit {
  public title = '门店服务';
  public userId: string;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: PShopServerList[];
  public filterData = {
    serviceName: '',
    onSale: '',
  };

  public shopFunction = PShopFunction;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc,
              public cityPickerServer: CityPickerServer) {
    this.userId = adminFunc.getAdminId();
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPersonShopServiceList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPersonShopServiceList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPersonShopServiceList(
      this.userId,
      this.filterData.serviceName,
      this.filterData.onSale,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }
}
