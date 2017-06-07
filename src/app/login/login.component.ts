/**
 * Created by Administrator on 2017/6/5.
 */
import {Component, OnInit} from '@angular/core';

import {ApiCall} from '../http/api-call'
import {Rc4Server} from '../serv/rc4.server'
import Cookies from 'cookies-js'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInfoKey = 'login';
  public adminInfoKey = 'admin';
  public rc4Key = 'YQH_2017^123456';
  public remember: boolean = false;

  public formData = {
    account: '',
    password: ''
  };

  constructor(private apiCall: ApiCall, private rc4Server: Rc4Server) {
  }

  public ngOnInit(): void {
    this.initLoginInfo();
  }

  public submit(): void {
    this.login();
  }

  public login(): void {
    this.saveLoginInfo();

    let account = this.formData.account;
    let psw = this.rc4Server.encrypt(this.formData.password);
    this.apiCall.login(account, psw, (data) => {
      this.saveLoginInfo();
      this.saveAdminInfo(data);
    });
  }

  public saveLoginInfo(): void {
    if (this.remember) {
      let loginInfo = this.rc4Server.encrypt(this.formData);
      Cookies.set(this.loginInfoKey, loginInfo);

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

  public saveAdminInfo(adminInfo): void {
    Cookies.set(this.adminInfoKey, this.rc4Server.encrypt(adminInfo));
    console.log(this.rc4Server.decrypt(Cookies.get(this.adminInfoKey), true));
  }
}
