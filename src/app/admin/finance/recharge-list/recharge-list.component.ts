/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {FinanceFunction} from '../data-type/finance-function';
import {CloudpayVerificationList} from '../data-type/cloudpay-verification-list';

declare let layer: any;

@Component({
  selector: 'recharge-list',
  templateUrl: './recharge-list.component.html',
  styleUrls: ['./recharge-list.component.css']
})
export class RechargeListComponent implements OnInit {
  public title = '充值列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: CloudpayVerificationList[];

  public financeFunction = FinanceFunction;

  // 当前列表的订单类型
  public curOrderType: number = parseInt(this.financeFunction.cloudpayOrderTypeOptions[0].value);
  public curOrderTypeText: string = this.financeFunction.cloudpayOrderTypeOptions[0].text;

  public filterData = {
    sn: '',
    type: this.curOrderType
  };

  // 模态窗
  public modalData = {
    order_id: '',
    sn: '',
    mobile: '',
    yft_account: '',
    create_time: '',
    money: '',
    status: ''
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;


  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getCloudpayVerificationList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getCloudpayVerificationList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCloudpayVerificationList(
      this.filterData.type,
      this.filterData.sn,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.curOrderType = parseInt(this.filterData.type + '');
        this.curOrderTypeText = this.financeFunction.getCloudpayOrderTypeText(this.curOrderType);
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public updatecloudpayVerification(adminId, sn, type, status): void {
    this.apiCall.updatecloudpayVerification(
      adminId,
      sn,
      type,
      status,
      () => {
        layer.msg('操作成功');
      },
      () => {
        layer.msg('操作失败，请重试');
      }
    );
  }

  // 模态窗
  public toggleReadModal(item?): void {
    if (item) {
      this.modalData = {
        order_id: item.order_id,
        sn: item.sn,
        mobile: item.mobile,
        yft_account: item.yft_account,
        create_time: item.create_time,
        money: item.money,
        status: item.status
      };
    }
    this.readModalShow = !this.readModalShow;
  }

  // 核验弹窗
  public verificationConfirm(item): void {
    let adminId = this.funcServer.getAdminId();
    let index = layer.confirm(
      '请选择核验结果',
      {
        title: '核验',
        btn: ["通过", "不通过"]
      },
      () => {
        this.updatecloudpayVerification(adminId, item.sn, this.curOrderType, 1);
        layer.close(index);
      },
      () => {
        this.updatecloudpayVerification(adminId, item.sn, this.curOrderType, 0);
      }
    )
  }
}
