/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminFunc} from '../../../serv/admin.server';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {PShopFunction} from '../data-type/pshop-function';
import {PShopServerList} from '../data-type/pshop-server-list';

import 'rxjs/add/operator/map';

declare let layer: any;

@Component({
  selector: 'pshop-server-list',
  templateUrl: './pshop-server-list.component.html',
  styleUrls: ['./pshop-server-list.component.css']
})
export class PShopServerListComponent implements OnInit {
  public title = '门店服务';
  public userId: string;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: PShopServerList[];
  public on_sale;
  public filterData = {
    serviceName: '',
    onSale: '',
  };

  public file ={
    url:'',
    file_id:'',
  }

  public shopList=[];

  public toggleReadshow:boolean = false;//查看判断
  public toggleEditshow:boolean = false;//编辑判断
  public dataModal = {
    shop_id:'',
    shop_service_id:'',
    service_name:'',
    market_price:'',
    yx_price:'',
    on_sale:'',
    service_details:'',
    url:''
  };

  public shopFunction = PShopFunction;

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              private adminFunc: AdminFunc,
              public cityPickerServer: CityPickerServer) {
    // this.userId = adminFunc.getAdminId();
        this.userId = 'eaffcd33a7524293a2a4160698f2f642';
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getPersonShopServiceList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getPersonShopServiceList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getPersonShopServiceList(
      this.userId,
      this.filterData.serviceName,
      this.filterData.onSale,
      this.curPageIndex,
      this.perPageSize,
      (list, total) => {
        this.tableList = list;
        console.log(this.tableList);
        this.total = total;
      }
    );
  }

  public getPersonShopServiceInfo(item):void{
    this.apiCall.getPersonShopServiceInfo(item.shop_service_id,(data)=>{
        this.dataModal = this.funcServer.deepCopy(data[0]);
        this.file.url = this.dataModal.url;
        this.on_sale = this.dataModal.url;
    })
  }

  //门店名字和id
  public getShopIdShopName():void{
    this.shopList = [];
    this.apiCall.getShopIdShopName(this.userId,(data)=>{
     
       for(let i = 0;i<data.length;i++){
          let text = {
            value:data[i].shop_id,
            text:data[i].shop_name
          }
          this.shopList.push(text);
       }
        console.log(this.shopList);
    })
  }

  public addPersonShopService():void{

  }

  public updatePersonShopServiceInfo():void{
    this.apiCall.updatePersonShopServiceInfo(
      this.dataModal.shop_id,
      this.dataModal.shop_service_id,
      this.dataModal.service_name,
      this.dataModal.market_price,
      this.dataModal.yx_price,
      this.dataModal.on_sale,
      this.file.file_id,
      this.dataModal.service_details,
      (data)=>{
        this.toggleEditModal();
        this.getPersonShopServiceList(1);
      }
    )
  }
  

  //查看弹窗
  public toggleModal(item?):void{
    this.toggleReadshow = !this.toggleReadshow;
    if(item){
        this.getPersonShopServiceInfo(item)
    }
    if(!this.toggleReadshow){
        this.dataModal = this.funcServer.emptyObj(this.dataModal);
    }
  }

  //编辑增加弹窗
  public toggleEditModal(item?):void{
    this.getShopIdShopName();
    if(item){
     this.getPersonShopServiceInfo(item)
    }
    this.toggleEditshow = !this.toggleEditshow;
    if(!this.toggleEditshow ){
        this.dataModal = this.funcServer.emptyObj(this.dataModal);
        this. file ={
            url:'',
            file_id:'',
        }
    }
  }

  public submitModal(){
    if(this.dataModal.shop_service_id){
       this.updatePersonShopServiceInfo();
    }else{
       this.updatePersonShopServiceInfo();
    }
  }
}
