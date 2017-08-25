/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import {ApiCall} from '../../../http/api-call';
import {YoukaTaocan} from '../data-type/youka-taocan';
import {YoukaFunction} from '../data-type/youka-function';
import {FuncServer} from '../../../serv/func.server';
import {NgForm} from "@angular/forms";
import { NumberValidator } from '../../../com/ng-validate/number.validate';

declare let layer: any;

@Component({
  selector: 'youka-taocan',
  templateUrl: './youka-taocan.component.html',
  styleUrls: ['./youka-taocan.component.css']
})
export class YoukaTaocanComponent implements OnInit,DoCheck{
  public title = '油卡套餐';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: YoukaTaocan[];
  public youkaFunction = YoukaFunction;


  // 模态窗
  public modalShow: boolean = false;
  public editModalShow: boolean = false;

  public modalData = {
    oilPackageId:'',
    classify:'',
    payMoney:0,
    amount: 0,
    needPoints: 0,
    type: '', 
    eachs: 1,
    oilCardType:'',
    described: ''
  };

  constructor(private elRef: ElementRef, private apiCall: ApiCall, private funcServer: FuncServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getYoukaTaocanList();
  }

  public ngDoCheck():void{
    if(this.modalData.type === '3' || this.modalData.type === '2'){
      this.modalData.classify = '2';
    }

    if(this.modalData.type === '1'){
      this.modalData.classify = '1';
    }
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
   * 获取油卡套餐列表
   */
  public getYoukaTaocanList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getYoukaTaocanList(this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getTaocanClassText(classify: number): string {
    return YoukaFunction.getYoucaTaocanClassText(classify);
  }

  public getTaocanTypeText(type: number): string {
    return YoukaFunction.getYoukaTaocanPayTypeText(type);
  }

   public getTaocanOilCardTypeText(type: number): string {
    return YoukaFunction.getYoukaTypeText(type);
  }

  // 模态窗
  public toggleModal(data?): void {
    this.editModalShow = !this.editModalShow;
    if(data){
        this.modalData = {
          oilPackageId:data.oil_package_id,
          classify:data.classify,
          payMoney:data.pay_money,
          eachs: data.eachs,
          needPoints: data.need_points,
          type: data.type,
          amount: data.amount,
          oilCardType:data.oil_card_type,
          described: data.described
      };
    }
  }

   /**
   * 编辑油卡套餐
   */
  
  public toggleEditModal(data?):void{
    this.editModalShow = !this.editModalShow;
      if(data){
        this.modalData = {
          oilPackageId:data.oil_package_id,
          classify:data.classify,
          payMoney:data.pay_money,
          eachs: data.eachs,
          needPoints: data.need_points,
          type: data.type,
          amount: data.amount,
          oilCardType:data.oil_card_type,
          described: data.described
        };
    }if(!this.editModalShow){
      this.modalData = {
        oilPackageId:'',
        classify:'',
        payMoney:0,
        amount: 0,
        needPoints: 0,
        type: '',
        eachs: 0,
        oilCardType:'',
        described: ''
      }
    } 
  }

  public updateYoukaTaocanList(oilPackageId?): void {
   this.modalData.payMoney = this.modalData.amount * this.modalData.eachs;
   this.apiCall.updateYoukaTaocanList(
        this.modalData.oilPackageId,
        this.modalData.classify,
        this.modalData.payMoney,
        this.modalData.amount,
        this.modalData.eachs,
        this.modalData.type,
        this.modalData.oilCardType,
        this.modalData.needPoints,
        this.modalData.described,
        (data) =>{
          this.toggleEditModal();
          this.getYoukaTaocanList(1);
        }
    ); 
  }

   /**
   * 增加油卡套餐列表
   */
  public addYoukaTancanlist(): void {
  this.modalData.payMoney = this.modalData.amount * this.modalData.eachs;
    this.apiCall.addYoukaTaocanList(
      this.modalData.classify,
      this.modalData.payMoney,
      this.modalData.amount,
      this.modalData.eachs,
      this.modalData.type,
      this.modalData.oilCardType,
      this.modalData.needPoints,
      this.modalData.described,
      (data) => {
        this.toggleEditModal();
        this.getYoukaTaocanList(1);
      },
      (data,msg) =>{
        layer.msg('请选择类型')
      }
    );
  }

  public removeYoukaTancanList(oilPackageId): void {
    this.apiCall.deleteYoukaTaocanList(
      oilPackageId,
      (data) => {
        this.getYoukaTaocanList(1);
      }
    );
  }

  public verificationConfirm(oilPackageId): void {
    let adminId = '';
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeYoukaTancanList(oilPackageId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
  

  public modalSubmit(theForm): void {
    let submit = false;
    for(let key in theForm.controls){
      // theForm.controls.key.errors;
      if(theForm.controls[key].errors){
        layer.msg(`填写错误，请按照指示填写`)
        submit = true;
        break;
      }
    }

    if (!submit&&this.modalData.oilPackageId) {
      this.updateYoukaTaocanList(this.modalData.oilPackageId);
    } else {
      this.addYoukaTancanlist();
    }
  }
}



  