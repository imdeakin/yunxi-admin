import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
import {CityPickersServer} from './city-pickers-server'
import {Option} from '../select-box/option-data-type';
@Component({
  selector: 'city-pickers',
  templateUrl: './city-pickers.html',
  styleUrls: ['./city-pickers.css']
})
export class CityPickersComponent implements OnInit, DoCheck {
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @Input() public name: string;
  @Input() public value: string;
  @Input() public option;
  public addr:object;
  public provinceList: Option[];
  public cityList: Option[];
  public districtList: Option[];
  public provinceCode;
  public provinceValue;
  public cityValue;
  public districtValue;
  public cityCode;
  public districtCode;

  public oldProvinceCode;
  public oldCityCode;
  public olddistrictCode;
  public oldValue;
  public oldOption;
  public n = 0;

  constructor(private cityPickersServer: CityPickersServer) {
    this.provinceList = this.parseToOptions(cityPickersServer.getProvinceList());
  }

  public ngOnInit(): void {

  }

  public ngDoCheck(): void {
    if (this.provinceCode !== this.oldProvinceCode || this.cityCode !== this.oldCityCode || this.districtCode !== this.olddistrictCode) {
      this.updateAddress();
      this.change.emit(this.addr);
    }
    if(this.option !== this.oldOption && this.n == 0){
      let valueCode = {
        provinceCode:'',
        cityCode:'',
        districtCode:''
      }
      valueCode = this.option;
       this.setProvinceList(valueCode.provinceCode);
       this.setCityList(valueCode.cityCode);
       this.setDistrictList(valueCode.districtCode);
       this.n ++;
    }
      this.updateAddress();
      this.change.emit(this.addr);
  }

  public setProvinceList(provinceCode): void {
    if (this.provinceCode != provinceCode) {
      this.cityList = [];
      this.districtList = [];
      this.provinceCode = provinceCode;
      this.cityList = this.parseToOptions(this.cityPickersServer.getList(provinceCode));
    }
  }

  public setCityList(cityCode): void {
    if (this.cityCode != cityCode) {
      this.cityCode = cityCode;
      this.districtList = this.parseToOptions(this.cityPickersServer.getList(cityCode));
    }
  }

  public setDistrictList(districtCode): void {
    if (this.districtCode != districtCode) {
      this.districtCode = districtCode;
      // this.districtList = this.parseToOptions(this.cityPickersServer.getList(districtCode));
    }
  }

  public updateAddress(): void {
    this.addr = [this.provinceCode,this.cityCode,this.districtCode];
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
