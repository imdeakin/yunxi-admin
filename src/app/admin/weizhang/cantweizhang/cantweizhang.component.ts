/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {weiZhangFunction } from '../date-type/weizhang-function';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cantweizhang',
  templateUrl: './cantweizhang.component.html',
  styleUrls: ['./cantweizhang.component.css']
})
export class cantWeizhangComponent implements OnInit {
  public title = '不可办理违章';
  public cantType = '2';
  public total = 0;
  public contentHeight = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList = [

  ];
  public toogleModal :boolean = false;
  public modalData = {
      orderId:'',
      punishMoney:0,
      serviceFee:0
  }
  
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

  public getWeiZhangfilterText(status:number):string{
    return weiZhangFunction.getweiZhangListText(status);
  }

     /**
   * 获取不可办理违章列表
   */
  
  public getCanWeiZhangList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCanWeiZhangList(this.cantType,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  //受理不可办理
  public setOrderMoneyAndServiceFee():void{
      this.apiCall.setOrderMoneyAndServiceFee(this.modalData.orderId,this.modalData.punishMoney,this.modalData.serviceFee,(data)=>{
          this.toggleEditModal();
          this.getCanWeiZhangList();
      })
  }

  //办理不可办理
  public comfirmOrderOfDoing(orderId):void{
      this.apiCall.comfirmOrderOfDoing(orderId,(data)=>{
           this.getCanWeiZhangList();
      })
  }

  //完成订单

  public comfirmOrderOfFinish(orderId):void{
      this.apiCall.comfirmOrderOfFinish(orderId,(data)=>{
           this.getCanWeiZhangList();
      })
  }
  //模拟窗
  public toggleEditModal(item?){
      this.toogleModal = !this.toogleModal;
      if(item){
          this.modalData ={
            orderId:item.order_id,
            punishMoney:this.modalData.punishMoney,
            serviceFee:this.modalData.serviceFee
          }
      }else{
         this.modalData ={
            orderId:'',
            punishMoney:0,
            serviceFee:0
          }
      } 
  }

  public modalSubmit(){
      if(this.modalData.orderId){
          this.setOrderMoneyAndServiceFee()
      }else{
          this.toggleEditModal();
          this.getCanWeiZhangList();
      }

  }

  public setInputDate(event) {
    this.value = event.target.value;
  }

  public setDate(date) {
    this.selDate = date;
  }

  public bink(orderId:string){
    this.router.navigate(['/admin/cloudpay-verification-list'])
  }
}
