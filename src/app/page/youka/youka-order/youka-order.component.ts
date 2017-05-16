/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaOrder} from '../data-type/youka-order';
import {YoukaFunction} from '../data-type/youka-function';

@Component({
  selector: 'youka-order',
  templateUrl: './youka-order.component.html',
  styleUrls: ['./youka-order.component.css']
})
export class YoukaOrderComponent implements OnInit {
  public title = '油卡绑定列表';
  public contentHeight = 0;
  public total = 1;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: YoukaOrder[];
  public filter_oilCard: string = '';
  public filter_tradeMode: number;
  public filter_classify: number;

  constructor(private elRef: ElementRef, private apiCall: ApiCall) {
  }

  public ngOnInit(): void {
    this.updateContentHeight();
    window.addEventListener('resize', () => {
      this.updateContentHeight();
    });
    this.getYoukaOrderList();
  }

  /**
   * 获取油卡绑定列表
   */
  public getYoukaOrderList(): void {
    this.apiCall.getYoukaOrderList(this.filter_oilCard, this.filter_tradeMode, this.filter_classify, this.curPageIndex + 1, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total || 1;
    });
  }

  public getTaocanClassText(classify: number): string {
    return YoukaFunction.getYoucaTaocanClassText(classify);
  }

  public getTaocanOrderStatusText(status: number): string {
    return YoukaFunction.getYoukaOrderStatus(status);
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
