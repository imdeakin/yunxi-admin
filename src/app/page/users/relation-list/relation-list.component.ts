/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {RelationList} from '../data-type/relation-list';
import {UsersFunction} from '../data-type/users-function';

@Component({
  selector: 'relation-list',
  templateUrl: './relation-list.component.html',
  styleUrls: ['./relation-list.component.css']
})
export class RelationListComponent implements OnInit {
  public title = '推荐关系';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: RelationList[] = [
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    },
    {
      mobile: '18174668888',
      create_time: '2017-12-20 12:50:55',
      parent_member_account: '18174668888',
      member_level_name: '1',
      level: '18174668888',
      level2: '18174668888',
      level3: '18174668888',
    }
  ];
  public filterData = {
    mobile: ''
  };
  public usersFunction = UsersFunction;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getRelationList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getRelationList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getRelationList(this.filterData.mobile, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }
}
