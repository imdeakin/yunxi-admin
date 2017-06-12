/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarModelList} from '../data-type/car-model-list';

@Component({
  selector: 'car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.css']
})
export class CarModelListComponent implements OnInit {
  public title = '管理员';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: CarModelList[];
  public filterData = {
    carModelId: '',
    carModel: ''
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
    this.getCarModelList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getCarModelList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCarModelList(this.filterData.carModelId, this.curPageIndex, this.perPageSize, (list, total) => {
      this.tableList = list;
      this.total = total;
    });
  }

  // 模态窗
  public toggleModal(item?): void {
    if (item) {
      this.filterData.carModelId = item.car_models_id;
      this.filterData.carModel = item.models;
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.filterData = {
        carModelId: '',
        carModel: ''
      }
    }
  }

  public updateCarModel(): void {
    this.apiCall.updateCarModel(
      this.filterData.carModelId,
      this.filterData.carModel,
      (data) => {
        this.toggleModal();
        this.getCarModelList(0);
      }
    );
  }

  public addCarModel(): void {
    this.apiCall.addCarModel(
      this.filterData.carModel,
      (data) => {
        this.toggleModal();
        this.getCarModelList(0);
      }
    );
  }

  public removeCarModel(carModelId): void {
    this.apiCall.removeCarModel(
      carModelId,
      (data) => {
        this.getCarModelList(0);
      }
    );
  }

  public modalSubmit(): void {
    if (this.filterData.carModelId) {
      this.updateCarModel();
    } else {
      this.addCarModel();
    }
  }
}
