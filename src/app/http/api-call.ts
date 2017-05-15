/**
 * Created by Deakin on 2017/5/8 0008.
 */
import {Injectable} from '@angular/core';
import {ApiRequest, ApiConfig, ReqOpts} from '../http';

@Injectable()
export class ApiCall {
  constructor(private apiRequest: ApiRequest, private apiConfig: ApiConfig) {
  }

  public apiCall(options): void {
    let url = options.url;
    let data = options.data;
    let success = options.success;
    let failure = options.failure;
    let opts: ReqOpts = {
      url: url,
      data: data,
      success: (data) => {
        success(data);
      },
      failure: (code, msg) => {
        console.error('Call api error: ' + url);
        console.error('Call api error ==> code: ' + code + ', msg: ' + msg);
        if (failure) {
          failure(code, msg);
        }
      }
    };
    this.apiRequest.post(opts);
  }

  public getAdminInfo(admindId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getAdminInfo,
      data: {
        adminId: admindId
      },
      success: success,
      failure: failure
    });
  }

  public getSalesInfo(admindId, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getSalesInfo,
      data: {
        adminId: admindId
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaTaocanList(curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaTaocanList,
      data: {
        index: curPageIndex,
        pageSize: pageSize
      },
      success: success,
      failure: failure
    });
  }
}
