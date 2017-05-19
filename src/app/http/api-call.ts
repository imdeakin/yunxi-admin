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
      success: (data, total) => {
        success(data, total);
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

  public getYoukaBindList(oilCard: string, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaBindList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard
      },
      success: success,
      failure: failure
    });
  }

  /**
   * 获取油卡购买套餐订单列表
   * @param oilCard 油卡号码
   * @param tradeMode 交易方式：1、支付宝，2、微信，3、云付通，4，余额
   * @param classify 分类：1、默认套餐，2、优惠活动，3、会员专享
   * @param curPageIndex
   * @param pageSize
   * @param success
   * @param failure
   */
  public getYoukaOrderList(oilCard, tradeMode, classify, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaOrderList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard,
        tradeMode: tradeMode,
        classify: classify
      },
      success: success,
      failure: failure
    });
  }

  public getYoukaRecordList(oilCard, curPageIndex: number, pageSize: number, success, failure?): void {
    this.apiCall({
      url: this.apiConfig.paths.getYoukaRecordList,
      data: {
        index: curPageIndex,
        pageSize: pageSize,
        oilCard: oilCard
      },
      success: success,
      failure: failure
    });
  }
}
