/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {OrderList} from '../data-type/order-list';
import {StoreFunction} from '../data-type/store-function';

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
  public readModalData = {
    orderId: '',
    sn: '',
    price: '',
    freight: '',
    consignee: '',
    mobile: '',
    address: ''
  };

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

  public toggleReadModal(item?): void {
    if (item) {
      this.readModalData = {
        orderId: item.order_id,
        sn: item.sn,
        price: item.total_price,
        freight: item.freight,
        consignee: item.contact,
        mobile: item.contact_mobile,
        address: item.address
      }
    }
    this.readModalShow = !this.readModalShow;
  }
}
