/**
 * Created by Deakin on 2017/5/19 0019.
 */
import {Injectable, ElementRef} from '@angular/core'

Injectable()
export class FuncServer {

  /**
   * 计算更新内容高度
   */
  public getContentHeight(elRef: ElementRef): number {
    let height = elRef.nativeElement.firstChild.offsetHeight - 40;
    return height;
  }

  /**
   * 计算更新每页条数
   */
  public getPerPageSize(contentHeight: number): number {
    let itemHeight = 53;
    let maxHeight = contentHeight - 70 - 50 - 67;
    let size = Math.floor(maxHeight / itemHeight);
    let minSize = 1;
    let maxSize = 30;
    if (size < minSize) {
      size = minSize;
    } else if (size > maxSize) {
      size = maxSize;
    }
    return size;
  }
}
