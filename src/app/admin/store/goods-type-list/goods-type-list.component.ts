/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {GoodsTypeList} from '../data-type/goods-type-list';
import {StoreFunction} from '../data-type/store-function';

@Component({
  selector: 'goods-type-list',
  templateUrl: './goods-type-list.component.html',
  styleUrls: ['./goods-type-list.component.css']
})
export class GoodsTypeListComponent implements OnInit {
  public title = '类型管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: GoodsTypeList[];
  public filterData = {
    title: '',
    status: '',
    inventory_from: '',
    inventory_to: '',
    type: ''
  };
  public storeFunction = StoreFunction;
  public goodsTypeOptions;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    goods_type_id: '',
    p_goods_type_id: '',
    type_name: '',
    status: '',
    code: '',
    level: '',
    curr_child_sort: '',
    sort: ''
  };

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
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

  public getStoreGoodsTypeList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStoreGoodsTypeList(
      this.curPageIndex,
      this.perPageSize, (list, total) => {
        this.tableList = list;
        this.total = total;
      });
  }

  public updateGoodsTypeOptions(exceptGoodsTypeId?): void {
    let goodsTypeList = this.tableList;
    let arr = [];
    for (let i = 0, len = goodsTypeList.length; i < len; i++) {
      let item = goodsTypeList[i];
      if (item.goods_type_id !== exceptGoodsTypeId) {
        arr.push({
          value: item.goods_type_id,
          text: item.type_name
        });
      }
    }
    this.goodsTypeOptions = arr;
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.modalData = {
        goods_type_id: item.goods_type_id,
        p_goods_type_id: item.p_goods_type_id,
        type_name: item.type_name,
        status: item.status,
        code: item.code,
        level: item.level,
        curr_child_sort: item.curr_child_sort,
        sort: item.sort
      };
      this.updateGoodsTypeOptions(item.goods_type_id);
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      this.modalData = {
        goods_type_id: '',
        p_goods_type_id: '',
        type_name: '',
        status: '',
        code: '',
        level: '',
        curr_child_sort: '',
        sort: ''
      };
    }
  }

  public addGoodsType(): void {
    this.apiCall.addStoreGoodsTypeInfo(
      this.modalData.p_goods_type_id,
      this.modalData.type_name,
      this.modalData.level,
      this.modalData.curr_child_sort,
      this.modalData.sort,
      (data) => {
        this.toggleModal();
        this.getStoreGoodsTypeList(1);
      }
    );
  }

  public editGoodsType(): void {
    this.apiCall.updateStoreGoodsTypeInfo(
      this.modalData.goods_type_id,
      this.modalData.p_goods_type_id,
      this.modalData.type_name,
      this.modalData.level,
      this.modalData.curr_child_sort,
      this.modalData.sort,
      (data) => {
        this.toggleModal();
        this.getStoreGoodsTypeList(1);
      }
    );
  }

  public editSubmit(): void {
    if (this.modalData.goods_type_id) {
      this.editGoodsType();
    } else {
      this.addGoodsType();
    }
  }

  public removeGoodsType(goodsTypeId): void {
    this.apiCall.removeStoreGoodsTypeInfo(
      goodsTypeId,
      (data) => {
        this.getStoreGoodsTypeList(1);
      }
    );
  }
}
