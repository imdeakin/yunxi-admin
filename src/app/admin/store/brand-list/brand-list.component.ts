/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {BrandList} from '../data-type/brand-list';
import {StoreFunction} from '../data-type/store-function';

import 'rxjs/add/operator/switchMap';

declare let layer: any;

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  public title = '品牌管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: BrandList[];
  public storeFunction = StoreFunction;
  public goodsTypeId;
  public goodsTypeIdOld;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    goods_brand_id: '',
    goods_type_id: '',
    type_name: '',
    name: '',
    e_name: '',
    file_id: '',
    url: '',
    story: '',
    described: ''
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    // 获取路由参数
    this.activatedRoute.params
      .map((params: Params) => params['goodsTypeId'])
      .subscribe((goodsTypeId: string) => {
        this.goodsTypeId = goodsTypeId;
        this.getStoreGoodsBrandList(1);
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

  public getStoreGoodsBrandList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStoreGoodsBrandList(
      this.goodsTypeId,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.modalData = this.funcServer.deepCopy(item);
    }

    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.modalData = {
        goods_brand_id: '',
        goods_type_id: '',
        type_name: '',
        name: '',
        e_name: '',
        file_id: '',
        url: '',
        story: '',
        described: ''
      }
    }
  }

  public addStoreGoodsBrandInfo(): void {
    this.apiCall.addStoreGoodsBrandInfo(
      this.goodsTypeId,
      this.modalData.name,
      this.modalData.e_name,
      this.modalData.file_id,
      this.modalData.url,
      this.modalData.story,
      this.modalData.described,
      () => {
        layer.msg("添加成功");
        this.getStoreGoodsBrandList(1);
        this.toggleModal();
      },
      () => {
        layer.msg("添加失败");
      }
    )
  }

  public updateStoreGoodsBrandInfo(): void {
    this.apiCall.updateStoreGoodsBrandInfo(
      this.modalData.goods_brand_id,
      this.goodsTypeId,
      this.modalData.name,
      this.modalData.e_name,
      this.modalData.file_id,
      this.modalData.url,
      this.modalData.story,
      this.modalData.described,
      () => {
        layer.msg("编辑成功");
        this.getStoreGoodsBrandList(1);
        this.toggleModal();
      },
      () => {
        layer.msg("编辑失败");
      }
    )
  }

  public modalSubmit(theForm): void {
    let submit = false;
    for(let key in theForm.controls){
      // theForm.controls.key.errors;
      if(theForm.controls[key].errors){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }
    if(!submit){
        if (this.modalData.goods_brand_id) { // 编辑
          this.updateStoreGoodsBrandInfo();
        } else { // 添加
          this.addStoreGoodsBrandInfo();
        }
    }
  }
}
