/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaBind} from '../data-type/youka-bind';
import {YoukaFunction} from '../data-type/youka-function';

@Component({
  selector: 'youka-bind',
  templateUrl: './youka-bind.component.html',
  styleUrls: ['./youka-bind.component.css']
})
export class YoukaBindComponent implements OnInit {
  public title = '油卡绑定列表';
  public contentHeight = 0;
  public total = 1;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: YoukaBind[];
  public search_oilCard: string = '';

  constructor(private elRef: ElementRef, private apiCall: ApiCall) {
  }

  public ngOnInit(): void {
    this.updateContentHeight();
    window.addEventListener('resize', () => {
      this.updateContentHeight();
    });
    this.getYoukaBindList();
  }

  /**
   * 获取油卡绑定列表
   */
  public getYoukaBindList(): void {
    this.apiCall.getYoukaBindList(this.search_oilCard, this.curPageIndex + 1, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total || 1;
    });
  }

  public getYoukaDefaultText(classify: number): string {
    return YoukaFunction.getDefaultText(classify);
  }

  public getYoukaTypeText(type: number): string {
    return YoukaFunction.getYoukaTypeText(type);
  }

  /**
   * 计算更新内容高度
   */
  public updateContentHeight(): void {
    this.contentHeight = this.elRef.nativeElement.firstChild.offsetHeight - 40;
    this.updatePerPageSize();
  }

  /**
   * 计算更新每页条数
   */
  public updatePerPageSize(): void {
    let itemHeight = 53;
    let maxHeight = this.contentHeight - 70 - 50 - 67;
    let size = Math.floor(maxHeight / itemHeight);
    let minSize = 1;
    let maxSize = 30;
    if (size < minSize) {
      size = minSize;
    } else if (size > maxSize) {
      size = maxSize;
    }
    this.perPageSize = size;
  }
}
