/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Injectable } from '@angular/core';
import { ApiRequest, ApiConfig, ReqOpts } from '../http';

@Injectable()
export class ApiCall {
    constructor(private apiRequest: ApiRequest, private apiConfig: ApiConfig) {
    }

    public getAdminInfo(admindId, success, failure?): void {
        let opts: ReqOpts = {
            url: this.apiConfig.paths.getAdminInfo,
            data: {
                adminId: admindId
            },
            success: (data) => {
                success(data);
            },
            failure: (code, msg) => {
                console.error('Get admin info error ==> code: ' + code + ', msg: ' + msg);
                if (failure) {
                    failure(code, msg);
                }
            }
        };
        this.apiRequest.post(opts);
    }

    public getSalesInfo(admindId, success, failure?): void {
        let opts: ReqOpts = {
            url: this.apiConfig.paths.getSalesInfo,
            data: {
                adminId: admindId
            },
            success: (data) => {
                success(data);
            },
            failure: (code, msg) => {
                console.error('Get sales info error ==> code: ' + code + ', msg: ' + msg);
                if (failure) {
                    failure(code, msg);
                }
            }
        };
        this.apiRequest.post(opts);
    }
}
