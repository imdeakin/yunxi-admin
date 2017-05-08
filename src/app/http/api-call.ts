/**
 * Created by Deakin on 2017/5/8 0008.
 */
import { Injectable } from '@angular/core';
import { ApiRequest, ApiConfig, ReqOpts } from '../http';

@Injectable()
export class ApiCall {
    constructor(private apiRequest: ApiRequest, private apiConfig: ApiConfig) {
    }

    public getAdminInfo(adminId, success, failure?): void {
        let opts: ReqOpts = {
            url: this.apiConfig.paths.getAdminInfo,
            data: {adminId: adminId},
            success: function (data) {
                console.log(data);
                success(data);
            },
            failure: function (code, msg) {
                console.error('Get admin info error ==> code: ' + code + ', msg: ' + msg);
                if (failure) {
                    failure(code, msg);
                }
            }
        };
        this.apiRequest.post(opts);
    }
}