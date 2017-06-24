/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit, DoCheck} from '@angular/core';
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
export class GoodsListComponent implements OnInit, DoCheck {
  public title = '商品列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: GoodsList[];
  public filterData = {
    sn: '',
    goodsName: '',
    status: ''
  };
  public storeFunction = StoreFunction;

  public storeGoodsTypeOptions; // 商品类型选项组
  public storeGoodsBrandOptions; // 商品品牌选项组

  // 模态窗
  public modalShow: boolean = false;
  public editInfoModalData;
  public modalGoodsTypeId;
  public modalGoodsId;
  public curModalStep: number = 0;
  public goodsAttrList;

  public editAttrModalShow: boolean = false;
  public editAttrModalData;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngDoCheck(): void {
    if (this.editInfoModalData && this.editInfoModalData.goods_type_id !== this.modalGoodsTypeId) {
      this.modalGoodsTypeId = this.editInfoModalData.goods_type_id;
      this.getStoreGoodsBrandList(this.editInfoModalData.goods_type_id);
    }

    if (this.editInfoModalData && this.editInfoModalData.goods_id !== this.modalGoodsId) {
      this.modalGoodsId = this.editInfoModalData.goods_id;
      this.getStoreGoodsAttrList(this.modalGoodsId);
    }
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getStoreGoodsList();
    this.getStoreGoodsTypeList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getStoreGoodsList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStoreGoodsList(
      this.filterData.sn,
      this.filterData.goodsName,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize, (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public getStoreGoodsTypeList(): void {
    this.apiCall.getStoreGoodsTypeList(
      '',
      '',
      (list) => {
        let arr = [];
        for (let i = 0, len = list.length; i < len; i++) {
          arr.push({
            value: list[i].goods_type_id,
            text: list[i].type_name
          });
        }
        this.storeGoodsTypeOptions = arr;
      });
  }

  public getStoreGoodsBrandList(goodsTypeId): void {
    this.apiCall.getStoreGoodsBrandList(
      goodsTypeId,
      '',
      '',
      (list) => {
        let arr = [];
        for (let i = 0, len = list.length; i < len; i++) {
          arr.push({
            value: list[i].goodsBrandId,
            text: list[i].name
          });
        }
        this.storeGoodsBrandOptions = arr;
      });
  }

  public getStoreGoodsInfo(sn): void {
    this.apiCall.getStoreGoodsInfo(
      sn,
      (data) => {
        this.editInfoModalData = data;
      });
  }

  public getStoreGoodsAttrList(goodsId): void {
    this.apiCall.getStoreGoodsAttrList(
      goodsId,
      '',
      '',
      (data) => {
        this.goodsAttrList = data;
      });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.getStoreGoodsInfo(item.sn);
    }
    this.modalShow = !this.modalShow;
    this.curModalStep = 0;
    if (!this.modalShow) {
      this.editInfoModalData = null;
    }
  }

  public nextModal(): void {
    this.curModalStep++;
  }

  public prevModal(): void {
    this.curModalStep--;
  }
}
