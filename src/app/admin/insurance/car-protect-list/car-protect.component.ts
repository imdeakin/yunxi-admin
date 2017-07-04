/**
 * Created by Kun on 2017/6/22 0008.
 */

import { Component,OnInit,ElementRef } from '@angular/core';
import { FuncServer } from '../../../serv/func.server';
import { ApiCall } from '../../../http/api-call';
import { InsuranceFunction } from '../data-type/insurance-function';

declare let layer: any;

@Component({
  selector:'car-protect',
  templateUrl:'./car-protect.component.html',
  styleUrls:['./car-protect.component.css']  
})

export class CarProtectComponent implements OnInit {
  public title = '推荐的保险公司';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList=[];
  public filterData = {
    searchName: '',
    recommendInsurerId:'',
    name:'',
    provinceCode:'',
    insurerName:'',
    insurerId:'',
    code:'',
  };

  public addData = {
    shortnameId:'',
    insurerId:''
  }

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
    this.getCarBrandList();
    this.getRegionRecommendInsurerList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getRegionRecommendInsurerList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getRegionRecommendInsurerList(this.filterData.searchName, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  public getCarBrandList(): void {
    this.apiCall.getCarBrandList(
      '',
      '',
      '',
      (list) => {
        let options = [];
        for (let i = 0, len = list.length; i < len; i++) {
          options.push({
            value: list[i].car_brand_id,
            text: list[i].brand
          });
          this.carBrandOptions = options;
        }
      });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.filterData.recommendInsurerId = item.recommend_insurer_id;
      this.filterData.name = item.name;
      this.filterData.provinceCode = item.province_code;
      this.filterData.insurerName = item.insurer_name;
      this.filterData.code = item.code;
      this.filterData.insurerId = item.insurer_id;
    }
    this.modalShow = !this.modalShow;
    if (!this.modalShow) {
      this.filterData = {
       searchName: '',
       recommendInsurerId:'',
       name:'',
       provinceCode:'',
       insurerName:'',
       insurerId:'',
       code:'',
      }
    }
  }

  public updateRegionSupportInsurance(): void {
    console.log(this.filterData.insurerId)
    this.apiCall.updateRegionSupportInsurance(
      this.filterData.recommendInsurerId,
      this.filterData.insurerId,
      (data) => {
        this.toggleModal();
        this.getRegionRecommendInsurerList(1);
      }
    );
  }

  public removeRegionSupportInsurance(recommendInsurerId): void {
    this.apiCall.removeRegionSupportInsurance(
      recommendInsurerId,
      (data) => {
        this.getRegionRecommendInsurerList(1);
      }
    );
  }

  public modalSubmit(): void {
    if (this.filterData.recommendInsurerId) {
      this.updateRegionSupportInsurance();
    } 
  }

  public toggleAddModal():void{
    this.modalAddShow = !this.modalAddShow;
    if(!this.modalAddShow){
      this.addData = {
          shortnameId:'',
          insurerId:'',
      }
    }
  }

  public modaladdSubmit():void{
    if(this.addData.shortnameId && this.addData.insurerId){
          console.log(this.addData.shortnameId)
          console.log(this.addData.insurerId)
          this.apiCall.postRegionSupportInsurance(this.addData.shortnameId,this.addData.insurerId,(data)=>{
            this.getRegionRecommendInsurerList();
            this.toggleAddModal();
          })
    }
  }
  //确认弹窗
  public verificationConfirm(recommendInsurerId): void {
    let adminId = '';
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeRegionSupportInsurance(recommendInsurerId);
        layer.close(index);
      },
      () => {
        layer.close(index);
      }
    )
  }
}
