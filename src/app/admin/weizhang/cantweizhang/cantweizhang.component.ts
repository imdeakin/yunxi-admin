/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {weiZhangFunction } from '../date-type/weizhang-function';
import {Router,Route, NavigationEnd, ActivatedRoute} from '@angular/router';

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
      serviceFee:0,
      searchName:''
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
    this.getCantWeiZhangList();
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
    this.apiCall.getCanWeiZhangList(this.modalData.searchName,this.cantType,this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  //受理不可办理
  public setOrderMoneyAndServiceFee():void{
      this.apiCall.setOrderMoneyAndServiceFee(this.modalData.orderId,this.modalData.punishMoney,this.modalData.serviceFee,(data)=>{
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
          this.modalData ={
            orderId:item.order_id,
            punishMoney:this.modalData.punishMoney,
            serviceFee:this.modalData.serviceFee,
            searchName:''
          }
      }else{
         this.modalData ={
            orderId:'',
            punishMoney:0,
            serviceFee:0,
            searchName:''
          }
      } 
  }

  public modalSubmit(){
      if(this.modalData.orderId){
          this.setOrderMoneyAndServiceFee()
      }else{
          this.toggleEditModal();
          this.getCantWeiZhangList();
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
}
