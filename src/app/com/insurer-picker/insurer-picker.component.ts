import { Component, OnInit, DoCheck, EventEmitter,Output,Input } from '@angular/core';
import { Option } from '../select-box/option-data-type';
import {ApiCall} from '../../http/api-call'

@Component({
    selector:'insurer-picker',
    templateUrl:'./insurer-picker.component.html',
    styleUrls:['./insurer-picker.component.css']
})

export class InsurerComponent implements OnInit,DoCheck{
    @Output() public change:EventEmitter<any> = new EventEmitter();
    @Input() public name:string;
    @Input() public code:string;
    public insurerList:Option[];
    public insurerData=[];
    public insurerID;
    public oldInsurerID;
    public oldInsurerName;
    public InsurerName;

    public oldcode = "LIHI";
    constructor(private apicall:ApiCall){

    }

    public ngOnInit():void{
        this.insurerList = this.getInsurerOption();
        // this.oldcode = this.code;
    }

    public ngDoCheck():void{
        if(this.insurerID !== this.oldInsurerID){
            this.updateProvinceID();
            this.change.emit(this.insurerID)
        }
        // if(this.oldcode !== this.code){
        //     console.log(1);
        //     this.oldcode = this.code
        // }
    }

    public getInsurerOption():Option[]{
        let Options:Option[] = [];
        this.apicall.getInsurerList((data)=>{
            this.insurerData = data;
            for(let key in this.insurerData){
                Options.push({
                    value:this.insurerData[key].code,
                    text:this.insurerData[key].name
                })
            }
        })
        return Options;
    }

    public setInsurerList(insurerID):void{
        if(this.insurerID != insurerID){
            this.insurerList = [];
            this.insurerID = insurerID;
            this.insurerList = this.getInsurerOption();
        }
    }

    public updateProvinceID():void{
        this.oldInsurerID = this.insurerID;
    }
}