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
  public curPageIndex = 0;
  public tableList: PartnerList[] = [
    {
      partner_id: '4145asdasd45asd4',
      partner_name: '小花',
      partner_code: 'Asdasd465',
      region_name: '440000/440100',
      mobile: '18174668888',
      partner_level: '1',
      effect_time: '2017-02-02 12:00:00',
    },
    {
      partner_id: '4145asdasd45asd4',
      partner_name: '小花',
      partner_code: 'Asdasd465',
      region_name: '440000/440100',
      mobile: '18174668888',
      partner_level: '1',
      effect_time: '2017-02-02 12:00:00',
    },
    {
      partner_id: '4145asdasd45asd4',
      partner_name: '小花',
      partner_code: 'Asdasd465',
      region_name: '440000/440100',
      mobile: '18174668888',
      partner_level: '1',
      effect_time: '2017-02-02 12:00:00',
    }
  ];
  public filterData = {
    sn: '',
    partnerLevelId: '',
    regionId: '',
    effectTime: ''
  };
  public partnerFunction = PartnerFunction;

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
}
