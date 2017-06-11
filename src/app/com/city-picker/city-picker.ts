import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CityPickerServer} from './city-picker-server'
import {Option} from '../select-box/option-data-type';
@Component({
  selector: 'city-picker',
  templateUrl: './city-picker.html',
  styleUrls: ['./city-picker.css']
})
export class CityPickerComponent {
  @Input() public name: string;
  @Output() public change: EventEmitter<any> = new EventEmitter();
  public addr: string;
  public provinceList: Option[];
  public cityList: Option[];
  public districtList: Option[];
  public provinceCode;
  public cityCode;
  public districtCoce;

  constructor(private cityPickerServer: CityPickerServer) {
    this.provinceList = this.parseToOptions(cityPickerServer.getProvinceList());
  }

  public setCityList(provinceCode): void {
    if (this.provinceCode != provinceCode) {
      this.cityList = [];
      this.districtList = [];
      this.provinceCode = provinceCode;
      this.cityList = this.parseToOptions(this.cityPickerServer.getList(provinceCode));
      this.updateAddress();
      this.change.emit(this.addr);
    }
  }

  public setDistrictList(cityCode): void {
    if (this.cityCode != cityCode) {
      this.cityCode = cityCode;
      this.districtList = this.parseToOptions(this.cityPickerServer.getList(cityCode));
      this.updateAddress();
      this.change.emit(this.addr);
    }
  }

  public updateAddress(): void {
    this.addr = this.provinceCode + '/' + this.cityCode;
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
