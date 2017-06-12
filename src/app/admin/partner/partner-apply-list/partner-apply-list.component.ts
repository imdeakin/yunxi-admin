/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PartnerApplyList} from '../data-type/partner-apply-list';
import {PartnerFunction} from '../data-type/partner-function';

@Component({
  selector: 'partner-apply-list',
  templateUrl: './partner-apply-list.component.html',
  styleUrls: ['./partner-apply-list.component.css']
})
export class PartnerApplyListComponent implements OnInit {
  public title = '合作人申请表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: PartnerApplyList[];
  public filterData = {
    mobile: '',
    createTime: '',
    partnerLevelId: '',
    regionId: '',
    status: ''
  };
  public partnerFunction = PartnerFunction;

  // 模态窗
  public readModalShow: boolean = false;
  public readModalData;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              public funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPartnerApplyList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPartnerApplyList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPartnerApplyList(
      this.filterData.mobile,
      this.filterData.createTime,
      this.filterData.partnerLevelId,
      this.filterData.regionId,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public getPartnerApplyInfo(partnerApplyId): void {
    this.apiCall.getPartnerApplyInfo(partnerApplyId, (data) => {
      this.readModalData = data;
    });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.getPartnerApplyInfo(item.partner_apply_id);
    }
    this.readModalShow = !this.readModalShow;
  }
}
