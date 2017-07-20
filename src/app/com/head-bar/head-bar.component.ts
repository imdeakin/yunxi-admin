/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ApiCall } from '../../http';
import { FuncServer } from '../../serv/func.server';
import { AdminFunc } from '../../serv/admin.server';
import { ApiConfig } from '../../http/api-config';
import Cookies from 'cookies-js'
declare let layer: any;


@Component({
    selector: 'head-bar',
    templateUrl: './head-bar.component.html',
    styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {
    public loginInfoKey = 'login';
    public adminId = '';
    public adminuserInfo;
    public adminInfo = {
        admin_id: '',
        head_img: '',
        name: '陈先生',
        manager_level: '超级管理员',
        last_login_time: '2017-12-12 17:34:23',
        roleName:''
    };

    constructor(private apiCall: ApiCall,private adminFunc:AdminFunc,private router:Router) {
    }

    public ngOnInit(): void {
        this.getAdminInfo();
    }

    public getAdminInfo(): void {
        this.adminId = this.adminFunc.getAdminId();
        this.apiCall.getAdminInfo(this.adminId, (data) => {
            this.adminInfo = data;
            console.log(this.adminInfo);
        });
    }

    public logout():void{
        this.apiCall.logout((data)=>{
            Cookies.expire(this.loginInfoKey);
            this.router.navigateByUrl('/login');
        })
    }

     // 核验弹窗
  public verificationConfirm(): void {
    let index = layer.confirm(
      '确认退出登录',
      {
        title: '选择',
        btn: ["确认", "取消"]
      },
      () => {
        layer.close(index);
        this.logout();
      },
      () => {
        layer.close();
      }
    )
  }
}
