/**
 * Created by hzt on 2017/6/24.
 */
import {Injectable} from '@angular/core'

declare let $: any;
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

@Injectable()
export class ScrollbarServer {
  /**
   * 滚动条美化
   * @param container 滚动条容器 jQuery的筛选对象
   */
  public init(container) {
    $(container).mCustomScrollbar();
  }
}
