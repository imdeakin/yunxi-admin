/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {AdFunction} from '../data-type/ad-function';
import {AdList} from '../data-type/ad-list';

@Component({
  selector: 'ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  public title = '广告';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: AdList[];
  public filterData = {
    positionCode: '',
    businessId: '',
    title: ''
  };

  public adFunction = AdFunction;

  // 模态窗
  public editModalData = {
    adId: '',
    fileId: '',
    url: '',
    title: '',
    createTime: '',
    positionCode: '',
    businessId: '',
    isShow: '',
    sort: ''
  };
  public editModalShow: boolean = false;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getAdList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getAdList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getAdList(
      this.filterData.positionCode,
      this.filterData.businessId,
      this.filterData.title,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  // 模态窗

  public toggleEditModal(item?): void {
    if (item) {
      this.editModalData = {
        adId: item.ad_id,
        fileId: item.file_id,
        url: item.url,
        title: item.title,
        createTime: item.create_time,
        positionCode: item.position_code,
        businessId: item.business_id,
        isShow: item.is_show,
        sort: item.sort
      };
    }
    this.editModalShow = !this.editModalShow;
    if (!this.editModalShow) {
      this.editModalData = {
        adId: '',
        fileId: '',
        url: '',
        title: '',
        createTime: '',
        positionCode: '',
        businessId: '',
        isShow: '',
        sort: ''
      };
    }
  }

  public updateAd(): void {
    this.apiCall.updateAd(
      this.editModalData.adId,
      this.editModalData.title,
      this.editModalData.fileId,
      this.editModalData.businessId,
      this.editModalData.isShow,
      this.editModalData.positionCode,
      this.editModalData.sort,
      (data) => {
        this.toggleEditModal();
        this.getAdList(1);
      }
    );
  }

  public addAd(): void {
    this.apiCall.addAd(
      this.editModalData.title,
      this.editModalData.fileId,
      this.editModalData.businessId,
      this.editModalData.isShow,
      this.editModalData.positionCode,
      this.editModalData.sort,
      (data) => {
        this.toggleEditModal();
        this.getAdList(1);
      }
    );
  }

  public removeAd(adId): void {
    this.apiCall.removeAd(
      adId,
      (data) => {
        this.getAdList(1);
      }
    );
  }

  public modalSubmit(): void {
    if (this.editModalData.adId) {
      this.updateAd();
    } else {
      this.addAd();
    }
  }
}
