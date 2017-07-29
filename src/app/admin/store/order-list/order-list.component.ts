/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {OrderList} from '../data-type/order-list';
import {StoreFunction} from '../data-type/store-function';

declare let layer: any;

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public title = '订单管理';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: OrderList[];
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
  public readModalShow: boolean = false;
  public readModalData;

  public orderListShow: boolean = false;
  public orderListDate;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
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

  public editSubmit(): void {
    this.apiCall.updateStoreOrder(
      this.editModalData.orderId,
      parseFloat(this.editModalData.price) + parseFloat(this.editModalData.freight),
      this.editModalData.consignee,
      this.editModalData.mobile,
      this.editModalData.address,
      (list, total) => {
        this.tableList = list;
        this.total = total;
      }
    );
  }

  public getMallOrderDetails(orderId):void{
    this.apiCall.getMallOrderDetails(
      orderId,
      (data)=>{
         this.readModalData = this.funcServer.deepCopy(data);
         console.log(this.readModalData);
      }
    )
  }

  //获取发货订单详情
  public getDeliveryMallOrderDetails(orderId):void{
    this.apiCall.getDeliveryMallOrderDetails(orderId,(data)=>{
      this.orderListDate = data;
      console.log(this.orderListDate);
    })
  }

  //获取物流列表
  // public updateStoreOrderExpress():void{
  //   this.apiCall.updateStoreOrderExpress(orderDetailsIds, expressId, waybillNumber,(data)=>{

  //   })
  // }
    public toggeleOrderModal(item?):void{
      this.orderListShow = !this.orderListShow;
          if(item){
            this.getDeliveryMallOrderDetails(item.order_id);
          }
          if(!this.orderListShow){
            this.orderListDate = '';
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
