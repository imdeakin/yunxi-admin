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
  public curPageIndex = 0;
  public tableList: GoodsTypeList[];
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
  public curItem: GoodsTypeList = {
    goods_type_id: '',
    p_goods_type_id: '',
    type_name: '',
    status: 0,
    code: '',
    level: '',
    curr_child_sort: 0,
    sort: 0
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

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.curItem = item;
    }
    this.modalShow = !this.modalShow;
  }

  public editSubmit(): void {
    this.apiCall.updateStoreGoodsTypeInfo(
      this.curItem.type_name,
      this.curItem.status,
      (data) => {
        this.toggleModal();
      }
    );
  }
}
