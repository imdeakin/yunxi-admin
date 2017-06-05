/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaOrder} from '../data-type/youka-order';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';

@Component({
  selector: 'youka-order',
  templateUrl: './youka-order.component.html',
  styleUrls: ['./youka-order.component.css']
})
export class YoukaOrderComponent implements OnInit {
  public title = '油卡购买套餐的订单管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaOrder[];
  public filterData = {
    oilCard: '',
    classify: '',
    tradeMode: ''
  };

  public classifyOptions = [
    {
      value: '',
      text: '所有'
    },
    {
      value: 1,
      text: '默认套餐'
    },
    {
      value: 2,
      text: '优惠活动'
    },
    {
      value: 3,
      text: '会员专享'
    }
  ];

  public tradeModeOptions = [
    {
      value: '',
      text: '所有'
    },
    {
      value: 1,
      text: '支付宝'
    },
    {
      value: 2,
      text: '微信'
    },
    {
      value: 3,
      text: '云付通'
    },
    {
      value: 4,
      text: '余额'
    }
  ];

  public select_active = {
    classify: true
  };

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  /**
   * 获取油卡绑定列表
   */
  public getYoukaOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoukaOrderList(this.filterData.oilCard, this.filterData.tradeMode, this.filterData.classify, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getTaocanClassText(classify: number): string {
    return YoukaFunction.getYoucaTaocanClassText(classify);
  }

  public getTaocanOrderStatusText(status: number): string {
    return YoukaFunction.getYoukaOrderStatus(status);
  }

  public filterSubmit(): void {
    this.getYoukaOrderList(0);
  }
}
