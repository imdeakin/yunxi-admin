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
  public curPageIndex = 0;
  public tableList: PartnerApplyList[] = [
    {
      partner_apply_id: '4145asdasd45asd4',
      agreement_code: 'Asdasd465',
      name: '小花',
      mobile: '18174668888',
      region_name: '440000/440100',
      partner_level: '1',
      create_time: '2017-02-02 12:00:00',
      handler: '云洗经理',
      status: 1,
    },
    {
      partner_apply_id: '4145asdasd45asd4',
      agreement_code: 'Asdasd465',
      name: '小花',
      mobile: '18174668888',
      region_name: '440000/440100',
      partner_level: '1',
      create_time: '2017-02-02 12:00:00',
      handler: '云洗经理',
      status: 1,
    },
    {
      partner_apply_id: '4145asdasd45asd4',
      agreement_code: 'Asdasd465',
      name: '小花',
      mobile: '18174668888',
      region_name: '440000/440100',
      partner_level: '1',
      create_time: '2017-02-02 12:00:00',
      handler: '云洗经理',
      status: 1,
    }
  ];
  public filterData = {
    mobile: '',
    createTime: '',
    partnerLevelId: '',
    regionId: '',
    status: ''
  };
  public partnerFunction = PartnerFunction;

  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';

  // 模态窗
  public modalShow: boolean = false;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
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
    this.apiCall.getPartnerApplyList(this.filterData.mobile,
      this.filterData.createTime,
      this.filterData.partnerLevelId,
      this.filterData.regionId,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize, (list, total) => {
        this.tableList = list;
        this.total = total;
      });
  }

  public setInputDate(event) {
    this.value = event.target.value;
    this.filterData.createTime = this.value;
  }

  public setDate(date) {
    this.selDate = date;
  }

  // 模态窗
  public toggleModal(): void {
    this.modalShow = !this.modalShow;
  }
}
