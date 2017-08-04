import { Component, Input, OnInit, DoCheck, ElementRef } from '@angular/core';
import { Data } from '@angular/router';
import { ApiCall } from '../../http/api-call';

declare let layer: any;

@Component({
    selector: 'chart-income',
    templateUrl:'./chart.html',
    styleUrls:['./chart.css']
})
export class ChartComponent implements OnInit,DoCheck{
    @Input() public shopId:string = '';
    public sevenDayStart;
    public sevenDayEnd;
    public MonthStart;
    public MonthEnd;

    public oldShopId;
    public dateEle;
    // 日期时间
    public selDate: string = '';
    public minDate: string = '1970/01/01';
    public maxDate: string = '9999/12/31';
    public disableDays: number[] = [-1, 7];    //For Sunday and Saturday
    public toContainPrevMonth: boolean = false;
    public toContainNextMonth: boolean = false;
    public value: string = '';
    public setInputDate(event) {
        this.value = event.target.value;
    }
    public setDate(date) {
        this.selDate = date;
    }

    // 日期时间
    public selDate2: string = '';
    public minDate2: string = '1970/01/01';
    public maxDate2: string = '9999/12/31';
    public disableDays2: number[] = [-1, 7];    //For Sunday and Saturday
    public toContainPrevMonth2: boolean = false;
    public toContainNextMonth2: boolean = false;
    public value2: string = '';
    public setInputDate2(event) {
        this.value2 = event.target.value;
    }
    public setDate2(date) {
        this.selDate2 = date;
    }

    constructor(private apiCall:ApiCall,private elementRef:ElementRef) {
    }
    options: Object;

    public ngOnInit():void{
        this.sevenDayStart = this.sevenDays2()[1];
        this.sevenDayEnd = this.sevenDays2()[0];
        this.MonthStart = this.byMonth2()[1];
        this.MonthEnd = this.byMonth2()[0];

        this.dateEle = this.elementRef.nativeElement.querySelectorAll('#openDate');

    }

    public ngDoCheck():void{
        if(this.shopId !== this.oldShopId){
            this.oldShopId = this.shopId;
            this.compareDate(this.sevenDayStart,this.sevenDayEnd,1);
        }
    }

    /**
     * 方法一
     * 全部日期返回
     */
    public sevenDays():{}{
        let data = new Date();
        let start = data.getTime();
        let timeArr = [];
        for(let i = 7; i > 0 ;i--){ 
            let time = start - i * 24 * 60 * 60 * 1000;
            let end = new Date(time);
            let text = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
            timeArr.push(text);
        }
        return timeArr;
    }

      public byMonth():{}{
        let data = new Date();
        let start = data.getTime();
        let timeArr = [];
        for(let i = 30; i > 0 ;i--){ 
            let time = start - i * 24 * 60 * 60 * 1000;
            let end = new Date(time);
            let text = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
            timeArr.push(text);
        }
        return timeArr;
    }

     /**
     * 方法二
     * 只返回开始日期和结束日期
     */

    public sevenDays2():{}{
        let data = new Date();
        let text = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();        
        let start = data.getTime();
        let timeArr = [text];
        for(let i = 6; i > 5 ;i--){ 
            let time = start - i * 24 * 60 * 60 * 1000;
            let end = new Date(time);
            let text = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
            timeArr.push(text);
        }
        return timeArr;
    }

      public byMonth2():{}{
        let data = new Date();
        let text = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();     
        let start = data.getTime();
        let timeArr = [text];
        for(let i = 30; i > 29 ;i--){ 
            let time = start - i * 24 * 60 * 60 * 1000;
            let end = new Date(time);
            let text = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
            timeArr.push(text);
        }
        return timeArr;
    }

    /**
     * 比较日期是否符合搜索条件
     */
    public compareDate(startTime,endTime,type?):void{
        if(!startTime&&!endTime){
            return;
        }
        let startDate = new Date(startTime);
        let endDate = new Date(endTime);
        let timeLimit = startDate.getTime() + 30*24*60*60*1000;
        if( endDate.getTime() > timeLimit){
            layer.msg('结束时间超过30天了，请重新选择');
            return; 
        }
        if(startDate.getTime() > endDate.getTime()){
            layer.msg('开始日期必需早于结束时间，请重新选择');
            return;
        }
        if(this.selDate && this.selDate2 && !type){
            this.dateEle.forEach(element => {
                element.click();
            });
        }
        this.getIncomeStatistics(startTime,endTime,type);
        this.selDate = '';
        this.selDate2 = '';

    }

    public getIncomeStatistics(startTime,endTime,type?){
        this.apiCall.getIncomeStatistics(this.shopId,startTime,endTime,(data)=>{
            let str;
            let moneysArr = [];
            let countArr = [];
            let dayArr = [];
            data.forEach(element => {
                moneysArr.push(element.moneys);
                countArr.push(element.count);
                dayArr.push(element.dates);
            });

            switch(type){
                case 1:
                  str = '7天收益';
                  break;
                case 2:
                  str = '近30天收益';
                  break;
                default:
                  str = '所选时间收益';
            }
            
            this.options = {
                title: { text: str },
                xAxis: {
                    categories: dayArr
                },
                yAxis: {
                    title: {
                        text: '收益和订单数'
                    }
                },
                series: [{
                    name:'总收益',
                    data: moneysArr,
                },{
                    name:'交易笔数',
                    data:countArr
                }]
            };
        })
    }
}