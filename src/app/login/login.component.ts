/**
 * Created by Administrator on 2017/6/5.
 */
import {Component} from '@angular/core';

import {ApiCall} from '../http/api-call'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public remember:boolean = false;

  public formData = {
    account: '',
    password: ''
  };

  constructor(private apiCall: ApiCall) {
  }

  public submit(): void {
    this.login();
  }

  public login(): void {
    this.apiCall.login(this.formData.account, this.formData.password, (data) => {
      window.sessionStorage.setItem('admin', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('admin'));
    });
  }
}
