/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Component, ElementRef, OnInit} from '@angular/core';
import {FuncServer} from '../../../serv/func.server';
import {ApiCall} from '../../../http/api-call';
import {CityPickerServer} from '../../../com/city-picker';
import {SystemFunction} from '../data-type/system-function';
import {CarSeriesList} from '../data-type/car-series-list';

declare let layer: any;

@Component({
  selector: 'car-series-list',
  templateUrl: './car-series-list.component.html',
  styleUrls: ['./car-series-list.component.css']
})
export class CarSeriesListComponent implements OnInit {
  public title = '车系';
  public contentHeight = 0;
  public total = 0;
  public perPageSize = 1;
  public curPageIndex = 1;
  public tableList: CarSeriesList[];
  public filterData = {
    carSeriesId: '',
    series: '',
    carBrand: '',
    carBrandId: ''
  };
  public carBrandOptions;

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
    this.getCarSeriesList();
  }

  public computeOnResize() {
    this.contentHeight = this.funcServer.getContentHeight(this.elRef);
    this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    window.addEventListener('resize', () => {
      this.contentHeight = this.funcServer.getContentHeight(this.elRef);
      this.perPageSize = this.funcServer.getPerPageSize(this.contentHeight);
    });
  }

  public getCarSeriesList(curPageIndex?): void {
    if (curPageIndex) {
      this.curPageIndex = curPageIndex;
    }
    this.apiCall.getCarSeriesList(this.filterData.series, this.curPageIndex, this.perPageSize, (list, total) => {
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
      this.filterData.carSeriesId = item.car_series_id;
      this.filterData.series = item.series;
      this.filterData.carBrand = item.brand;
    }
    this.modalShow = !this.modalShow;

    if (!this.modalShow) {
      this.filterData = {
        carSeriesId: '',
        series: '',
        carBrand: '',
        carBrandId: ''
      }
    }
  }

  public updateCarSeries(): void {
    this.apiCall.updateCarSeries(
      this.filterData.carSeriesId,
      this.filterData.series,
      this.filterData.carBrandId,
      (data) => {
        this.toggleModal();
        this.getCarSeriesList(1);
      }
    );
  }

  public addCarSeries(): void {
    this.apiCall.addCarSeries(
      this.filterData.series,
      this.filterData.carBrandId,
      (data) => {
        this.toggleModal();
        this.getCarSeriesList(1);
      }
    );
  }

  public removeCarSeries(seriesId): void {
    this.apiCall.removeCarSeries(
      seriesId,
      (data) => {
        this.getCarSeriesList(1);
      }
    );
  }

  public modalSubmit(): void {
    if (this.filterData.carSeriesId) {
      this.updateCarSeries();
    } else {
      console.log(1);
      this.addCarSeries();
    }
  }

   //确认弹窗
  public verificationConfirm(seriesId): void {
    let index = layer.confirm(
      '请确认删除结果',
      {
        title: '确认',
        btn: ["确认", "取消"]
      },
      () => {
        this.removeCarSeries(seriesId);
        layer.close(index);
      },
      () => {
         layer.close(index);
      }
    )
  }
}
