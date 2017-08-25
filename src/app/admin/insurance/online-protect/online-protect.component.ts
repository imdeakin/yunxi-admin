/**
 * Created by Kun on 2017/6/22 0008.
 */

import { Component,OnInit,ElementRef } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { InsuranceFunction } from '../data-type/insurance-function';
// import { NumberValidator } from '../../../com/ng-validate/number.validate';

declare let layer: any;

@Component({
  selector:'online-protect',
  templateUrl:'./online-protect.component.html',
  styleUrls:['./online-protect.component.css']  
})

export class OnlineProtectComponent implements OnInit {
  public title = '线上自助投保';
  public type = 1;//自助
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList=[];
  //快递
  public expressShow:boolean = false;
  public expressList = [];
  public insuranceOrderId;
  public expressId = '';
  public waybillNumber = '';

  public filterData = {
    searchName: '',
    regionId:'',
  };

  public modalData;
  public modalDataJson;
  public carBrandOptions;
  public systemFunction = InsuranceFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalAddShow: boolean = false;

  // 修改窗
  public updateShow:boolean = false;
  public money;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getInsuranceOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getInsuranceOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getInsuranceOrderList(this.filterData.searchName,this.type,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;

      this.total = total;
    });
  }

  public getInsuranceOrderDetails(insuranceOrderId):void{
    this.apiCall.getInsuranceOrderDetails(insuranceOrderId,(data)=>{
        this.modalData = data;
        if(this.modalData.coverage_list){
          this.modalDataJson = JSON.parse(this.modalData.coverage_list);
        }
      })
  }

  public updateExpress():void{
    this.apiCall.updateExpress(this.insuranceOrderId,this.expressId,this.waybillNumber,(data)=>{
        this.expressModal();
        this.getInsuranceOrderList();
    },(code,msg)=>{
      if(code == 1){
          layer.msg('请选择快递公司');
      }
    })
  }

  public getExpressList():void{
    this.apiCall.getExpressList((data)=>{
         data.forEach(element => {
           this.expressList.push({
              value:element.express_id,
              text:element.express_name
            })
      });
    })
  }

  //关闭订单
  public closeInsuranceOrder(insuranceOrderId):void{
    this.apiCall.closeInsuranceOrder(insuranceOrderId,(data)=>{
        this.getInsuranceOrderList();
    })
  }

  // 模态窗
  public toggleModal(insuranceOrderId?): void {
    if (insuranceOrderId){
        this.getInsuranceOrderDetails(insuranceOrderId);
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      this.modalDataJson = this.funcServer.emptyObj(this.modalDataJson);
    }
  }

  public expressModal(insuranceOorderId?):void{
    this.expressShow = !this.expressShow;
    if(insuranceOorderId){
      this.getExpressList();
      this.insuranceOrderId = insuranceOorderId;
    }
    if(!this.expressShow){
      this.expressList = [];
      this.expressId = '';
      this.waybillNumber = '';
    }
  }

  public modalSubmit(theForm):void {
    let submit = false;
    for(let key in theForm.controls){
      if(theForm.controls[key].errors){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }
    if(!submit){
       if (this.insuranceOrderId) {
      this.updateExpress();
      } 
    }
  }

  public updateInsuranceOrderMoney(theForm):void{
    let submit = false;
    for(let key in theForm.controls){
      // theForm.controls.key.errors;
      if(theForm.controls[key].errors){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }
    if(!submit){
      this.apiCall.updateInsuranceOrderMoney(this.insuranceOrderId,this.money,'','','',(data)=>{
        this.toggleUpdateModal();
        this.getInsuranceOrderList(1);
      });
    }
  }

  //修改弹窗
  public toggleUpdateModal(item?):void{
    this.updateShow = !this.updateShow;
    if(item){
      this.money = this.funcServer.deepCopy(item.money);
      this.insuranceOrderId = this.funcServer.deepCopy(item.insurance_order_id);
    }
    if(!this.updateShow){
      this.money = '';
      this.insuranceOrderId = '';
    }
  }

  //确认弹窗
  public verificationConfirm(insuranceOrderId): void {
    let adminId = '';
    let index = layer.confirm(
      '确认关闭订单吗？',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.closeInsuranceOrder(insuranceOrderId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
