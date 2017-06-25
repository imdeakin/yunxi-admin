/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {BrandList} from '../data-type/brand-list';
import {StoreFunction} from '../data-type/store-function';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit, DoCheck {
  public title = '品牌管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: BrandList[];
  public storeFunction = StoreFunction;
  public goodsBrandId;
  public goodsBrandIdOld;

  // 模态窗
  public modalShow: boolean = false;
  public modalData;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngDoCheck(): void {
    if (this.goodsBrandId !== this.goodsBrandIdOld) {
      this.goodsBrandIdOld = this.goodsBrandId;
      this.getStoreGoodsBrandList(1);
    }
  }

  public ngOnInit(): void {
    // 获取路由参数
    this.activatedRoute.params
      .switchMap((params: Params) => params['goodsBrandId'])
      .subscribe((goodsBrandId: string) => this.goodsBrandId = goodsBrandId);

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
      this.goodsBrandId,
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
    this.modalData = this.funcServer.deepCopy(item);
    this.modalShow = !this.modalShow;
  }
}
