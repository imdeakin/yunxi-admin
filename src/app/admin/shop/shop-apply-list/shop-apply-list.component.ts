/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {ShopFunction} from '../data-type/shop-function';
import {ShopApplyList} from '../data-type/shop-apply-list';

declare let layer: any;

@Component({
  selector: 'shop-apply-list',
  templateUrl: './shop-apply-list.component.html',
  styleUrls: ['./shop-apply-list.component.css']
})
export class ShopApplyListComponent implements OnInit {
  public title = '门店列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: ShopApplyList[] = [];
  public filterData = {
    mobile: '',
    status: '',
    regionId:''
  };

  public modalData;

  public shopFunction = ShopFunction;
  public modalShow:boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getMallSshopList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getMallSshopList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getMallSshopList(this.filterData.mobile, this.filterData.status,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getMallShop(shopId):void{
    this.apiCall.getMallShop(shopId,(data)=>{
      this.modalData = data;
      console.log(this.modalData);
    })
  }

  public updateMallShopStatus(shopId,status):void{
    this.apiCall.updateMallShopStatus(shopId,status,(data)=>{
        this.getMallSshopList(1);
    })
  }

  public toggleModal(item?):void{
    if(item){
      this.getMallShop(item.shop_id);
    }
    this.modalShow = !this.modalShow;
    if(!this.modalShow){
      this.modalData = null;
    }
  }
  
  // 核验弹窗
  public verificationConfirm(item): void {
    if(item){
        let index = layer.confirm(
        '请选择核验结果',
        {
          title: '核验',
          btn: ["通过", "不通过"]
        },
        () => {
          this.updateMallShopStatus(item.shop_id,3);
          layer.close(index);
        },
        () => {
          // this.updateMallShopStatus(adminId, item.sn, this.curOrderType, 0);
        }
      )
    }
  }
}
