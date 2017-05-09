/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, OnInit } from '@angular/core';

import { ApiCall } from '../../http';

@Component({
    selector: 'head-bar',
    templateUrl: './head-bar.component.html',
    styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {
    public adminId = '';

    public adminInfo = {
        admin_id: '',
        head_img: '',
        name: '陈先生',
        manager_level: '超级管理员',
        last_login_time: '2017-12-12 17:34:23'
    };

    constructor(private apiCall: ApiCall) {
    }

    public ngOnInit(): void {
        this.getAdminInfo();
    }

    public getAdminInfo(): void {
        this.apiCall.getAdminInfo(this.adminId, (data) => {
            this.adminInfo = data;
        });
    }
}
