/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit, DoCheck} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {GoodsList} from '../data-type/godds-list';
import {StoreFunction} from '../data-type/store-function';
import {UploadImage} from '../../../com/ng2-file-upload';

declare let layer: any;

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
  public goodsTypeAttrOptions; // 商品类型参数选项组
  public goodsTypeAttrValOptions; // 商品类型参数值选项组

  public goodsAttrList; // 商品基本参数列表
  public goodsTypeAttrList; // 商品类型参数列表
  public goodsTypeAttrValList; // 商品类型参数值列表

  // 模态窗
  public editBaseInfoModalShow: boolean = false; // 商品基本信息的显示状态
  public editBaseInfoModalData; // 商品基本信息数据

  public editGoodsDetailModalShow: boolean = false; // 商品详情编辑窗的显示状态
  public editGoodsDetailModalData = { // 商品详情编辑窗的数据
    content: ''
  };

  public editGoodsSlideModalShow: boolean = false; // 商品轮播图编辑窗的显示状态

  public goodsAttrListModalShow: boolean = false; // 商品基本参数列表的显示状态
  public editGoodsAttrModalShow: boolean = false; // 商品基本参数编辑窗的显示状态
  public editGoodsAttrModalData = { // 商品基本参数编辑窗的数据
    attr_id: '',
    param_id: '',
    value_id: ''
  };

  public curGoodsId; // 当前选中的商品ID
  public curGoodsTypeId; // 当前选中的商品类型ID
  public originalGoodsSlideList = []; // 当前选中的商品的未经处理的轮播图数组
  public curGoodsSlideList: UploadImage[] = []; // 当前选中的商品的轮播图数组
  public oldGoodsSlideList: UploadImage[] = []; // 缓存起来 用于比较

  public editAttrModalShow: boolean = false;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngDoCheck(): void {

    // 监听所选中的商品类型ID，更新商品品牌列表
    if (this.editBaseInfoModalData && this.editBaseInfoModalData.goods_type_id !== this.curGoodsTypeId) {
      this.curGoodsTypeId = this.editBaseInfoModalData.goods_type_id;

      // 更新商品品牌列表
      if (this.curGoodsTypeId !== undefined && this.curGoodsTypeId !== '') {
        this.getStoreGoodsBrandList();

      } else {
        this.storeGoodsBrandOptions = [];
      }
    }

    // 监听所选中的商品ID，更新商品参数列表
    if (this.editBaseInfoModalData && this.editBaseInfoModalData.goods_id !== this.curGoodsId) {
      this.curGoodsId = this.editBaseInfoModalData.goods_id;
      this.getStoreGoodsAttrList();
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

  public getStoreGoodsBrandList(): void {
    this.apiCall.getStoreGoodsBrandList(
      this.curGoodsTypeId,
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
        this.editBaseInfoModalData = data;
      });
  }

  // 模态窗
  public toggleEditInfoModal(item?): void {
    if (item) { // 传递数据用于编辑
      this.editBaseInfoModalData = null; // 先清空数据
      this.getStoreGoodsInfo(item.sn);

    } else if (!this.editBaseInfoModalShow) { // 将显示出来用于添加
      this.editBaseInfoModalData = {
        goods_type_id: '',
        goods_brand_id: '',
        business_name: '',
        producer: '',
        on_sale: '',
        freight: '',
        described: ''
      };
    }

    this.editBaseInfoModalShow = !this.editBaseInfoModalShow;
  }

  // 保存商品基本信息
  public saveGoodsBaseInfo(): void {
    // 保存

    // 进入下一步
    this.toggleEditGoodsDetailModal(this.editBaseInfoModalData.instruction)
  }

  /*
   * 商品详情编辑
   */
  public toggleEditGoodsDetailModal(detail?): void {
    if (detail !== undefined) {
      this.editGoodsDetailModalData = {
        content: detail
      };
    } else {
      this.editGoodsDetailModalData = {
        content: ''
      };
    }
    this.editGoodsDetailModalShow = !this.editGoodsDetailModalShow;
  }

  // 保存详情
  public saveGoodsDetail(): void {
    // 保存
    this.editBaseInfoModalData.instruction = this.editGoodsDetailModalData.content;

    // 进入下一步
    this.toggleEditGoodsSlideModal(this.curGoodsId);
  }

  /*
   * 商品轮播图编辑
   */
  public toggleEditGoodsSlideModal(goodsId?): void {
    if (goodsId) {
      this.curGoodsSlideList = null;
      this.getStoreGoodsSlideList(goodsId);
    }
    this.editGoodsSlideModalShow = !this.editGoodsSlideModalShow;
  }

  public getStoreGoodsSlideList(goodsId): void {
    this.apiCall.getStoreGoodsSlideList(
      goodsId,
      (list) => {
        this.originalGoodsSlideList = list;

        // 整理数据
        let imgList = [];
        for (let i = 0, len = list.length; i < len; i++) {
          let item = list[i];
          imgList.push({
            url: item.url,
            file_id: item.file_id,
            selected: !!item.is_cover
          });
        }

        this.curGoodsSlideList = imgList;
        this.oldGoodsSlideList = this.funcServer.deepCopy(imgList);
      },
      () => {
        this.curGoodsSlideList = [];
        this.oldGoodsSlideList = [];
      }
    );
  }

  // 保存商品轮播图
  public saveGoodsSlide(): void {
    if (this.curGoodsSlideList != this.oldGoodsSlideList) {
      let delList = this.originalGoodsSlideList;
      let addList = this.curGoodsSlideList;

      // 开始删除
      for (let i = 0; i < delList.length; i++) {
        let item = delList[i];
        this.apiCall.removeStoreGoodsSlide(
          item.goods_pic_id,
          () => {
          }
        );
      }

      // 开始添加
      for (let i = 0; i < addList.length; i++) {
        let item = addList[i];

        this.apiCall.addStoreGoodsSlide(
          this.curGoodsId,
          item.file_id,
          (data) => {

            // 设置成封面
            if (item.selected) {
              this.apiCall.setToShopSlideCover(
                data.goods_pic_id,
                this.curGoodsId,
                () => {
                }
              );
            }

          }
        );

      }
    }

    // 进入下一步
    this.toggleGoodsAttrListModal();
  }

  /*
   * 商品类型参数列表
   */

  public getStoreGoodsAttrList() {
    this.apiCall.getStoreGoodsAttrList(
      this.curGoodsId,
      (list) => {
        this.goodsAttrList = list;
      }
    )
  }

  public removeGoodsAttr(attrId) {
    let index = layer.confirm('确定删除吗？', ['确定', '取消'],
      () => {
        this.apiCall.removeStoreGoodsAttr(
          attrId,
          () => {
            layer.msg("删除成功");
            this.getStoreGoodsAttrList();
            layer.close(index);
          },
          () => {
            layer.msg("删除失败");
            layer.close(index);
          }
        );
      });
  }

  public toggleGoodsAttrListModal(): void {
    this.getStoreGoodsAttrList();

    this.goodsAttrListModalShow = !this.goodsAttrListModalShow;

    if (!this.goodsAttrListModalShow) {
      this.goodsAttrList = null;
    }
  }

  /*
   * 编辑商品类型参数
   */

  // 获取类型参数列表
  public getStoreGoodsTypeAttrList() {
    this.apiCall.getStoreGoodsTypeAttrList(
      this.curGoodsTypeId,
      '0',
      (list) => {
        this.goodsTypeAttrList = list;

        let arr = [];
        for (let i = 0, len = list.length; i < len; i++) {
          arr.push({
            value: list[i].param_id,
            text: list[i].name
          });
        }
        this.goodsTypeAttrOptions = arr;
      }
    )
  }

  // 获取类型参数值列表
  public getStoreGoodsTypeAttrValList(paramId) {
    this.apiCall.getStoreGoodsTypeAttrValList(
      paramId,
      (list) => {
        this.goodsTypeAttrValList = list;

        let arr = [];
        for (let i = 0, len = list.length; i < len; i++) {
          arr.push({
            value: list[i].value_id,
            text: list[i].value
          });
        }
        this.goodsTypeAttrValOptions = arr;
      }
    )
  }

  public goodsTypeAttrChange(paramId) {
    this.editGoodsAttrModalData.param_id = paramId;
    this.getStoreGoodsTypeAttrValList(paramId);
  }

  public toggleEditGoodsAttrModal(item?): void {
    if (item) {
      this.editGoodsAttrModalData = this.funcServer.deepCopy(item);
      console.log(this.editGoodsAttrModalData);
    }

    if (!this.editGoodsAttrModalShow) { // 显示的话 要执行这里
      // 获取商品类型参数列表
      this.goodsTypeAttrOptions = null;
      this.goodsTypeAttrValOptions = [];
      this.getStoreGoodsTypeAttrList();
    }

    this.editGoodsAttrModalShow = !this.editGoodsAttrModalShow;

    if (!this.editGoodsAttrModalShow) {
      this.editGoodsAttrModalData = this.funcServer.emptyObj(this.editGoodsAttrModalData);
    }
  }

  public addGoodsAttr(): void {
    console.log(this.curGoodsId);
    this.apiCall.addStoreGoodsAttr(
      this.curGoodsId,
      this.editGoodsAttrModalData.param_id,
      this.editGoodsAttrModalData.value_id,
      (data) => {
        this.toggleEditGoodsAttrModal();
        this.getStoreGoodsAttrList();
      }
    );
  }

  public editGoodsAttr(): void {
    this.apiCall.updateStoreGoodsAttr(
      this.editGoodsAttrModalData.attr_id,
      this.curGoodsId,
      this.editGoodsAttrModalData.param_id,
      this.editGoodsAttrModalData.value_id,
      (data) => {
        this.toggleEditGoodsAttrModal();
        this.getStoreGoodsAttrList();
      }
    );
  }

  public editGoodsAttrSubmit(): void {
    if (this.editGoodsAttrModalData.attr_id) {
      this.editGoodsAttr();
    } else {
      this.addGoodsAttr();
    }
  }
}
