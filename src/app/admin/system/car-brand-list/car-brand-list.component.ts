/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarBrandList} from '../data-type/car-brand-list';

@Component({
  selector: 'car-brand-list',
  templateUrl: './car-brand-list.component.html',
  styleUrls: ['./car-brand-list.component.css']
})
export class CarBrandListComponent implements OnInit {
  public title = '管理员';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: CarBrandList[];
  public filterData = {
    carBrandId: '',
    carBrand: ''
  };

  public systemFunction = SystemFunction;

  // 模态窗
  public modalShow: boolean = false;
  public modalData = {
    carBrandId: '',
    carBrand: ''
  };

  constructor(private elRef: ElementRef,
              private apiCall: ApiCall,
              private funcServer: FuncServer,
              public cityPickerServer: CityPickerServer) {
  }

  public ngOnInit(): void {
    this.computeOnResize();
    this.getCarBrandList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getCarBrandList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCarBrandList(this.filterData.carBrandId, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.modalData = {
        carBrandId: item.car_brand_id,
        carBrand: item.brand
      }
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.modalData = {
        carBrandId: '',
        carBrand: ''
      }
    }
  }

  public updateCarBrand(): void {
    this.apiCall.updateCarBrand(
      this.modalData.carBrandId,
      this.modalData.carBrand,
      (data) => {
        this.toggleModal();
        this.getCarBrandList(1);
      }
    );
  }

  public addCarBrand(): void {
    this.apiCall.addCarBrand(
      this.modalData.carBrand,
      (data) => {
        this.toggleModal();
        this.getCarBrandList(1);
      }
    );
  }

  public removeCarBrand(carBrandId): void {
    this.apiCall.removeCarBrand(
      carBrandId,
      (data) => {
        this.getCarBrandList(1);
      }
    );
  }

  public modalSubmit(): void {
    if (this.modalData.carBrandId) {
      this.updateCarBrand();
    } else {
      this.addCarBrand();
    }
  }
}
