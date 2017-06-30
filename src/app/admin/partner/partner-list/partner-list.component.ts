/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PartnerList} from '../data-type/partner-list';
import {PartnerFunction} from '../data-type/partner-function';

@Component({
  selector: 'partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {
  public title = '合作人管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: PartnerList[];
  public filterData = {
    sn: '',
    partnerLevelId: '',
    regionId: '',
    effectTime: '',
    mobile:''
  };
  public partnerFunction = PartnerFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalData;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPartnerList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPartnerList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPartnerList(this.filterData.sn,
      this.filterData.partnerLevelId,
      this.filterData.regionId,
      this.filterData.effectTime,
      this.curPageIndex,
      this.perPageSize, (list, total) => {
        this.tableList = list;
        this.total = total;
      });
  }

  public getPartnerInfo(partnerId): void {
    this.apiCall.getPartnerInfo(partnerId, (data) => {
      this.modalData = data;
    });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.getPartnerInfo(item.partner_id);
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      this.modalData = null;
    }
  }
}
