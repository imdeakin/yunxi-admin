/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, ElementRef, OnInit, DoCheck } from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import { OrderList } from '../data-type/order-list';
import {StoreFunction} from '../data-type/store-function';
import { element } from 'protractor';
import { NumberValidator } from '../../../com/ng-validate/number.validate';

declare let layer: any;
declare var $:any;

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public title = '订单管理';
  public dateEle;
  public allEle;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: OrderList[];
  public allPrice = 0;
  public allFreight = 0;
  public allMoney = 0;
  public waybillNumber;
  public expressList = [];
  public orderDetailsIds = [];
  public filterData = {
    sn: '',
    status: ''
  };
  public storeFunction = StoreFunction;

  // 模态窗
  public editModalShow: boolean = false;
  public editModalData = {
    orderId: '',
    sn: '',
    price: '',
    freight: '',
    consignee: '',
    mobile: '',
    address: ''
  };

  //订单数据模块
  public orderData = {
    orderDetailsIds:'',
    expressId:'',
    waybillNumber:''
  }

  public readModalShow: boolean = false;
  public readModalData;

  public orderListShow: boolean = false;
  public orderListDate;

  public allChecked:boolean = false;
  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer,
              private elementRef:ElementRef) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getStoreOrderList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getStoreOrderList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getStoreOrderList(
      this.filterData.sn,
      this.filterData.status,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public toggleEditModal(item?): void {
    if (item) {
      this.editModalData = {
        orderId: item.order_id,
        sn: item.sn,
        price: item.total_price,
        freight: item.freight,
        consignee: item.contact,
        mobile: item.contact_mobile,
        address: item.address
      }
    }
    this.editModalShow = !this.editModalShow;
  }

  public editSubmit(theForm): void {
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
      this.apiCall.updateStoreOrder(
      this.editModalData.orderId,
      parseFloat(this.editModalData.freight),
      parseFloat(this.editModalData.price),
      this.editModalData.consignee,
      this.editModalData.mobile,
      this.editModalData.address,
      (data) => {
        this.toggleEditModal();
        this.getStoreOrderList(1);
        }
      );
    }
  }

  public getMallOrderDetails(orderId):void{
    this.apiCall.getMallOrderDetails(
      orderId,
      (data)=>{
         this.readModalData = this.funcServer.deepCopy(data);
         this.readModalData.order_details.forEach(element => {
           this.allPrice = this.allPrice + element.number * element.price;
           this.allFreight = this.allFreight + element.freight;
           this.allMoney = this.allPrice + element.number * element.price + element.freight;
         });
      }
    )
  }

  //获取发货订单详情
  public getDeliveryMallOrderDetails(orderId):void{
    this.apiCall.getDeliveryMallOrderDetails(orderId,(data)=>{
      this.orderListDate = data;
    })
  }

  //获取物流列表
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

  //勾选
  public clickItem(e,item):void{
    console.log(item);
    let checkbox = e.target;
    let action = (checkbox.checked ? 'add':'remove');
    this.updateSelected(action,item);
    console.log(this.orderDetailsIds);
  }

  public updateSelected(action,item):void{
    if(action == 'add' && this.orderDetailsIds.findIndex(value => value == item) ==-1){
      this.orderDetailsIds.push(item);
    }
    if(action == 'remove' && this.orderDetailsIds.findIndex(value => value == item) != -1){
      this.orderDetailsIds.splice(this.orderDetailsIds.findIndex(value => value == item), 1)
    }
  }

  public allCheck():void{
      this.dateEle = this.elementRef.nativeElement.querySelectorAll('.check-box');
      this.allEle = this.elementRef.nativeElement.querySelector('.allSelect');
      console.log(this.allEle.checked);
      if(this.allEle.checked){
        this.dateEle.forEach(element => {
          element.click();
          this.allChecked = !this.allChecked;
          element.checked = true;
        }); 
      }else{
         this.dateEle.forEach(element => {
          this.allChecked = !this.allChecked;
          element.checked = false;
          this.orderDetailsIds = [];
        }); 
      }
  }
  
  //  public allNotCheck():void{
  //     this.dateEle = this.elementRef.nativeElement.querySelectorAll('.check-box')
  //     console.log(this.dateEle);
  //     this.dateEle.forEach(element => {
  //       this.allChecked = false;
  //       element.checked = false;
  //     });
  //     console.log(this.allChecked);
  // }

  public isCheck(item){
    console.log(this.orderDetailsIds.findIndex(value => value == item) > 0);
    return this.orderDetailsIds.findIndex(value => value == item) > 0;
  }

  //修改订单详情
  public updateStoreOrderExpress():void{
    this.orderData.orderDetailsIds = this.orderDetailsIds.join(",");
    this.apiCall.updateStoreOrderExpress(this.orderData.orderDetailsIds,this.orderData.expressId,this.orderData.waybillNumber,(data)=>{
      this.getDeliveryMallOrderDetails(this.orderListDate.order_id);
      this.getStoreOrderList();
      this.orderDetailsIds = [];
      this.orderData.waybillNumber = '';
      this.allEle = this.elementRef.nativeElement.querySelector('.allSelect');
      this.allEle.checked = false;
    },(data)=>{
      console.log(data);
      if(!this.orderData.orderDetailsIds){
        layer.msg('请选择要修改的商品');
      }
      else if(!this.orderData.waybillNumber){
        layer.msg('请填写快递单号');
      }
    })
  }

  public toggeleOrderModal(item?):void{
      this.orderListShow = !this.orderListShow;
          if(item){
            this.getExpressList();
            this.getDeliveryMallOrderDetails(item.order_id);
          }
          if(!this.orderListShow){
            this.orderListDate = '';
            this.allPrice = 0;
            this.allFreight = 0;
            this.allMoney = 0;
            this.expressList = [];
          }
    }


  //签收订单
  public signStoreOrder(orderId):void{
    this.apiCall.signStoreOrder(orderId,(data)=>{

    })
  }

  public toggleReadModal(item?): void {
    if (item) {
      this.getMallOrderDetails(item.order_id);
    }
    this.readModalShow = !this.readModalShow;
  }

    public verificationConfirm(orderId): void {
    let index = layer.confirm(
      '请确认订单是否签收',
      {
        title: '是否确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.signStoreOrder(orderId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
