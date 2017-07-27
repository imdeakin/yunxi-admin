/**
 * Created by Kun on 2017/7/20 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import { weiZhangFunction } from '../date-type/weizhang-function';
// import { FileUploadModule } from 'ng2-file-upload';
// import {FileUploader} from "ng2-file-upload";
import { ApiConfig } from '../../../http/api-config';

declare let layer: any;
declare var $:any;

@Component({
  selector: 'canweizhang',
  templateUrl: './canweizhang.component.html',
  styleUrls: ['./canweizhang.component.css']
})
export class canWeizhangComponent implements OnInit {
  public title = '线上自助办理';
  public cantype = '1';//可办理类型
  public total = 0;
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public youkaFunction = weiZhangFunction;
  public tableList = [];

  public detailPages:boolean = false;
  public priceModalShow:boolean = false;
  public afterUpdate:boolean = false;
  public need_data;
  public totalPrice;
  public orderId;
  public modalData = {
      orderId:'',
      carNumber:'',
      engineNumber:'',
      frameNumber:'',
      username:'',
      CardNo:'',
      mobile:'',
      pCount:'',
      serviceFee:0,
      carPhone:'',
      address:'',
      status:0,
      VerifyCode:'',
      searchName:'',
      CheliangZhengShu:'',
      QRCode:'',
      XingShiZhengHao:'',
      DrivingUrl:'',
      DrivingSecondUrl:'',
      DriverUrl:'',
      DriverSecondUrl:'',
  }

public orderConfig={
      Name:'',
      Phone:'',
      Address:'',
      CardNo:'',
      CarCode:'',
      CarDrive:'',
      FileNumber:"",
      FilePhone:"",
      CheliangZhengShu:"",
      QRCode:"",
      XingShiZhengHao:"",
      DrivingUrl:"",
      DrivingSecondUrl:"L",
      DriverUrl:"",
      DriverSecondUrl:"",
      VerifyCode:""
  }

public imgData:string = '';

constructor(private elRef: ElementRef,private apiConfig:ApiConfig, private apiCall: ApiCall, private funcServer: FuncServer) {
}

  public ngOnInit(): void {
    this.computeOnResize();
    this.getCanWeiZhangList();
    $(function(){
      $('.ng2-pagination').css({'position':'relative'});
    })
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public makeSurePay(handleStatus :number,cxyPayStatus :number){
    var ifData = false;
    if(handleStatus !== 0 && !cxyPayStatus){
        ifData = true;
    }
    console.log(ifData);
    return ifData;
  }

  public getWeiZhangfilterText(status:number):string{
    return weiZhangFunction.getweiZhangListText(status);
  }

  public getweiZhanghandleStatusText(status:number):string{
    return weiZhangFunction.getweiZhanghandleStatusText(status);
  }

  public getweiZhangCxyPayStatusText(status:number):string{
    return weiZhangFunction.getweiZhangCxyPayStatusText(status);
  }


   /**
   * 获取可办理违章列表
   */

  public getCanWeiZhangList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCanWeiZhangList(this.modalData.searchName,this.cantype,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      console.log(this.tableList);
      this.total = total;
    });
  }


  public getCanWeizhangData(item):void{
    this.apiCall.getCanWeiZhangData(item.order_id,(data)=>{
        console.log(data);
        this.fromModal(data)
    })
  }

  public fromModal(data){
    let car_info = data.car_info;
    this.need_data = data.need_data;

    if(data){
      this.modalData ={
          orderId:data.order_id,
          carNumber:car_info.car_number,
          engineNumber:car_info.engine_number.slice(-this.need_data.CarDriveLen),
          frameNumber:car_info.frame_number.slice(-this.need_data.CarCodeLen),
          username:car_info.name,
          mobile:car_info.mobile,
          pCount:car_info.license_number,
          carPhone:'',
          serviceFee:0,
          address:'',
          status:0,
          CardNo:'',
          VerifyCode:'',
          searchName:'',
          CheliangZhengShu:"",
          QRCode:"",
          XingShiZhengHao:"",
          DrivingUrl:"",
          DrivingSecondUrl:"",
          DriverUrl:"",
          DriverSecondUrl:"",
      }
    }else{
        this.modalData ={
          orderId:'',
          carNumber:'',
          engineNumber:'',
          frameNumber:'',
          username:'',
          mobile:'',
          pCount:'',
          carPhone:'',
          serviceFee:0,
          address:'',
          status:0,
          CardNo:'',
          VerifyCode:'',
          searchName:'',
          CheliangZhengShu:"",
          QRCode:"",
          XingShiZhengHao:"",
          DrivingUrl:"",
          DrivingSecondUrl:"L",
          DriverUrl:"",
          DriverSecondUrl:"",
      }
    }
  }

  public toggleEditModal(item?):void {
    this.detailPages = !this.detailPages;
    if(item){
      this.getCanWeizhangData(item)
    }
  }

  public submitModal():void{
    this.orderConfig = {
      Name:this.modalData.username,
      Phone:this.modalData.mobile,
      Address:this.modalData.address,
      CardNo:this.modalData.CardNo,
      CarCode:this.modalData.carNumber,
      CarDrive:this.modalData.frameNumber,
      FileNumber:this.modalData.frameNumber,
      FilePhone:this.modalData.carPhone,
      CheliangZhengShu:this.modalData.CheliangZhengShu,
      QRCode:this.modalData.QRCode,
      XingShiZhengHao:this.modalData.XingShiZhengHao,
      DrivingUrl:this.modalData.DrivingUrl,
      DrivingSecondUrl:this.modalData.DrivingSecondUrl,
      DriverUrl:this.modalData.DriverUrl,
      DriverSecondUrl:this.modalData.DriverSecondUrl,
      VerifyCode:this.modalData.VerifyCode
    };
    console.log(this.orderConfig);
    this.apiCall.postPeccancyManage(this.modalData.orderId,JSON.stringify(this.orderConfig),(data)=>{
        this.toggleEditModal();
        this.getCanWeiZhangList(1);
    })
  }

  //确认支付接口
  public comfirmCxyPayOrder(orderId:string):void{
      this.apiCall.comfirmCxyPayOrder(orderId,(data)=>{
        this.getCanWeiZhangList(1);
      })
  }

  //发送短信
  public sendMsg(carNumber){
    this.apiCall.postPeccancyMsg(carNumber,(data)=>{
        console.log(data);
    })
  }

  //修改价格接口
  public updateOrderMoney(){
    this.afterUpdate = !this.afterUpdate;
    this.apiCall.updateOrderMoney(this.orderId,this.totalPrice,(code)=>{
        this.afterUpdate = !this.afterUpdate; 
        this.togglePriceModal();
        this.getCanWeiZhangList();
    })
  }

  //修改价格模块
  public togglePriceModal(item?):void{
    this.priceModalShow = !this.priceModalShow;
    if(item){
      this.orderId = item.order_id;
    }
    if(!this.priceModalShow){
      this.totalPrice = '';
      this.orderId = '';
    }
  }

  //关闭订单
  public closeOrder(orderId):void{
    this.apiCall.closeOrder(orderId,(data)=>{
        this.getCanWeiZhangList();
    })
  }

  public verificationConfirm(orderId): void {
    let index = layer.confirm(
      '请确认关闭订单',
      {
        title: '是否确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.closeOrder(orderId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}

