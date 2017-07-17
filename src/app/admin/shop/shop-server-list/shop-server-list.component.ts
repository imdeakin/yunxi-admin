/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';
import {ShopServerList} from '../data-type/shop-server-list';

import 'rxjs/add/operator/map';

declare let layer: any;

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
  public curPageIndex = 1;
  public tableList: ShopServerList[];
  public curShopId: string;
  public curShopIdOld: string;

  public shopFunction = ShopFunction;

  constructor(private elRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public getParams(shopId) {
    return shopId;
  }

  public ngOnInit(): void {
    // 获取路由参数
    this.activatedRoute.params
      .map((params: Params) => this.getParams(params['shopId']))
      .subscribe((shopId: string) => {
        this.curShopId = shopId;
        this.getAdminShopServiceList(1);
      });

    this.computeOnResize();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getAdminShopServiceList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getAdminShopServiceList(
      this.curShopId,
      '',
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
      });
  }

  public updateAdminShopServiceStatus(curSaleStatus): void {
    let status = curSaleStatus == 0 ? 1 : 0;
    let tips = status == 0 ? '是否下架？' : '是否上架';
    let index = layer(tips, {btn: ['确定', '取消']},
      () => {
        this.apiCall.updateAdminShopServiceStatus(
          this.curShopId,
          status,
          () => {
            layer.msg('操作成功');
            layer.close(index);
            this.getAdminShopServiceList(1);
          },
          () => {
            layer.msg('操作失败');
            layer.close(index);
          }
        );
      }
    );
  }
}
