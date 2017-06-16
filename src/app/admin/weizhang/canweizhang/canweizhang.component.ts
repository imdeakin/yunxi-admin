/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';

@Component({
  selector: 'canweizhang',
  templateUrl: './canweizhang.component.html',
  styleUrls: ['./canweizhang.component.css']
})
export class canWeizhangComponent implements OnInit {
  public title = '可办理违章';
  public cantype = '1';//可办理类型
  public total = 0;
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [
    {
      account: '18128789828', // 账号
      car_num: '粤A88828', // 车牌号
      fine: '200', // 罚款
      charge: '25', // 服务费
      commission: '20', // 佣金
      amount: '245', // 支付总额
      order_time: '2017-03-03', // 订单时间
      position: '广州' // 所属城市
    },
    {
      account: '18128789828', // 账号
      car_num: '粤A88828', // 车牌号
      fine: '200', // 罚款
      charge: '25', // 服务费
      commission: '20', // 佣金
      amount: '245', // 支付总额
      order_time: '2017-03-03', // 订单时间
      position: '广州' // 所属城市
    },
    {
      account: '18128789828', // 账号
      car_num: '粤A88828', // 车牌号
      fine: '200', // 罚款
      charge: '25', // 服务费
      commission: '20', // 佣金
      amount: '245', // 支付总额
      order_time: '2017-03-03', // 订单时间
      position: '广州' // 所属城市
    }
  ];

  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';
  private detailPages:boolean = false;
  private modalData ={
      carUrl:''
  }
  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getCanWeiZhangList();
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
   * 获取可办理违章列表
   */
  
  public getCanWeiZhangList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCanWeiZhangList(this.cantype,this.curPageIndex, this.perPageSize, (list, total) => {
      console.log(list)
      this.tableList = list;
      this.total = total;
    });
  }

  public toggleEditModal(item):void {
    this.detailPages = !this.detailPages;
    console.log(this.modalData.carUrl)
  }

  public modalSubmit():void{  
    
  }
}

