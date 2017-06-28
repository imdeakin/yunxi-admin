/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';

declare let layer: any;

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
  public tableList;
  public filterData = {
    mobile: '',
    status: ''
  };

  public shopFunction = ShopFunction;

  // 模态窗
  public editModalShow: boolean = false;
  public readShopDetailModalShow: boolean = false; // 门店详情的显示状态
  public readShopBankModalShow: boolean = false; // 门店银行卡详情的显示状态
  public readShopIdCardModalShow: boolean = false; // 门店身份证详情的显示状态
  public shopDetail; // 门店详情数据

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getAdminShopList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getAdminShopList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getAdminShopList(
      this.filterData.mobile,
      this.filterData.status,
      this.curPageIndex, this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public updateAdminShopStatus(shopId, status): void {
    this.apiCall.updateAdminShopStatus(
      shopId,
      status,
      () => {
        layer.msg('操作成功');
      },
      () => {
        layer.msg('操作失败');
      }
    );
  }

  // 门店核验
  public checkShop(shopId) {
    let index = layer.confirm('是否通过？', ['通过', '不通过', '取消'],
      () => {
        // 通过
        this.updateAdminShopStatus(shopId, 3);
        layer.close(index);
      },
      () => {
        // 不通过
        this.updateAdminShopStatus(shopId, 2);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    );
  }

  // 模态窗
  public toggleEditModal(): void {
    this.editModalShow = !this.editModalShow;
  }

  public toggleReadDetailModal(): void {
    this.readShopDetailModalShow = !this.readShopDetailModalShow;
  }

  public toggleReadShopBankModal(): void {
    this.readShopBankModalShow = !this.readShopBankModalShow;
  }

  public toggleReadShopIdCardModal(): void {
    this.readShopIdCardModalShow = !this.readShopIdCardModalShow;
  }
}
