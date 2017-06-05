/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {ArticleList} from '../data-type/article-list';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  public title = '方案管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: ArticleList[] = [
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 1,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    },
    {
      title: '4280172168844',
      content: '云洗计划..',
      type: 0,
      create_time: '2017-06-03 13:41:55',
      author: '张三',
    }
  ];
  public filterData = {
    title: ''
  };

  public systemFunction = SystemFunction;

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer, public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaUserList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getYoukaUserList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    // this.apiCall.getYoukaOrderList(this.filterData.mobile, this.filterData.level, this.filterData.regionId, this.curPageIndex, this.perPageSize, (list, total) => {
    //   this.tableList = list;
    //   this.total = total;
    // });
  }
}
