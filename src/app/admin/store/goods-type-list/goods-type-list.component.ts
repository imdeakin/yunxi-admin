/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {GoodsTypeList} from '../data-type/goods-type-list';
import {StoreFunction} from '../data-type/store-function';

declare let layer: any;

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
  public goodsTypeOptions;  // 商品类型选项组
  public goodsTypeAttrList; // 商品类型参数列表
  public goodsTypeAttrValList; // 商品类型参数值列表

  // 模态窗
  public editTypeModalShow: boolean = false; // 商品类型编辑窗的显示状态
  public typeAttrListModalShow: boolean = false; // 商品类型参数列表的显示状态
  public editTypeAttrModalShow: boolean = false; // 商品类型参数编辑窗的显示状态
  public typeAttrValListModalShow: boolean = false; // 商品类型参数值列表的显示状态
  public editTypeAttrValModalShow: boolean = false; // 商品类型参数值编辑窗的显示状态
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
  public curGoodsTypeId; // 商品类型参数列表的商品类型ID
  public curGoodsTypeAttrId; // 商品类型参数列表的商品类型参数ID
  public editTypeAttrModalData = { // 商品类型参数编辑窗的数据
    param_id: '',
    name: '',
    is_sku: '',
    sort: ''
  };
  public editTypeAttrValModalData = { // 商品类型参数值编辑窗的数据
    value_id: '',
    param_id: '',
    value: '',
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

  /*
   * 商品类型
   */

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
    this.editTypeModalShow = !this.editTypeModalShow;
    if (!this.editTypeModalShow) {
      this.modalData = this.funcServer.emptyObj(this.modalData);
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

  /*
   * 商品类型参数列表
   */

  public getStoreGoodsTypeAttrList() {
    this.apiCall.getStoreGoodsTypeAttrList(
      this.curGoodsTypeId,
      '',
      (list) => {
        this.goodsTypeAttrList = list;
      }
    )
  }

  public removeTypeAttr(paramId) {
    let index = layer.confirm('确定删除吗？', ['确定', '取消'],
      () => {
        this.apiCall.removeStoreGoodsTypeAttr(
          paramId,
          () => {
            layer.msg("删除成功");
            this.getStoreGoodsTypeAttrList();
            layer.close(index);
          },
          () => {
            layer.msg("删除失败");
            layer.close(index);
          }
        )
      });
  }

  public toggleTypeAttrListModal(goodsTypeId?): void {
    if (goodsTypeId) {
      this.curGoodsTypeId = goodsTypeId;
      this.getStoreGoodsTypeAttrList();
    }

    this.typeAttrListModalShow = !this.typeAttrListModalShow;

    if (!this.typeAttrListModalShow) {
      this.goodsTypeAttrList = null;
    }
  }

  /*
   * 编辑商品类型参数
   */

  public toggleEditTypeAttrModal(item?): void {
    if (item) {
      this.editTypeAttrModalData = this.funcServer.deepCopy(item);
    }

    this.editTypeAttrModalShow = !this.editTypeAttrModalShow;

    if (!this.editTypeAttrModalShow) {
      this.editTypeAttrModalData = this.funcServer.emptyObj(this.editTypeAttrModalData)
    }
  }

  public addTypeAttr(): void {
    this.apiCall.addStoreGoodsTypeAttr(
      this.curGoodsTypeId,
      this.editTypeAttrModalData.name,
      this.editTypeAttrModalData.is_sku,
      this.editTypeAttrModalData.sort,
      (data) => {
        this.toggleEditTypeAttrModal();
        this.getStoreGoodsTypeAttrList();
      }
    );
  }

  public editTypeAttr(): void {
    this.apiCall.updateStoreGoodsTypeAttr(
      this.editTypeAttrModalData.param_id,
      this.curGoodsTypeId,
      this.editTypeAttrModalData.name,
      this.editTypeAttrModalData.is_sku,
      this.editTypeAttrModalData.sort,
      (data) => {
        this.toggleEditTypeAttrModal();
        this.getStoreGoodsTypeAttrList();
      }
    );
  }

  public editTypeAttrSubmit(): void {
    if (this.editTypeAttrModalData.param_id) {
      this.editTypeAttr();
    } else {
      this.addTypeAttr();
    }
  }

  /*
   * 商品类型参数值列表
   */

  public getStoreGoodsTypeAttrValList() {
    this.apiCall.getStoreGoodsTypeAttrValList(
      this.curGoodsTypeAttrId,
      (list) => {
        this.goodsTypeAttrValList = list;
      }
    )
  }

  public removeTypeAttrVal(valueId) {
    let index = layer.confirm('确定删除吗？', ['确定', '取消'],
      () => {
        this.apiCall.removeStoreGoodsTypeAttrVal(
          valueId,
          () => {
            layer.msg("删除成功");
            this.getStoreGoodsTypeAttrList();
            layer.close(index);
          },
          () => {
            layer.msg("删除失败");
            layer.close(index);
          }
        )
      });
  }

  public toggleTypeAttrValListModal(paramId?): void {
    if (paramId) {
      this.curGoodsTypeAttrId = paramId;
      this.getStoreGoodsTypeAttrValList();
    }

    this.typeAttrValListModalShow = !this.typeAttrValListModalShow;

    if (!this.typeAttrValListModalShow) {
      this.goodsTypeAttrValList = null;
    }
  }

  /*
   * 编辑商品类型参数值
   */

  public toggleEditTypeAttrValModal(item?): void {
    if (item) {
      this.editTypeAttrValModalData = this.funcServer.deepCopy(item);
    }

    this.editTypeAttrValModalShow = !this.editTypeAttrValModalShow;

    if (!this.editTypeAttrValModalShow) {
      this.editTypeAttrValModalData = this.funcServer.emptyObj(this.editTypeAttrModalData);
    }
  }

  public addTypeAttrVal(): void {
    this.apiCall.addStoreGoodsTypeAttrVal(
      this.curGoodsTypeAttrId,
      this.curGoodsTypeId,
      this.editTypeAttrValModalData.value,
      this.editTypeAttrValModalData.sort,
      (data) => {
        this.toggleEditTypeAttrValModal();
        this.getStoreGoodsTypeAttrValList();
      }
    );
  }

  public editTypeAttrVal(): void {
    this.apiCall.updateStoreGoodsTypeAttrVal(
      this.editTypeAttrValModalData.value_id,
      this.curGoodsTypeAttrId,
      this.curGoodsTypeId,
      this.editTypeAttrValModalData.value,
      this.editTypeAttrValModalData.sort,
      (data) => {
        this.toggleEditTypeAttrValModal();
        this.getStoreGoodsTypeAttrValList();
      }
    );
  }

  public editTypeAttrValSubmit(): void {
    if (this.editTypeAttrValModalData.value_id) {
      this.editTypeAttrVal();
    } else {
      this.addTypeAttrVal();
    }
  }

}
