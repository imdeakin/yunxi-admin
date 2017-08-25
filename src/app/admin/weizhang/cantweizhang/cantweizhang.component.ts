/**
 * Created by Kun on 2017/7/23 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {weiZhangFunction } from '../date-type/weizhang-function';
import {Router,Route, NavigationEnd, ActivatedRoute} from '@angular/router';
import { NumberValidator } from '../../../com/ng-validate/number.validate';

declare let layer: any;
declare var $:any;

@Component({
  selector: 'cantweizhang',
  templateUrl: './cantweizhang.component.html',
  styleUrls: ['./cantweizhang.component.css']
})
export class cantWeizhangComponent implements OnInit {
  public title = '不支持线上自助办理';
  public cantType = '2';
  public total = 0;
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [

  ];
  public profit_money;
  public trueMoney;
  public toogleModal :boolean = false;
  public filter = {
      orderId:'',
      punishMoney:0,
      serviceFee:0,
      searchName:''
  }
  public modalData;
  private selDate: string = '';
  private minDate: string = '1970/01/01';
  private maxDate: string = '9999/12/31';
  private disableDays: number[] = [0, 6];    //For Sunday and Saturday
  private toContainPrevMonth: boolean = false;
  private toContainNextMonth: boolean = false;
  private value: string = '';

  constructor(private elRef: ElementRef, private funcServer: FuncServer,private apiCall:ApiCall,private router: Router) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getCantWeiZhangList();
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

  public getWeiZhangfilterText(status:number):string{
    return weiZhangFunction.getweiZhangListText(status);
  }

     /**
   * 获取不可办理违章列表
   */
  
  public getCantWeiZhangList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCantWeiZhangList(this.filter.searchName,this.cantType,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  //受理不可办理
  public setOrderMoneyAndServiceFee():void{
      this.apiCall.setOrderMoneyAndServiceFee(this.modalData.order_id,this.modalData.punish_money,this.modalData.punish_points,this.modalData.service_fee,this.modalData.money,this.modalData.cxy_service_fee,(data)=>{
          this.toggleEditModal();
          this.getCantWeiZhangList();
      })
  }

  //办理不可办理
  public comfirmOrderOfDoing(orderId):void{
      this.apiCall.comfirmOrderOfDoing(orderId,(data)=>{
           this.getCantWeiZhangList();
      })
  }

  //完成订单

  public comfirmOrderOfFinish(orderId):void{
      this.apiCall.comfirmOrderOfFinish(orderId,(data)=>{
           this.getCantWeiZhangList();
      })
  }
  //模拟窗
  public toggleEditModal(item?){
      this.toogleModal = !this.toogleModal;
      if(item){
          this.modalData = this.funcServer.deepCopy(item);
          // this.modalData ={
          //   orderId:item.order_id,
          //   punishMoney:this.modalData.punishMoney,
          //   serviceFee:this.modalData.serviceFee,
          //   searchName:''
          // }
      }else{
         this.modalData = this.funcServer.emptyObj(this.modalData);
      } 
  }

  public modalSubmit(theForm){
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
      if(this.modalData.order_id){
          this.setOrderMoneyAndServiceFee()
      }else{
          this.toggleEditModal();
          this.getCantWeiZhangList();
      }
    }
  }

  public setInputDate(event) {
    this.value = event.target.value;
  }

  public setDate(date) {
    this.selDate = date;
  }

  public bink(orderId:string){
    this.router.navigateByUrl('/admin/cloudpay-verification-list/123456/abc/cas')
  }

  public sloveTrunc(data):number{
    let text  = Math.ceil(data);
    return text;
  }

    //关闭订单
  public closeOrder(orderId):void{
    this.apiCall.closeOrder(orderId,(data)=>{
        this.getCantWeiZhangList();
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
