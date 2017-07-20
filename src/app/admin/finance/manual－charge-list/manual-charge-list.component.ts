/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {FinanceFunction} from '../data-type/finance-function';
import {BonusWithdrawListList} from '../data-type/bouns-withdraw-list';

declare let layer: any;

@Component({
  selector: 'manual-charge-list',
  templateUrl: './manual-charge-list.component.html',
  styleUrls: ['./manual-charge-list.component.css']
})
export class manualChargeComponent implements OnInit {
  public title = '人工充值列表';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: BonusWithdrawListList[];

  public financeFunction = FinanceFunction;

  public filterData = {
    searchItem:'',
    type:'',
    status:'',
  };

  // 模态窗
  public modalData = {
    searchItem:'',
    type:'',
    status:'',
  };
  public readModalShow: boolean = false;
  public editModalShow: boolean = false;


  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.manualChargeList()
    ;
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public manualChargeList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.manualChargeList(
      this.filterData.searchItem,
      this.filterData.type,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
      }
    );
  }

  public updateWithdrawStatusList(item,status):void{
    this.apiCall.updateWithdrawStatusList(item.withdraw_id,status,(data)=>{
        this.manualChargeList(1);
    })
  }

  public updateManuralCharge(item,status):void{
    this.apiCall.updateManuralCharge(item.manual_charge_id,status,(data)=>{
        this.manualChargeList(1);
    })
  }

  public updatesManualCharge(item,status):void{
    this.apiCall.updatesManualCharge(item.manual_charge_id,status,(data)=>{
        this.manualChargeList(1);
    })
  }

  // 核验弹窗
  public verificationConfirm(item): void {
    let index = layer.confirm(
      '请选择核验结果',
      {
        title: '核验',
        btn: ["通过", "不通过"]
      },
      () => {
        this.updateManuralCharge(item,1);
        layer.close(index);
      },
      () => {
        this.updateManuralCharge(item,2);
        layer.close(index);
      }
    )
  }

  public verificationConfirms(item): void {
    let index = layer.confirm(
      '请选择核验结果',
      {
        title: '核验',
        btn: ["通过", "不通过"]
      },
      () => {
        this.updatesManualCharge(item,3);
        layer.close(index);
      },
      () => {
        this.updatesManualCharge(item,4);
        layer.close(index);
      }
    )
  }
}
