/**
 * Created by Administrator on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {ApiCall} from '../http/api-call'
import {Rc4Server} from '../serv/rc4.server'
import {AdminFunc} from '../serv/admin.server'

import Cookies from 'cookies-js'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInfoKey = 'login';
  public adminInfoKey = 'YUNXI';
  public remember: boolean = false;

  public formData: any = {
    account: '',
    password: ''
  };

  constructor(private apiCall: ApiCall,
              private rc4Server: Rc4Server,
              private adminFunc: AdminFunc,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.initLoginInfo();
  }

  public submit(): void {
    this.login();
  }

  public login(): void {
    let account = this.formData.account;
    let psw = this.rc4Server.encrypt(this.formData.password);
    this.apiCall.login(account, psw, (data) => {
      console.log(data);
      this.saveLoginInfo();
      this.adminFunc.saveAdminInfo(data);
      this.router.navigateByUrl('/admin/workbench');
    });
  }

  public saveLoginInfo(): void {
    console.log(this.remember);
    if (this.remember) {
      let loginInfo = this.rc4Server.encrypt(this.formData);
      Cookies.set(this.loginInfoKey, loginInfo, {expires: 24*60*60*7});
    } else {
      Cookies.set(this.loginInfoKey, '', {expires: -1});
    }
  }

  public getLoginInfo() {
    let loginInfo = Cookies.get(this.loginInfoKey);
    loginInfo = this.rc4Server.decrypt(loginInfo, true);
    return loginInfo;
  }

  public initLoginInfo() {
    let loginInfo = this.getLoginInfo();
    if (loginInfo) {
      this.remember = true;
      this.formData = loginInfo;
    }
  }
}
