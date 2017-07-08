import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {CityPickerServer} from './city-picker-server'
import {Option} from '../select-box/option-data-type';
@Component({
  selector: 'city-picker',
  templateUrl: './city-picker.html',
  styleUrls: ['./city-picker.css']
})
export class CityPickerComponent implements OnInit, DoCheck {
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @Input() public name: string;
  @Input() public value: string;
  public addr: string;
  public provinceList: Option[];
  public cityList: Option[];
  public districtList: Option[];
  public provinceCode;
  public cityCode;
  public districtCoce;

  public oldProvinceCode;
  public oldCityCode;
  public oldDistrictCoce;

  constructor(private cityPickerServer: CityPickerServer) {
    this.provinceList = this.parseToOptions(cityPickerServer.getProvinceList());
  }

  public ngOnInit(): void {

  }

  public ngDoCheck(): void {
    if (this.provinceCode !== this.oldProvinceCode || this.cityCode !== this.oldCityCode || this.districtCoce !== this.oldDistrictCoce) {
      this.updateAddress();
      this.change.emit(this.addr);
    }
  }

  public setCityList(provinceCode): void {
    if (this.provinceCode != provinceCode) {
      this.cityList = [];
      this.districtList = [];
      this.provinceCode = provinceCode;
      this.cityList = this.parseToOptions(this.cityPickerServer.getList(provinceCode));
    }
  }

  public setDistrictList(cityCode): void {
    if (this.cityCode != cityCode) {
      this.cityCode = cityCode;
      this.districtList = this.parseToOptions(this.cityPickerServer.getList(cityCode));
    }
  }

  public updateAddress(): void {
    this.addr = this.cityCode;
    // this.addr = this.provinceCode + '/' + this.cityCode;
  }

  public parseToOptions(cityData): Option[] {
    let options: Option[] = [];
    for (let key in cityData) {
      options.push({
        value: key,
        text: cityData[key]
      });
    }
    return options;
  }
}
