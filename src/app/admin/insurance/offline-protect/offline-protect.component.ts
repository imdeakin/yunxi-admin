/**
 * Created by Kun on 2017/6/22 0008.
 */

import { Component,OnInit,ElementRef } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { InsuranceFunction } from '../data-type/insurance-function';

declare let layer: any;

@Component({
  selector:'offline-protect',
  templateUrl:'./offline-protect.component.html',
  styleUrls:['./offline-protect.component.css']  
})

export class OfflineProtectComponent implements OnInit {
  public title = '不支持线上自助投保';
  public type = 2;
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList=[{
    sn:'1234',
    mobile:'18028106489',
    total_price:'100',
    true_price:'1234',
    back_points:'2324',
    profit:'23',
    create_time:'2017-06-26 20:53:02',
    status:'4'
  }];

    //快递
  public expressShow:boolean = false;
  public expressList = [];
  public insuranceOrderId;
  public expressId;
  public waybillNumber;
  public filterData = {
    searchName: '',
    recommendInsurerId:'',
    name:'',
    provinceCode:'',
    insurerName:'',
    insurerId:'',
    code:'',
  };

  public modalData;

  public carBrandOptions;
  public systemFunction = InsuranceFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalAddShow: boolean = false;

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
      console.log(this.tableList);
      this.total = total;
    });
  }

  public getInsuranceOrderDetails(insuranceOrderId):void{
    this.apiCall.getInsuranceOrderDetails(insuranceOrderId,(data)=>{
        this.modalData = data;
        console.log(this.modalData);
      })
  }

  public updateExpress():void{
    this.apiCall.updateExpress(this.insuranceOrderId,this.expressId,this.waybillNumber,(data)=>{
        this.expressModal();
        this.getInsuranceOrderList();
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

  // 模态窗
  public toggleModal(insuranceOrderId?): void {
    if (insuranceOrderId){
        this.getInsuranceOrderDetails(insuranceOrderId);
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      
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


//   // 模态窗
//   public toggleModal(item?): void {
//     if (item) {
//       this.filterData.recommendInsurerId = item.recommend_insurer_id;
//       this.filterData.name = item.name;
//       this.filterData.provinceCode = item.province_code;
//       this.filterData.insurerName = item.insurer_name;
//       this.filterData.code = item.code;
//       this.filterData.insurerId = item.insurer_id;
//     }
//     this.modalShow = !this.modalShow;
//     if (!this.modalShow) {
//       this.filterData = {
//        searchName: '',
//        recommendInsurerId:'',
//        name:'',
//        provinceCode:'',
//        insurerName:'',
//        insurerId:'',
//        code:'',
//       }
//     }
//   }

//   public updateRegionSupportInsurance(): void {
//     console.log(this.filterData.insurerId)
//     this.apiCall.updateRegionSupportInsurance(
//       this.filterData.recommendInsurerId,
//       this.filterData.insurerId,
//       (data) => {
//         this.toggleModal();
//         this.getRegionRecommendInsurerList(1);
//       }
//     );
//   }

//   public removeRegionSupportInsurance(recommendInsurerId): void {
//     this.apiCall.removeRegionSupportInsurance(
//       recommendInsurerId,
//       (data) => {
//         this.getRegionRecommendInsurerList(1);
//       }
//     );
//   }

//   public modalSubmit(): void {
//     if (this.filterData.recommendInsurerId) {
//       this.updateRegionSupportInsurance();
//     } 
//   }

//   public toggleAddModal():void{
//     this.modalAddShow = !this.modalAddShow;
//     if(!this.modalAddShow){
//       this.addData = {
//           shortnameId:'',
//           insurerId:'',
//       }
//     }
//   }

//   public modaladdSubmit():void{
//     if(this.addData.shortnameId && this.addData.insurerId){
//           console.log(this.addData.shortnameId)
//           console.log(this.addData.insurerId)
//           this.apiCall.postRegionSupportInsurance(this.addData.shortnameId,this.addData.insurerId,(data)=>{
//             this.getRegionRecommendInsurerList();
//             this.toggleAddModal();
//           })
//     }
//   }
//   //确认弹窗
//   public verificationConfirm(recommendInsurerId): void {
//     let adminId = '';
//     let index = layer.confirm(
//       '请确认删除结果',
//       {
//         title: '确认',
//         btn: ["确认", "取消"]
//       },
//       () => {
//         this.removeRegionSupportInsurance(recommendInsurerId);
//         layer.close(index);
//       },
//       () => {
//         layer.close(index);
//       }
//     )
//   }
}
