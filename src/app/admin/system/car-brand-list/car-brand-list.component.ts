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
  public curPageIndex = 0;
  public tableList: CarBrandList[];
  public filterData = {
    carBrandId: '',
    carBrand: ''
  };

  public systemFunction = SystemFunction;

  // 模态窗
  public modalShow: boolean = false;

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
      this.filterData.carBrandId = item.car_brand_id;
      this.filterData.carBrand = item.brand;
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.filterData = {
        carBrandId: '',
        carBrand: ''
      }
    }
  }

  public updateCarBrand(): void {
    this.apiCall.updateCarBrand(
      this.filterData.carBrandId,
      this.filterData.carBrand,
      (data) => {
        this.toggleModal();
        this.getCarBrandList(0);
      }
    );
  }

  public addCarBrand(): void {
    this.apiCall.addCarBrand(
      this.filterData.carBrand,
      (data) => {
        this.toggleModal();
        this.getCarBrandList(0);
      }
    );
  }

  public removeCarBrand(carBrandId): void {
    this.apiCall.removeCarBrand(
      carBrandId,
      (data) => {
        this.getCarBrandList(0);
      }
    );
  }

  public modalSubmit(): void {
    if (this.filterData.carBrandId) {
      this.updateCarBrand();
    } else {
      this.addCarBrand();
    }
  }
}
