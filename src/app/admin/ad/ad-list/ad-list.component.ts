/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {AdFunction} from '../data-type/ad-function';
import {AdList} from '../data-type/ad-list';

declare let layer: any;

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
    ad_id: '',
    ad_url:'',
    title: '',
    create_time: '',
    file_id: '',
    position_code: '',
    business_id: '',
    is_show: '',
    sort: ''
  };
  public editModalShow: boolean = false;
  public fileMoodaData ={
    ad_url:'',
    file_id:''
  }

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
        console.log(this.tableList);
        this.total = total;
      }
    );
  }

  // 模态窗

  public toggleEditModal(item?): void {
    console.log(item);
    if (item) {
      this.editModalData = this.funcServer.deepCopy(item);
      this.fileMoodaData.ad_url = this.editModalData.ad_url;
    }
    this.editModalShow = !this.editModalShow;
    if (!this.editModalShow) {
      this.fileMoodaData.ad_url = '';
      this.editModalData.file_id = '';
      this.editModalData = this.funcServer.emptyObj(this.editModalData);
      console.log(this.editModalData);
    }
  }

  public updateAd(): void {
    this.editModalData.file_id = this.fileMoodaData.file_id;
    this.apiCall.updateAd(
      this.editModalData.ad_id,
      this.editModalData.title,
      this.editModalData.file_id,
      this.editModalData.business_id,
      this.editModalData.is_show,
      this.editModalData.position_code,
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
      this.editModalData.file_id,
      this.editModalData.business_id,
      this.editModalData.is_show,
      this.editModalData.position_code,
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
    if (this.editModalData.ad_id) {
      this.updateAd();
    } else {
      this.addAd();
    }
  }

  public verificationConfirm(adId): void {
    let adminId = '';
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeAd(adId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
