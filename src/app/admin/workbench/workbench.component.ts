/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiCall } from '../../http/api-call'

@Component({
    selector: 'workbench-page',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.css']
})
export class WorkbenchPageComponent implements OnInit {
    public title = '我的工作台';
    public contentHeight = 0;
    public adminId = '';
    public salesInfo = {
        day_order: '88',// 今日订单	88
        number_users: '21222',// 用户总数	21222
        daily_sales: '9988.00',// 今日营业额 9988.00
        blanket_order: '9999',// 总订单数量	9999
        turnover: '798798.92',// 总营业额	798798.92
        month_order: '321',// 本月订单数	321
    };

    constructor(private elRef: ElementRef, private apiCall: ApiCall) {
    }

    public ngOnInit(): void {
        this.updateContentHeight();
        window.addEventListener('resize', () => {
            this.updateContentHeight();
        });
        this.getSalesInfo();
    }

    public updateContentHeight(): void {
        this.contentHeight = this.elRef.nativeElement.firstChild.offsetHeight - 40;
    }

    public getSalesInfo(): void {
        this.apiCall.getSalesInfo(this.adminId, (data) => {
            this.salesInfo = data;
        });
    }
}
