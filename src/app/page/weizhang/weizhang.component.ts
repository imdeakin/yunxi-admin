/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'weizhang-page',
    templateUrl: './weizhang.component.html',
    styleUrls: ['./weizhang.component.css']
})
export class WeizhangPageComponent implements OnInit {
    public title = '违章管理';
    public contentHeight = 0;
    public perPageSize = 1;
    public curPageIndex = 0;
    public tableList = [
        {
            account: '18128789828', // 账号
            car_num: '粤A88828', // 车牌号
            fine: '200', // 罚款
            charge: '25', // 服务费
            commission: '20', // 佣金
            amount: '245', // 支付总额
            order_time: '2017-03-03', // 订单时间
            position: '广州' // 所属城市
        },
        {
            account: '18128789828', // 账号
            car_num: '粤A88828', // 车牌号
            fine: '200', // 罚款
            charge: '25', // 服务费
            commission: '20', // 佣金
            amount: '245', // 支付总额
            order_time: '2017-03-03', // 订单时间
            position: '广州' // 所属城市
        },
        {
            account: '18128789828', // 账号
            car_num: '粤A88828', // 车牌号
            fine: '200', // 罚款
            charge: '25', // 服务费
            commission: '20', // 佣金
            amount: '245', // 支付总额
            order_time: '2017-03-03', // 订单时间
            position: '广州' // 所属城市
        }
    ];

    private selDate: string = '';
    private minDate: string = '01/01/2016';
    private maxDate: string = '12/31/2017';
    private disableDays: number[] = [0, 6];    //For Sunday and Saturday
    private toContainPrevMonth: boolean = false;
    private toContainNextMonth: boolean = false;
    private value: string = '';

    constructor(private elRef: ElementRef) {
    }

    public ngOnInit(): void {
        this.updateContentHeight();
        window.addEventListener('resize', () => {
            this.updateContentHeight();
        });
    }

    public updateContentHeight(): void {
        this.contentHeight = this.elRef.nativeElement.firstChild.offsetHeight - 40;
        this.updatePerPageSize();
    }

    public updatePerPageSize(): void {
        let itemHeight = 53;
        let maxHeight = this.contentHeight - 70 - 50 - 67;
        let size = Math.floor(maxHeight / itemHeight);
        let minSize = 1;
        let maxSize = 30;
        if (size < minSize) {
            size = minSize;
        } else if (size > maxSize) {
            size = maxSize;
        }
        this.perPageSize = size;
    }

    public setInputDate(event) {
        this.value = event.target.value;
    }

    public setDate(date) {
        this.selDate = date;
    }
}
