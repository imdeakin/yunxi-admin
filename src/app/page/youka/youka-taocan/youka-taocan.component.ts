/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaTaocan} from '../data-type/youka-taocan';

@Component({
  selector: 'youka-taocan',
  templateUrl: './youka-taocan.component.html',
  styleUrls: ['./youka-taocan.component.css']
})
export class YoukaTaocanComponent implements OnInit {
  public title = '油卡套餐';
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 0;
  public tableList: YoukaTaocan[];

  constructor(private elRef: ElementRef, private apiCall: ApiCall) {
  }

  public ngOnInit(): void {
    this.updateContentHeight();
    window.addEventListener('resize', () => {
      this.updateContentHeight();
    });
    this.getYoukaTaocanList();
  }

  /**
   * 获取油卡套餐列表
   */
  public getYoukaTaocanList(): void {
    this.apiCall.getYoukaTaocanList(this.curPageIndex + 1, this.perPageSize, (list) => {
      this.tableList = list;
    });
  }

  public getTaocanClassText(classify: number): string {
    return YoukaTaocan.getClassText(classify);
  }

  public getTaocanTypeText(type: number): string {
    return YoukaTaocan.getTypeText(type);
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
