import { Component, OnInit, DoCheck, EventEmitter,Output,Input } from '@angular/core';
import { Option } from '../select-box/option-data-type';
import {ApiCall} from '../../http/api-call'

@Component({
    selector:'province-picker',
    templateUrl:'./province-picker.component.html',
    styleUrls:['./province-picker.component.css']
})

export class ProvinceComponent implements OnInit,DoCheck{
    @Output() public change:EventEmitter<any> = new EventEmitter();
    @Input() public name:string;
    @Input() public value:string;
    public provinceList:Option[];
    public provinceData=[];
    public provinceID;
    public oldProvinceID;
    public oldProvinceName;

    constructor(private apicall:ApiCall){

    }

    public ngOnInit():void{
        this.provinceList = this.getProvinceOption();
    }

    public ngDoCheck():void{
        if(this.provinceID !== this.oldProvinceID){
            this.updateProvinceID();
            this.change.emit(this.provinceID)
        }
    }

    public getProvinceOption():Option[]{
        let Options:Option[] = [];
        this.apicall.getProvinceShortname((data)=>{
            this.provinceData = data;
            for(let key in this.provinceData){
                Options.push({
                    value:this.provinceData[key].shortname_id,
                    text:this.provinceData[key].name
                })
            }
        })
        return Options;
    }

    public setProvinceList(provinceID):void{
        if(this.provinceID != provinceID){
            this.provinceList = [];
            this.provinceID = provinceID;
            this.provinceList = this.getProvinceOption();
        }
    }

    public updateProvinceID():void{
        this.oldProvinceID = this.provinceID;
    }
}