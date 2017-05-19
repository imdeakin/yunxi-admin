import {Component} from '@angular/core';
import {CityPickerServer} from './city-picker-server'
import {Option} from '../select-box/option-data-type';
@Component({
  selector: 'city-picker',
  templateUrl: './city-picker.html',
  styleUrls: ['./city-picker.css']
})

export class CityPickerComponent {
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
    }
  }

  public setDistrictList(cityCode): void {
    this.cityCode = cityCode;
    this.districtList = this.parseToOptions(this.cityPickerServer.getList(cityCode));
  }

  public parseToOptions(cityData): Option[] {
    let options: Option[] = [];
    console.log(cityData);
    for (let key in cityData) {
      options.push({
        value: key,
        text: cityData[key]
      });
    }
    console.log(options);
    return options;
  }
}
